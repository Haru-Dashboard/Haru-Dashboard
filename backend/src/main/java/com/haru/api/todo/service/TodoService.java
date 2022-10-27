package com.haru.api.todo.service;

import com.haru.api.todo.domain.entity.Todo;
import com.haru.api.todo.domain.repository.TodoRepository;
import com.haru.api.todo.dto.TodoRequest;
import com.haru.api.todo.dto.TodoResponse;
import com.haru.api.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    public List<TodoResponse.GetOne> getList(String day, User user) {
        List<Todo> todos;
        if (StringUtils.hasText(day)) {
            todos = todoRepository.findAllByUserAndDay(user.getId(), day);
        } else {
            todos = todoRepository.findAllByUser(user.getId());
        }
        return todos.stream().map(TodoResponse.GetOne::build).collect(Collectors.toList());
    }

    public TodoResponse.OnlyId create(TodoRequest.Create request, User user) {
        Todo todo = Todo.create(request, user);
        Todo savedTodo = todoRepository.save(todo);
        return TodoResponse.OnlyId.build(savedTodo);
    }
}
