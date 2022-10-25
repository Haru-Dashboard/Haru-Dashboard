package com.haru.api.config;

import com.haru.api.user.security.token.JwtAuthEntryPoint;
import com.haru.api.user.security.token.JwtAuthenticationFilter;
import com.haru.api.user.security.token.TokenProvider;
import com.haru.api.user.security.userdetails.CustomUserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    // 목적 : 서버에 보안 설정 적용(리소스 접근 가능 여부 세팅)
    private final TokenProvider tokenProvider;
    private final CustomUserDetailService customUserDetailService;
    private final JwtAuthEntryPoint jwtAuthEntryPoint;

    @Bean
    public JwtAuthenticationFilter tokenAuthenticationFilter() {
        return new JwtAuthenticationFilter(tokenProvider, customUserDetailService);
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .httpBasic().disable()
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthEntryPoint)
                .and()
                .authorizeRequests() // 사용권한 체크
                .antMatchers("/docs/**").permitAll() // restdocs 주소는 누구나 접근 가능
                .antMatchers("/api/users/**").permitAll()
                .anyRequest().authenticated() // 그외 나머지 요청은 모두 인증된 회원만 접근 가능
                .and()
                .addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class); // jwt token 필터를 id/password 인증 필터 전에 추가
    }
}

