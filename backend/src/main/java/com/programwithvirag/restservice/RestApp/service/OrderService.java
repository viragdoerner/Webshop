package com.programwithvirag.restservice.RestApp.service;
import com.programwithvirag.restservice.RestApp.dao.OrderRepository;
import com.programwithvirag.restservice.RestApp.dao.UserRepository;
import com.programwithvirag.restservice.RestApp.exception.OrderNotFoundException;
import com.programwithvirag.restservice.RestApp.message.request.UpdateOrder;
import com.programwithvirag.restservice.RestApp.model.Ordermodel;
import com.programwithvirag.restservice.RestApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserService userService;

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

    public Ordermodel updateOrder(int orderId, String status) {

        Optional<Ordermodel> optionalOrdermodel = orderRepository.findById(orderId);

        if (!optionalOrdermodel.isPresent())
            throw new OrderNotFoundException("Ordermodel Record is not available...");

        Ordermodel order = orderRepository.findById(orderId).get();
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public void deleteOrder(int orderId) {

        //kitörlöm az item tömbjét
        Ordermodel o = getOrder(orderId);
        o.getItems().clear();
        updateItems(o);

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
        orderRepository.deleteById(orderId);
    }

    public Ordermodel updateItems(Ordermodel order) {
        return orderRepository.save(order);
    }

    public List<Ordermodel> getOrdersFromUser(String username) {
        List<Ordermodel> all =  orderRepository.findAll();
        List<Ordermodel> result = Collections.emptyList();
        for(int i=0; i<all.size(); i++){
            if( all.get(i).getUsername() ==username) {
                result.add(all.get(i));
            }
        }

       //all.remove(0);
       return all;
    }
}
