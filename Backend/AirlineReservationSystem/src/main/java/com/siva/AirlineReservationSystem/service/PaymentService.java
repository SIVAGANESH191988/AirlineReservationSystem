package com.siva.AirlineReservationSystem.service;

import com.siva.AirlineReservationSystem.entity.Payment;
import com.siva.AirlineReservationSystem.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(int id) {
        return paymentRepository.findById(id);
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Optional<Payment> updatePayment(int id, Payment paymentDetails) {
        return paymentRepository.findById(id).map(payment -> {
            payment.setBooking(paymentDetails.getBooking());
            payment.setPaymentMethod(paymentDetails.getPaymentMethod());
            payment.setAmount(paymentDetails.getAmount());
            payment.setPaymentDate(paymentDetails.getPaymentDate());
            return paymentRepository.save(payment);
        });
    }

    public boolean deletePayment(int id) {
        return paymentRepository.findById(id).map(payment -> {
            paymentRepository.delete(payment);
            return true;
        }).orElse(false);
    }
}
