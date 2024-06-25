package com.siva.AirlineReservationSystem.service;

import com.siva.AirlineReservationSystem.controller.ResourceNotFoundException;
import com.siva.AirlineReservationSystem.entity.Airline;
import com.siva.AirlineReservationSystem.repository.AirlineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirlineService {

    @Autowired
    private AirlineRepository airlineRepository;

    public List<Airline> getAllAirlines() {
        return airlineRepository.findAll();
    }

    public Optional<Airline> getAirlineById(int id) {
        return airlineRepository.findById(id);
    }

    public Airline addAirline(Airline airline) {
        return airlineRepository.save(airline);
    }

    public Airline updateAirline(int id, Airline airlineDetails) {
        Airline airline = getAirlineById(id).orElseThrow(() -> new ResourceNotFoundException("Airline not found for this id :: " + id));
        airline.setName(airlineDetails.getName());
        
        return airlineRepository.save(airline);
    }

    public void deleteAirline(int id) {
        airlineRepository.deleteById(id);
    }
}
