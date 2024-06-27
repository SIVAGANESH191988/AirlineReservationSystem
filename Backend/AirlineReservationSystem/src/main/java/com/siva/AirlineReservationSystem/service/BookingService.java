
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

    public Booking createBooking(Booking booking) {
        Optional<User> user = userRepository.findById(booking.getUser().getUserID());
        Optional<Flight> flight = flightRepository.findById(booking.getFlight().getFlightID());

        if (!user.isPresent() || !flight.isPresent()) {
            throw new RuntimeException("User or Flight not found");
        }

        booking.setUser(user.get());
        booking.setFlight(flight.get());
        return bookingRepository.save(booking);
    }
}
