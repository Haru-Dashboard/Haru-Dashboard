package com.haru.api.project.exception;

import com.haru.api.common.exception.EntityNotFoundException;

public class ProjectNotFoundException extends EntityNotFoundException {
    public ProjectNotFoundException() {
        super("존재하지 않는 프로젝트입니다.");
    }
}
