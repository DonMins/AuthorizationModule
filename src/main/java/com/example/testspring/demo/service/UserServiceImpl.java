package com.example.testspring.demo.service;

import com.example.testspring.demo.controller.AuthorizationController;
import com.example.testspring.demo.dao.RoleRepository;
import com.example.testspring.demo.dao.UserRepository;
import com.example.testspring.demo.entity.Role;
import com.example.testspring.demo.entity.User;
import com.example.testspring.demo.invariants.RoleType;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.logging.Logger;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final static Logger LOG = Logger.getLogger(AuthorizationController.class.getName());

    @Autowired
    private UserRepository repository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createNewLog() {
        User user1 = new User();
        user1.setLogin("2");
        user1.setPassword(DigestUtils.sha256Hex("2"));
        user1.setUserName("Don Min");

        Role role = new Role();
        role.setRole(RoleType.ROLE_ADMIN.getRoleName());
        roleRepository.save(role);
        user1.setRoleSet(Collections.singleton(role));
        User user = repository.save(user1);
        LOG.info("saved new log: " + user.toString());
        return user;
    }
}
