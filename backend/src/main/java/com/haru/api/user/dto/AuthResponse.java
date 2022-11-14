package com.haru.api.user.dto;

import com.haru.api.user.domain.entity.User;
import lombok.*;

public class AuthResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Token {
        private String accessToken;
        private String refreshToken;

        public static AuthResponse.Token toEntity(String accessToken, String refreshToken) {
            return Token.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        }

    }
}
