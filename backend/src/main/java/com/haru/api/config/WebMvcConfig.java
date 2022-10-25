package com.haru.api.config;

import com.haru.api.user.security.token.JwtRefreshTokenInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final JwtRefreshTokenInterceptor tokenInterceptor;

    /****************************************************************************************
     * CORS 설정
     * 모두 허용함
     ****************************************************************************************/
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    /****************************************************************************************
     * Encoding 설정
     * log 에 한글이 있어도 깨지지 않도록 하기 위함
     ****************************************************************************************/
    @Bean
    public CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);
        return characterEncodingFilter;
    }

    /****************************************************************************************
     * 리프레시 토큰 인터셉터
     * 발급 시도 시 사용되도록
     ****************************************************************************************/
    public void addInterceptors(InterceptorRegistry interceptorRegistry) {
        interceptorRegistry.addInterceptor(tokenInterceptor).addPathPatterns("/api/user/refresh");
    }

    /****************************************************************************************
     * RestDocs API 문서 index.html 뷰 컨트롤러
     * https://i7a406.p.ssafy.io/docs -> https://i7a406.p.ssafy.io/docs/index.html 으로 매핑하기 위함
     ****************************************************************************************/
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/docs").setViewName("forward:/docs/index.html");
    }
}


