package com.haru.api.user.dto;

import com.haru.api.user.domain.entity.User;
import lombok.*;

public class UserResponse {

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class UserInfo {
        private Long userId;
        private String email;
        private String name;
        private String refreshToken;

        public static UserInfo toEntity(User user) {
            return UserInfo.builder()
                    .userId(user.getId())
                    .email(user.getEmail())
                    .name(user.getName())
                    .refreshToken(user.getRefreshToken())
                    .build();
        }

    }



}
