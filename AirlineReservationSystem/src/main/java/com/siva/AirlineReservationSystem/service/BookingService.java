package com.siva.AirlineReservationSystem.service;

import com.siva.AirlineReservationSystem.entity.Booking;
import com.siva.AirlineReservationSystem.entity.Flight;
import com.siva.AirlineReservationSystem.entity.User;
import com.siva.AirlineReservationSystem.repository.BookingRepository;
import com.siva.AirlineReservationSystem.repository.FlightRepository;
import com.siva.AirlineReservationSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FlightRepository flightRepository;

    public Booking createBooking(int userId, Integer flightId, Booking booking) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Flight> flightOpt = flightRepository.findById(flightId);

        if (userOpt.isPresent() && flightOpt.isPresent()) {
            booking.setUser(userOpt.get());
            booking.setFlight(flightOpt.get());
            booking.setBookingDate(new Date());
            return bookingRepository.save(booking);
        } else {
            throw new RuntimeException("User or Flight not found");
        }
    }
}
