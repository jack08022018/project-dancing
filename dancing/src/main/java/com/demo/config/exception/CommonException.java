package com.demo.config.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommonException extends Exception {
    private String status;

    public CommonException() {}

    public CommonException(String status, String message) {
        super(message);
        this.status = status;
    }
}
