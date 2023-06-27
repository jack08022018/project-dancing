package com.demo.repository;

import com.demo.entity.StudioInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudioInfoRepository extends JpaRepository<StudioInfoEntity, Long> {
    @Query(value = "SELECT A.*" +
        "            FROM studio_info A" +
        "            WHERE 1=1" +
        "                AND (:#{#params.studioName} IS NULL OR A.studio_name LIKE '%'||:#{#params.studioName}||'%')" +
        "                AND (:#{#params.address} IS NULL OR A.address LIKE '%'||:#{#params.address}||'%')", nativeQuery = true)
    List<StudioInfoEntity> getStudioList(@Param("params") StudioInfoEntity params);
}
