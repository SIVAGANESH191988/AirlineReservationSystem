package com.example.airline.service;

import com.example.airline.entity.Admin;
import com.example.airline.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Optional<Admin> findByUsername(String username) {
        return Optional.empty();
    }
}
