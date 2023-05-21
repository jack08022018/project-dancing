package com.demo.repository;

import com.demo.entity.ClassInfoEntity;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ClassInfoRepository extends ReactiveCrudRepository<ClassInfoEntity, Long> {

}
