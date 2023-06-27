package com.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class AssignDto<T> {
    private Integer idClass;
    private Integer idStudent;
    private Integer idEmployee;
}
