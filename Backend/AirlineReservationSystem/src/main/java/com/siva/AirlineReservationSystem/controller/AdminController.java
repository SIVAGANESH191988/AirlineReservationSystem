package com.siva.AirlineReservationSystem.controller;

import com.siva.AirlineReservationSystem.entity.Airline;
import com.siva.AirlineReservationSystem.entity.Flight;
import com.siva.AirlineReservationSystem.service.AdminService;
import com.siva.AirlineReservationSystem.service.AirlineService;
import com.siva.AirlineReservationSystem.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AirlineService airlineService;

    @Autowired
    private FlightService flightService;

    // Airline Endpoints

    @GetMapping("/airlines")
    public ResponseEntity<List<Airline>> getAllAirlines(@RequestHeader("Authorization") String token) {
        if (!adminService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<Airline> airlines = airlineService.getAllAirlines();
        return ResponseEntity.ok().body(airlines);
    }

    @GetMapping("/airlines/{id}")
    public ResponseEntity<Airline> getAirlineById(@PathVariable int id, @RequestHeader("Authorization") String token) {
        if (!adminService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Airline airline = airlineService.getAirlineById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Airline not found for this id :: " + id));
        return ResponseEntity.ok().body(airline);
    }

    @PostMapping("/airlines")
    public ResponseEntity<Airline> createAirline(@RequestBody Airline airline, @RequestHeader("Authorization") String token) {
        if (!adminService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Airline createdAirline = airlineService.addAirline(airline);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAirline);
    }

    @PutMapping("/airlines/{id}")
    public ResponseEntity<Airline> updateAirline(@PathVariable int id, @RequestBody Airline airlineDetails, @RequestHeader("Authorization") String token) {
        if (!adminService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Airline updatedAirline = airlineService.updateAirline(id, airlineDetails);
        return ResponseEntity.ok().body(updatedAirline);
    }

    @DeleteMapping("/airlines/{id}")
    public ResponseEntity<Void> deleteAirline(@PathVariable int id, @RequestHeader("Authorization") String token) {
        if (!adminService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        airlineService.deleteAirline(id);
        return ResponseEntity.noContent().build();
    }

    // Flight Endpoints

    @GetMapping("/flights")
    public ResponseEntity<List<Flight>> getAllFlights(@RequestHeader("Authorization") String token) {
        if (!adminService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<Flight> flights = flightService.getAllFlights();
        return ResponseEntity.ok().body(flights);
    }

    @GetMapping("/flights/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable int id, @RequestHeader("Authorization") String token) {
        if (!adminService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Flight flight = flightService.getFlightById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found for this id :: " + id));
        return ResponseEntity.ok().body(flight);
    }

    @PostMapping("/flights")
    public ResponseEntity<Flight> createFlight(@RequestBody Flight flight, @RequestHeader("Authorization") String token) {
        if (!adminService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Flight createdFlight = flightService.addFlight(flight);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFlight);
    }

    @PutMapping("/flights/{id}")
    public ResponseEntity<Flight> updateFlight(@PathVariable int id, @RequestBody Flight flightDetails, @RequestHeader("Authorization") String token) {
        if (!adminService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Flight updatedFlight = flightService.updateFlight(id, flightDetails);
        return ResponseEntity.ok().body(updatedFlight);
    }

    @DeleteMapping("/flights/{id}")
    public ResponseEntity<Void> deleteFlight(@PathVariable int id, @RequestHeader("Authorization") String token) {
        if (!adminService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }
}
