package com.demo.utils;

import com.demo.config.exception.CommonException;
import com.demo.constant.ResponseStatus;
import com.demo.dto.ResultDto;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;

@Slf4j
@Component
@RequiredArgsConstructor
public class CommonUtils {
    final Gson gson;
    final Environment env;

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

    public LocalDateTime milisecondToLocaleDate(long millis) {
        Instant instant = Instant.ofEpochMilli(millis);
        LocalDateTime date = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
        return date;
    }
    public <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
        Set<Object> seen = ConcurrentHashMap.newKeySet();
        return t -> seen.add(keyExtractor.apply(t));
    }
    public String getPropertyValue(String key) throws Exception {
        String result = env.getProperty(key);
        if(result == null) {
            throw new Exception("Property " + key + " null");
        }
        return result;
    }
}
