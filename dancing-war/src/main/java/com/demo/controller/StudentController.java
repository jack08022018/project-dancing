package com.demo.controller;


import com.demo.dto.ResultDto;
import com.demo.dto.StudentInfo;
import com.demo.entity.ClassInfoEntity;
import com.demo.entity.StudentInfoEntity;
import com.demo.entity.StudioInfoEntity;
import com.demo.service.ApiService;
import com.demo.utils.CommonUtils;
import com.demo.utils.ExcuteApi;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/student")
@RequiredArgsConstructor
public class StudentController {
    final ApiService apiService;
    final CommonUtils commonUtils;

    @PostMapping("/getStudentData")
    public ResultDto<ModelMap> getStudentData(@RequestBody StudentInfoEntity dto) {
        ExcuteApi<ModelMap> excuteApi = () -> apiService.getStudentData(dto.getMobile());
        return commonUtils.handleApi(excuteApi);
    }

}
