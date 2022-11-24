package com.haru.api.project.service;

import com.haru.api.common.exception.PermissionException;
import com.haru.api.file.domain.S3FileRepository;
import com.haru.api.file.dto.S3FileResponse;
import com.haru.api.file.entity.S3File;
import com.haru.api.file.service.S3Service;
import com.haru.api.project.domain.entity.Project;
import com.haru.api.project.domain.entity.ProjectLabel;
import com.haru.api.project.domain.entity.ProjectLink;
import com.haru.api.project.domain.repository.ProjectLabelRepository;
import com.haru.api.project.domain.repository.ProjectLinkRepository;
import com.haru.api.project.domain.repository.ProjectRepository;
import com.haru.api.project.dto.ProjectLinkRequest;
import com.haru.api.project.dto.ProjectRequest;
import com.haru.api.project.dto.ProjectResponse;
import com.haru.api.project.exception.ProjectLimitException;
import com.haru.api.project.exception.ProjectNotFoundException;
import com.haru.api.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectLinkRepository projectLinkRepository;
    private final ProjectLabelRepository projectLabelRepository;
    private final S3FileRepository fileRepository;
    private final S3Service s3Service;
    private static final int MAX_USER_PROJECT_NUM = 15;

    @Transactional
    public ProjectResponse.OnlyId create(ProjectRequest.CreateOrUpdate request, MultipartFile file, User user) {
        if (projectRepository.countByUser(user) >= MAX_USER_PROJECT_NUM) throw new ProjectLimitException();
        Project project = Project.create(request, user);
        if (!request.getLinks().isEmpty()) {
            List<ProjectLinkRequest.Create> links = request.getLinks();
            List<ProjectLink> projectLinks = links.stream().map(link -> ProjectLink.create(link, project)).collect(Collectors.toList());
            projectLinkRepository.saveAll(projectLinks);
        }
        if (!request.getLabels().isEmpty()) {
            List<String> labels = request.getLabels();
            List<ProjectLabel> projectLabels = labels.stream().map(label -> ProjectLabel.create(label, project)).collect(Collectors.toList());
            projectLabelRepository.saveAll(projectLabels);
        }
        S3File savedImage;
        if (!file.isEmpty()) {
            savedImage = fileRepository.save(S3File.create(s3Service.upload(file)));
            project.updateS3File(savedImage);
        }
        Project savedProject = projectRepository.save(project);
        return ProjectResponse.OnlyId.toEntity(savedProject);
    }

    public ProjectResponse.GetProject getProject(Long projectId, User user) {
        Project project = projectRepository.findById(projectId).orElseThrow(ProjectNotFoundException::new);
        if (!Objects.equals(user.getId(), project.getUser().getId())) throw new PermissionException();
        return ProjectResponse.GetProject.toEntity(project);
    }

    public List<ProjectResponse.GetProject> getProjectList(Pageable pageable, User user) {
        List<Project> projects = projectRepository.findAllByUserOrderByCreatedAtDesc(pageable, user);
        return projects.stream().map(ProjectResponse.GetProject::toEntity).collect(Collectors.toList());
    }

    @Transactional
    public ProjectResponse.OnlyId update(Long projectId, ProjectRequest.CreateOrUpdate request, MultipartFile file, User user) {
        Project project = projectRepository.findById(projectId).orElseThrow(ProjectNotFoundException::new);
        if (!Objects.equals(user.getId(), project.getUser().getId())) throw new PermissionException();
        if (!request.getLinks().isEmpty()) {
            projectLinkRepository.deleteAllByProject(project);
            List<ProjectLinkRequest.Create> links = request.getLinks();
            List<ProjectLink> projectLinks = links.stream().map(link -> ProjectLink.create(link, project)).collect(Collectors.toList());
            projectLinkRepository.saveAll(projectLinks);
        }
        if (!request.getLabels().isEmpty()) {
            projectLabelRepository.deleteAllByProject(project);
            List<String> labels = request.getLabels();
            List<ProjectLabel> projectLabels = labels.stream().map(label -> ProjectLabel.create(label, project)).collect(Collectors.toList());
            projectLabelRepository.saveAll(projectLabels);
        }
        S3File savedImage;
        if (!file.isEmpty()) {
            savedImage = fileRepository.save(S3File.create(s3Service.upload(file)));
            project.updateS3File(savedImage);
        }
        project.update(request);
        return ProjectResponse.OnlyId.toEntity(project);
    }

    @Transactional
    public ProjectResponse.OnlyId delete(Long projectId, User user) {
        Project project = projectRepository.findById(projectId).orElseThrow(ProjectNotFoundException::new);
        if (!Objects.equals(user.getId(), project.getUser().getId())) throw new PermissionException();
        projectRepository.delete(project);
        return ProjectResponse.OnlyId.toEntity(project);
    }
}
