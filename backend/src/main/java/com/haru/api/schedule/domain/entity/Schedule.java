package com.haru.api.schedule.domain.entity;

import com.haru.api.common.entity.BaseEntity;
import com.haru.api.schedule.dto.ScheduleRequest;
import com.haru.api.user.domain.entity.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "schedule")
public class Schedule extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String title;

    private String content;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(columnDefinition = "TINYINT")
    @ColumnDefault("0")
    private int color;

    public static Schedule create(ScheduleRequest.CreateOrUpdate request, User user) {
        return Schedule.builder()
            .user(user)
            .title(request.getTitle())
            .content(request.getContent())
            .startDate(request.getStartDate())
            .endDate(request.getEndDate())
            .color(request.getColor())
            .build();
    }

    public void update(ScheduleRequest.CreateOrUpdate request) {
        if (request.getTitle() != null) this.title = request.getTitle();
        if (request.getContent() != null) this.content = request.getContent();
        if (request.getStartDate() != null) this.startDate = request.getStartDate();
        if (request.getEndDate() != null) this.endDate = request.getEndDate();
        if (request.getColor() != null) this.color = request.getColor();
    }
}
