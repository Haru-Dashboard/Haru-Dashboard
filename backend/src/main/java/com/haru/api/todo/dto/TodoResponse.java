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
        private boolean mon;
        private boolean tue;
        private boolean wed;
        private boolean thu;
        private boolean fri;
        private boolean sat;
        private boolean sun;

        public static TodoResponse.GetOne toEntity(Todo todo) {
            return GetOne.builder()
                    .todoId(todo.getId())
                    .category(todo.getCategory().getName())
                    .title(todo.getTitle())
                    .mon(todo.isMon())
                    .tue(todo.isTue())
                    .wed(todo.isWed())
                    .thu(todo.isThu())
                    .fri(todo.isFri())
                    .sat(todo.isSat())
                    .sun(todo.isSun())
                    .build();
        }
    }
}
