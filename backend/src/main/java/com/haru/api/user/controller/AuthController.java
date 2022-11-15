package com.haru.api.user.controller;

import com.haru.api.user.dto.AuthRequest;
import com.haru.api.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/refresh")
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response, @RequestBody AuthRequest.Token token) {
        return ResponseEntity.ok().body(authService.refreshToken(request, response, token));
    }
}