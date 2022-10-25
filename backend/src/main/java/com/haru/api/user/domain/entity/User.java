package com.haru.api.user.domain.entity;

import com.haru.api.common.entity.BaseEntity;
import com.haru.api.user.domain.Role;
import com.haru.api.user.domain.SocialProvider;
import lombok.*;


import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String email;

    @Column(name = "oauth_id")
    private String oauthId;

    private String name;

    @Enumerated(EnumType.STRING)
    private SocialProvider provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "refresh_token")
    private String refreshToken;

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

}

