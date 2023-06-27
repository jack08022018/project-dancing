package com.demo.repository;

import com.demo.entity.EmployeeInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeInfoRepository extends JpaRepository<EmployeeInfoEntity, Integer> {
    @Query(value = """
            select A.*
             from employee_info A
                inner join user B
                    on B.id = A.id
             where 1=1
                and B.status = 'ACTIVE'
                and A.mobile = :mobile)
            """, nativeQuery = true)
    EmployeeInfoEntity findByMobile(@Param("mobile") String mobile);
}
