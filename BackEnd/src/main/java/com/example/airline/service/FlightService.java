package com.example.airline.service;

import com.example.airline.entity.Flight;
import com.example.airline.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight saveFlight(Flight flight) {
        return flightRepository.save(flight);
    }
}
