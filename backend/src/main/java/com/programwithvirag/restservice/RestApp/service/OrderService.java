package com.programwithvirag.restservice.RestApp.service;
import com.programwithvirag.restservice.RestApp.dao.OrderRepository;
import com.programwithvirag.restservice.RestApp.exception.OrderNotFoundException;
import com.programwithvirag.restservice.RestApp.model.Order;
import com.programwithvirag.restservice.RestApp.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    private int orderIdCount = 1;
    private List<Order> orderList = new CopyOnWriteArrayList<>();

    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrderList() {
        return orderRepository.findAll();
    }

    public Order getOrder(int orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (!optionalOrder.isPresent())
            throw new OrderNotFoundException("Order Record is not available...");

        return optionalOrder.get();
    }

    public Order updateOrder(int orderId, String newStatus) {

        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (!optionalOrder.isPresent())
            throw new OrderNotFoundException("Order Record is not available...");

        Order order = orderRepository.findById(orderId).get();
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    public void deleteOrder(int orderId) {
        orderRepository.deleteById(orderId);
    }
}
