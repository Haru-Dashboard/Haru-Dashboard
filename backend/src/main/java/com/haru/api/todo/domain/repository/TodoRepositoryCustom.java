package com.haru.api.todo.domain.repository;

import com.haru.api.todo.domain.entity.Todo;
import com.haru.api.user.domain.entity.User;

import java.util.List;

public interface TodoRepositoryCustom {
    List<Todo> findAllByUserAndDay(User user, String day);
}
