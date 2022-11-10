package com.haru.api.user.controller;

import com.haru.api.user.domain.entity.User;
import com.haru.api.user.dto.UserRequest;
import com.haru.api.user.dto.UserResponse;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import com.haru.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserResponse.UserInfo> getCurrentUser(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok().body(userService.getUserInfo(user));
    }

}
