package com.demo.constant;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class UserStatusConverter implements AttributeConverter<UserStatus, String> {

    @Override
    public String convertToDatabaseColumn(UserStatus status) {
        if (status == null) {
            return null;
        }
        return status.name();
    }

    @Override
    public UserStatus convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }
        return Stream.of(UserStatus.values())
                .filter(c -> c.name().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}