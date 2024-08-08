package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.Airline;
import com.siva.AirlineReservationSystem.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Integer> {
    
    List<Flight> findByDepartureCityAndArrivalCityAndDepartureTimeBetween(String departureCity, String arrivalCity, Date startDate, Date endDate);

    List<Flight> findByAirline(Airline airline);

    // Updated method name to match the property name in Airline
    List<Flight> findByAirline_AirlineID(int airlineID);

	List<Integer> findFlightIdsByAirlineId(int airlineId);
    
    
}
