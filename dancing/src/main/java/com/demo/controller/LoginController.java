package com.demo.controller;


import com.demo.config.jwt.JwtUtils;
import com.demo.config.jwt.payload.LoginRequest;
import com.demo.config.jwt.payload.LoginResponse;
import com.demo.config.jwt.service.UserDetailsImpl;
import com.demo.dto.ResultDto;
import com.demo.entity.ClassInfoEntity;
import com.demo.service.ApiService;
import com.demo.utils.CommonUtils;
import com.demo.utils.ExcuteApi;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
public class LoginController {
    final ApiService apiService;
    final Gson gson;
    final ObjectMapper customObjectMapper;
    final CommonUtils commonUtils;
    final AuthenticationManager authenticationManager;
    final JwtUtils jwtUtils;
    final PasswordEncoder passwordEncoder;

    @GetMapping("/encode")
    public String encode(@RequestParam String text) {
        return passwordEncoder.encode(text);
    }

    @PostMapping("/login")
    public LoginResponse authenticateUser(@RequestBody LoginRequest dto) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        LoginResponse response = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        response.setRoles(roles);
        return response;
    }

}
