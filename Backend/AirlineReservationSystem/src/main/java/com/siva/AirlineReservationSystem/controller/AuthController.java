package com.siva.AirlineReservationSystem.controller;

import com.siva.AirlineReservationSystem.entity.Admin;
import com.siva.AirlineReservationSystem.entity.User;
import com.siva.AirlineReservationSystem.service.AdminService;
import com.siva.AirlineReservationSystem.service.UserService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AdminService adminService;

    @Autowired
    public AuthController(UserService userService, AdminService adminService) {
        this.userService = userService;
        this.adminService = adminService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        userService.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        User user = userService.authenticate(username, password);
        if (user != null) {
            String token = userService.generateToken(user);
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        if (userService.validateToken(token)) {
            userService.invalidateToken(token);
            return ResponseEntity.ok("Logout successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    @PostMapping("/admin/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        try {
            if (adminService.findByUsername(admin.getUsername()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
            }

            adminService.save(admin);
            return ResponseEntity.ok("Admin registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Admin registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> credentials) {
        try {
            String username = credentials.get("username");
            String password = credentials.get("password");

            Admin admin = adminService.findByUsername(username).orElse(null);
            if (admin != null && adminService.verifyPassword(password, admin.getPassword())) {
                String token = adminService.generateToken(admin);
                return ResponseEntity.ok(token);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Admin login failed: " + e.getMessage());
        }
    }

    @PostMapping("/admin/logout")
    public ResponseEntity<?> logoutAdmin(@RequestHeader("Authorization") String token) {
        try {
            if (adminService.validateToken(token)) {
                adminService.invalidateToken(token);
                return ResponseEntity.ok("Logout successful");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Logout failed: " + e.getMessage());
        }
    }
}
