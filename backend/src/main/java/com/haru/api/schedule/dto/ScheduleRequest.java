package com.haru.api.schedule.dto;

import lombok.*;

import java.time.LocalDateTime;

public class ScheduleRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateOrUpdate {
        private String title;
        private String content;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private int color;
    }
}
