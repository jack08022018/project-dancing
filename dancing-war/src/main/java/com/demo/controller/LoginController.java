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
    final PasswordEncoder passwordEncoder;
    final ApiService apiService;
    final CommonUtils commonUtils;

    @GetMapping("/encode")
    public String encode(@RequestParam String text) {
        return passwordEncoder.encode(text);
    }

    @PostMapping("/login")
    public ResultDto<LoginResponse> login(@RequestBody LoginRequest dto) {
        ExcuteApi<LoginResponse> excuteApi = () -> apiService.login(dto);
        return commonUtils.handleApi(excuteApi);
    }

}
