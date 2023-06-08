package com.demo.service;

import com.demo.dto.StudentInfo;
import com.demo.entity.ClassInfoEntity;
import com.demo.entity.StudentInfoEntity;
import org.springframework.ui.ModelMap;

import java.util.List;

public interface ApiService {
    List<ClassInfoEntity> getClassList(ClassInfoEntity dto);
    boolean saveClass(ClassInfoEntity dto);
    List<StudentInfo> getStudentList(StudentInfoEntity dto);
    ModelMap getStudentInfo(StudentInfoEntity dto) throws Exception;
    ModelMap getStudentData(String mobile) throws Exception;
    boolean saveStudent(StudentInfoEntity dto) throws Exception;
}
