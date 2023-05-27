package com.demo.service;

import com.demo.config.exception.CommonException;
import com.demo.constant.ResponseStatus;
import com.demo.constant.UserStatus;
import com.demo.constant.UserType;
import com.demo.entity.ClassInfoEntity;
import com.demo.entity.UserEntity;
import com.demo.entity.UserInfoEntity;
import com.demo.repository.ClassInfoRepository;
import com.demo.repository.UserInfoRepository;
import com.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApiServiceImpl implements ApiService {
    final ClassInfoRepository classInfoRepository;
    final UserRepository userRepository;
    final UserInfoRepository userInfoRepository;
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
    @Transactional(rollbackFor = {Exception.class, RuntimeException.class})
    public boolean saveStudent(UserInfoEntity userInfo) throws Exception {
        if (userInfo.getId() == null) {
            if(userInfoRepository.checkUserExist(userInfo.getMobile()) > 0) {
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
        userInfoRepository.save(userInfo);
        return true;
    }

}
