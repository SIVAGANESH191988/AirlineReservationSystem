package com.siva.AirlineReservationSystem.controller;

import com.siva.AirlineReservationSystem.entity.Booking;
import com.siva.AirlineReservationSystem.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        if (booking.getUser() == null || booking.getUser().getUserID() == 0 || 
            booking.getFlight() == null || booking.getFlight().getFlightID() == 0) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }
}
