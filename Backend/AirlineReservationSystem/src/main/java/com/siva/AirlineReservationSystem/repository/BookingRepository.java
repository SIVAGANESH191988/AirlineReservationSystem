package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {}
