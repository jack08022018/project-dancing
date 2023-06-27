package com.demo.config.jwt.payload;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;

@Getter
@Setter
@Accessors(chain = true)
public class LoginResponse {
    private String accessToken;
    private String issuedAt;
    private String expiration;
    private String tokenType = "Bearer";
    private String username;
    private List<String> roles;
}