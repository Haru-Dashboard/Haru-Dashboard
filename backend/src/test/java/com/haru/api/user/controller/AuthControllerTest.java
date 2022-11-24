package com.haru.api.user.controller;

import com.haru.api.MvcTest;
import com.haru.api.user.domain.Role;
import com.haru.api.user.domain.SocialProvider;
import com.haru.api.user.domain.entity.User;
import com.haru.api.user.dto.AuthRequest;
import com.haru.api.user.dto.AuthResponse;
import com.haru.api.user.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Auth API 문서화")
@WebMvcTest(AuthController.class)
public class AuthControllerTest extends MvcTest {

    @MockBean
    private AuthService authService;
    private User user;
    private String accessToken;


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
        accessToken = "accessToken";

    }

    @Test
    @DisplayName("토큰 재발급")
    public void refresh() throws Exception{
        AuthRequest.Token request = AuthRequest.Token.builder()
                .accessToken("accessToken")
                .refreshToken("refreshToken")
                .build();
        String content = objectMapper.writeValueAsString(request);
        AuthResponse.Token response = AuthResponse.Token.toEntity(accessToken);
        given(authService.refreshToken(any())).willReturn(response);

        ResultActions results = mvc.perform(post("/api/auth/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("token_refresh",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("accessToken").type(JsonFieldType.STRING).description("access-Token"),
                                fieldWithPath("refreshToken").type(JsonFieldType.STRING).description("refresh-Token")
                         ),
                        responseFields(
                                fieldWithPath("accessToken").type(JsonFieldType.STRING).description("access-Token")
                        )
                ));
        verify(authService).refreshToken(any());
    }
}
