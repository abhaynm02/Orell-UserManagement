package com.abhaynm.user_login_registration.repository;

import com.abhaynm.user_login_registration.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
   Optional<UserEntity> findByEmail(String username);
   boolean existsByEmail(String email);
}
