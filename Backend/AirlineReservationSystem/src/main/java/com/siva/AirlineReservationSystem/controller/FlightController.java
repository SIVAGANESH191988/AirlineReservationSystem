package com.siva.AirlineReservationSystem.controller;

import com.siva.AirlineReservationSystem.entity.Flight;
import com.siva.AirlineReservationSystem.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable int id) {
        Flight flight = flightService.getFlightById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found for this id :: " + id));
        return ResponseEntity.ok().body(flight);
    }

    @PostMapping
    public Flight createFlight(@RequestBody Flight flight) {
        return flightService.addFlight(flight);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Flight> updateFlight(@PathVariable int id, @RequestBody Flight flightDetails) {
        Flight updatedFlight = flightService.updateFlight(id, flightDetails);
        return ResponseEntity.ok(updatedFlight);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlight(@PathVariable int id) {
        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }
}
