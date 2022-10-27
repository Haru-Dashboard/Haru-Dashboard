package com.haru.api.todo.controller;

import com.haru.api.todo.dto.TodoRequest;
import com.haru.api.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/todos")
public class TodoController {
    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<?> getList(@RequestParam(required = false) String day) {
        return ResponseEntity.ok(todoService.getList(day, null));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody TodoRequest.Create request) {
        return ResponseEntity.ok(todoService.create(request, null));
    }
}
