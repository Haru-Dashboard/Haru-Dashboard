package com.haru.api.todo.dto;

import com.haru.api.user.domain.entity.User;
import lombok.*;

public class TodoRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Create {
        private String category;
        private String title;
        private Boolean mon;
        private Boolean tue;
        private Boolean wed;
        private Boolean thu;
        private Boolean fri;
        private Boolean sat;
        private Boolean sun;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Update {
        private String category;
        private String title;
        private Boolean mon;
        private Boolean tue;
        private Boolean wed;
        private Boolean thu;
        private Boolean fri;
        private Boolean sat;
        private Boolean sun;
    }
}
