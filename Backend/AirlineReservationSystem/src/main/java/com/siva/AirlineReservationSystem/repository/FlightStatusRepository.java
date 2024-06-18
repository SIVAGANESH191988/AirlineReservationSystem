package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.FlightStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightStatusRepository extends JpaRepository<FlightStatus, Integer> {
}
