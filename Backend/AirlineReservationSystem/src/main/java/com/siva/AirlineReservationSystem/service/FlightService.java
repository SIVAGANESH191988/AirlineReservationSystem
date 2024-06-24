package com.siva.AirlineReservationSystem.service;

import com.siva.AirlineReservationSystem.entity.Airline;
import com.siva.AirlineReservationSystem.entity.Flight;
import com.siva.AirlineReservationSystem.repository.AirlineRepository;
import com.siva.AirlineReservationSystem.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private AirlineRepository airlineRepository;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Optional<Flight> getFlightById(int id) {
        return flightRepository.findById(id);
    }

    public Flight addFlight(Flight flight) {
        Optional<Airline> airline = airlineRepository.findById(flight.getAirline().getAirlineID());
        if (!airline.isPresent()) {
            throw new RuntimeException("Airline not found for this id :: " + flight.getAirline().getAirlineID());
        }
        flight.setAirline(airline.get());
        return flightRepository.save(flight);
    }

    public Flight updateFlight(int id, Flight flightDetails) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found for this id :: " + id));
        Optional<Airline> airline = airlineRepository.findById(flightDetails.getAirline().getAirlineID());
        if (!airline.isPresent()) {
            throw new RuntimeException("Airline not found for this id :: " + flightDetails.getAirline().getAirlineID());
        }
        flight.setAirline(airline.get());
        flight.setDepartureCity(flightDetails.getDepartureCity());
        flight.setArrivalCity(flightDetails.getArrivalCity());
        flight.setDepartureTime(flightDetails.getDepartureTime());
        flight.setTotalSeats(flightDetails.getTotalSeats());
        flight.setAvailableSeats(flightDetails.getAvailableSeats());
        return flightRepository.save(flight);
    }

    public void deleteFlight(int id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found for this id :: " + id));
        flightRepository.delete(flight);
    }

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
        Airline airline = airlineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Airline not found for this id :: " + id));
        airline.setName(airlineDetails.getName());
        return airlineRepository.save(airline);
    }

    public void deleteAirline(int id) {
        Airline airline = airlineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Airline not found for this id :: " + id));
        airlineRepository.delete(airline);
    }
}
