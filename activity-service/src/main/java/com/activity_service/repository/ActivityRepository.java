package com.activity_service.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.activity_service.model.Activity;

@Repository
public interface ActivityRepository extends MongoRepository<Activity,String> {

}
