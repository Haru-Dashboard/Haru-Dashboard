package com.haru.api.config;

import com.haru.api.user.security.oauth2.CookieAuthorizationRequestRepository;
import com.haru.api.user.security.oauth2.CustomOAuth2UserService;
import com.haru.api.user.security.oauth2.handler.OAuth2AuthenticationFailureHandler;
import com.haru.api.user.security.oauth2.handler.OAuth2AuthenticationSuccessHandler;
import com.haru.api.user.security.token.JwtAccessDeniedHandler;
import com.haru.api.user.security.token.JwtAuthenticationEntryPoint;
import com.haru.api.user.security.token.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    // 목적 : 서버에 보안 설정 적용(리소스 접근 가능 여부 세팅)
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler authenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler authenticationFailureHandler;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .httpBasic().disable()
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests() // 사용권한 체크
                .antMatchers("/docs/**").permitAll() // restdocs 주소는 누구나 접근 가능
                .antMatchers("/api/users/**").permitAll()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/files/**").permitAll() //TODO: 테스트 종료 후 삭제 필요
                .anyRequest().authenticated(); // 그외 나머지 요청은 모두 인증된 회원만 접근 가능

        http.formLogin().disable()
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/api/oauth2/authorize")
                .authorizationRequestRepository(cookieAuthorizationRequestRepository)
                .and()
                .redirectionEndpoint()
                .baseUri("/api/oauth2/code/*")
                .and()
                .userInfoEndpoint()     // OAuth2 로그인 성공 후 사용자 정보 가져오기
                .userService(customOAuth2UserService)   // 소셜로그인 성공 시 OAuth2UserService 인터페이스의 구현체 등록(구글에서 사용자 정보 가져온 상태에서 추가 진행)
                .and()
                .successHandler(authenticationSuccessHandler)
                .failureHandler(authenticationFailureHandler);

        http.exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler);

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // jwt token 필터를 id/password 인증 필터 전에 추가
    }
}

