package com.demo.service;

import com.demo.config.jwt.payload.LoginRequest;
import com.demo.config.jwt.payload.LoginResponse;
import com.demo.dto.StudentInfo;
import com.demo.entity.ClassInfoEntity;
import com.demo.entity.StudentInfoEntity;
import com.demo.entity.StudioInfoEntity;
import org.springframework.ui.ModelMap;

import java.util.List;

public interface ApiService {
    List<ClassInfoEntity> getClassList(ClassInfoEntity dto);
    List<StudioInfoEntity> getStudioList(StudioInfoEntity dto);
    boolean saveClass(ClassInfoEntity dto);
    boolean saveStudio(StudioInfoEntity dto);
    List<StudentInfo> getStudentList(StudentInfoEntity dto);
    ModelMap getStudentInfo(StudentInfoEntity dto) throws Exception;
    ModelMap getStudentData(String mobile) throws Exception;
    boolean saveStudent(StudentInfoEntity dto) throws Exception;
    LoginResponse login(LoginRequest dto);
}
