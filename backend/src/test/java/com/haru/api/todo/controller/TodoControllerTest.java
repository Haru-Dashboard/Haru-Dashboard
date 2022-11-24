package com.haru.api.todo.controller;

import com.haru.api.MvcTest;
import com.haru.api.category.domain.entity.Category;
import com.haru.api.todo.domain.entity.Todo;
import com.haru.api.todo.dto.TodoRequest;
import com.haru.api.todo.dto.TodoResponse;
import com.haru.api.todo.service.TodoService;
import com.haru.api.user.domain.Role;
import com.haru.api.user.domain.SocialProvider;
import com.haru.api.user.domain.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

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

@DisplayName("Todo API 문서화")
@WebMvcTest(TodoController.class)
public class TodoControllerTest extends MvcTest {

    @MockBean
    private TodoService todoService;
    private Todo todo1, todo2, todo3;
    private final List<Todo> todoList = new ArrayList<>();

    @BeforeEach
    public void setUp(){
        User user = User.builder()
                .id(1L)
                .email("haru@gmail.com")
                .oauthId("111111")
                .name("김하루")
                .provider(SocialProvider.GOOGLE)
                .role(Role.USER)
                .build();
        Category category1 = Category.builder()
                .id(1L)
                .name("CS")
                .build();
        Category category2 = Category.builder()
                .id(2L)
                .name("알고리즘")
                .build();
        todo1 = Todo.builder()
                .id(1L)
                .user(user)
                .category(category1)
                .title("운영체제 공부")
                .mon(true)
                .wed(true)
                .fri(true)
                .build();
        todo2 = Todo.builder()
                .id(2L)
                .user(user)
                .category(category2)
                .title("백준 풀기")
                .wed(true)
                .sat(true)
                .build();
        todo3 = Todo.builder()
                .id(3L)
                .user(user)
                .category(category2)
                .title("프로그래머스 풀기")
                .wed(true)
                .mon(true)
                .sun(true)
                .build();
        todoList.add(todo1);
        todoList.add(todo2);
        todoList.add(todo3);
    }

    @Test
    @DisplayName("Todo 목록 조회")
    public void getList() throws Exception{
        List<TodoResponse.GetOne> response = todoList.stream().map(TodoResponse.GetOne::toEntity).collect(Collectors.toList());
        given(todoService.getList(any(),any())).willReturn(response);

        ResultActions results = mvc.perform(get("/api/todos")
                .param("day", "wed")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("todos_list",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("day").description("요일")
                        ),
                        responseFields(
                                fieldWithPath("[].todoId").type(JsonFieldType.NUMBER).description("할일 식별자"),
                                fieldWithPath("[].category").type(JsonFieldType.STRING).description("카테고리 이름"),
                                fieldWithPath("[].title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("[].mon").type(JsonFieldType.BOOLEAN).description("월요일 설정 여부"),
                                fieldWithPath("[].tue").type(JsonFieldType.BOOLEAN).description("화요일 설정 여부"),
                                fieldWithPath("[].wed").type(JsonFieldType.BOOLEAN).description("수요일 설정 여부"),
                                fieldWithPath("[].thu").type(JsonFieldType.BOOLEAN).description("목요일 설정 여부"),
                                fieldWithPath("[].fri").type(JsonFieldType.BOOLEAN).description("금요일 설정 여부"),
                                fieldWithPath("[].sat").type(JsonFieldType.BOOLEAN).description("토요일 설정 여부"),
                                fieldWithPath("[].sun").type(JsonFieldType.BOOLEAN).description("일요일 설정 여부")

                        )
                        ));
        verify(todoService).getList(any(), any());
    }

    @Test
    @DisplayName("Todo 상세 조회")
    public void getOne() throws Exception{
        TodoResponse.GetOne response = TodoResponse.GetOne.toEntity(todo1);
        given(todoService.getOne(any(),any())).willReturn(response);

        ResultActions results = mvc.perform(get("/api/todos/{todoId}", 1L));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("todos_detail",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("todoId").description("할일 식별자")
                        ),
                        responseFields(
                                fieldWithPath("todoId").type(JsonFieldType.NUMBER).description("할일 식별자"),
                                fieldWithPath("category").type(JsonFieldType.STRING).description("카테고리 이름"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("mon").type(JsonFieldType.BOOLEAN).description("월요일 설정 여부"),
                                fieldWithPath("tue").type(JsonFieldType.BOOLEAN).description("화요일 설정 여부"),
                                fieldWithPath("wed").type(JsonFieldType.BOOLEAN).description("수요일 설정 여부"),
                                fieldWithPath("thu").type(JsonFieldType.BOOLEAN).description("목요일 설정 여부"),
                                fieldWithPath("fri").type(JsonFieldType.BOOLEAN).description("금요일 설정 여부"),
                                fieldWithPath("sat").type(JsonFieldType.BOOLEAN).description("토요일 설정 여부"),
                                fieldWithPath("sun").type(JsonFieldType.BOOLEAN).description("일요일 설정 여부")

                        )
                ));
        verify(todoService).getOne(any(), any());
    }

    @Test
    @DisplayName("Todo 생성")
    public void create() throws Exception{
        TodoRequest.Create request = TodoRequest.Create.builder()
                .category("알고리즘")
                .title("백준 풀기")
                .mon(false)
                .tue(false)
                .wed(true)
                .thu(false)
                .fri(false)
                .sat(true)
                .sun(false)
                .build();
        String content = objectMapper.writeValueAsString(request);
        TodoResponse.OnlyId response = TodoResponse.OnlyId.toEntity(todo2);
        given(todoService.create(any(),any())).willReturn(response);

        ResultActions results = mvc.perform(post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("todos_create",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("category").type(JsonFieldType.STRING).description("카테고리 이름"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("mon").type(JsonFieldType.BOOLEAN).description("월요일 설정 여부"),
                                fieldWithPath("tue").type(JsonFieldType.BOOLEAN).description("화요일 설정 여부"),
                                fieldWithPath("wed").type(JsonFieldType.BOOLEAN).description("수요일 설정 여부"),
                                fieldWithPath("thu").type(JsonFieldType.BOOLEAN).description("목요일 설정 여부"),
                                fieldWithPath("fri").type(JsonFieldType.BOOLEAN).description("금요일 설정 여부"),
                                fieldWithPath("sat").type(JsonFieldType.BOOLEAN).description("토요일 설정 여부"),
                                fieldWithPath("sun").type(JsonFieldType.BOOLEAN).description("일요일 설정 여부")
                        ),
                        responseFields(
                                fieldWithPath("todoId").type(JsonFieldType.NUMBER).description("할일 식별자")
                        )
                ));
        verify(todoService).create(any(), any());
    }

    @Test
    @DisplayName("Todo 수정")
    public void update() throws Exception{
        TodoRequest.Update request = TodoRequest.Update.builder()
                .category("알고리즘")
                .title("SWEA 풀기")
                .mon(false)
                .tue(false)
                .wed(true)
                .thu(false)
                .fri(false)
                .sat(true)
                .sun(false)
                .build();
        String content = objectMapper.writeValueAsString(request);
        TodoResponse.OnlyId response = TodoResponse.OnlyId.toEntity(todo2);
        given(todoService.update(any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(patch("/api/todos/{todoId}", 2L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("todos_update",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("todoId").description("할일 식별자")
                        ),
                        requestFields(
                                fieldWithPath("category").type(JsonFieldType.STRING).description("카테고리 이름"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("mon").type(JsonFieldType.BOOLEAN).description("월요일 설정 여부"),
                                fieldWithPath("tue").type(JsonFieldType.BOOLEAN).description("화요일 설정 여부"),
                                fieldWithPath("wed").type(JsonFieldType.BOOLEAN).description("수요일 설정 여부"),
                                fieldWithPath("thu").type(JsonFieldType.BOOLEAN).description("목요일 설정 여부"),
                                fieldWithPath("fri").type(JsonFieldType.BOOLEAN).description("금요일 설정 여부"),
                                fieldWithPath("sat").type(JsonFieldType.BOOLEAN).description("토요일 설정 여부"),
                                fieldWithPath("sun").type(JsonFieldType.BOOLEAN).description("일요일 설정 여부")
                        ),
                        responseFields(
                                fieldWithPath("todoId").type(JsonFieldType.NUMBER).description("할일 식별자")
                        )
                ));
        verify(todoService).update(any(), any(), any());
    }

    @Test
    @DisplayName("Todo 삭제")
    public void delete() throws Exception{
        TodoResponse.OnlyId response = TodoResponse.OnlyId.toEntity(todo1);
        given(todoService.delete(any(),any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.delete("/api/todos/{todoId}", 1L));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("todos_delete",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("todoId").description("할일 식별자")
                        ),
                        responseFields(
                                fieldWithPath("todoId").type(JsonFieldType.NUMBER).description("할일 식별자")
                        )
                ));
        verify(todoService).delete(any(), any());
    }


}
