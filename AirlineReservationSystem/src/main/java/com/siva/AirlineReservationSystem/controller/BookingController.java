package com.siva.AirlineReservationSystem.controller;

import com.siva.AirlineReservationSystem.entity.Booking;
import com.siva.AirlineReservationSystem.entity.User;
import com.siva.AirlineReservationSystem.service.BookingService;
import com.siva.AirlineReservationSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @PostMapping("/book/{flightID}")
    public ResponseEntity<Booking> bookFlight(
            @PathVariable Integer flightID,
            @RequestHeader("Authorization") String token,
            @RequestBody Booking bookingDetails) {

        // Validate token and extract user
        User user = userService.validateToken(token) ? userService.getUserByToken(token) : null;

        if (user == null) {
            return ResponseEntity.status(401).body(null); // Unauthorized
        }

        Booking createdBooking = bookingService.createBooking(user.getUserId(), flightID, bookingDetails);
        return ResponseEntity.ok(createdBooking);
    }
}
