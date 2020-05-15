package com.programwithvirag.restservice.RestApp.dao;

import com.programwithvirag.restservice.RestApp.model.Ordermodel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Ordermodel, Integer > {


    @Override
    List<Ordermodel> findAll();


}
