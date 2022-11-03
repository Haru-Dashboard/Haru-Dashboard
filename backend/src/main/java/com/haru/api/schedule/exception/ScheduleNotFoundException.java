package com.haru.api.schedule.exception;

import com.haru.api.common.exception.EntityNotFoundException;

public class ScheduleNotFoundException extends EntityNotFoundException {
    public ScheduleNotFoundException(){
        super("존재하지 않는 일정입니다.");
    }
}
