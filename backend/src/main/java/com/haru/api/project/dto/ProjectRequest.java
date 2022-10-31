package com.haru.api.project.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

public class ProjectRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateOrUpdate {
        private String title;
        private String content;
        private List<String> labels;
        private List<ProjectLinkRequest.Create> links;
        private LocalDate startDate;
        private LocalDate endDate;
    }
}
