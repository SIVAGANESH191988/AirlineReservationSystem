package com.siva.AirlineReservationSystem.service;

import com.siva.AirlineReservationSystem.entity.Booking;
import com.siva.AirlineReservationSystem.entity.Flight;
import com.siva.AirlineReservationSystem.entity.User;
import com.siva.AirlineReservationSystem.repository.BookingRepository;
import com.siva.AirlineReservationSystem.repository.FlightRepository;
import com.siva.AirlineReservationSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FlightRepository flightRepository;

    public Booking createBooking(Integer userID, Integer flightID, Booking bookingDetails) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Flight flight = flightRepository.findById(flightID)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        bookingDetails.setUser(user);
        bookingDetails.setFlight(flight);
        bookingDetails.setBookingDate(new java.util.Date());

        return bookingRepository.save(bookingDetails);
    }
}
