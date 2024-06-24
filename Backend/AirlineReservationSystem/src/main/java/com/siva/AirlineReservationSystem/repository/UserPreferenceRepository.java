package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.UserPreferences;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPreferenceRepository extends JpaRepository<UserPreferences, Integer> {
}
