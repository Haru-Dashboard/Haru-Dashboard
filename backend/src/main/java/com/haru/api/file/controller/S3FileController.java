package com.haru.api.file.controller;

import com.haru.api.file.dto.S3FileRequest;
import com.haru.api.file.dto.S3FileResponse;
import com.haru.api.file.service.S3FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api")
public class S3FileController {
    // 테스트용 (TODO: 삭제 예정)
    private final S3FileService fileService;
    @PostMapping("/files")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<S3FileResponse.OnlyId> test(@RequestPart(name = "form") S3FileRequest.Title request, @RequestPart(name = "file") MultipartFile file) {
        S3FileResponse.OnlyId response = fileService.save(file);
        // TODO: 비즈니스 로직 처리 필요
        System.out.println(request.getTitle());
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/files/{fileId}")
    public ResponseEntity<S3FileResponse.GetImage> getImage(@PathVariable Long fileId) {
        S3FileResponse.GetImage response = fileService.getImage(fileId);
        return ResponseEntity.ok().body(response);
    }
}

