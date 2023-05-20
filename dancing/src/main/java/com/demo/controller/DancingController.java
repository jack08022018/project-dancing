package com.demo.controller;


import com.demo.dto.ResultDto;
import com.demo.service.ApiService;
import com.demo.utils.CommonUtils;
import com.demo.utils.ExcuteApi;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/api")
@RequiredArgsConstructor
public class DancingController {
    final ApiService apiService;
    final Gson gson;
    final ObjectMapper customObjectMapper;
    final CommonUtils commonUtils;

    @GetMapping("/getData")
    public ResultDto getData() {
        ExcuteApi excuteApi = () -> apiService.getData();
        return commonUtils.handleApi(excuteApi);
    }

//    @PostMapping("/saveData")
//    public Mono<ResultDto> saveData() {
//        ExcuteApi excuteApi = () -> apiService.saveData();
//        return commonUtils.handleApi(excuteApi);
//    }

}
