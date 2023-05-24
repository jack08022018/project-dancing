package com.demo.config.jwt.payload;

public class LoginResponse {
    String accessToken;
    String issuedAt;
    String expiration;
    String tokenType = "Bearer";
}