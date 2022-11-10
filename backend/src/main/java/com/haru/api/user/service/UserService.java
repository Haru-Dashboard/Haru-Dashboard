package com.haru.api.user.service;

import com.haru.api.user.domain.entity.User;
import com.haru.api.user.domain.repository.UserRepository;
import com.haru.api.user.dto.UserResponse;
import com.haru.api.user.exception.UserNotFoundException;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public UserResponse.UserInfo getUserInfo(CustomUserDetails user){
        User findUser = userRepository.findById(user.getUser().getId()).orElseThrow(UserNotFoundException::new);
        return UserResponse.UserInfo.build(findUser);
    }

}
