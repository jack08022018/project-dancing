package com.demo.service;

import com.demo.constant.ResponseStatus;
import com.demo.dto.ActorDto;
import com.demo.dto.ResultDto;
import com.demo.entity.ClassInfoEntity;
import com.demo.repository.ActorRepository;
import com.demo.repository.ClassInfoRepository;
import com.demo.utils.CommonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApiServiceImpl implements ApiService {
    final ActorRepository actorRepository;
    final R2dbcEntityTemplate entityTemplate;
    final DatabaseClient databaseClient;
    final CommonUtils commonUtils;
    final ClassInfoRepository classInfoRepository;

    @Override
    public ResultDto getData() {
        List<ActorDto> response1 = actorRepository.findCTE()
                .collectList()
                .block();
        return ResultDto.builder()
                .data(response1)
                .build();
    }

    @Override
//    @SneakyThrows
    @Transactional(rollbackFor = Exception.class)
    public ResultDto saveClass() {
        var entity = ClassInfoEntity.builder()
                .songTitle("Song diện Yến Tuân")
                .status("OPEN")
                .startDate(LocalDateTime.now().plusDays(15))
                .endDate(LocalDateTime.now().plusDays(45))
                .startTime("18:00")
                .endTime("19:00")
                .address("502 Điện Biên Phủ")
                .createDate(LocalDateTime.now())
                .last_update(LocalDateTime.now())
                .build();
        classInfoRepository.save(entity).block();
        return ResultDto.builder()
                .status(ResponseStatus.SUCCESS.getCode())
                .build();
    }

}
