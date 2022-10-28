package com.haru.api.project.service;

import com.haru.api.file.domain.S3FileRepository;
import com.haru.api.file.service.S3Service;
import com.haru.api.project.domain.repository.LabelRepository;
import com.haru.api.project.domain.repository.ProjectLabelRepository;
import com.haru.api.project.domain.repository.ProjectLinkRepository;
import com.haru.api.project.domain.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectLinkRepository projectLinkRepository;
    private final ProjectLabelRepository projectLabelRepository;
    private final LabelRepository labelRepository;
    private final S3FileRepository fileRepository;
    private final S3Service s3Service;

}
