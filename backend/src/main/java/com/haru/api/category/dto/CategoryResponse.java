package com.haru.api.category.dto;

import com.haru.api.category.domain.entity.Category;
import lombok.*;

public class CategoryResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long categoryId;

        public static CategoryResponse.OnlyId toEntity(Category category) {
            return OnlyId.builder()
                    .categoryId(category.getId())
                    .build();
        }
    }
}
