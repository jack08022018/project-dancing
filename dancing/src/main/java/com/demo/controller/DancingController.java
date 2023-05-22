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
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/api")
@RequiredArgsConstructor
public class DancingController {
    final ApiService apiService;
    final Gson gson;
    final ObjectMapper customObjectMapper;
    final CommonUtils commonUtils;

    @PostMapping("/getClassList")
    public ResultDto getData(@RequestBody ClassInfoEntity dto) {
        ExcuteApi excuteApi = () -> apiService.getClassList(dto);
        return commonUtils.handleApi(excuteApi);
    }

    @PostMapping("/saveClassInfo")
    public ResultDto saveClassInfo(@RequestBody ClassInfoEntity dto) {
        ExcuteApi excuteApi = () -> apiService.saveClass(dto);
        return commonUtils.handleApi(excuteApi);
    }

}
