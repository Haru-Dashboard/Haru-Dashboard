package com.haru.api.schedule.service;

import com.haru.api.schedule.domain.repository.ScheduleRepository;
import com.haru.api.schedule.dto.ScheduleRequest;
import com.haru.api.schedule.dto.ScheduleResponse;
import com.haru.api.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public List<ScheduleResponse.GetSchedule> getScheduleList(String month, User user) {
    }

    public ScheduleResponse.GetSchedule getSchedule(Long scheduleId, User user) {
    }

    public ScheduleResponse.OnlyId create(ScheduleRequest.CreateOrUpdate request, User user) {
    }

    public ScheduleResponse.OnlyId update(Long scheduleId, ScheduleRequest.CreateOrUpdate request, User user) {
    }

    public ScheduleResponse.OnlyId delete(Long scheduleId, User user) {
    }
}
