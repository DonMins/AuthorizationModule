package com.example.testspring.demo.service;

import com.example.testspring.demo.entity.User;
import org.springframework.lang.NonNull;

import java.util.List;

public interface UserService{

    User createNewLog();

    String getDataFromPython();

    boolean saveUser(User user);

    List<User> allUsers();

    boolean deleteUser(String userId);

    void updateResetPasswordToken(@NonNull String token, @NonNull String email) throws Exception;

    User getByResetPasswordToken(@NonNull String token);

    void updatePassword(@NonNull User user, @NonNull String newPassword);
}
