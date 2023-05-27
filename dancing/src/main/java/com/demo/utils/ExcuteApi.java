package com.demo.utils;

import com.demo.dto.ResultDto;

@FunctionalInterface
public interface ExcuteApi<T> {
    T apply() throws Exception;
}
