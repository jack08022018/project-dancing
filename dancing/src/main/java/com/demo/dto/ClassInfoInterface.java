package com.demo.dto;

import org.springframework.beans.factory.annotation.Value;

import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDateTime;

public interface ClassInfoInterface {
    Long getId();

    @Value("#{target.song_title}")
    String getSongTitle();

    @Value("#{target.start_date}")
    LocalDateTime getStartDate();

    @Value("#{target.end_date}")
    LocalDateTime getEndDate();

    @Value("#{target.start_time}")
    String getStartTime();

    @Value("#{target.end_time}")
    String getEndTime();

    @Value("#{target.min_student}")
    Integer getMinStudent();

    @Value("#{target.max_student}")
    Integer getMaxStudent();

    @Value("#{target.total_student_assign}")
    Integer getTotalStudentAssign();

    @Value("#{target.total_days}")
    Integer getTotalDays();

    @Value("#{target.studio_name}")
    String getStudioName();

    String getAddress();

}
