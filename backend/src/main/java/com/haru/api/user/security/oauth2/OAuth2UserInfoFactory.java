package com.haru.api.user.security.oauth2;

import com.haru.api.user.domain.SocialProvider;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(SocialProvider socialProvider, Map<String, Object> attributes) {
        switch (socialProvider) {
            case GOOGLE: return new GoogleOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}
