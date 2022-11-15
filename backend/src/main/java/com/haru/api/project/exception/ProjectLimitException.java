package com.haru.api.project.exception;

import com.haru.api.common.exception.BusinessException;

public class ProjectLimitException extends BusinessException {
    public ProjectLimitException() {
        super("생성 제한을 초과하였습니다.");
    }
}
