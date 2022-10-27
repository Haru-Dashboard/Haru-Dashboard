package com.haru.api.todo.dto;

import com.haru.api.todo.domain.entity.Todo;
import lombok.*;

public class TodoResponse {

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId{
        private Long todoId;

        public static OnlyId build(Todo todo){
            return OnlyId.builder()
                    .todoId(todo.getId())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetOne {
        private Long todoId;
        private String category;
        private String title;

        public static TodoResponse.GetOne build(Todo todo){
            return GetOne.builder()
                    .todoId(todo.getId())
                    .category(todo.getCategory().getName())
                    .title(todo.getTitle())
                    .build();
        }
    }
}
