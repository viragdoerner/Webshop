package com.programwithvirag.restservice.RestApp.dao;

import com.programwithvirag.restservice.RestApp.model.Item;
import com.programwithvirag.restservice.RestApp.model.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer > {

    @Override
    List<Order> findAll();

}
