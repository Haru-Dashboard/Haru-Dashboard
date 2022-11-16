package com.haru.api.user.service;

import com.haru.api.user.domain.entity.User;
import com.haru.api.user.domain.repository.UserRepository;
import com.haru.api.user.dto.AuthRequest;
import com.haru.api.user.dto.AuthResponse;
import com.haru.api.user.security.token.JwtTokenProvider;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import com.haru.api.user.security.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class AuthService {

    @Value("${app.auth.token.refresh-cookie-key}")
    private String cookieKey;

    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;

    public AuthResponse.Token refreshToken(AuthRequest.Token request) {
        // 1. Validation Refresh Token
        String oldRefreshToken = request.getRefreshToken();
        if(oldRefreshToken == null){
            throw new RuntimeException("no Refresh Token");
        }
        if (!tokenProvider.validateToken(oldRefreshToken)) {
            throw new RuntimeException("Not Validated Refresh Token");
        }

        // 2. 유저정보 얻기
        String oldAccessToken = request.getAccessToken();
        Authentication authentication = tokenProvider.getAuthentication(oldAccessToken);
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

        Long id = Long.valueOf(user.getName());

        // 3. Match Refresh Token
        Optional<User> findUser = userRepository.findById(id);
        String savedToken = findUser.get().getRefreshToken();

        if (!savedToken.equals(oldRefreshToken)) {
            throw new RuntimeException("Not Matched Refresh Token");
        }

        // 4. JWT 갱신
        String accessToken = tokenProvider.createAccessToken(authentication);
        return AuthResponse.Token.toEntity(accessToken);
    }
}
