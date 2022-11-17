package com.haru.api.project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.haru.api.file.dto.S3FileResponse;
import com.haru.api.project.domain.entity.Project;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long id;

        public static ProjectResponse.OnlyId toEntity(Project project) {
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
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate startDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate endDate;
        private List<ProjectLinkResponse.GetProjectLink> projectLinks;
        private List<ProjectLabelResponse.GetProjectLabel> projectLabels;
        private S3FileResponse.GetImage imageInfo;
        public static ProjectResponse.GetProject toEntity(Project project) {
            GetProjectBuilder response = GetProject.builder()
                    .id(project.getId())
                    .title(project.getTitle())
                    .content(project.getContent())
                    .startDate(project.getStartDate())
                    .endDate(project.getEndDate())
                    .projectLinks(project.getProjectLinks().stream().map(ProjectLinkResponse.GetProjectLink::build).collect(Collectors.toList()))
                    .projectLabels(project.getProjectLabels().stream().map(ProjectLabelResponse.GetProjectLabel::build).collect(Collectors.toList()));
            if(project.getFile() != null) {
                response.imageInfo(S3FileResponse.GetImage.build(project.getFile(), project.getFile().getUrl()));
            }
            return response.build();
        }
    }
}
