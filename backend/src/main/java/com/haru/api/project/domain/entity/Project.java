package com.haru.api.project.domain.entity;

import com.haru.api.common.entity.BaseEntity;
import com.haru.api.file.entity.S3File;
import com.haru.api.project.dto.ProjectRequest;
import com.haru.api.user.domain.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "project")
public class Project extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")
    private S3File file;

    @Column(nullable = false)
    private String title;

    @Column
    private String content;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @Builder.Default
    private List<ProjectLabel> projectLabels = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @Builder.Default
    private List<ProjectLink> projectLinks = new ArrayList<>();

    public static Project create(ProjectRequest.CreateOrUpdate request, User user) {
        return Project.builder()
                .user(user)
                .title(request.getTitle())
                .content(request.getContent())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();
    }

    public void update(ProjectRequest.CreateOrUpdate request) {
        this.title = request.getTitle();
        this.content = request.getContent();
        this.startDate = request.getStartDate();
        this.endDate = request.getEndDate();
    }

    public void updateS3File(S3File file) {
        this.file = file;
    }

    public void updateLabels(List<ProjectLabel> labels) {
        this.projectLabels = labels;
    }

    public void updateLinks(List<ProjectLink> links) {
        this.projectLinks = links;
    }
}
