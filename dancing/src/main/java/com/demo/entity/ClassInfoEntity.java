package com.demo.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table("class_info")
public class ClassInfoEntity implements Serializable {
    @Id
    private Long id;

    @Column("song_title")
    private String songTitle;

    @Column("start_date")
    private LocalDateTime startDate;

    @Column("end_date")
    private LocalDateTime endDate;

    @Column("start_time")
    private String startTime;

    @Column("end_time")
    private String endTime;

    @Column("address")
    private String address;

    @Column("status")
    private String status;

    @Column("create_date")
    private LocalDateTime createDate;

    @Column("last_update")
    private LocalDateTime last_update;

}
