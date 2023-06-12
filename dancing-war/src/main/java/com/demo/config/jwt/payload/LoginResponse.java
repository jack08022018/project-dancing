package com.demo.config.jwt.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class LoginResponse {
    private String accessToken;
    private String issuedAt;
    private String expiration;
    private String tokenType = "Bearer";
    private String username;
    private List<String> roles;
}