package com.programwithvirag.restservice.RestApp.api;


import com.programwithvirag.restservice.RestApp.dao.ItemDAO;
import com.programwithvirag.restservice.RestApp.dao.UserRepository;
import com.programwithvirag.restservice.RestApp.message.request.UpdateOrder;
import com.programwithvirag.restservice.RestApp.model.Item;
import com.programwithvirag.restservice.RestApp.model.Ordermodel;
import com.programwithvirag.restservice.RestApp.model.User;
import com.programwithvirag.restservice.RestApp.service.OrderService;
import com.programwithvirag.restservice.RestApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping(value = "/orders")
@CrossOrigin(origins = "*")
public class OrderResource {


    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;


    @PostMapping
    public User addOrdermodel(@RequestBody Ordermodel ordermodel){
        return userService.addOrder(ordermodel);
        //return orderService.addOrder(ordermodel);
    }

    @GetMapping
    public List<Ordermodel> getOrdermodels(){
        return orderService.getOrderList();
    }

    @GetMapping (value ="/{orderId}")
    public Ordermodel getOrdermodel( @PathVariable("orderId") int orderId){
        return orderService.getOrder(orderId);
    }

    @PutMapping(value ="/{orderId}")
    public Ordermodel updateOrdermodel( @PathVariable int orderId, @RequestBody String status){
        return orderService.updateOrder(orderId, status);
    }

    @DeleteMapping(value ="/{orderId}")
    public void deleteOrdermodel( @PathVariable int orderId){

        orderService.deleteOrder(orderId);
    }

    @GetMapping (value ="/user/{username}")
    public List<Ordermodel> getOrdersFromUser( @PathVariable("username") String username){
        return orderService.getOrdersFromUser(username);
    }

}
