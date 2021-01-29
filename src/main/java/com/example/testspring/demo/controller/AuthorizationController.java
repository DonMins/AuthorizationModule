package com.example.testspring.demo.controller;

import com.example.testspring.demo.entity.User;
import com.example.testspring.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/log")

public class AuthorizationController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<User> log() {
        User user = userService.createNewLog();
        return ResponseEntity.ok(user);
    }
}