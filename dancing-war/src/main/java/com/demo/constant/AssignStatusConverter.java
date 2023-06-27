package com.demo.constant;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class AssignStatusConverter implements AttributeConverter<AssignStatus, String> {

    @Override
    public String convertToDatabaseColumn(AssignStatus assignStatus) {
        if (assignStatus == null) {
            return null;
        }
        return assignStatus.getCode();
    }

    @Override
    public AssignStatus convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }
        return Stream.of(AssignStatus.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}