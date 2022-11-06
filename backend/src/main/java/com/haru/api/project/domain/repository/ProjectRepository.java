package com.haru.api.project.domain.repository;

import com.haru.api.project.domain.entity.Project;
import com.haru.api.user.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByUser(User user);
}
