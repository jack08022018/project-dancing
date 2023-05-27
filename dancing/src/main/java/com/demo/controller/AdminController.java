package com.demo.controller;


import com.demo.dto.ResultDto;
import com.demo.entity.ClassInfoEntity;
import com.demo.service.ApiService;
import com.demo.utils.CommonUtils;
import com.demo.utils.ExcuteApi;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/admin")
@RequiredArgsConstructor
public class AdminController {
    final ApiService apiService;
    final Gson gson;
    final ObjectMapper customObjectMapper;
    final CommonUtils commonUtils;

    @PostMapping("/saveClassInfo")
    public ResultDto saveClassInfo(@RequestBody ClassInfoEntity dto) {
        ExcuteApi<Boolean> excuteApi = () -> apiService.saveClass(dto);
        return commonUtils.handleApi(excuteApi);
    }

}
