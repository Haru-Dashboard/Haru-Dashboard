package com.haru.api.todo.controller;

import com.haru.api.todo.dto.TodoRequest;
import com.haru.api.todo.service.TodoService;
import com.haru.api.user.security.userdetails.CurrentUser;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<?> getList(@RequestParam(required = false) String day, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(todoService.getList(day, customUserDetails.getUser()));
    }

    @GetMapping("/{todoId}")
    public ResponseEntity<?> getOne(@PathVariable Long todoId, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(todoService.getOne(todoId, customUserDetails.getUser()));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody TodoRequest.Create request, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(todoService.create(request, customUserDetails.getUser()));
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<?> update(@PathVariable Long todoId, @RequestBody TodoRequest.Update request, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(todoService.update(todoId, request, customUserDetails.getUser()));
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<?> delete(@PathVariable Long todoId, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(todoService.delete(todoId, customUserDetails.getUser()));
    }
}
