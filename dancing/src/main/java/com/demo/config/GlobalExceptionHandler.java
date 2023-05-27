package com.demo.config;

import com.demo.config.exception.ErrorResponse;
import com.demo.utils.CommonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Date;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    final CommonUtils commonUtils;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> mainExceptionHandler(Exception e, HandlerMethod handlerMethod, HttpServletRequest request) {
        log.info("InternalExceptionHandler: {}", e.getMessage(), e);
        ErrorResponse response = ErrorResponse.builder()
                .timestamp(commonUtils.localDateToString(LocalDateTime.now(), "yyyy-MM-dd HH:mm:ss"))
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message(e.getMessage())
                .path(request.getRequestURI())
                .build();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }

}
