package com.demo.dto;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface StudentInfo {
//    @Value("#{target.title}")
    Integer getId();
    String getName();
    String getMobile();

}
