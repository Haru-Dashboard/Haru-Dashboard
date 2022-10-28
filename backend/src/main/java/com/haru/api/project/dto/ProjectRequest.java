package com.haru.api.project.dto;

import lombok.*;

import java.time.LocalDate;

public class ProjectRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateOrUpdate {
        private String title;
        private String content;
        private LocalDate startDate;
        private LocalDate endDate;
    }
}
