package com.haru.api.user.service;

import com.haru.api.user.domain.entity.User;
import com.haru.api.user.domain.repository.UserRepository;
import com.haru.api.user.dto.UserRequest;
import com.haru.api.user.dto.UserResponse;
import com.haru.api.user.exception.UserNotFoundException;
import com.haru.api.user.security.token.Token;
import com.haru.api.user.security.token.TokenProvider;
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
    private final TokenProvider tokenProvider;


    @Transactional
    public UserResponse.Login login(UserRequest.Login request){
        User findUser = userRepository.findByEmail(request.getEmail()).orElseThrow(UserNotFoundException::new);
        Token refreshToken = tokenProvider.generateRefreshToken(findUser);
        findUser.updateRefreshToken(refreshToken.getToken());
        userRepository.save(findUser);
        return UserResponse.Login.build(findUser, tokenProvider.generateAccessToken(findUser));
    }

}
