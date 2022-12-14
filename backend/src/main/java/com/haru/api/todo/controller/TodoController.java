package com.haru.api.todo.controller;

import com.haru.api.todo.dto.TodoRequest;
import com.haru.api.todo.dto.TodoResponse;
import com.haru.api.todo.service.TodoService;
import com.haru.api.user.security.userdetails.CurrentUser;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<List<TodoResponse.GetOne>> getList(@RequestParam(name = "day", required = false) String day, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(todoService.getList(day, customUserDetails.getUser()));
    }

    @GetMapping("/{todoId}")
    public ResponseEntity<TodoResponse.GetOne> getOne(@PathVariable Long todoId, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(todoService.getOne(todoId, customUserDetails.getUser()));
    }

    @PostMapping
    public ResponseEntity<TodoResponse.OnlyId> create(@RequestBody TodoRequest.Create request, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(todoService.create(request, customUserDetails.getUser()));
    }

    @PatchMapping("/{todoId}")
    public ResponseEntity<TodoResponse.OnlyId> update(@PathVariable Long todoId, @RequestBody TodoRequest.Update request, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(todoService.update(todoId, request, customUserDetails.getUser()));
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<TodoResponse.OnlyId> delete(@PathVariable Long todoId, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(todoService.delete(todoId, customUserDetails.getUser()));
    }
}
