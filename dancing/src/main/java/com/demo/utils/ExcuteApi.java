package com.demo.utils;

@FunctionalInterface
public interface ExcuteApi<T> {
    T apply() throws Exception;
}
