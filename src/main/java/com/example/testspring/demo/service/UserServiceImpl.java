package com.example.testspring.demo.service;

import com.example.testspring.demo.controller.AuthorizationController;
import com.example.testspring.demo.dao.RoleRepository;
import com.example.testspring.demo.dao.UserRepository;
import com.example.testspring.demo.entity.Role;
import com.example.testspring.demo.entity.User;
import com.example.testspring.demo.invariants.RoleType;
import lombok.SneakyThrows;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.logging.Logger;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {
    private final static Logger LOG = Logger.getLogger(AuthorizationController.class.getName());

    @Autowired
    private UserRepository userRepository;

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    PasswordEncoder bCryptPasswordEncoder;

    @Override
    public User createNewLog() {
        User user1 = new User();
        user1.setLogin("2");
        user1.setPassword(DigestUtils.sha256Hex("2"));
        user1.setUserName("Don Min");

        Role role = new Role();
        role.setRole(RoleType.ROLE_ADMIN);
        roleRepository.save(role);
        user1.setRoleSet(Collections.singleton(role));
        User user = userRepository.save(user1);
        LOG.info("saved new log: " + user.toString());
        return user;
    }

    @Override
    public String getDataFromPython() {
        return null;
    }

//    @Override
//    public String getDataFromPython() {
//        return "";
////        RestTemplate restTemplate = new RestTemplate();
////        String fooResourceUrl = "http://localhost:8000";
//////        ResponseEntity<String> response = restTemplate.getForEntity(fooResourceUrl + "/index", String.class);
////
////        HttpHeaders headers = new HttpHeaders();
////        headers.setContentType(MediaType.APPLICATION_JSON);
////        JSONObject personJsonObject = new JSONObject();
////
////        personJsonObject.put("id", 1);
////        personJsonObject.put("name", "John");
////
////        HttpEntity<String> request =  new HttpEntity<String>(personJsonObject.toString(), headers);
////        String personResultAsJsonStr = restTemplate.postForObject(fooResourceUrl + "/index2/", request, String.class);
////        return personResultAsJsonStr;
//    }

    @Override
    @SneakyThrows
    public UserDetails loadUserByUsername(String login)  {
        User user = userRepository.findUserByLogin(login);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return user;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public boolean saveUser(User user) {
        User userFromDB = userRepository.findUserByLogin(user.getLogin());

        if (userFromDB != null) {
            return false;
        }

        user.setRoleSet(Collections.singleton(roleRepository.findRoleByRole(RoleType.ROLE_USER)));
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }

    public boolean deleteUser(String userId) {
        if (userRepository.findById(userId).isPresent()) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

//    public List<User> usergtList(Long idMin) {
//        return em.createQuery("SELECT u FROM User u WHERE u.id > :paramId", User.class)
//                .setParameter("paramId", idMin).getResultList();
//    }

    @Override
    public void updateResetPasswordToken(@NonNull String token, @NonNull String email) throws Exception {
        User user = userRepository.findUserByEmail(email);
        if (Objects.nonNull(user)) {
            user.setResetPasswordToken(token);
            userRepository.save(user);
        } else {
            throw new Exception("Could not find any user with the email " + email);
        }
    }

    public User getByResetPasswordToken(@NonNull String token) {
        return userRepository.findUserByResetPasswordToken(token);
    }

    public void updatePassword(@NonNull User user, @NonNull String newPassword) {
        String encodedPassword = bCryptPasswordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);

        user.setResetPasswordToken(null);
        userRepository.save(user);
    }

}
