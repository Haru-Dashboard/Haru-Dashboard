package com.haru.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.haru.api.config.WebMvcConfig;
import com.haru.api.user.security.token.JwtAuthenticationEntryPoint;
import com.haru.api.user.security.token.JwtTokenProvider;
import com.haru.api.user.security.userdetails.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs(uriScheme = "https", uriHost = "k7a204.p.ssafy.io", uriPort = 443)
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
}

