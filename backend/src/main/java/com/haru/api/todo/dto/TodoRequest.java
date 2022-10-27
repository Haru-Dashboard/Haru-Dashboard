package com.haru.api.todo.dto;

import com.haru.api.category.domain.entity.Category;
import com.haru.api.user.domain.entity.User;
import lombok.*;

public class TodoRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Create {
        private User user;
        private Category category;
        private String title;
        private Byte mon;
        private Byte tue;
        private Byte wed;
        private Byte thu;
        private Byte fri;
        private Byte sat;
        private Byte sun;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Update {
        private Category category;
        private String title;
        private Byte mon;
        private Byte tue;
        private Byte wed;
        private Byte thu;
        private Byte fri;
        private Byte sat;
        private Byte sun;
    }
}
