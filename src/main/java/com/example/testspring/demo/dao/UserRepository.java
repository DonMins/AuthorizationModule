package com.example.testspring.demo.dao;

import com.example.testspring.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, String> {

    User findUserByLogin(String login);
    User findUserByEmail(String email);
    User findUserByResetPasswordToken(String token);

}