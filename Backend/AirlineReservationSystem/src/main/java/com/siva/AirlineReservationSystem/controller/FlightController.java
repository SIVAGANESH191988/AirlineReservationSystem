package com.siva.AirlineReservationSystem.controller;

import com.siva.AirlineReservationSystem.entity.Flight;
import com.siva.AirlineReservationSystem.service.FlightService;
import com.siva.AirlineReservationSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<Flight>> searchFlights(
            @RequestHeader("Authorization") String token,
            @RequestParam String departureCity,
            @RequestParam String arrivalCity,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date travelDate) {
        
        // Validate token
        if (!userService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        // Search for flights
        List<Flight> flights = flightService.searchFlights(departureCity, arrivalCity, travelDate);
        return ResponseEntity.ok(flights);
    }
}
