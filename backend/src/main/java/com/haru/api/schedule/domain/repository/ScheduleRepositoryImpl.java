package com.haru.api.schedule.domain.repository;

import com.haru.api.schedule.domain.entity.QSchedule;
import com.haru.api.schedule.domain.entity.Schedule;
import com.haru.api.user.domain.entity.User;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Schedule> findAllByUserAndYearAndMonth(Integer year, Integer month, User user) {
        return jpaQueryFactory.selectFrom(QSchedule.schedule)
            .where(searchDateFilter(year, month)
                , QSchedule.schedule.user.eq(user))
            .orderBy(QSchedule.schedule.startDate.asc())
            .fetch();
    }

    // 날짜 필터
    private BooleanExpression searchDateFilter(Integer year, Integer month) {
        if (year == null) year = LocalDate.now().getYear();
        if (month == null) month = LocalDate.now().getMonthValue();
        LocalDate pivotDate = LocalDate.of(year, month, 1);
        LocalDateTime startDate = LocalDateTime.of(pivotDate.minusDays(7), LocalTime.MIN);
        LocalDateTime endDate = LocalDateTime.of(pivotDate.plusMonths(1).plusDays(6), LocalTime.MAX).withNano(0);

        BooleanExpression isStartIn = QSchedule.schedule.startDate.between(startDate, endDate);
        BooleanExpression isEndIn = QSchedule.schedule.endDate.between(startDate, endDate);
        BooleanExpression isIncluding = QSchedule.schedule.endDate.after(endDate)
            .and(QSchedule.schedule.startDate.before(startDate));

        return Expressions.anyOf(isStartIn, isEndIn, isIncluding);
    }

}
