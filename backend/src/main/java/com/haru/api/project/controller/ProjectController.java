package com.haru.api.project.controller;

import com.haru.api.project.dto.ProjectRequest;
import com.haru.api.project.dto.ProjectResponse;
import com.haru.api.project.service.ProjectService;
import com.haru.api.user.security.userdetails.CurrentUser;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping("")
    public ResponseEntity<ProjectResponse.OnlyId> create(@RequestPart(name = "form") ProjectRequest.CreateOrUpdate request, @RequestPart(name = "file", required = false) MultipartFile file, @CurrentUser CustomUserDetails customUserDetails) {
        ProjectResponse.OnlyId response = projectService.create(request, file, customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }
}
