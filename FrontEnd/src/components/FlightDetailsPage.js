import React from 'react';

const FlightDetailsPage = ({ flight }) => {
    return (
        <div>
            <h2>Flight Details</h2>
            <p>Flight ID: {flight.flightID}</p>
            <p>Departure City: {flight.departureCity}</p>
            <p>Arrival City: {flight.arrivalCity}</p>
            <p>Departure Time: {new Date(flight.departureTime).toLocaleString()}</p>
            <p>Total Seats: {flight.totalSeats}</p>
            <p>Available Seats: {flight.availableSeats}</p>
            <button>Book Now</button>
        </div>
    );
};

export default FlightDetailsPage;
