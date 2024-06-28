package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Date;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Integer> {
    List<Flight> findByAirline(com.siva.AirlineReservationSystem.entity.Airline airline);
    
    @Query("SELECT f.flightID FROM Flight f WHERE f.airline.airlineID = :id")
    List<Integer> findFlightIdsByAirlineId(int id);

    List<Flight> findByDepartureCityAndArrivalCityAndDepartureTimeBetween(
            String departureCity, String arrivalCity, Date startDate, Date endDate);
}
