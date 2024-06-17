package com.example.airline.repository;

import com.example.airline.entity.FlightStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightStatusRepository extends JpaRepository<FlightStatus, Integer> {
}
