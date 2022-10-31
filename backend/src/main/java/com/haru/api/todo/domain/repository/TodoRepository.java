package com.haru.api.todo.domain.repository;

import com.haru.api.todo.domain.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long>, TodoRepositoryCustom {
    List<Todo> findAllByUser(Long user);
}
