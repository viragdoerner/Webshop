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
    public Ordermodel updateOrdermodel( @PathVariable int orderId, @RequestBody UpdateOrder updateOrder){
        return orderService.updateOrder(orderId, updateOrder.getNewStatus());
    }

    @DeleteMapping(value ="/{orderId}")
    public void deleteOrdermodel( @PathVariable int orderId){
        //kitörlöm az item tömbjét
        Ordermodel o = orderService.getOrder(orderId);
        o.getItems().clear();
        orderService.updateItems(o);

        //kitörlöm a userhez való kapcsolatát
        List<User> users = userService.getUserList();
        for(int i=0; i<users.size(); i++){
            List<Ordermodel> orders = users.get(i).getOrders();
            for(int j=0; j<orders.size(); j++){
                if(orders.get(j).getId() == orderId){
                    orders.remove(j);
                }
            }
            userService.updateUser(users.get(i));
        }

        //kitörlöm magát az objektumot
        orderService.deleteOrder(orderId);
    }

}
