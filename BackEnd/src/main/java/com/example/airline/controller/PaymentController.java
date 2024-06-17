package com.example.airline.controller;

import com.example.airline.entity.Payment;
import com.example.airline.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @PostMapping
    public ResponseEntity<Payment> makePayment(@RequestBody Payment payment) {
        return ResponseEntity.ok(paymentService.savePayment(payment));
    }
}
