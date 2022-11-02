package com.haru.api.schedule.service;

import com.haru.api.common.exception.PermissionException;
import com.haru.api.schedule.exception.ScheduleNotFoundException;
import com.haru.api.schedule.domain.entity.Schedule;
import com.haru.api.schedule.domain.repository.ScheduleRepository;
import com.haru.api.schedule.dto.ScheduleRequest;
import com.haru.api.schedule.dto.ScheduleResponse;
import com.haru.api.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public List<ScheduleResponse.GetSchedule> getScheduleList(String year, String month, User user) {
        List<Schedule> schedules = scheduleRepository.findAllByUserAndYearAndMonth(year, month, user);
        return schedules.stream().map(ScheduleResponse.GetSchedule::toEntity).collect(Collectors.toList());
    }

    public ScheduleResponse.GetSchedule getSchedule(Long scheduleId, User user) {
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(ScheduleNotFoundException::new);
        if (!Objects.equals(user.getId(), schedule.getUser().getId())) throw new PermissionException();
        return ScheduleResponse.GetSchedule.toEntity(schedule);
    }

    @Transactional
    public ScheduleResponse.OnlyId create(ScheduleRequest.CreateOrUpdate request, User user) {
        Schedule schedule = Schedule.create(request, user);
        Schedule savedSchedule = scheduleRepository.save(schedule);
        return ScheduleResponse.OnlyId.toEntity(savedSchedule);
    }

    public ScheduleResponse.OnlyId update(Long scheduleId, ScheduleRequest.CreateOrUpdate request, User user) {
        return null;
    }

    public ScheduleResponse.OnlyId delete(Long scheduleId, User user) {
        return null;
    }
}
