package com.haru.api.schedule.domain.repository;

import com.haru.api.schedule.domain.entity.QSchedule;
import com.haru.api.schedule.domain.entity.Schedule;
import com.haru.api.user.domain.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Schedule> findAllByUserAndYearAndMonth(String year, String month, User user) {
        // 1. 시작일이 범위 내에 있거나 종료일이 범위 내에 있는 경우
        // 2. 시작일이 start 이전이면서 종료일이 end 이후인 경우
        return jpaQueryFactory.selectFrom(QSchedule.schedule)
            .where(QSchedule.schedule)
    }

}
