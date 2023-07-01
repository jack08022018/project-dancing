package com.demo.repository;

import com.demo.dto.ClassInfoInterface;
import com.demo.dto.StudentAssignInfo;
import com.demo.dto.StudentStatusDto;
import com.demo.entity.ClassInfoEntity;
import com.demo.entity.StudentAssignEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

    @Query(value = """
                select C.name, C.mobile, C.facebook, B.notes, B.id as id, B.status
                from class_info A
                	inner join student_assign B
                		on B.id_class = A.id and B.status != 'DELETE'
                			AND A.status = 'OPEN'
                	inner join student_info C on C.id = B.id_student
                where id_class = :id
                order by C.create_date
            """, nativeQuery = true)
    List<StudentAssignInfo> getAllStudentOfClass(@Param("id") long id);

    @Modifying
    @Transactional
    @Query(value = """
                update student_assign
                set status = :#{#params.status},
                    notes = :#{#params.notes}
                where id = :#{#params.id}
            """, nativeQuery = true)
    void changeStudentStatus(@Param("params") StudentStatusDto params);
}
