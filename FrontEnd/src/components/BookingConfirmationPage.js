// src/components/BookingConfirmationPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

function BookingConfirmationPage() {
  const { bookingId } = useParams(); // Assuming your route is /booking/:bookingId

  return (
    <div>
      <h1>Booking Confirmation</h1>
      <p>Your booking ID is: {bookingId}</p>
      {/* Display other booking details as needed */}
    </div>
  );
}

export default BookingConfirmationPage;
