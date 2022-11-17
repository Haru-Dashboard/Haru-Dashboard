package com.haru.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.haru.api.config.WebMvcConfig;
import com.haru.api.user.domain.repository.UserRepository;
import com.haru.api.user.security.oauth2.CookieAuthorizationRequestRepository;
import com.haru.api.user.security.oauth2.CustomOAuth2UserService;
import com.haru.api.user.security.oauth2.handler.OAuth2AuthenticationFailureHandler;
import com.haru.api.user.security.oauth2.handler.OAuth2AuthenticationSuccessHandler;
import com.haru.api.user.security.token.JwtAccessDeniedHandler;
import com.haru.api.user.security.token.JwtAuthenticationEntryPoint;
import com.haru.api.user.security.token.JwtTokenProvider;
import com.haru.api.user.security.userdetails.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs
@Import({
        WebMvcConfig.class,
        JwtTokenProvider.class,
        RestDocsConfig.class,
})
@WithMockCustomUser
public abstract class MvcTest {
    @Autowired
    protected MockMvc mvc;
    @Autowired
    protected ObjectMapper objectMapper;
    @MockBean
    protected CustomUserDetailService customUserDetailService;
    @MockBean
    protected JwtAuthenticationEntryPoint jwtAuthEntryPoint;
    @MockBean
    protected CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;
    @MockBean
    protected CustomOAuth2UserService customOAuth2UserService;
    @MockBean
    protected OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    @MockBean
    protected OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    @MockBean
    protected JwtAccessDeniedHandler jwtAccessDeniedHandler;
    @MockBean
    protected UserRepository userRepository;
    @MockBean
    protected ClientRegistrationRepository clientRegistrationRepository;
}

