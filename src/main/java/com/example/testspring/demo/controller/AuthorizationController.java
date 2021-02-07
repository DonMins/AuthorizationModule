package com.example.testspring.demo.controller;

import com.example.testspring.demo.entity.User;
import com.example.testspring.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthorizationController {

    @Autowired
    private UserService userService;


    @RequestMapping("/saveUser")
    public void saveUser() {
        User user = new User();
        user.setUserName("test");
        user.setLogin("test");
        user.setPassword("test");
        userService.saveUser(user);
    }

}