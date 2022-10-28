package com.haru.api.file.dto;

import lombok.*;

public class S3FileRequest {
    //TODO: 테스트용 -> Project 기능 개발이 완료되면 삭제 필요
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Title {
        private String title;
    }
}
