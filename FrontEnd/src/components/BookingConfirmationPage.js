import React from 'react';
import { useParams } from 'react-router-dom';

function BookingConfirmationPage() {
  const { bookingId } = useParams();

  return (
    <div>
      <h1>Booking Confirmation</h1>
      <p>Your booking ID is: {bookingId}</p>
    </div>
  );
}

export default BookingConfirmationPage;
