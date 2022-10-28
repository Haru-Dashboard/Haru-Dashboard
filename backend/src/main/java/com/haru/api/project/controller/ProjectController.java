package com.haru.api.project.controller;

import com.haru.api.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/projects")
public class ProjectController {
    private final ProjectService projectService;
}
