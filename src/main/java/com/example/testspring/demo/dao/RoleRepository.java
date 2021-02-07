package com.example.testspring.demo.dao;

import com.example.testspring.demo.entity.Role;
import com.example.testspring.demo.invariants.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface RoleRepository extends JpaRepository<Role, String> {

    Role findRoleByRole(RoleType roleType);
}
