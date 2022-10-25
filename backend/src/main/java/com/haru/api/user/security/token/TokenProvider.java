package com.haru.api.user.security.token;

import com.haru.api.user.domain.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@RequiredArgsConstructor
@Slf4j
@Component
public class TokenProvider {
    // 목적 : JWT 토큰 생성 및 검증 모둘
    private final JwtProps jwtProps;
    // access-token 발급
    public Token generateAccessToken(User user) {
        return generateToken(user, jwtProps.getAccessTokenProps());
    }

    // refresh-token 발급
    public Token generateRefreshToken(User user) {
        return generateToken(user, jwtProps.getRefreshTokenProps());
    }

    // access-token에서 유저 id 찾기
    public Long getUserIdFromAccessToken(String token) {
        return Long.valueOf(getClaims(token, jwtProps.getAccessTokenProps()).getBody().getSubject());
    }

    // refresh-token에서 유저 id 찾기
    public Long getUserIdFromRefreshToken(String token) {
        return Long.valueOf(getClaims(token, jwtProps.getRefreshTokenProps()).getBody().getSubject());
    }

    // jwt 토큰 발급
    private Token generateToken(User user, JwtProps.TokenProps tokenProps) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(tokenProps.getSecret()));

        Date exp = new Date((new Date()).getTime() + tokenProps.getExpirationTimeMilliSec());
        String token = Jwts.builder()
                .setSubject(String.valueOf(user.getId()))
                .setAudience(user.getName())
                .setExpiration(exp)
                .signWith(key)
                .compact();

        return Token.create(token, exp);
    }

    private Jws<Claims> getClaims(String token, JwtProps.TokenProps tokenProps) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(tokenProps.getSecret()));
        Jws<Claims> claims = null;

        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }

        return claims;
    }

    public boolean isValidToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtProps.getRefreshTokenProps().getSecret()));
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException exception) {
            log.error("Token Expired");
            return false;
        } catch (JwtException exception) {
            log.error("Token Tampered");
            return false;
        } catch (NullPointerException exception) {
            log.error("Token is null");
            return false;
        }
    }
}

