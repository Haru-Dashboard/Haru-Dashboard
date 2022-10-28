package com.haru.api.project.domain.repository;

import com.haru.api.project.domain.entity.Label;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabelRepository extends JpaRepository<Label, Long> {
}
