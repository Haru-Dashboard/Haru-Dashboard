package com.haru.api.user.service;

import com.haru.api.user.domain.entity.User;
import com.haru.api.user.domain.repository.UserRepository;
import com.haru.api.user.dto.UserRequest;
import com.haru.api.user.dto.UserResponse;
import com.haru.api.user.exception.UserNotFoundException;
import com.haru.api.user.security.token.JwtTokenProvider;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;

    public UserResponse.UserInfo getUserInfo(CustomUserDetails user){
        User findUser = userRepository.findById(user.getUser().getId()).orElseThrow(UserNotFoundException::new);
        return UserResponse.UserInfo.toEntity(findUser);
    }

    @Transactional
    public UserResponse.Login login(UserRequest.Login request, HttpServletResponse response){
        User findUser = userRepository.findByEmail(request.getEmail()).orElseThrow(UserNotFoundException::new);
        String accessToken = tokenProvider.generateAccessToken(findUser);
        String refreshToken = tokenProvider.generateRefreshToken(findUser, response);
        findUser.updateRefreshToken(refreshToken);
        userRepository.save(findUser);
        return UserResponse.Login.toEntity(findUser, accessToken);

    }

    @Transactional
    public UserResponse.OnlyId logout(User user){
        user.updateRefreshToken(null);
        userRepository.save(user);
        return UserResponse.OnlyId.toEntity(user);
    }
}
