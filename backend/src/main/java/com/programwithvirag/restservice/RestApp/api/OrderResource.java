package com.programwithvirag.restservice.RestApp.api;

import com.programwithvirag.restservice.RestApp.model.Order;
import com.programwithvirag.restservice.RestApp.service.OrderService;
import com.programwithvirag.restservice.RestApp.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/orders")
@CrossOrigin(origins = "*")
public class OrderResource {


    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order addOrder(@RequestBody Order order){
        return orderService.addOrder( order);
    }

    @GetMapping
    public List<Order> getOrders(){
        return orderService.getOrderList();
    }

    @GetMapping (value ="/{orderId}")
    public Order getOrder( @PathVariable("orderId") int orderId){
        return orderService.getOrder(orderId);
    }

    @PutMapping(value ="/{orderId}")
    public Order updateOrder( @PathVariable int orderId, @PathVariable("newStatus") String newStatus){
        return orderService.updateOrder(orderId, newStatus);
    }

    @DeleteMapping(value ="/{orderId}")
    public void deleteOrder( @PathVariable int orderId){
        orderService.deleteOrder(orderId);
    }

}
