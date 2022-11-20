package com.haru.api.project.dto;

import com.haru.api.project.domain.entity.ProjectLabel;
import lombok.*;

public class ProjectLabelResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetProjectLabel {
        private Long id;
        private String name;
        public static ProjectLabelResponse.GetProjectLabel build(ProjectLabel projectLabel) {
            return ProjectLabelResponse.GetProjectLabel.builder()
                    .id(projectLabel.getId())
                    .name(projectLabel.getName())
                    .build();
        }
    }
}
