package com.demo.repository;

import com.demo.entity.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfoEntity, Integer> {
    @Query(value = "select count(*) from user_info where mobile = :mobile")
    Integer checkUserExist(@Param("mobile") String mobile);
}
