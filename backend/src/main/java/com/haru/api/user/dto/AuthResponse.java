package com.haru.api.user.dto;

import lombok.*;

public class AuthResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Token {
        private String accessToken;

        public static AuthResponse.Token toEntity(String accessToken) {
            return Token.builder()
                    .accessToken(accessToken)
                    .build();
        }

    }
}
