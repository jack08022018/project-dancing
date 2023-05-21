package com.demo.controller;


import com.demo.dto.ResultDto;
import com.demo.service.ApiService;
import com.demo.utils.CommonUtils;
import com.demo.utils.ExcuteApi;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping(value = "/api")
@RequiredArgsConstructor
public class DancingController {
    final ApiService apiService;
    final Gson gson;
    final ObjectMapper customObjectMapper;
    final CommonUtils commonUtils;

    @PostMapping("/getData")
    public ResultDto getData() {
        ExcuteApi excuteApi = () -> apiService.getData();
        return commonUtils.handleApi(excuteApi);
    }

    @PostMapping("/saveClass")
    public ResultDto saveClass() {
        ExcuteApi excuteApi = () -> apiService.saveClass();
        return commonUtils.handleApi(excuteApi);
    }

}
