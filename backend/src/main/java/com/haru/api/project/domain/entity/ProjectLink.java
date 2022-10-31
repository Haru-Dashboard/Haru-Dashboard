package com.haru.api.project.domain.entity;

import com.haru.api.common.entity.BaseEntity;
import com.haru.api.project.dto.ProjectLinkRequest;
import lombok.*;

import javax.persistence.*;


@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "project_link")
public class ProjectLink extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_link_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String link;

    private void setProject(Project project){
        project.getProjectLinks().add(this);
        this.project = project;
    }
    public static ProjectLink create(ProjectLinkRequest.Create request, Project project) {
        ProjectLink projectLink = ProjectLink.builder()
                .name(request.getName())
                .link(request.getUrl())
                .build();
        projectLink.setProject(project);
        return projectLink;
    }
}