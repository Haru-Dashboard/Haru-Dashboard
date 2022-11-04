package com.haru.api.schedule.controller;

import com.haru.api.MvcTest;
import com.haru.api.schedule.domain.entity.Schedule;
import com.haru.api.schedule.dto.ScheduleRequest;
import com.haru.api.schedule.dto.ScheduleResponse;
import com.haru.api.schedule.service.ScheduleService;
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

import java.time.LocalDateTime;
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

@DisplayName("Schedule API 문서화")
@WebMvcTest(ScheduleController.class)
public class ScheduleControllerTest extends MvcTest {

    @MockBean
    private ScheduleService scheduleService;
    private Schedule schedule1, schedule2, schedule3;
    private final List<Schedule> scheduleList = new ArrayList<>();

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
        schedule1 = Schedule.builder()
                .id(1L)
                .user(user)
                .title("회의")
                .content("프로젝트 중간 점검")
                .startDate(LocalDateTime.of(2022, 11, 5, 9, 0, 0))
                .endDate(LocalDateTime.of(2022, 11, 5, 11, 0, 0))
                .color(0)
                .build();
        schedule2 = Schedule.builder()
                .id(2L)
                .user(user)
                .title("휴가")
                .content("제주도 여행")
                .startDate(LocalDateTime.of(2022, 11, 25, 9, 0, 0))
                .endDate(LocalDateTime.of(2022, 12, 1, 18, 0, 0))
                .color(1)
                .build();
        schedule3 = Schedule.builder()
                .id(3L)
                .user(user)
                .title("저녁 약속")
                .content("친구들과 저녁")
                .startDate(LocalDateTime.of(2022, 10, 31, 18, 0, 0))
                .endDate(LocalDateTime.of(2022, 10, 31, 20, 0, 0))
                .color(2)
                .build();
        scheduleList.add(schedule1);
        scheduleList.add(schedule2);
        scheduleList.add(schedule3);

    }

    @Test
    @DisplayName("Schedule 목록 조회")
    public void getScheduleList() throws Exception{
        List<ScheduleResponse.GetSchedule> response = scheduleList.stream().map(ScheduleResponse.GetSchedule::toEntity).collect(Collectors.toList());
        given(scheduleService.getScheduleList(any(),any(), any())).willReturn(response);

        ResultActions results = mvc.perform(get("/api/schedules")
                .param("year", "2022")
                .param("month", "11")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("schedules_list",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("year").description("년"),
                                parameterWithName("month").description("월")
                        ),
                        responseFields(
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("일정 식별자"),
                                fieldWithPath("[].title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("[].content").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("[].startDate").type(JsonFieldType.STRING).description("일정 시작 날짜"),
                                fieldWithPath("[].endDate").type(JsonFieldType.STRING).description("일정 종료 날짜"),
                                fieldWithPath("[].color").type(JsonFieldType.NUMBER).description("색상 번호")
                        )
                ));
        verify(scheduleService).getScheduleList(any(), any(), any());
    }

    @Test
    @DisplayName("Schedule 상세 조회")
    public void getSchedule() throws Exception{
        ScheduleResponse.GetSchedule response = ScheduleResponse.GetSchedule.toEntity(schedule1);
        given(scheduleService.getSchedule(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(get("/api/schedules/{scheduleId}", 1L));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("schedules_detail",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("scheduleId").description("일정 식별자")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("일정 식별자"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("startDate").type(JsonFieldType.STRING).description("일정 시작 날짜"),
                                fieldWithPath("endDate").type(JsonFieldType.STRING).description("일정 종료 날짜"),
                                fieldWithPath("color").type(JsonFieldType.NUMBER).description("색상 번호")
                        )
                ));
        verify(scheduleService).getSchedule(any(), any());
    }

    @Test
    @DisplayName("Schedule 생성")
    public void create() throws Exception{
        ScheduleRequest.CreateOrUpdate request = ScheduleRequest.CreateOrUpdate.builder()
                .title("회의")
                .content("프로젝트 중간 점검")
                .startDate(LocalDateTime.of(2022, 11, 5, 9, 0, 0))
                .endDate(LocalDateTime.of(2022, 11, 5, 11, 0, 0))
                .color(0)
                .build();
        String content = objectMapper.writeValueAsString(request);
        ScheduleResponse.OnlyId response = ScheduleResponse.OnlyId.toEntity(schedule1);
        given(scheduleService.create(any(),any())).willReturn(response);

        ResultActions results = mvc.perform(post("/api/schedules")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("schedules_create",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("startDate").type(JsonFieldType.STRING).description("일정 시작 날짜"),
                                fieldWithPath("endDate").type(JsonFieldType.STRING).description("일정 종료 날짜"),
                                fieldWithPath("color").type(JsonFieldType.NUMBER).description("색상 번호")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("일정 식별자")
                        )
                ));
        verify(scheduleService).create(any(), any());
    }

    @Test
    @DisplayName("Schedule 수정")
    public void update() throws Exception{
        ScheduleRequest.CreateOrUpdate request = ScheduleRequest.CreateOrUpdate.builder()
                .title("회의")
                .content("프로젝트 최종 점검")
                .startDate(LocalDateTime.of(2022, 12, 1, 9, 0, 0))
                .endDate(LocalDateTime.of(2022, 12, 1, 11, 0, 0))
                .color(4)
                .build();
        String content = objectMapper.writeValueAsString(request);
        ScheduleResponse.OnlyId response = ScheduleResponse.OnlyId.toEntity(schedule1);
        given(scheduleService.update(any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(patch("/api/schedules/{scheduleId}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("schedules_update",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("scheduleId").description("일정 식별자")
                        ),
                        requestFields(
                                fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("startDate").type(JsonFieldType.STRING).description("일정 시작 날짜"),
                                fieldWithPath("endDate").type(JsonFieldType.STRING).description("일정 종료 날짜"),
                                fieldWithPath("color").type(JsonFieldType.NUMBER).description("색상 번호")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("일정 식별자")
                        )
                ));
        verify(scheduleService).update(any(), any(), any());
    }

    @Test
    @DisplayName("schedule 삭제")
    public void delete() throws Exception{
        ScheduleResponse.OnlyId response = ScheduleResponse.OnlyId.toEntity(schedule1);
        given(scheduleService.delete(any(),any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.delete("/api/schedules/{scheduleId}", 1L));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("schedules_delete",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("scheduleId").description("일정 식별자")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("일정 식별자")
                        )
                ));
        verify(scheduleService).delete(any(), any());
    }


}
