import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const FlightSearchPage = () => {
  const [criteria, setCriteria] = useState({ departureCity: '', arrivalCity: '', travelDate: '' });
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [seatClass, setSeatClass] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');

  const handleChange = (e) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/flights/search', {
        params: criteria,
        headers: {
          Authorization: token
        }
      });
      setFlights(response.data);
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('userToken');
        navigate('/login');
      } else {
        setError('Error fetching flights. Please try again later.');
        setFlights([]);
      }
    }
  };

  const handleBooking = async () => {
    try {
      const bookingData = {
        cabinClass: seatClass,
        seatNumber,
        bookingDate: new Date(),
      };
      
      const paymentData = {
        paymentMethod,
        amount: parseFloat(amount),
        paymentDate: new Date()
      };

      const requestData = {
        ...bookingData,
        payment: paymentData
      };

      await axios.post(`http://localhost:8080/api/user/book/${selectedFlight.flightID}`, requestData, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });

      alert('Booking successful');
      setSelectedFlight(null);
      setSeatClass('');
      setSeatNumber('');
      setPaymentMethod('');
      setAmount('');
    } catch (error) {
      alert('Booking failed');
    }
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

      {flights.length > 0 && (
        <ul>
          {flights.map(flight => (
            <li key={flight.flightID}>
              <p>{flight.departureCity} to {flight.arrivalCity}</p>
              <p>{format(new Date(flight.departureTime), 'PPpp')}</p>
              <p>{flight.availableSeats} seats available</p>
              <button onClick={() => setSelectedFlight(flight)}>Select Flight</button>
            </li>
          ))}
        </ul>
      )}

      {selectedFlight && (
        <div>
          <h2>Select Seat for Flight {selectedFlight.flightID}</h2>
          <select value={seatClass} onChange={(e) => setSeatClass(e.target.value)}>
            <option value="">Select Class</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
          <select value={seatNumber} onChange={(e) => setSeatNumber(e.target.value)}>
            <option value="">Select Seat</option>
            {Array.from({ length: selectedFlight.totalSeats }).map((_, index) => {
              const seat = `Seat-${index + 1}`;
              return (
                !selectedFlight.occupiedSeats.includes(seat) && <option key={seat} value={seat}>{seat}</option>
              );
            })}
          </select>
          <input
            name="paymentMethod"
            type="text"
            placeholder="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleBooking}>Book Now</button>
        </div>
      )}

      {flights.length === 0 && !error && <p>No flights found.</p>}
    </div>
  );
};

export default FlightSearchPage;
