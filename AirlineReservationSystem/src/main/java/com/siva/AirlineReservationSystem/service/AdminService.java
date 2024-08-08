package com.siva.AirlineReservationSystem.service;

import com.siva.AirlineReservationSystem.entity.Admin;
import com.siva.AirlineReservationSystem.repository.AdminRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    private Map<String, Admin> validTokens = new HashMap<>();

    public Optional<Admin> findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    public void save(Admin admin) {
        adminRepository.save(admin);
    }

    public boolean verifyPassword(String rawPassword, String storedPassword) {
        return rawPassword.equals(storedPassword);
    }

    public String generateToken(Admin admin) {
        String token = "token_" + UUID.randomUUID().toString() + "_secure";
        validTokens.put(token, admin);
        return token;
    }

    public boolean validateToken(String token) {
        return validTokens.containsKey(token);
    }

    public void invalidateToken(String token) {
        validTokens.remove(token);
    }
}
