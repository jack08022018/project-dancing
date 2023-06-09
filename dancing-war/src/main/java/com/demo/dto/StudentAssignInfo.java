package com.demo.dto;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface StudentAssignInfo {
    @Value("#{target.title}")
    String getTitle();

    @Value("#{target.rental_date}")
    LocalDateTime getRentalDate();

}
