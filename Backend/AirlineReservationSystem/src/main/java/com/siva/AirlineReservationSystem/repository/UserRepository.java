package com.siva.AirlineReservationSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siva.AirlineReservationSystem.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findByEmail(String email);
    User findByUserId(int userID);
}
