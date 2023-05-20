package com.demo.service;

import com.demo.constant.ResponseStatus;
import com.demo.dto.ActorDto;
import com.demo.dto.ResultDto;
import com.demo.repository.ActorRepository;
import com.demo.utils.CommonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApiServiceImpl implements ApiService {
    final ActorRepository actorRepository;
    final R2dbcEntityTemplate entityTemplate;
    final DatabaseClient databaseClient;
    final CommonUtils commonUtils;

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
    public ResultDto saveData() {
        return null;
//        var oldEntity = ActorDto.builder()
//                .city("new")
//                .build();
//        return actorRepository.findById(1L)
//                .doOnNext(s -> {
////                    s.setMessage(RandomStringUtils.randomAlphanumeric(6));
//                })
//                .flatMap(actorRepository::save)
////                .flatMap(s -> testTableOldRepository.save(oldEntity))
//                .handle((s, sink) -> {
//                })
//                .then(Mono.just(ResultDto.builder()
//                        .responseStatus(ResponseStatus.SUCCESS.getCode())
//                        .build()));
    }

}
