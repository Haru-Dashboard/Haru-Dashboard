package com.haru.api.user.controller;

import com.haru.api.user.dto.AuthRequest;
import com.haru.api.user.security.userdetails.CurrentUser;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import com.haru.api.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/refresh")
    public ResponseEntity refreshToken(@RequestBody AuthRequest.Token request, HttpServletResponse response, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok().body(authService.refreshToken(request, response));
    }
}