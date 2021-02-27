package com.example.testspring.demo.service;

import com.example.testspring.demo.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityHelper {

    public  static User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
