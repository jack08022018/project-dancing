package com.demo.service;

import com.demo.config.exception.CommonException;
import com.demo.config.jwt.JwtUtils;
import com.demo.config.jwt.payload.LoginRequest;
import com.demo.config.jwt.payload.LoginResponse;
import com.demo.config.jwt.service.UserDetailsImpl;
import com.demo.constant.AssignStatus;
import com.demo.constant.ResponseStatus;
import com.demo.constant.UserStatus;
import com.demo.constant.UserType;
import com.demo.dto.ClassInfoInterface;
import com.demo.dto.StudentInfo;
import com.demo.entity.*;
import com.demo.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApiServiceImpl implements ApiService {
    final ClassInfoRepository classInfoRepository;
    final UserRepository userRepository;
    final StudentInfoRepository studentInfoRepository;
    final PasswordEncoder passwordEncoder;
    final AuthenticationManager authenticationManager;
    final JwtUtils jwtUtils;
    final StudioInfoRepository studioInfoRepository;
    final StudentAssignRepository studentAssignRepository;
    final EmployeeInfoRepository employeeInfoRepository;

    @Override
    public List<ClassInfoEntity> getClassList(ClassInfoEntity dto) {
        return classInfoRepository.getClassList(dto);
    }

    @Override
    public List<StudioInfoEntity> getStudioList(StudioInfoEntity dto) {
        return studioInfoRepository.getStudioList(dto);
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
    public boolean saveStudio(StudioInfoEntity dto) {
        if(dto.getCreateDate() == null) {
            dto.setCreateDate(LocalDateTime.now());
        }
        dto.setLastUpdate(LocalDateTime.now());
        studioInfoRepository.save(dto);
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
        return result;
    }

    @Override
    public ModelMap getStudentData(String mobile) throws Exception {
        ModelMap result = new ModelMap();
        StudentInfo info = studentInfoRepository.getStudentData(mobile);
        if(info == null) {
            throw new Exception("Student is not existed");
        }
        result.put("info", info);
        return result;
    }

    @Override
    @Transactional(rollbackFor = {Exception.class, RuntimeException.class})
    public boolean saveStudent(StudentInfoEntity info) throws Exception {
        if (info.getId() == null) {
            if(studentInfoRepository.checkUserExist(info.getMobile()) > 0) {
                throw new CommonException(ResponseStatus.ERROR.getCode(), "Số điện thoại đã được đăng ký !");
            }
            UserEntity user = new UserEntity()
                    .setUsername(info.getMobile())
                    .setUserType(UserType.USER)
                    .setStatus(UserStatus.ACTIVE)
                    .setPassword(passwordEncoder.encode(info.getMobile()))
                    .setCreateDate(LocalDateTime.now())
                    .setLastUpdate(LocalDateTime.now());
            user = userRepository.save(user);
            info.setId(user.getId());
            info.setCreateDate(LocalDateTime.now());
        }
        info.setLastUpdate(LocalDateTime.now());
        studentInfoRepository.save(info);
        return true;
    }

    @Override
    public LoginResponse login(LoginRequest dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        LoginResponse response = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        response.setRoles(roles);
        response.setUsername(dto.getUsername());
        return response;
    }

    @Override
    public List<ClassInfoInterface> getClassListCanAssign(ClassInfoEntity dto) {
        return classInfoRepository.getClassListCanAssign(dto);
    }

    @Override
    @Transactional(rollbackFor = {Exception.class, RuntimeException.class})
    public boolean assignStudent(StudentAssignEntity dto) throws Exception {
        var classInfo = classInfoRepository.findClassToAssign(dto.getIdClass());
        int totalStudentAssign = classInfo.getTotalStudentAssign();
        if(totalStudentAssign >= classInfo.getMaxStudent()) {
            throw new CommonException(ResponseStatus.ERROR.getCode(), "Class is full: " + totalStudentAssign + " member!");
        }
        if(studentAssignRepository.checkStudentIsAssignedThisClass(dto) > 0) {
            throw new CommonException(ResponseStatus.ERROR.getCode(), "Student is assigned to this class before!");
        }
        var employee = employeeInfoRepository.findByMobile(dto.getMobileEmployee());
        if(employee == null) {
            throw new CommonException(ResponseStatus.ERROR.getCode(), "Employee not found with mobile: " + dto.getMobileEmployee());
        }
        dto.setIdEmployee(employee.getId());
        dto.setStatus(AssignStatus.ASSIGN);
        dto.setCreateDate(LocalDateTime.now());
        studentAssignRepository.save(dto);
        classInfo.setTotalStudentAssign(totalStudentAssign + 1);
        classInfo.setLastUpdate(LocalDateTime.now());
        classInfoRepository.save(classInfo);
        return true;
    }

    @Override
    @Transactional(rollbackFor = {Exception.class, RuntimeException.class})
    public boolean assignStudentByAdmin(StudentAssignEntity dto) throws Exception {
        var classInfo = classInfoRepository.findClassToAssign(dto.getIdClass());
        int totalStudentAssign = classInfo.getTotalStudentAssign();
        if(totalStudentAssign >= classInfo.getMaxStudent()) {
            throw new CommonException(ResponseStatus.ERROR.getCode(), "Class is full: " + totalStudentAssign + " member!");
        }
        if(studentAssignRepository.checkStudentIsAssignedThisClass(dto) > 0) {
            throw new CommonException(ResponseStatus.ERROR.getCode(), "Student is assigned to this class before!");
        }
        var admin = userRepository.findByUsername("admin");
        dto.setIdEmployee(admin.getId());
        dto.setMobileEmployee("999999999");
        dto.setStatus(AssignStatus.ASSIGN);
        dto.setCreateDate(LocalDateTime.now());
        studentAssignRepository.save(dto);
        classInfo.setTotalStudentAssign(totalStudentAssign + 1);
        classInfo.setLastUpdate(LocalDateTime.now());
        classInfoRepository.save(classInfo);
        return true;
    }

}
