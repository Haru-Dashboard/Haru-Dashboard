package com.haru.api.todo.exception;

import javax.persistence.EntityNotFoundException;

public class TodoNotFoundException extends EntityNotFoundException {
    public TodoNotFoundException() {
        super("존재하지 않는 Todo입니다.");
    }
}
