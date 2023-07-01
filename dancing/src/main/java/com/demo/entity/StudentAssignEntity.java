package com.demo.entity;

import com.demo.constant.AssignStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "student_assign")
public class StudentAssignEntity implements Serializable {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_class", nullable = false)
    private Long idClass;

    @Column(name = "id_student", nullable = false)
    private Long idStudent;

    @Column(name = "id_employee", nullable = false)
    private Long idEmployee;

    @Column(name = "mobile_employee", nullable = false)
    private String mobileEmployee;

    @Column(nullable = false)
    private AssignStatus status;

    @Column
    private String notes;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "last_update")
    private LocalDateTime lastUpdate;

}
