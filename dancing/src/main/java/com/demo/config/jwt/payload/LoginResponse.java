package com.demo.config.jwt.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponse {
    private String accessToken;
    private String issuedAt;
    private String expiration;
    private String tokenType = "Bearer";
}