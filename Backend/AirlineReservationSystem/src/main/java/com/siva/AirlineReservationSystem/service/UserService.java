package com.siva.AirlineReservationSystem.service;

import com.siva.AirlineReservationSystem.entity.User;
import com.siva.AirlineReservationSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final Map<String, User> validTokens = new HashMap<>();

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public String generateToken(User user) {
        String token = "token_" + UUID.randomUUID().toString() + "_secure";
        validTokens.put(token, user);
        return token;
    }

    public boolean validateToken(String token) {
        return validTokens.containsKey(token);
    }

    public void invalidateToken(String token) {
        validTokens.remove(token);
    }

    public User getUserByToken(String token) {
        return validTokens.get(token);
    }
}
