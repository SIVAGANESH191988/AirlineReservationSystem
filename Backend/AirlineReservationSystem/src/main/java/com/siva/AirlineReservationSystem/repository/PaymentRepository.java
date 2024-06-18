package com.siva.AirlineReservationSystem.repository;

import com.siva.AirlineReservationSystem.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
