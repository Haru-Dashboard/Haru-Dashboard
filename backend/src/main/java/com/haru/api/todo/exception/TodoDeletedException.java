package com.haru.api.todo.exception;

import com.haru.api.common.exception.EntityNotFoundException;

public class TodoDeletedException extends EntityNotFoundException {
    public TodoDeletedException() {
        super("삭제된 Todo입니다.");
    }
}
