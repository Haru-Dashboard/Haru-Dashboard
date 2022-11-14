package com.haru.api.project.dto;

import com.haru.api.project.domain.entity.ProjectLink;
import lombok.*;

public class ProjectLinkResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetProjectLink {
        private Long id;
        private String name;
        private String url;
        public static ProjectLinkResponse.GetProjectLink build(ProjectLink projectLink) {
            return GetProjectLink.builder()
                    .id(projectLink.getId())
                    .name(projectLink.getName())
                    .url(projectLink.getLink())
                    .build();
        }
    }
}
