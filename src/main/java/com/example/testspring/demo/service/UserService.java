package com.example.testspring.demo.service;

import com.example.testspring.demo.entity.User;

import java.util.List;

public interface UserService{

    User createNewLog();

    String getDataFromPython();

    void saveUser(User user);

    List<User> allUsers();

    boolean deleteUser(String userId);
}
