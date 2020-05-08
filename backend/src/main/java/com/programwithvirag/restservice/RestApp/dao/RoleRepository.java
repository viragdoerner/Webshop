package com.programwithvirag.restservice.RestApp.dao;

import java.util.Optional;

import com.programwithvirag.restservice.RestApp.model.Role;
import com.programwithvirag.restservice.RestApp.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
