package com.haru.api.schedule.controller;

import com.haru.api.schedule.dto.ScheduleRequest;
import com.haru.api.schedule.dto.ScheduleResponse;
import com.haru.api.schedule.service.ScheduleService;
import com.haru.api.user.security.userdetails.CurrentUser;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<List<ScheduleResponse.GetSchedule>> getScheduleList(@RequestParam(name = "year") String year, @RequestParam(name = "month") String month, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(scheduleService.getScheduleList(year, month, customUserDetails.getUser()));
    }

    @GetMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse.GetSchedule> getSchedule(@PathVariable Long scheduleId, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(scheduleService.getSchedule(scheduleId, customUserDetails.getUser()));
    }

    @PostMapping
    public ResponseEntity<ScheduleResponse.OnlyId> create(@RequestBody ScheduleRequest.CreateOrUpdate request, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(scheduleService.create(request, customUserDetails.getUser()));
    }

    @PatchMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse.OnlyId> update(@PathVariable Long scheduleId, @RequestBody ScheduleRequest.CreateOrUpdate request, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(scheduleService.update(scheduleId, request, customUserDetails.getUser()));
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse.OnlyId> delete(@PathVariable Long scheduleId, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(scheduleService.delete(scheduleId, customUserDetails.getUser()));
    }
}
