package com.siva.AirlineReservationSystem.controller;

import com.siva.AirlineReservationSystem.entity.Booking;
import com.siva.AirlineReservationSystem.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book/{flightID}")
    public ResponseEntity<Booking> bookFlight(
            @PathVariable Integer flightID,
            @RequestHeader("Authorization") String token,
            @RequestBody Booking bookingDetails) {

        // Extract user ID from token and add authentication logic here if necessary
        Integer userID = 1; // Example user ID, replace with actual extraction logic
        
        Booking createdBooking = bookingService.createBooking(userID, flightID, bookingDetails);
        return ResponseEntity.ok(createdBooking);
    }
}
