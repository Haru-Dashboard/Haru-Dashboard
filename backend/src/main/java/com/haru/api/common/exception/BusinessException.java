package com.haru.api.common.exception;

public class BusinessException extends RuntimeException{
    public BusinessException(String msg) {
        super(msg);
    }
}

