// src/pages/BookingManagementPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingManagementPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings', error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      setBookings(bookings.filter(booking => booking.bookingId !== bookingId));
    } catch (error) {
      console.error('Error canceling booking', error);
    }
  };

  return (
    <div>
      <h1>Manage Bookings</h1>
      <ul>
        {bookings.map(booking => (
          <li key={booking.bookingId}>
            <p>Flight: {booking.flightId}</p>
            <p>Seat: {booking.seatNumber}</p>
            <p>Date: {booking.bookingDate}</p>
            <button onClick={() => handleCancelBooking(booking.bookingId)}>Cancel Booking</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingManagementPage;
