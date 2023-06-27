package com.demo.controller;


import com.demo.dto.ClassInfoInterface;
import com.demo.dto.ResultDto;
import com.demo.dto.StudentInfo;
import com.demo.entity.ClassInfoEntity;
import com.demo.entity.StudentAssignEntity;
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
@RequestMapping(value = "/employee")
@RequiredArgsConstructor
public class EmployeeController {
    final ApiService apiService;
    final CommonUtils commonUtils;

    @PostMapping("/getClassList")
    public ResultDto<List<ClassInfoEntity>> getClassList(@RequestBody ClassInfoEntity dto) {
        ExcuteApi<List<ClassInfoEntity>> excuteApi = () -> apiService.getClassList(dto);
        return commonUtils.handleApi(excuteApi);
    }

    @PostMapping("/getStudioList")
    public ResultDto<List<StudioInfoEntity>> getStudioList(@RequestBody StudioInfoEntity dto) {
        ExcuteApi<List<StudioInfoEntity>> excuteApi = () -> apiService.getStudioList(dto);
        return commonUtils.handleApi(excuteApi);
    }

    @PostMapping("/getStudentList")
    public ResultDto<List<StudentInfo>> getStudentList(@RequestBody StudentInfoEntity dto) {
        ExcuteApi<List<StudentInfo>> excuteApi = () -> apiService.getStudentList(dto);
        return commonUtils.handleApi(excuteApi);
    }

    @PostMapping("/saveStudent")
    public ResultDto<Boolean> saveStudent(@RequestBody StudentInfoEntity dto) {
        ExcuteApi<Boolean> excuteApi = () -> apiService.saveStudent(dto);
        return commonUtils.handleApi(excuteApi);
    }

    @PostMapping("/getStudentInfo")
    public ResultDto<ModelMap> getStudentInfo(@RequestBody StudentInfoEntity dto) {
        ExcuteApi<ModelMap> excuteApi = () -> apiService.getStudentInfo(dto);
        return commonUtils.handleApi(excuteApi);
    }

    @PostMapping("/getClassListCanAssign")
    public ResultDto<List<ClassInfoInterface>> getClassListCanAssign(@RequestBody ClassInfoEntity dto) {
        ExcuteApi<List<ClassInfoInterface>> excuteApi = () -> apiService.getClassListCanAssign(dto);
        return commonUtils.handleApi(excuteApi);
    }

    @PostMapping("/assignStudent")
    public ResultDto<Boolean> assignStudent(@RequestBody StudentAssignEntity dto) {
        ExcuteApi<Boolean> excuteApi = () -> apiService.assignStudent(dto);
        return commonUtils.handleApi(excuteApi);
    }

}
