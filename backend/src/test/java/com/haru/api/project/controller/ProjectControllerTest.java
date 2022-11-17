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
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.fileUpload;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Project API 문서화")
@WebMvcTest(ProjectController.class)
public class ProjectControllerTest extends MvcTest {

    @MockBean
    private ProjectService projectService;
    private Project project1, project2, project3;
    private final List<Project> projectList = new ArrayList<>();
    private ProjectLabel projectLabel1, projectLabel2, projectLabel3, projectLabel4, projectLabel5, projectLabel6;
    private final List<ProjectLabel> projectLabelList1 = new ArrayList<>();
    private final List<ProjectLabel> projectLabelList2 = new ArrayList<>();
    private final List<ProjectLabel> projectLabelList3 = new ArrayList<>();
    private ProjectLink projectLink1, projectLink2, projectLink3, projectLink4, projectLink5, projectLink6;
    private final List<ProjectLink> projectLinkList1 = new ArrayList<>();
    private final List<ProjectLink> projectLinkList2 = new ArrayList<>();
    private final List<ProjectLink> projectLinkList3 = new ArrayList<>();

    private S3File projectImage1, projectImage2, projectImage3;

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
        projectImage1 = S3File.builder()
            .id(1L)
            .name("f621a6be-b743-4d17-90ea-5906f678c36c.png")
            .originName("image.png")
            .extension("png")
            .url("https://s3.ap-northeast-2.amazonaws.com/haru.s3.file/f621a6be-b743-4d17-90ea-5906f678c36c.png")
            .build();
        projectImage2 = S3File.builder()
            .id(2L)
            .name("f621a6be-b743-4d17-90ea-5906f678c36c.png")
            .originName("image.png")
            .extension("png")
            .url("https://s3.ap-northeast-2.amazonaws.com/haru.s3.file/f621a6be-b743-4d17-90ea-5906f678c36c.png")
            .build();
        projectImage3 = S3File.builder()
            .id(3L)
            .name("f621a6be-b743-4d17-90ea-5906f678c36c.png")
            .originName("image.png")
            .extension("png")
            .url("https://s3.ap-northeast-2.amazonaws.com/haru.s3.file/f621a6be-b743-4d17-90ea-5906f678c36c.png")
            .build();
        projectLabel1 = ProjectLabel.builder()
            .id(1L)
            .project(project1)
            .name("프로젝트")
            .build();
        projectLabel2 = ProjectLabel.builder()
            .id(2L)
            .project(project1)
            .name("BE")
            .build();
        projectLabel3 = ProjectLabel.builder()
            .id(3L)
            .project(project2)
            .name("토이프로젝트")
            .build();
        projectLabel4 = ProjectLabel.builder()
            .id(4L)
            .project(project2)
            .name("FE")
            .build();
        projectLabel5 = ProjectLabel.builder()
            .id(5L)
            .project(project3)
            .name("사이드프로젝트")
            .build();
        projectLabel6 = ProjectLabel.builder()
            .id(6L)
            .project(project3)
            .name("DevOps")
            .build();
        projectLink1 = ProjectLink.builder()
            .id(1L)
            .project(project1)
            .name("github")
            .link("https://github.com/Haru-Dashboard")
            .build();
        projectLink2 = ProjectLink.builder()
            .id(2L)
            .project(project1)
            .name("jira")
            .link("https://jira.com")
            .build();
        projectLink3 = ProjectLink.builder()
            .id(3L)
            .project(project2)
            .name("mattermost")
            .link("https://mattermost.com")
            .build();
        projectLink4 = ProjectLink.builder()
            .id(4L)
            .project(project2)
            .name("Haru")
            .link("https://haru-dashboard.com")
            .build();
        projectLink5 = ProjectLink.builder()
            .id(5L)
            .project(project3)
            .name("UCC")
            .link("https://youtube.com")
            .build();
        projectLink6 = ProjectLink.builder()
            .id(6L)
            .project(project3)
            .name("docs")
            .link("https://haru-dashboard/docs")
            .build();
        project1 = Project.builder()
            .id(1L)
            .user(user)
            .file(projectImage1)
            .title("테스트프로젝트")
            .content("테스트용입니다.")
            .startDate(LocalDate.now().minusDays(10L))
            .endDate(LocalDate.now().plusDays(10L))
            .projectLabels(projectLabelList1)
            .projectLinks(projectLinkList1)
            .build();
        project2 = Project.builder()
            .id(2L)
            .user(user)
            .file(projectImage2)
            .title("Haru Dashboard")
            .content("개발자들을 위한 크롬 확장 프로그램")
            .startDate(LocalDate.now().minusDays(20L))
            .endDate(LocalDate.now().plusDays(7L))
            .projectLabels(projectLabelList2)
            .projectLinks(projectLinkList2)
            .build();
        project3 = Project.builder()
            .id(3L)
            .user(user)
            .file(projectImage3)
            .title("특화 프로젝트")
            .content("빅데이터 분산처리 - 하둡을 이용한 유저 로그 분산처리")
            .startDate(LocalDate.now().minusDays(30L))
            .endDate(LocalDate.now())
            .projectLabels(projectLabelList3)
            .projectLinks(projectLinkList3)
            .build();

        projectLabelList1.add(projectLabel1);
        projectLabelList1.add(projectLabel2);
        projectLabelList2.add(projectLabel3);
        projectLabelList2.add(projectLabel4);
        projectLabelList3.add(projectLabel5);
        projectLabelList3.add(projectLabel6);
        projectLinkList1.add(projectLink1);
        projectLinkList1.add(projectLink2);
        projectLinkList2.add(projectLink3);
        projectLinkList2.add(projectLink4);
        projectLinkList3.add(projectLink5);
        projectLinkList3.add(projectLink6);

        projectList.add(project1);
        projectList.add(project2);
        projectList.add(project3);
    }

    @Test
    @DisplayName("Project 목록 조회")
    public void getList() throws Exception{
        List<ProjectResponse.GetProject> response = projectList.stream().map(ProjectResponse.GetProject::toEntity).collect(Collectors.toList());
        given(projectService.getProjectList(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(get("/api/projects")
                .param("page", "1")
                .param("size", "3"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("projects_list",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("1"),
                                parameterWithName("size").description("3")
                        ),
                        responseFields(
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("프로젝트 식별자"),
                                fieldWithPath("[].title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("[].content").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("[].startDate").type(JsonFieldType.STRING).description("시작일"),
                                fieldWithPath("[].endDate").type(JsonFieldType.STRING).description("종료일"),
                                fieldWithPath("[].projectLinks[].id").type(JsonFieldType.NUMBER).description("프로젝트 링크 식별자"),
                                fieldWithPath("[].projectLinks[].name").type(JsonFieldType.STRING).description("링크 이름"),
                                fieldWithPath("[].projectLinks[].url").type(JsonFieldType.STRING).description("링크 주소"),
                                fieldWithPath("[].projectLabels[].id").type(JsonFieldType.NUMBER).description("프로젝트 라벨 식별자"),
                                fieldWithPath("[].projectLabels[].name").type(JsonFieldType.STRING).description("라벨 이름"),
                                fieldWithPath("[].imageInfo.id").type(JsonFieldType.NUMBER).description("이미지 식별자"),
                                fieldWithPath("[].imageInfo.originName").type(JsonFieldType.STRING).description("원본파일명"),
                                fieldWithPath("[].imageInfo.name").type(JsonFieldType.STRING).description("파일명"),
                                fieldWithPath("[].imageInfo.extension").type(JsonFieldType.STRING).description("파일 확장자"),
                                fieldWithPath("[].imageInfo.imageUrl").type(JsonFieldType.STRING).description("파일 링크")
                        )
                        ));
        verify(projectService).getProjectList(any(), any());
    }

    @Test
    @DisplayName("Project 상세 조회")
    public void getProject() throws Exception {
        ProjectResponse.GetProject response = ProjectResponse.GetProject.toEntity(project1);
        given(projectService.getProject(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(get("/api/projects/{projectId}", 1L));

        results.andExpect(status().isOk())
            .andDo(print())
            .andDo(document("projects_detail",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                pathParameters(
                    parameterWithName("projectId").description("프로젝트 식별자")
                ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("프로젝트 식별자"),
                    fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
                    fieldWithPath("startDate").type(JsonFieldType.STRING).description("시작일"),
                    fieldWithPath("endDate").type(JsonFieldType.STRING).description("종료일"),
                    fieldWithPath("projectLinks[].id").type(JsonFieldType.NUMBER).description("프로젝트 링크 식별자"),
                    fieldWithPath("projectLinks[].name").type(JsonFieldType.STRING).description("링크 이름"),
                    fieldWithPath("projectLinks[].url").type(JsonFieldType.STRING).description("링크 주소"),
                    fieldWithPath("projectLabels[].id").type(JsonFieldType.NUMBER).description("프로젝트 라벨 식별자"),
                    fieldWithPath("projectLabels[].name").type(JsonFieldType.STRING).description("라벨 이름"),
                    fieldWithPath("imageInfo.id").type(JsonFieldType.NUMBER).description("이미지 식별자"),
                    fieldWithPath("imageInfo.originName").type(JsonFieldType.STRING).description("원본파일명"),
                    fieldWithPath("imageInfo.name").type(JsonFieldType.STRING).description("파일명"),
                    fieldWithPath("imageInfo.extension").type(JsonFieldType.STRING).description("파일 확장자"),
                    fieldWithPath("imageInfo.imageUrl").type(JsonFieldType.STRING).description("파일 링크")
                )
            ));
        verify(projectService).getProject(any(), any());
    }

    @Test
    @DisplayName("Project 생성")
    public void create() throws Exception {
        List<String> projectLabels = new ArrayList<>();
        projectLabels.add(projectLabel1.getName());
        projectLabels.add(projectLabel2.getName());
        List<ProjectLinkRequest.Create> projectLinkCreateList = new ArrayList<>();
        ProjectLinkRequest.Create projectLinkCreate1, projectLinkCreate2;
        projectLinkCreate1 = ProjectLinkRequest.Create.builder()
                .name("github")
                .url("https://www.github.com")
                .build();
        projectLinkCreate2 = ProjectLinkRequest.Create.builder()
                .name("jira")
                .url("https://www.jira.com")
                .build();
        projectLinkCreateList.add(projectLinkCreate1);
        projectLinkCreateList.add(projectLinkCreate2);
        ProjectRequest.CreateOrUpdate request = ProjectRequest.CreateOrUpdate.builder()
            .title("PetClinic")
            .content("first Spring project")
            .startDate(LocalDate.now().plusDays(10L))
            .endDate(LocalDate.now().plusDays(40L))
            .labels(projectLabels)
            .links(projectLinkCreateList)
            .build();

        ProjectResponse.OnlyId response = ProjectResponse.OnlyId.toEntity(project1);

        String jsonRequest = objectMapper.writeValueAsString(request);
        MockMultipartFile form = new MockMultipartFile("form", "form", "application/json", jsonRequest.getBytes(StandardCharsets.UTF_8));
        InputStream inputStream = new ClassPathResource("dummy/image.png").getInputStream();
        MockMultipartFile file = new MockMultipartFile("file", "image.png", "image/png", InputStream.nullInputStream());

        given(projectService.create(any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(multipart("/api/projects")
            .file(form)
            .file(file)
            .contentType(MediaType.MULTIPART_MIXED)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
            .andDo(print())
            .andDo(document("projects_create",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestParts(
                    partWithName("form").description("프로젝트 생성 정보 - JSON"),
                    partWithName("file").description("이미지 파일")
               ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("프로젝트 식별자")
                )
            ));
        verify(projectService).create(any(ProjectRequest.CreateOrUpdate.class), any(MultipartFile.class), any(User.class));
    }

    @Test
    @DisplayName("Project 수정")
    public void update() throws Exception {
        List<String> projectLabels = new ArrayList<>();
        projectLabels.add(projectLabel1.getName());
        projectLabels.add(projectLabel2.getName());
        List<ProjectLinkRequest.Create> projectLinkCreateList = new ArrayList<>();
        ProjectLinkRequest.Create projectLinkCreate1, projectLinkCreate2;
        projectLinkCreate1 = ProjectLinkRequest.Create.builder()
            .name("github")
            .url("https://www.github.com/testing")
            .build();
        projectLinkCreate2 = ProjectLinkRequest.Create.builder()
            .name("mattermost")
            .url("https://www.mattermost.com/update")
            .build();
        projectLinkCreateList.add(projectLinkCreate1);
        projectLinkCreateList.add(projectLinkCreate2);
        ProjectRequest.CreateOrUpdate request = ProjectRequest.CreateOrUpdate.builder()
            .title("petDoctor")
            .content("update project")
            .startDate(LocalDate.now().plusDays(5L))
            .endDate(LocalDate.now().plusDays(20L))
            .labels(projectLabels)
            .links(projectLinkCreateList)
            .build();

        ProjectResponse.OnlyId response = ProjectResponse.OnlyId.toEntity(project1);

        String jsonRequest = objectMapper.writeValueAsString(request);
        MockMultipartFile form = new MockMultipartFile("form", "form", "application/json", jsonRequest.getBytes(StandardCharsets.UTF_8));
        InputStream inputStream = new ClassPathResource("dummy/image.png").getInputStream();
        MockMultipartFile file = new MockMultipartFile("file", "image.png", "image/png", InputStream.nullInputStream());

        given(projectService.update(any(), any(), any(), any())).willReturn(response);

        MockMultipartHttpServletRequestBuilder builder = fileUpload("/api/projects/{projectId}", 1L);

        ResultActions results = mvc.perform(builder
            .file(form)
            .file(file)
            .contentType(MediaType.MULTIPART_MIXED)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
            .andDo(print())
            .andDo(document("projects_update",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                pathParameters(
                        parameterWithName("projectId").description("프로젝트 식별자")
                ),
                requestParts(
                    partWithName("form").description("프로젝트 생성 정보 - JSON"),
                    partWithName("file").description("이미지 파일")
                ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("프로젝트 식별자")
                )
            ));
        verify(projectService).update(any(), any(), any(), any());
    }

    @Test
    @DisplayName("project 삭제")
    public void delete() throws Exception {
        ProjectResponse.OnlyId response = ProjectResponse.OnlyId.toEntity(project1);
        given(projectService.delete(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.delete("/api/projects/{projectId}", 1L));

        results.andExpect(status().isOk())
            .andDo(print())
            .andDo(document("projects_delete",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                pathParameters(
                    parameterWithName("projectId").description("프로젝트 식별자")
                ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("프로젝트 식별자")
                )
            ));
        verify(projectService).delete(any(), any());
    }
}
