package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findByEmail(String email);
    User findByUserId(int userID);
}
