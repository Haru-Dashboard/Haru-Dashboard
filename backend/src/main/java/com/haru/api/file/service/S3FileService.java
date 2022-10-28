package com.haru.api.file.service;

import com.haru.api.file.dto.S3FileResponse;
import com.haru.api.file.entity.S3File;
import com.haru.api.file.exception.FileNotFoundException;
import com.haru.api.file.domain.S3FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class S3FileService {
    private final S3FileRepository fileRepository;
    private final S3Service s3Service;

    public S3FileResponse.OnlyId save(MultipartFile file) {
        //TODO: 이미지인지 아닌지 확인 처리 필요(SavedFile을 반환하는 s3Service.upload(file) 에서 isImage가 true -> image)
        return S3FileResponse.OnlyId.build(fileRepository.save(S3File.create(s3Service.upload(file))));
    }

    public S3FileResponse.GetImage getImage(Long imageId) {
        S3File image = fileRepository.findById(imageId).orElseThrow(FileNotFoundException::new);
        String base64Str = s3Service.getBase64Str(image);
        return S3FileResponse.GetImage.build(image, base64Str);
    }
}

