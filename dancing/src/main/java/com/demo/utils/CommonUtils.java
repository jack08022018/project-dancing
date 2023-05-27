package com.demo.utils;

import com.demo.config.exception.CommonException;
import com.demo.constant.ResponseStatus;
import com.demo.dto.ResultDto;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
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
            return ResultDto.builder()
                    .status(ResponseStatus.SUCCESS.getCode())
                    .data(excuteApi.apply())
                    .build();
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

//    public Date stringToDate(String date, String format) {
//        try {
//            return new SimpleDateFormat(format).parse(date);
//        } catch (ParseException e) {
//            return null;
//        }
//    }
//
    public String dateToString(Date date, String pattern) {
        if (date == null) {
            return null;
        }
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        return format.format(date);
    }

    public Map<String, String> getSppSignature(String params, String secretKey) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secretKey.getBytes(), "HmacSHA256"));
        byte[] hash = mac.doFinal(params.getBytes());
        String signature = Base64.getEncoder().encodeToString(hash);
        Map<String, String> result = new HashMap<>();
        result.put("params", params);
        result.put("signature", signature);
        return result;
    }
}
