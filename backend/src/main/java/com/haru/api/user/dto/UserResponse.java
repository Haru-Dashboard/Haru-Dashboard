package com.haru.api.user.dto;

import com.haru.api.user.domain.entity.User;
import com.haru.api.user.security.token.Token;
import lombok.*;

public class UserResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Login {
        private Long userId;
        private String name;
        private String accessToken;
        private String refreshToken;

        public static Login build(User user, Token accessToken) {
            return Login.builder()
                    .userId(user.getId())
                    .name(user.getName())
                    .accessToken(accessToken.getToken())
                    .refreshToken(user.getRefreshToken())
                    .build();
        }
    }



}
