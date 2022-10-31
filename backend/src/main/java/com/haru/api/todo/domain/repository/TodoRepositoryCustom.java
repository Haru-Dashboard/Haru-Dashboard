package com.haru.api.todo.domain.repository;

import com.haru.api.todo.domain.entity.Todo;

import java.util.List;

public interface TodoRepositoryCustom {
    List<Todo> findAllByUserAndDay(Long user, String day);
}
