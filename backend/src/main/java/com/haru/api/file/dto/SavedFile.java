package com.haru.api.file.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SavedFile {
    private final String originName;
    private final String name;
    private final String extension;
    private final String publicUrl;
    private final boolean isImage;

    public static SavedFile create(String originName, String s3FileName, String extension, String publicUrl, boolean isImage) {
        return SavedFile.builder()
                .originName(originName)
                .name(s3FileName)
                .extension(extension)
                .publicUrl(publicUrl)
                .isImage(isImage)
                .build();
    }
}

