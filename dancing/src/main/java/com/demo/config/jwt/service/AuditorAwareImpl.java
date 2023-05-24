package com.demo.config.jwt.service;

import com.demo.config.jwt.user.UserEntity;
import com.demo.config.jwt.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@RequiredArgsConstructor
public class AuditorAwareImpl implements AuditorAware<UserEntity> {
    final UserRepository userRepository;

    @Override
    public Optional<UserEntity> getCurrentAuditor() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return Optional.ofNullable(userRepository.findByUsername(username));
    }
}
