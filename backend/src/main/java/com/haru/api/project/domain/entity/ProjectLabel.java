package com.haru.api.project.domain.entity;

import com.haru.api.common.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "project_label")
public class ProjectLabel extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_label_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(nullable = false)
    private String name;

    private void setProject(Project project){
        project.getProjectLabels().add(this);
        this.project = project;
    }
    public static ProjectLabel create(String name, Project project){
        ProjectLabel projectLabel = ProjectLabel.builder()
                .name(name)
                .build();
        projectLabel.setProject(project);
        return projectLabel;
    }
}