package com.programwithvirag.restservice.RestApp.service;
import com.programwithvirag.restservice.RestApp.dao.OrderRepository;
import com.programwithvirag.restservice.RestApp.exception.OrderNotFoundException;
import com.programwithvirag.restservice.RestApp.model.Ordermodel;
import com.programwithvirag.restservice.RestApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public void addOrder(Ordermodel order) {
        //return userService.addOrder(order.getUser(), order);
        //return orderRepository.save(order);
    }

    public List<Ordermodel> getOrderList() {

        return orderRepository.findAll();
    }

    public Ordermodel getOrder(int orderId) {
        Optional<Ordermodel> optionalOrdermodel = orderRepository.findById(orderId);

        if (!optionalOrdermodel.isPresent())
            throw new OrderNotFoundException("Ordermodel Record is not available...");

        return optionalOrdermodel.get();
    }

    public Ordermodel updateOrder(int orderId, String newStatus) {

        Optional<Ordermodel> optionalOrdermodel = orderRepository.findById(orderId);

        if (!optionalOrdermodel.isPresent())
            throw new OrderNotFoundException("Ordermodel Record is not available...");

        Ordermodel order = orderRepository.findById(orderId).get();
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    public void deleteOrder(int orderId) {
        orderRepository.deleteById(orderId);
    }
}
