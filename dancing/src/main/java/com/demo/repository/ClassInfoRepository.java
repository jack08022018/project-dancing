package com.demo.repository;

import com.demo.entity.ClassInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassInfoRepository extends JpaRepository<ClassInfoEntity, Long> {
//    @Query(value = """
//            SELECT A.*
//            FROM class_info A
//            WHERE 1=1
//                AND (:#{#params.id} IS NULL OR A.id = :#{#params.id})
//                AND (:#{#params.songTitle} IS NULL OR A.song_title LIKE '%'||:#{#params.songTitle}||'%')
//        """, nativeQuery = true)
@Query(value = "SELECT A.*" +
        "            FROM class_info A" +
        "            WHERE 1=1" +
        "                AND (:#{#params.id} IS NULL OR A.id = :#{#params.id})" +
        "                AND (:#{#params.songTitle} IS NULL OR A.song_title LIKE '%'||:#{#params.songTitle}||'%')", nativeQuery = true)
    List<ClassInfoEntity> getClassList(@Param("params") ClassInfoEntity params);
}
