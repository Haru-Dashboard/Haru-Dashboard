package com.haru.api.todo.dto;

import com.haru.api.todo.domain.entity.Todo;
import lombok.*;

public class TodoResponse {

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long todoId;

        public static OnlyId toEntity(Todo todo) {
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
        private Byte mon;
        private Byte tue;
        private Byte wed;
        private Byte thu;
        private Byte fri;
        private Byte sat;
        private Byte sun;

        public static TodoResponse.GetOne toEntity(Todo todo) {
            return GetOne.builder()
                    .todoId(todo.getId())
                    .category(todo.getCategory().getName())
                    .title(todo.getTitle())
                    .mon(todo.getMon())
                    .tue(todo.getTue())
                    .wed(todo.getWed())
                    .thu(todo.getThu())
                    .fri(todo.getFri())
                    .sat(todo.getSat())
                    .sun(todo.getSun())
                    .build();
        }
    }
}
