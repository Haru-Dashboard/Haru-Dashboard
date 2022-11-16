package com.haru.api.user.dto;

import com.haru.api.user.domain.entity.User;
import lombok.*;

public class UserResponse {

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long id;

        public static OnlyId toEntity(User user) {
            return OnlyId.builder()
                    .id(user.getId())
                    .build();
        }

    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class UserInfo {
        private String email;
        private String name;

        public static UserInfo toEntity(User user) {
            return UserInfo.builder()
                    .email(user.getEmail())
                    .name(user.getName())
                    .build();
        }

    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Login {
        private Long userId;
        private String name;
        private String accessToken;
        private String refreshToken;

        public static Login toEntity(User user, String accessToken) {
            return Login.builder()
                    .userId(user.getId())
                    .name(user.getName())
                    .accessToken(accessToken)
                    .refreshToken(user.getRefreshToken())
                    .build();
        }

    }



}
