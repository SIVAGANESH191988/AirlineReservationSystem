package com.siva.AirlineReservationSystem.controller;

import com.siva.AirlineReservationSystem.entity.Airline;
import com.siva.AirlineReservationSystem.service.AirlineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AirlineService airlineService;

    @GetMapping("/airlines")
    public ResponseEntity<List<Airline>> getAllAirlines() {
        List<Airline> airlines = airlineService.getAllAirlines();
        return ResponseEntity.ok().body(airlines);
    }

    @GetMapping("/airlines/{id}")
    public ResponseEntity<Airline> getAirlineById(@PathVariable int id) {
        Airline airline = airlineService.getAirlineById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Airline not found for this id :: " + id));
        return ResponseEntity.ok().body(airline);
    }

    @PostMapping("/airlines")
    public ResponseEntity<Airline> createAirline(@RequestBody Airline airline) {
        Airline createdAirline = airlineService.addAirline(airline);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAirline);
    }

    @PutMapping("/airlines/{id}")
    public ResponseEntity<Airline> updateAirline(@PathVariable int id, @RequestBody Airline airlineDetails) {
        Airline updatedAirline = airlineService.updateAirline(id, airlineDetails);
        return ResponseEntity.ok().body(updatedAirline);
    }

    @DeleteMapping("/airlines/{id}")
    public ResponseEntity<Void> deleteAirline(@PathVariable int id) {
        airlineService.deleteAirline(id);
        return ResponseEntity.noContent().build();
    }
}
