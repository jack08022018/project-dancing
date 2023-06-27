package com.demo.repository;

import com.demo.dto.ClassInfoInterface;
import com.demo.entity.ClassInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import java.util.List;

@Repository
public interface ClassInfoRepository extends JpaRepository<ClassInfoEntity, Long> {
    @Query(value = """
            SELECT A.*
            FROM class_info A
            WHERE 1=1
                AND (:#{#params.id} IS NULL OR A.id = :#{#params.id})
                AND (:#{#params.songTitle} IS NULL OR A.song_title LIKE '%'||:#{#params.songTitle}||'%')
        """, nativeQuery = true)
    List<ClassInfoEntity> getClassList(@Param("params") ClassInfoEntity params);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query(value = """
            SELECT A
            FROM ClassInfoEntity A
            WHERE A.id = :id
        """)
    ClassInfoEntity findClassToAssign(@Param("id") long id);

    @Query(value = """
            select A.id, A.song_title, A.start_date, A.end_date, A.start_time, A.end_time, A.min_student,
                A.total_student_assign, A.max_student, A.total_days, B.studio_name, B.address
             from class_info A
                left join studio_info B
                    on B.id = A.studio_id
             where 1=1
                and A.status = 'OPEN'
                and A.total_student_assign <= A.max_student
                and DATE_FORMAT(CURDATE(), '%Y%m%d') < DATE_FORMAT(A.end_date, '%Y%m%d')
                and (:#{#params.id} IS NULL OR A.id = :#{#params.id})
                 and (:#{#params.songTitle} IS NULL OR A.song_title LIKE '%'||:#{#params.songTitle}||'%')
            """, nativeQuery = true)
    List<ClassInfoInterface> getClassListCanAssign(@Param("params") ClassInfoEntity params);
}
