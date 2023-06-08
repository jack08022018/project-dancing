package com.demo.dto;

import java.time.LocalDateTime;

public interface StudentInfo {
//    @Value("#{target.title}")
    Integer getId();
    String getName();
    String getMobile();
    LocalDateTime getTuitionFeeDate();
    LocalDateTime getExpiredDate();

}
