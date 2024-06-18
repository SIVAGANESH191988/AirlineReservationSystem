// src/pages/FlightSearchPage.js
import React, { useState } from 'react';
import axios from 'axios';

function FlightSearchPage() {
  const [criteria, setCriteria] = useState({ departureCity: '', arrivalCity: '', travelDates: '' });
  const [flights, setFlights] = useState([]);

  const handleChange = (e) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/flights', { params: criteria });
      setFlights(response.data);
    } catch (error) {
      console.error('Error searching for flights', error);
    }
  };

  return (
    <div>
      <h1>Search Flights</h1>
      <input name="departureCity" type="text" placeholder="Departure City" value={criteria.departureCity} onChange={handleChange} />
      <input name="arrivalCity" type="text" placeholder="Arrival City" value={criteria.arrivalCity} onChange={handleChange} />
      <input name="travelDates" type="text" placeholder="Travel Dates" value={criteria.travelDates} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
      {flights.length > 0 && (
        <ul>
          {flights.map(flight => (
            <li key={flight.flightId}>
              <p>{flight.departureCity} to {flight.arrivalCity}</p>
              <p>{flight.departureTime}</p>
              <p>{flight.totalSeats} seats available</p>
              <button>Book Now</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FlightSearchPage;
