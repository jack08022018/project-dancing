package com.demo.constant;

import java.util.Arrays;

public enum UserType {
    ADMIN("ADMIN", ""),
    EMPLOYEE("EMPLOYEE", ""),
    USER("USER", "");

    private final String code;
    private final String detail;

    UserType(String code, String detail) {
        this.code = code;
        this.detail = detail;
    }

    public static UserType getEnum(String code) {
        return Arrays.stream(values())
                .filter(s -> s.getCode().equals(code))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No matching UserType for [" + code + "]"));
    }

    public String getCode() {
        return code;
    }
    public String getDetail() {
        return detail;
    }
}
