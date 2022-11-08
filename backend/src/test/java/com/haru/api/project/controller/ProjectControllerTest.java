package com.haru.api.project.controller;

import com.haru.api.MvcTest;
import com.haru.api.file.dto.S3FileResponse;
import com.haru.api.file.entity.S3File;
import com.haru.api.project.domain.entity.Project;
import com.haru.api.project.domain.entity.ProjectLabel;
import com.haru.api.project.domain.entity.ProjectLink;
import com.haru.api.project.dto.ProjectLinkRequest;
import com.haru.api.project.dto.ProjectRequest;
import com.haru.api.project.dto.ProjectResponse;
import com.haru.api.project.service.ProjectService;
import com.haru.api.user.domain.Role;
import com.haru.api.user.domain.SocialProvider;
import com.haru.api.user.domain.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Project API 문서화")
@WebMvcTest(ProjectController.class)
public class ProjectControllerTest extends MvcTest {

    @MockBean
    private ProjectService projectService;
    private Project project1, project2, project3;
    private final List<Project> projectList = new ArrayList<>();
    private ProjectLabel projectLabel1, projectLabel2, projectLabel3;
    private ProjectLink projectLink1, projectLink2, projectLink3;

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
        ProjectRequest.CreateOrUpdate request = ProjectRequest.CreateOrUpdate.builder()
            .title("테스트프로젝트")
            .content("테스트용입니다.")
            .startDate(LocalDate.now().minusDays(10L))
            .endDate(LocalDate.now().plusDays(10L))
            .build();
        S3File savedImage = S3File.builder()
            .id(1L)
            .name("f621a6be-b743-4d17-90ea-5906f678c36c.png")
            .originName("image.png")
            .extension("png")
            .url("https://s3.ap-northeast-2.amazonaws.com/haru.s3.file/f621a6be-b743-4d17-90ea-5906f678c36c.png")
            .build();
        project1 = Project.create(request,user);
        project1.updateS3File(savedImage);
        projectLabel1 = ProjectLabel.create("프로젝트", project1);
        projectLabel2 = ProjectLabel.create("BE", project1);
        projectLink1 = ProjectLink.create(ProjectLinkRequest.Create.builder().name("github").url("https://github.com/Haru-Dashboard").build(), project1);
        projectLink2 = ProjectLink.create(ProjectLinkRequest.Create.builder().name("jira").url("https://www.atlassian.com/software/jira").build(), project1);

        projectList.add(project1);
    }

    @Test
    @DisplayName("프로젝트 목록 조회")
    public void getList() throws Exception{
        List<ProjectResponse.GetProject> response = projectList.stream().map(project -> ProjectResponse.GetProject.build(project, S3FileResponse.GetImage.build(project.getFile(), project.getFile().getUrl()))).collect(Collectors.toList());
        given(projectService.getProjectList(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(get("/api/projects")
                .param("page", "1")
                .param("size", "3"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("project_list",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("1"),
                                parameterWithName("size").description("3")
                        ),
                        responseFields(
                                fieldWithPath("[].projectId").type(JsonFieldType.NUMBER).description("프로젝트 식별자"),
                                fieldWithPath("[].title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("[].content").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("[].startDate").type(JsonFieldType.STRING).description("시작 일자"),
                                fieldWithPath("[].endDate").type(JsonFieldType.STRING).description("종료 일자"),
                                fieldWithPath("[].projectLinks").type(JsonFieldType.ARRAY).description("링크 배열"),
                                fieldWithPath("[].projectLabels").type(JsonFieldType.ARRAY).description("라벨 배열"),
                                fieldWithPath("[].imageInfo").type(JsonFieldType.OBJECT).description("이미지 정보")
                        )
                        ));
    }
}
