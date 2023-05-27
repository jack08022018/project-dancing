package com.demo.service;

import com.demo.entity.ClassInfoEntity;
import com.demo.entity.UserInfoEntity;

import java.util.List;

public interface ApiService {
    List<ClassInfoEntity> getClassList(ClassInfoEntity dto);
    boolean saveClass(ClassInfoEntity dto);
    boolean saveStudent(UserInfoEntity dto) throws Exception;
}
