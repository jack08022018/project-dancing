package com.demo.service;

import com.demo.dto.ResultDto;
import com.demo.entity.ClassInfoEntity;

public interface ApiService {
    ResultDto getClassList(ClassInfoEntity dto);
    ResultDto saveClass(ClassInfoEntity dto);
}
