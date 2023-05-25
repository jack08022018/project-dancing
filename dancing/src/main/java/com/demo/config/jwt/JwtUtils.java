package com.demo.config.jwt;

import com.demo.config.jwt.payload.LoginResponse;
import com.demo.config.jwt.service.UserDetailsImpl;
import com.demo.utils.CommonUtils;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtils {
    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private long jwtExpirationMs;

    final CommonUtils commonUtils;

    public String parseJwt(HttpServletRequest request) throws Exception {
        String headerAuth = request.getHeader("Authorization");
        if (!(StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer "))) {
            throw new Exception("Missing bearer token");
        }
        return headerAuth.substring(7);
    }

    public LoginResponse generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        Date issuedAt = new Date();
        Date expiration = new Date(issuedAt.getTime() + jwtExpirationMs);
        String token = Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
        String pattern = "yyyy-MM-dd HH:mm:ss";
        return LoginResponse.builder()
                .accessToken(token)
                .issuedAt(commonUtils.dateToString(issuedAt, pattern))
                .expiration(commonUtils.dateToString(expiration, pattern))
                .build();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public void validateJwtToken(String authToken) {
        try {
            Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(authToken);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw e;
        }
    }
}
