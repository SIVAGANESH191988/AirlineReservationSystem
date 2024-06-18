import React from 'react';

const BookingConfirmationPage = ({ booking }) => {
    return (
        <div>
            <h2>Booking Confirmation</h2>
            <p>Booking ID: {booking.bookingID}</p>
            <p>Flight ID: {booking.flightID}</p>
            <p>User ID: {booking.userID}</p>
            <p>Seat Number: {booking.seatNumber}</p>
            <p>Cabin Class: {booking.cabinClass}</p>
            <p>Booking Date: {new Date(booking.bookingDate).toLocaleString()}</p>
            <p>Payment Status: {booking.paymentStatus}</p>
            <button>Pay Now</button>
        </div>
    );
};

export default BookingConfirmationPage;
