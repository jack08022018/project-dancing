package com.demo.config;

import com.demo.config.jwt.AuthEntryPointJwt;
import com.demo.config.jwt.AuthTokenFilter;
import com.demo.config.jwt.JwtUtils;
import com.demo.config.jwt.service.UserDetailsServiceImpl;
import com.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@RequiredArgsConstructor
//@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    final UserDetailsServiceImpl userDetailsService;
    final AuthEntryPointJwt unauthorizedHandler;
    final UserRepository userRepository;
    final JwtUtils jwtUtils;

//    @Bean
//    public AuditorAware<UserEntity> auditorProvider() {
//        return new AuditorAwareImpl(userRepository);
//    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter(jwtUtils, userDetailsService);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable()
                .httpBasic().disable()
                .formLogin().disable()
                .logout().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers("/css/**","/js/**","/extjs/**","/images/**").permitAll()
                .antMatchers("/login", "/view/*").permitAll()
                .antMatchers("/encode", "/admin/*").hasAnyAuthority("ADMIN")
                .antMatchers("/employee/*").hasAnyAuthority("ADMIN", "EMPLOYEE")
                .antMatchers("/employee/*").hasAnyAuthority("ADMIN", "EMPLOYEE")
                .antMatchers("/employee/getStudentData").hasAnyAuthority("ADMIN", "EMPLOYEE", "USER")
                .anyRequest().authenticated();
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }

//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        web.ignoring()
//            .antMatchers("/resources/**"); // Permit access to resources
//    }
}