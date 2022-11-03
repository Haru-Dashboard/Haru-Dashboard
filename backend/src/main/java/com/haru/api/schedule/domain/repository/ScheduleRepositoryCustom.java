package com.haru.api.schedule.domain.repository;

import com.haru.api.schedule.domain.entity.Schedule;
import com.haru.api.user.domain.entity.User;

import java.util.List;

public interface ScheduleRepositoryCustom {
    List<Schedule> findAllByUserAndYearAndMonth(Integer year, Integer month, User user);
}
