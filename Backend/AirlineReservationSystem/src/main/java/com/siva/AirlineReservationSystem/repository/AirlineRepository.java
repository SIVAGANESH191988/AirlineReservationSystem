package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.Airline;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirlineRepository extends JpaRepository<Airline, Integer> {
}