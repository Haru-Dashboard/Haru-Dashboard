package com.haru.api.file.domain;

import com.haru.api.file.entity.S3File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface S3FileRepository extends JpaRepository<S3File, Long> {
}
