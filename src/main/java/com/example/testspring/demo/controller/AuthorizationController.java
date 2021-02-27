package com.example.testspring.demo.controller;

import com.example.testspring.demo.entity.User;
import com.example.testspring.demo.service.SecurityHelper;
import com.example.testspring.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
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

    @RequestMapping("/info")
    public void info() {
        User us = SecurityHelper.getCurrentUser();
    }

    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("userForm", new User());

        return "login";
    }

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("userForm", new User());

        return "login";
    }

    @PostMapping("/registration")
    public String addUser(@ModelAttribute("userForm") User userForm, BindingResult bindingResult, Model model) {

        if (bindingResult.hasErrors()) {
            return "login";
        }

        if (!userService.saveUser(userForm)){
            model.addAttribute("usernameError", "Пользователь с таким именем уже существует");
            return "/login";
        }

        return "redirect:/login";
    }
}