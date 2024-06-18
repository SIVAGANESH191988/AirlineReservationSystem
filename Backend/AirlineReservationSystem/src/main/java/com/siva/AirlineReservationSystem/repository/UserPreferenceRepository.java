package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPreferenceRepository extends JpaRepository<UserPreference, Integer> {
}
