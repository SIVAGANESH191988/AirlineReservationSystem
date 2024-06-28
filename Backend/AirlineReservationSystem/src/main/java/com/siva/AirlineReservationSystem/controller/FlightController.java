package com.siva.AirlineReservationSystem.controller;

import com.siva.AirlineReservationSystem.entity.Flight;
import com.siva.AirlineReservationSystem.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @GetMapping("/search")
    public List<Flight> searchFlights(
            @RequestParam String departureCity,
            @RequestParam String arrivalCity,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date travelDate) {
        // You can adjust the search logic to fit your needs
        return flightService.searchFlights(departureCity, arrivalCity, travelDate);
    }
}
