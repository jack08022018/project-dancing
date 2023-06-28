package com.demo.repository;

import com.demo.dto.StudentInfo;
import com.demo.entity.StudentInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentInfoRepository extends JpaRepository<StudentInfoEntity, Integer> {
    @Query(value = "select count(*) from student_info where mobile = :mobile", nativeQuery = true)
    Integer checkUserExist(@Param("mobile") String mobile);

    @Query(value = """
            SELECT A.id, A.name, A.mobile, C.song_title
            FROM student_info A
            	left join student_assign B
            		on B.id_student = A.id
            	left join class_info C
            		on C.id = B.id_class and C.status = 'OPEN'
            WHERE 1=1
            	AND (NULLIF(:#{#params.name}, '') IS NULL OR A.name LIKE %:#{#params.name}%)
            	AND (NULLIF(:#{#params.mobile}, '') IS NULL OR A.mobile LIKE %:#{#params.mobile}%)
            """, nativeQuery = true)
    List<StudentInfo> getStudentList(@Param("params") StudentInfoEntity params);

    @Query(value = "SELECT A.name, A.mobile" +
            "       FROM student_info A" +
            "       WHERE A.mobile = :mobile", nativeQuery = true)
    StudentInfo getStudentData(@Param("mobile") String mobile);

}
