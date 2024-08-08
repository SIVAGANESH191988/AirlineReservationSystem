package com.siva.AirlineReservationSystem.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Bookings") // Ensure this matches your database table name
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookingID") // Optional: ensure column name matches
    private Long bookingID;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false) // Ensure column name matches database schema
    private User user;

    @ManyToOne
    @JoinColumn(name = "flightID", nullable = false) // Ensure column name matches database schema
    private Flight flight;

    @Column(name = "cabinClass", nullable = false) // Optional: ensure column name matches
    private String cabinClass;

    @Column(name = "seatNumber", nullable = false) // Optional: ensure column name matches
    private String seatNumber;

    @Column(name = "bookingDate", nullable = false)
    @Temporal(TemporalType.TIMESTAMP) // Use TIMESTAMP for Date in SQL
    private Date bookingDate;

    @Column(name = "paymentStatus", nullable = false) // Optional: ensure column name matches
    private String paymentStatus;
    public Booking(Long bookingID) {
        this.bookingID = bookingID;
    }
    // Getters and Setters
    public Long getBookingID() {
        return bookingID;
    }

    public void setBookingID(Long bookingID) {
        this.bookingID = bookingID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public String getCabinClass() {
        return cabinClass;
    }

    public void setCabinClass(String cabinClass) {
        this.cabinClass = cabinClass;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
