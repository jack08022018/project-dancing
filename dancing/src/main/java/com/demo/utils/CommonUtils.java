package com.demo.utils;

import com.demo.config.exception.CommonException;
import com.demo.constant.ResponseStatus;
import com.demo.dto.ResultDto;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
@RequiredArgsConstructor
public class CommonUtils {
    final Gson gson;

    public ResultDto handleApi(ExcuteApi excuteApi) {
        try {
            return excuteApi.apply();
        }catch (CommonException e) {
            log.error("CommonExceptionHandle: " + e.getMessage(), e);
            return ResultDto.builder()
                    .status(e.getStatus())
                    .message(e.getMessage())
                    .build();
        }catch (Exception e) {
            log.error("ExceptionHandle: " + e.getMessage(), e);
            return ResultDto.builder()
                    .status(ResponseStatus.ERROR.getCode())
                    .message(e.getMessage())
                    .build();
        }
    }

    public String localDateToString(LocalDateTime date, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return date.format(formatter);
    }
}
