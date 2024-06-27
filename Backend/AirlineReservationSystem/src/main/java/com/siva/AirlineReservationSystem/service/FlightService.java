package com.siva.AirlineReservationSystem.service;

import com.siva.AirlineReservationSystem.controller.ResourceNotFoundException;
import com.siva.AirlineReservationSystem.entity.Airline;
import com.siva.AirlineReservationSystem.entity.Booking;
import com.siva.AirlineReservationSystem.entity.Flight;
import com.siva.AirlineReservationSystem.repository.BookingRepository;
import com.siva.AirlineReservationSystem.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

	@Autowired
    private FlightRepository flightRepository;

    public List<Flight> getFlightsByAirline(Airline airline) {
        return flightRepository.findByAirline(airline);
    }

    public List<Integer> getFlightIdsByAirlineId(int airlineId) {
        return flightRepository.findFlightIdsByAirlineId(airlineId);
    }
    @Autowired
    private BookingRepository bookingRepository;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Optional<Flight> getFlightById(int id) {
        return flightRepository.findById(id);
    }

    @Transactional
    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    @Transactional
    public Flight updateFlight(int id, Flight flightDetails) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found for this id :: " + id));

        flight.setAirline(flightDetails.getAirline());
        flight.setArrivalCity(flightDetails.getArrivalCity());
        flight.setDepartureCity(flightDetails.getDepartureCity());
        flight.setDepartureTime(flightDetails.getDepartureTime());
        flight.setTotalSeats(flightDetails.getTotalSeats());
        flight.setAvailableSeats(flightDetails.getAvailableSeats());

        return flightRepository.save(flight);
    }

    @Transactional
    public void deleteFlight(int id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found for this id :: " + id));

       
        List<Booking> bookings = bookingRepository.findByFlightFlightID(id);
        if (!bookings.isEmpty()) {
            throw new ResourceNotFoundException("Cannot delete flight with existing bookings.");
        }

        flightRepository.delete(flight);
    }
}
