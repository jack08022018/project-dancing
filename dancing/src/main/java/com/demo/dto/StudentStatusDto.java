package com.demo.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class StudentStatusDto {
    private Long id;
    private String status;
    private String notes;
    private String mobile;
}
