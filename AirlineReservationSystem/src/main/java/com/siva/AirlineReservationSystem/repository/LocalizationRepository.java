package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.Localization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalizationRepository extends JpaRepository<Localization, Integer> {
}
