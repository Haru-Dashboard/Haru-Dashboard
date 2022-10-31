package com.haru.api.project.dto;

import lombok.*;

public class ProjectLinkRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Create {
        private String name;
        private String url;
    }
}
