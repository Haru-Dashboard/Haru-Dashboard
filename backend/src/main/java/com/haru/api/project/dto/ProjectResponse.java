package com.haru.api.project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.haru.api.file.dto.S3FileResponse;
import com.haru.api.file.entity.S3File;
import com.haru.api.project.domain.entity.Project;
import lombok.*;

import java.time.LocalDate;

public class ProjectResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long id;

        public static ProjectResponse.OnlyId build(Project project) {
            return ProjectResponse.OnlyId.builder()
                    .id(project.getId())
                    .build();
        }

    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetProject {
        private Long id;
        private String title;
        private String content;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone = "Asia/Seoul")
        private LocalDate startDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone = "Asia/Seoul")
        private LocalDate endDate;
        private S3FileResponse.GetImage image;
        public static ProjectResponse.GetProject build(Project project, S3File file, String base64Str) {
            return GetProject.builder()
                    .id(project.getId())
                    .title(project.getTitle())
                    .content(project.getContent())
                    .startDate(project.getStartDate())
                    .endDate(project.getEndDate())
                    .image(S3FileResponse.GetImage.build(file, base64Str))
                    .build();
        }
    }
}
