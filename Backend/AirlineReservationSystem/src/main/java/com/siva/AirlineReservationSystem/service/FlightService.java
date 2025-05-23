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

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserService userService;

    public List<Flight> getFlightsByAirline(Airline airline) {
        return flightRepository.findByAirline(airline);
    }

    public List<Integer> getFlightIdsByAirlineId(int airlineId) {
        return flightRepository.findFlightIdsByAirline_AirlineID(airlineId); // Updated method name
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Optional<Flight> getFlightById(int id) {
        return flightRepository.findById(id);
    }

    public List<Flight> searchFlights(String departureCity, String arrivalCity, Date travelDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(travelDate);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        Date endDate = calendar.getTime();

        return flightRepository.findByDepartureCityAndArrivalCityAndDepartureTimeBetween(
                departureCity, arrivalCity, travelDate, endDate);
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

    public boolean validateToken(String token) {
        return userService.validateToken(token);
    }

    public boolean isSeatAvailable(Flight flight, String seatNumber) {
        return !flight.getOccupiedSeats().contains(seatNumber);
    }

    @Transactional
    public void occupySeat(Flight flight, String seatNumber) {
        flight.getOccupiedSeats().add(seatNumber);
        flight.setAvailableSeats(flight.getAvailableSeats() - 1); // Already correct
        flightRepository.save(flight);
    }
}