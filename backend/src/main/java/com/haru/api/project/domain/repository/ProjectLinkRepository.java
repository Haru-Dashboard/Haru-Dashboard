package com.haru.api.project.domain.repository;

import com.haru.api.project.domain.entity.Project;
import com.haru.api.project.domain.entity.ProjectLink;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectLinkRepository extends JpaRepository<ProjectLink, Long> {
    void deleteAllByProject(Project project);
}
