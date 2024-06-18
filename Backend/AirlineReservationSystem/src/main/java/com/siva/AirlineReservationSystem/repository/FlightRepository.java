package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Integer> {
}
