package com.demo.controller;


import com.demo.dto.ResultDto;
import com.demo.entity.ClassInfoEntity;
import com.demo.entity.UserInfoEntity;
import com.demo.service.ApiService;
import com.demo.utils.CommonUtils;
import com.demo.utils.ExcuteApi;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/employee")
@RequiredArgsConstructor
public class EmployeeController {
    final ApiService apiService;
    final CommonUtils commonUtils;

    @PostMapping("/getClassList")
    public ResultDto getData(@RequestBody ClassInfoEntity dto) {
        ExcuteApi<List<ClassInfoEntity>> excuteApi = () -> apiService.getClassList(dto);
        return commonUtils.handleApi(excuteApi);
    }

    @PostMapping("/getClassList")
    public ResultDto saveStudent(@RequestBody UserInfoEntity dto) {
        ExcuteApi<Boolean> excuteApi = () -> apiService.saveStudent(dto);
        return commonUtils.handleApi(excuteApi);
    }

}
