package com.haru.api.project.domain.repository;

import com.haru.api.project.domain.entity.Project;
import com.haru.api.project.domain.entity.ProjectLabel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectLabelRepository extends JpaRepository<ProjectLabel, Long> {
    void deleteAllByProject(Project project);
}
