package com.example.testspring.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "AAA_USER", schema = "public")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @Column(name = "user_name", nullable = false, length = 512)
    private String userName;

    @Column(name = "user_login", nullable = false, unique = true, length = 512)
    private String login;

    @Column(name = "user_password", nullable = false, length = 65535)
    private String password;

    @ManyToMany(cascade = { CascadeType.ALL })

    @JoinTable(name="USER_ROLE",
            joinColumns=@JoinColumn(name="user_id"),
            inverseJoinColumns=@JoinColumn(name="role_id"))
    private Set<Role> roleSet = new HashSet<>();

}
