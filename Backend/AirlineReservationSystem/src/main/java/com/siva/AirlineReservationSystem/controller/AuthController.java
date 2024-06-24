package com.siva.AirlineReservationSystem.controller;

import com.siva.AirlineReservationSystem.entity.Admin;
import com.siva.AirlineReservationSystem.entity.User;
import com.siva.AirlineReservationSystem.service.AdminService;
import com.siva.AirlineReservationSystem.service.UserService;
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

    // General User Registration
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Check if username or email already exists
        if (userService.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        // Save user
        userService.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    // General User Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        User user = userService.authenticate(username, password);
        if (user != null) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // Admin Registration (typically should be secured and restricted)
    @PostMapping("/admin/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        // Check if username already exists
        if (adminService.findByUsername(admin.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        // Save admin
        adminService.save(admin);

        return ResponseEntity.ok("Admin registered successfully");
    }

    // Admin Login
    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestParam String username, @RequestParam String password) {
        Admin admin = adminService.findByUsername(username).orElse(null);
        if (admin != null && adminService.verifyPassword(password, admin.getPassword())) {
            String token = adminService.generateToken(admin);
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // Admin Logout
    @PostMapping("/admin/logout")
    public ResponseEntity<?> logoutAdmin(@RequestHeader("Authorization") String token) {
        if (adminService.validateToken(token)) {
            adminService.invalidateToken(token);
            return ResponseEntity.ok("Logout successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }
}
