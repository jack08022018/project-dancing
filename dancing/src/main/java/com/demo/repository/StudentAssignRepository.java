package com.demo.repository;

import com.demo.dto.ClassInfoInterface;
import com.demo.entity.ClassInfoEntity;
import com.demo.entity.StudentAssignEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentAssignRepository extends JpaRepository<StudentAssignEntity, Long> {
    @Query(value = """
                select count(*)
                from student_assign
                where id_class = :#{#params.idClass}
                    and id_student = :#{#params.idStudent}
                    and status != 'DELETE'
            """, nativeQuery = true)
    Integer checkStudentIsAssignedThisClass(@Param("params") StudentAssignEntity params);
}
