package com.siva.AirlineReservationSystem.service;

import com.siva.AirlineReservationSystem.controller.ResourceNotFoundException;
import com.siva.AirlineReservationSystem.entity.Airline;
import com.siva.AirlineReservationSystem.entity.Flight;
import com.siva.AirlineReservationSystem.repository.AirlineRepository;
import com.siva.AirlineReservationSystem.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AirlineService {

    @Autowired
    private AirlineRepository airlineRepository;

    @Autowired
    private FlightRepository flightRepository;

    public List<Airline> getAllAirlines() {
        return airlineRepository.findAll();
    }

    public Optional<Airline> getAirlineById(int id) {
        return airlineRepository.findById(id);
    }

    public Airline addAirline(Airline airline) {
        return airlineRepository.save(airline);
    }

    @Transactional
    public Airline updateAirline(int id, Airline airlineDetails) {
        Airline airline = getAirlineById(id).orElseThrow(() -> new ResourceNotFoundException("Airline not found for this id :: " + id));
        airline.setName(airlineDetails.getName());
        
        return airlineRepository.save(airline);
    }

    @Transactional
    public void deleteAirline(int id) {
        Airline airline = getAirlineById(id).orElseThrow(() -> new ResourceNotFoundException("Airline not found for this id :: " + id));

        // Check if there are any flights associated with this airline
        List<Flight> flightIds = flightRepository.findByAirline_AirlineID(id);
        if (!flightIds.isEmpty()) {
            throw new RuntimeException("Cannot delete airline with existing flights. Please delete associated flights first.");
        }

        airlineRepository.deleteById(id);
    }
}
