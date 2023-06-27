package com.demo.repository;

import com.demo.entity.StudentAssignEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentAssignRepository extends JpaRepository<StudentAssignEntity, Long> {

}
