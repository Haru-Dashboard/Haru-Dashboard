package com.haru.api.todo.service;

import com.haru.api.category.domain.entity.Category;
import com.haru.api.category.service.CategoryService;
import com.haru.api.common.exception.PermissionException;
import com.haru.api.todo.domain.entity.Todo;
import com.haru.api.todo.domain.repository.TodoRepository;
import com.haru.api.todo.dto.TodoRequest;
import com.haru.api.todo.dto.TodoResponse;
import com.haru.api.todo.exception.TodoNotFoundException;
import com.haru.api.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final CategoryService categoryService;
    private final TodoRepository todoRepository;

    public List<TodoResponse.GetOne> getList(String day, User user) {
        List<Todo> todos;
        if (StringUtils.hasText(day)) {
            todos = todoRepository.findAllByUserAndDay(user, day);
        } else {
            todos = todoRepository.findAllByUser(user);
        }
        return todos.stream().map(TodoResponse.GetOne::toEntity).collect(Collectors.toList());
    }

    public TodoResponse.GetOne getOne(Long todoId, User user) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(TodoNotFoundException::new);
        if (!Objects.equals(user.getId(), todo.getUser().getId())) throw new PermissionException();
        return TodoResponse.GetOne.toEntity(todo);
    }

    @Transactional
    public TodoResponse.OnlyId create(TodoRequest.Create request, User user) {
        Category category = categoryService.getOne(request.getCategory());
        Todo todo = Todo.create(request, category, user);
        Todo savedTodo = todoRepository.save(todo);
        return TodoResponse.OnlyId.toEntity(savedTodo);
    }

    @Transactional
    public TodoResponse.OnlyId update(Long todoId, TodoRequest.Update request, User user) {
        Category category = categoryService.getOne(request.getCategory());
        Todo todo = todoRepository.findById(todoId).orElseThrow(TodoNotFoundException::new);
        if (!Objects.equals(user.getId(), todo.getUser().getId())) throw new PermissionException();
        todo.update(request, category);
        return TodoResponse.OnlyId.toEntity(todo);
    }

    @Transactional
    public TodoResponse.OnlyId delete(Long todoId, User user) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(TodoNotFoundException::new);
        if (!Objects.equals(user.getId(), todo.getUser().getId())) throw new PermissionException();
        todoRepository.delete(todo);
        return TodoResponse.OnlyId.toEntity(todo);
    }
}
