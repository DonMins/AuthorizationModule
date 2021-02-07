package com.example.testspring.demo.entity;

import com.example.testspring.demo.invariants.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "ROLE", schema = "public")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role implements Serializable, GrantedAuthority {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    @Column(name = "role", nullable = false, unique = true, length = 512)
    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Transient
    @ManyToMany(mappedBy = "roleSet")
    private Set<User> userSet = new HashSet<>();

    public Role(RoleType role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return getRole().getRoleName();
    }
}
