package com.demo.service;

import com.demo.constant.ResponseStatus;
import com.demo.dto.ResultDto;
import com.demo.entity.ClassInfoEntity;
import com.demo.repository.ActorRepository;
import com.demo.repository.ClassInfoRepository;
import com.demo.utils.CommonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApiServiceImpl implements ApiService {
    final ActorRepository actorRepository;
    final CommonUtils commonUtils;
    final ClassInfoRepository classInfoRepository;

    @Override
    public ResultDto getClassList(ClassInfoEntity dto) {
        List<ClassInfoEntity> data = classInfoRepository.getClassList(dto);
        return ResultDto.builder()
                .status(ResponseStatus.SUCCESS.getCode())
                .data(data)
                .build();
    }

    @Override
//    @SneakyThrows
    @Transactional(rollbackFor = Exception.class)
    public ResultDto saveClass(ClassInfoEntity dto) {
//        var entity = ClassInfoEntity.builder()
//                .songTitle("Song diện Yến Tuân")
//                .status("OPEN")
//                .startDate(LocalDateTime.now().plusDays(15))
//                .endDate(LocalDateTime.now().plusDays(45))
//                .startTime("18:00")
//                .endTime("19:00")
//                .address("502 Điện Biên Phủ")
//                .createDate(LocalDateTime.now())
//                .lastUpdate(LocalDateTime.now())
//                .build();
        dto.setLastUpdate(LocalDateTime.now());
        classInfoRepository.save(dto);
        return ResultDto.builder()
                .status(ResponseStatus.SUCCESS.getCode())
                .build();
    }

}
