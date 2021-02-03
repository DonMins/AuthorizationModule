package com.example.testspring.demo.controller;

import com.example.testspring.demo.entity.User;
import com.example.testspring.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
public class AuthorizationController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/login")
    public String info(Model model) {
////        return userService.getDataFromPython();
//        model.addAttribute("login", "");
//        model.addAttribute("password", "mska");

        return "login";
    }

    @GetMapping(value = "/log")
    public String info(@ModelAttribute("userForm") User userForm, BindingResult bindingResult, Model model) {
//        return userService.getDataFromPython();
        model.addAttribute("command", "");
        model.addAttribute("username", "mska");

        return "login";
    }

}