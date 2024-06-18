import React, { useState, useEffect } from 'react';
import { getFlights, addFlight, deleteFlight } from '../Api/flights';

const AdminDashboard = () => {
    const [flights, setFlights] = useState([]);
    const [newFlight, setNewFlight] = useState({
        airlineID: '',
        departureCity: '',
        arrivalCity: '',
        departureTime: '',
        totalSeats: 0
    });

    useEffect(() => {
        getFlights().then(response => {
            setFlights(response.data);
        });
    }, []);

    const handleChange = (e) => {
        setNewFlight({
            ...newFlight,
            [e.target.name]: e.target.value
        });
    };

    const handleAddFlight = (e) => {
        e.preventDefault();
        addFlight(newFlight).then(response => {
            setFlights([...flights, response.data]);
        }).catch(error => {
            alert('Add flight failed');
        });
    };

    const handleDeleteFlight = (id) => {
        deleteFlight(id).then(response => {
            setFlights(flights.filter(f => f.flightID !== id));
        }).catch(error => {
            alert('Delete flight failed');
        });
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div>
                <form onSubmit={handleAddFlight}>
                    <input type="text" name="airlineID" placeholder="Airline ID" onChange={handleChange} />
                    <input type="text" name="departureCity" placeholder="Departure City" onChange={handleChange} />
                    <input type="text" name="arrivalCity" placeholder="Arrival City" onChange={handleChange} />
                    <input type="datetime-local" name="departureTime" placeholder="Departure Time" onChange={handleChange} />
                    <input type="number" name="totalSeats" placeholder="Total Seats" onChange={handleChange} />
                    <button type="submit">Add Flight</button>
                </form>
            </div>
            <div>
                {flights.map(flight => (
                    <div key={flight.flightID}>
                        <p>Flight ID: {flight.flightID}</p>
                        <p>From: {flight.departureCity}</p>
                        <p>To: {flight.arrivalCity}</p>
                        <p>Departure Time: {new Date(flight.departureTime).toLocaleString()}</p>
                        <button onClick={() => handleDeleteFlight(flight.flightID)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
