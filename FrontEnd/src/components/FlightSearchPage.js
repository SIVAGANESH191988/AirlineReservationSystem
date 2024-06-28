import React, { useState } from 'react';
import axios from 'axios';

function FlightSearchPage() {
  const [criteria, setCriteria] = useState({ departureCity: '', arrivalCity: '', travelDate: '' });
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/flights/search', {
        params: criteria,
        headers: {
          Authorization: 'Bearer your_token_here'  // Add the token here or make sure it's properly set
        }
      });
      console.log('Flight search response:', response.data);
      setFlights(response.data);
      setError(null);
    } catch (error) {
      console.error('Error searching for flights', error);
      setError('Error fetching flights. Please try again later.');
      setFlights([]);
    }
  };

  const handleBooking = (flightId) => {
    console.log(`Booking flight with ID ${flightId}`);
    // Implement the booking logic here
  };

  return (
    <div>
      <h1>Search Flights</h1>
      <input
        name="departureCity"
        type="text"
        placeholder="Departure City"
        value={criteria.departureCity}
        onChange={handleChange}
      />
      <input
        name="arrivalCity"
        type="text"
        placeholder="Arrival City"
        value={criteria.arrivalCity}
        onChange={handleChange}
      />
      <input
        name="travelDate"
        type="date"
        placeholder="Travel Date"
        value={criteria.travelDate}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}
      
      {flights.length > 0 && Array.isArray(flights) && (
        <ul>
          {flights.map(flight => (
            <li key={flight.flightID}>
              <p>{flight.departureCity} to {flight.arrivalCity}</p>
              <p>{new Date(flight.departureTime).toLocaleString()}</p>
              <p>{flight.availableSeats} seats available</p>
              <button onClick={() => handleBooking(flight.flightID)}>Book Now</button>
            </li>
          ))}
        </ul>
      )}

      {flights.length === 0 && !error && <p>No flights found.</p>}
    </div>
  );
}

export default FlightSearchPage;
