package com.demo.repository;

import com.demo.dto.StudentInfo;
import com.demo.entity.StudentInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentInfoRepository extends JpaRepository<StudentInfoEntity, Integer> {
    @Query(value = "select count(*) from student_info where mobile = :mobile", nativeQuery = true)
    Integer checkUserExist(@Param("mobile") String mobile);

    @Query(value = "SELECT A.id, A.name, A.mobile" +
            "       FROM student_info A" +
            "       WHERE 1=1" +
            "           AND (:#{#params.name} IS NULL OR A.name LIKE '%'||:#{#params.name}||'%')" +
            "           AND (:#{#params.mobile} IS NULL OR A.mobile LIKE '%'||:#{#params.mobile}||'%')", nativeQuery = true)
    List<StudentInfo> getStudentList(@Param("params") StudentInfoEntity params);

}
