package com.programwithvirag.restservice.RestApp.service;

import com.programwithvirag.restservice.RestApp.dao.UserRepository;
import com.programwithvirag.restservice.RestApp.exception.ItemNotFoundException;
import com.programwithvirag.restservice.RestApp.model.Ordermodel;
import com.programwithvirag.restservice.RestApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getUserList() {
        return userRepository.findAll();
    }

    public User addOrder(Ordermodel ordermodel) {
        //Optional<User> optionalUser = userRepository.findById(id);
        Optional<User> optionalUser = userRepository.findByUsername(ordermodel.getUsername());

        if (!optionalUser.isPresent())
            throw new ItemNotFoundException("User Record is not available...");

        //User user = userRepository.findById(id).get();
        User user = userRepository.findByUsername(ordermodel.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with -> username or email : " + ordermodel.getUsername()));

        user.addOrder(ordermodel);
        userRepository.save(user);
        return user;
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }
}
