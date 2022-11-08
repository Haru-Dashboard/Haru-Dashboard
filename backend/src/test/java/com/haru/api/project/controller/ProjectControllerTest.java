package com.haru.api.project.controller;

import com.haru.api.MvcTest;
import com.haru.api.file.entity.S3File;
import com.haru.api.project.domain.entity.Project;
import com.haru.api.project.service.ProjectService;
import com.haru.api.user.domain.Role;
import com.haru.api.user.domain.SocialProvider;
import com.haru.api.user.domain.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@DisplayName("Project API 문서화")
@WebMvcTest(ProjectController.class)
public class ProjectControllerTest extends MvcTest {

    @MockBean
    private ProjectService projectService;
    private Project project1, project2, project3;
    private final List<Project> projectList = new ArrayList<>();

    @BeforeEach
    public void setUp() {
        User user = User.builder()
            .id(1L)
            .email("haru@gmail.com")
            .oauthId("111111")
            .name("김하루")
            .provider(SocialProvider.GOOGLE)
            .role(Role.USER)
            .build();

        MultipartFile file = new File("./../main/resources/dummy/image.png");
        S3File savedImage;
        if (!file.isEmpty()) {
            savedImage = fileRepository.save(S3File.create(s3Service.upload(file)));
            project.updateS3File(savedImage);

        project1 = Project.builder()
            .id(1L)
            .user(user)
            .file()
    }
}
