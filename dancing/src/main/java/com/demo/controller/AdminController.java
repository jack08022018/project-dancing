package com.demo.controller;


import com.demo.dto.ResultDto;
import com.demo.entity.ClassInfoEntity;
import com.demo.entity.StudentAssignEntity;
import com.demo.entity.StudioInfoEntity;
import com.demo.service.ApiService;
import com.demo.utils.CommonUtils;
import com.demo.utils.ExcuteApi;
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
    final CommonUtils commonUtils;

    @PostMapping("/saveClassInfo")
    public ResultDto saveClassInfo(@RequestBody ClassInfoEntity dto) {
        ExcuteApi<Boolean> excuteApi = () -> apiService.saveClass(dto);
        return commonUtils.handleApi(excuteApi);
    }

    @PostMapping("/saveStudio")
    public ResultDto saveStudio(@RequestBody StudioInfoEntity dto) {
        ExcuteApi<Boolean> excuteApi = () -> apiService.saveStudio(dto);
        return commonUtils.handleApi(excuteApi);
    }

    @PostMapping("/assignStudent")
    public ResultDto<Boolean> assignStudent(@RequestBody StudentAssignEntity dto) {
        ExcuteApi<Boolean> excuteApi = () -> apiService.assignStudentByAdmin(dto);
        return commonUtils.handleApi(excuteApi);
    }

}
