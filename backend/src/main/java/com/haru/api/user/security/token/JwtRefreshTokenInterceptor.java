package com.haru.api.user.security.token;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.haru.api.common.advice.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.naming.AuthenticationException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtRefreshTokenInterceptor implements HandlerInterceptor {
    private final TokenProvider tokenProvider;
    private static final String REFRESH_TOKEN = "refresh_token";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(REFRESH_TOKEN)) {
                refreshToken = cookie.getValue();
            }
        }
        if (refreshToken != null) {
            if (tokenProvider.isValidToken(refreshToken)) {
                return true;
            }
        }
        ErrorResponse errorResponse = ErrorResponse.build(String.valueOf(HttpServletResponse.SC_UNAUTHORIZED), new AuthenticationException());
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getOutputStream(), errorResponse);
        return false;
    }
}


