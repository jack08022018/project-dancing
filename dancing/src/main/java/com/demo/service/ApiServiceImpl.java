package com.demo.service;

import com.demo.config.exception.CommonException;
import com.demo.constant.ResponseStatus;
import com.demo.constant.UserStatus;
import com.demo.constant.UserType;
import com.demo.dto.StudentInfo;
import com.demo.entity.ClassInfoEntity;
import com.demo.entity.UserEntity;
import com.demo.entity.StudentInfoEntity;
import com.demo.repository.ClassInfoRepository;
import com.demo.repository.StudentInfoRepository;
import com.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApiServiceImpl implements ApiService {
    final ClassInfoRepository classInfoRepository;
    final UserRepository userRepository;
    final StudentInfoRepository studentInfoRepository;
    final PasswordEncoder passwordEncoder;

    @Override
    public List<ClassInfoEntity> getClassList(ClassInfoEntity dto) {
        return classInfoRepository.getClassList(dto);
    }

    @Override
//    @SneakyThrows
    @Transactional(rollbackFor = {Exception.class, RuntimeException.class})
    public boolean saveClass(ClassInfoEntity dto) {
        dto.setLastUpdate(LocalDateTime.now());
        classInfoRepository.save(dto);
        return true;
    }

    @Override
    public List<StudentInfo> getStudentList(StudentInfoEntity dto) {
        return studentInfoRepository.getStudentList(dto);
    }

    @Override
    public ModelMap getStudentInfo(StudentInfoEntity dto) throws Exception {
        ModelMap result = new ModelMap();
        Optional<StudentInfoEntity> info = studentInfoRepository.findById(dto.getId());
        if(!info.isPresent()) {
            throw new Exception("Student is not existed");
        }
        result.put("info", info.get());
        return null;
    }

    @Override
    @Transactional(rollbackFor = {Exception.class, RuntimeException.class})
    public boolean saveStudent(StudentInfoEntity userInfo) throws Exception {
        if (userInfo.getId() == null) {
            if(studentInfoRepository.checkUserExist(userInfo.getMobile()) > 0) {
                throw new CommonException(ResponseStatus.ERROR.getCode(), "This mobile is registered !");
            }
            UserEntity user = new UserEntity()
                    .setUsername(userInfo.getName())
                    .setUserType(UserType.USER)
                    .setStatus(UserStatus.ACTIVE)
                    .setPassword(passwordEncoder.encode(userInfo.getMobile()))
                    .setCreateDate(LocalDateTime.now())
                    .setLastUpdate(LocalDateTime.now());
            user = userRepository.save(user);
            userInfo.setId(user.getId());
            userInfo.setCreateDate(LocalDateTime.now());
        }
        userInfo.setLastUpdate(LocalDateTime.now());
        studentInfoRepository.save(userInfo);
        return true;
    }

}
