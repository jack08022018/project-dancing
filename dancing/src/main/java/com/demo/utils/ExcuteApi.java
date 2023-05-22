package com.demo.utils;

import com.demo.dto.ResultDto;

@FunctionalInterface
public interface ExcuteApi {
    ResultDto apply() throws Exception;
}
