package com.haru.api.user.dto;

import lombok.*;

public class AuthRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Token{
        private String accessToken;
        private String refreshToken;
    }
}
