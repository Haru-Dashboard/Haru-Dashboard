package com.haru.api.schedule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.haru.api.schedule.domain.entity.Schedule;
import lombok.*;

import java.time.LocalDateTime;

public class ScheduleResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long id;

        public ScheduleResponse.OnlyId toEntity(Schedule schedule) {
            return OnlyId.builder()
                    .id(schedule.getId())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetSchedule {
        private Long id;
        private String title;
        private String content;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endDate;
        private int color;

        public ScheduleResponse.GetSchedule toEntity(Schedule schedule) {
            return GetSchedule.builder()
                    .id(schedule.getId())
                    .title(schedule.getTitle())
                    .content(schedule.getContent())
                    .startDate(schedule.getStartDate())
                    .endDate(schedule.getEndDate())
                    .color(schedule.getColor())
                    .build();
        }
    }
}
;