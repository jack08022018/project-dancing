package com.demo.service;

import com.demo.dto.ResultDto;
import reactor.core.publisher.Mono;

public interface ApiService {
    ResultDto getData();
    ResultDto saveData();
}
