package com.siva.AirlineReservationSystem.service;

import com.siva.AirlineReservationSystem.controller.ResourceNotFoundException;
import com.siva.AirlineReservationSystem.entity.Flight;
import com.siva.AirlineReservationSystem.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Optional<Flight> getFlightById(int id) {
        return flightRepository.findById(id);
    }

    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public Flight updateFlight(int id, Flight flightDetails) {
        Flight flight = getFlightById(id).orElseThrow(() -> new ResourceNotFoundException("Flight not found for this id :: " + id));
        flight.setAirline(flightDetails.getAirline());
        flight.setArrivalCity(flightDetails.getArrivalCity());
        flight.setDepartureCity(flightDetails.getDepartureCity());
        flight.setDepartureTime(flightDetails.getDepartureTime());
        flight.setTotalSeats(flightDetails.getTotalSeats());
        flight.setAvailableSeats(flightDetails.getAvailableSeats());
        
        return flightRepository.save(flight);
    }

    public void deleteFlight(int id) {
        Flight flight = getFlightById(id).orElseThrow(() -> new ResourceNotFoundException("Flight not found for this id :: " + id));
        flightRepository.delete(flight);
    }
}
