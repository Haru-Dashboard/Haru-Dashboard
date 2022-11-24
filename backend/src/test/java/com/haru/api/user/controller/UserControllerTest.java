package com.haru.api.user.controller;

import com.haru.api.MvcTest;
import com.haru.api.user.domain.Role;
import com.haru.api.user.domain.SocialProvider;
import com.haru.api.user.domain.entity.User;
import com.haru.api.user.dto.UserResponse;
import com.haru.api.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("User API 문서화")
@WebMvcTest(UserController.class)
public class UserControllerTest extends MvcTest {

    @MockBean
    private UserService userService;
    private User user;


    @BeforeEach
    public void setup(){
        user = User.builder()
                .id(1L)
                .email("haru@gmail.com")
                .oauthId("111111")
                .name("김하루")
                .provider(SocialProvider.GOOGLE)
                .role(Role.USER)
                .build();
    }

    @Test
    @DisplayName("유저 정보 조회")
    public void getUserInfo() throws Exception{
        UserResponse.UserInfo response = UserResponse.UserInfo.toEntity(user);
        given(userService.getUserInfo(any())).willReturn(response);

        ResultActions results = mvc.perform(get("/api/users"));

        results.andExpect(status().isOk())
                .andDo(document("users_info",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("이름")
                        )
                ));
        verify(userService).getUserInfo(any());
    }

    @Test
    @DisplayName("유저 로그아웃")
    public void logout() throws Exception{
        UserResponse.OnlyId response = UserResponse.OnlyId.toEntity(user);
        given(userService.logout(any())).willReturn(response);

        ResultActions results = mvc.perform(get("/api/users/logout"));

        results.andExpect(status().isOk())
                .andDo(document("user_logout",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("유저 식별자")
                        )
                ));
        verify(userService).logout(any());
    }
}
