package com.haru.api.file.dto;

import com.haru.api.file.entity.S3File;
import lombok.*;

public class S3FileResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long id;

        public static S3FileResponse.OnlyId build(S3File file) {
            return S3FileResponse.OnlyId.builder()
                    .id(file.getId())
                    .build();
        }

    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetImage {
        private Long id;
        private String originName;
        private String name;
        private String extension;
        private String imageUrl;
        public static S3FileResponse.GetImage build(S3File file, String base64Str) {
            return GetImage.builder()
                    .id(file.getId())
                    .name(file.getName())
                    .extension(file.getExtension())
                    .originName(file.getOriginName())
                    .imageUrl(base64Str)
                    .build();
        }

    }

}

