package com.haru.api.config.jpa;

import com.haru.api.user.domain.entity.User;
import com.haru.api.user.security.userdetails.CustomUserDetails;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<User> {

    @Override
    public Optional<User> getCurrentAuditor() {
        return Optional.ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .filter(Authentication::isAuthenticated)
                .filter((authentication) -> !(authentication instanceof AnonymousAuthenticationToken))
                .map(Authentication::getPrincipal)
                .map(CustomUserDetails.class::cast)
                .map(CustomUserDetails::getUser);
    }
}



