package com.haru.api.project.controller;

import com.haru.api.project.dto.ProjectRequest;
import com.haru.api.project.dto.ProjectResponse;
import com.haru.api.project.service.ProjectService;
import com.haru.api.user.security.userdetails.CurrentUser;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponse.GetProject> getProject(@PathVariable Long projectId, @CurrentUser CustomUserDetails customUserDetails) {
        ProjectResponse.GetProject response = projectService.getProject(projectId, customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse.GetProject>> getProjectList(@CurrentUser CustomUserDetails customUserDetails) {
        List<ProjectResponse.GetProject> response = projectService.getProjectList(customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<ProjectResponse.OnlyId> update(@PathVariable Long projectId, @RequestPart(name = "form") ProjectRequest.CreateOrUpdate request, @RequestPart(name = "file", required = false) MultipartFile file, @CurrentUser CustomUserDetails customUserDetails) {
        ProjectResponse.OnlyId response = projectService.update(projectId, customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<ProjectResponse.OnlyId> delete(@PathVariable Long projectId, @CurrentUser CustomUserDetails customUserDetails){
        ProjectResponse.OnlyId response = projectService.delete(projectId, customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }
}
