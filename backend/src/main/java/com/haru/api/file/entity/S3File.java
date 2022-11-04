package com.haru.api.file.entity;

import com.haru.api.common.entity.BaseEntity;
import com.haru.api.file.dto.SavedFile;
import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "file")
public class S3File extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long id;

    private String name;

    @Column(name = "origin_name")
    private String originName;

    private String extension;

    private String url;

    public static S3File create(SavedFile request) {
        return S3File.builder()
                .name(request.getName())
                .originName(request.getOriginName())
                .extension(request.getExtension())
                .url(request.getPublicUrl())
                .build();
    }
}
