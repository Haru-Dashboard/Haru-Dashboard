package com.haru.api.file.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.haru.api.file.dto.S3Component;
import com.haru.api.file.dto.SavedFile;
import com.haru.api.file.entity.S3File;
import com.haru.api.file.exception.FileExtensionException;
import com.haru.api.file.exception.S3Exception;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {
    private final AmazonS3Client s3Client;
    private final S3Component component;

    public SavedFile upload(MultipartFile file) {
        String originalName = file.getOriginalFilename();
        String extension = getFileExtension(originalName);
        String s3FileName = createFileName(extension);
        String publicUrl = component.getPublicUrl() + "/" + s3FileName;
        try {
            File uploadFile = convert(file)
                    .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
            putS3(uploadFile, s3FileName);
            removeNewFile(uploadFile);
        } catch (IOException e) {
            log.info(e.getMessage());
            throw new S3Exception();
        }
        return SavedFile.create(originalName, s3FileName, extension, publicUrl, isImage(extension));
    }

    private void putS3(File uploadFile, String fileName) {
        s3Client.putObject(new PutObjectRequest(component.getBucket(), fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    private boolean isImage(String extension) {
        return Optional.ofNullable(extension)
                .map(s -> s.toLowerCase().matches("png|jpeg|jpg|bmp|gif|svg"))
                .orElse(false);
    }

    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename().getBytes(StandardCharsets.UTF_8).toString());
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }


    private String createFileName(String extension) {
        return UUID.randomUUID().toString().concat("." + extension);
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } catch (StringIndexOutOfBoundsException e) {
            throw new FileExtensionException();
        }
    }

    private byte[] convertFileContentToBlob (S3File image) {
        try {
            String bucket = component.getBucket();
            String fileName = image.getName();
            S3Object s3Object = s3Client.getObject(bucket, fileName);
            return IOUtils.toByteArray(s3Object.getObjectContent());
        } catch (IOException e) {
            log.error("file convert Error");
            return null;
        }
    }
    private String convertBlobToBase64 (byte[] blob) {
        return Base64.getEncoder().encodeToString(blob);
    }
    public String getBase64Str (S3File image) {
        byte[] fileByte = convertFileContentToBlob(image);
        String imgStr = convertBlobToBase64(fileByte);
        StringBuilder sb = new StringBuilder();
        sb.append("data:image/").append(image.getExtension()).append(";base64, ").append(imgStr);
        imgStr = sb.toString();
        return imgStr;
    }
}


