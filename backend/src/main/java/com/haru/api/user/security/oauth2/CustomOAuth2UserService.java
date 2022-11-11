package com.haru.api.user.security.oauth2;

import com.haru.api.user.domain.Role;
import com.haru.api.user.domain.SocialProvider;
import com.haru.api.user.domain.entity.User;
import com.haru.api.user.domain.repository.UserRepository;
import com.haru.api.user.exception.OAuthProcessingException;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    // OAuth2UserRequest에 있는 Access Token으로 유저정보 get
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        System.out.println("Request에서 가져온 토큰 : " + oAuth2UserRequest.getAccessToken().getTokenValue());
        return process(oAuth2UserRequest, oAuth2User);
    }

    // 획득한 유저정보를 Java Model과 맵핑하고 프로세스 진행
    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        SocialProvider socialProvider = SocialProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(socialProvider, oAuth2User.getAttributes());

        if (userInfo.getEmail().isEmpty()) {
            throw new OAuthProcessingException("Email not found from OAuth2 provider");
        }
        Optional<User> userOptional = userRepository.findByEmail(userInfo.getEmail());
        User user;

        if (userOptional.isPresent()) {		// 이미 가입된 경우
            user = userOptional.get();
            if (socialProvider != user.getProvider()) {
                throw new OAuthProcessingException("Wrong Match Auth Provider");
            }

        } else {			// 가입되지 않은 경우
            user = createUser(userInfo, socialProvider);
        }
        return CustomUserDetails.create(user, oAuth2User.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo, SocialProvider socialProvider) {
        User user = User.builder()
                .email(userInfo.getEmail())
                .oauthId(userInfo.getId())
                .role(Role.USER)
                .name(userInfo.getName())
                .provider(socialProvider)
                .build();
        return userRepository.save(user);
    }
}