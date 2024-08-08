package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByFlightFlightID(int id);
}
