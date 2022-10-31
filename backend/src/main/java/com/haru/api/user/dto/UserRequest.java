package com.haru.api.user.dto;

import lombok.*;

public class UserRequest {

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Login{
        private String email;

    }


}
