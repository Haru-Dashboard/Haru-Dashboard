package com.haru.api.todo.domain.repository;

import com.haru.api.todo.domain.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByUser(Long user);
    List<Todo> findAllByUserAndDay(Long user, String day);
}
