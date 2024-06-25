import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAllAirlines,
    addAirline,
    updateAirline,
    deleteAirline,
    getAirlineById
} from '../api/airlines'; // Assuming these are existing airline API functions
import {
    getFlights,
    addFlight,
    deleteFlight,
    getFlightById,
    updateFlight
} from '../api/flights'; // Import flight API functions
import './AdminDashboard.css'; // Import CSS file

const AdminDashboard = () => {
    const [airlines, setAirlines] = useState([]);
    const [flights, setFlights] = useState([]);
    const [currentAction, setCurrentAction] = useState('view');
    const [selectedAirline, setSelectedAirline] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [airlineData, setAirlineData] = useState({ name: '' });
    const [flightData, setFlightData] = useState({
        airlineId: '', // Use airlineId instead of airline object
        departureCity: '',
        arrivalCity: '',
        departureTime: '',
        totalSeats: 0 // Assuming totalSeats is required
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken') || '';

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
        } else {
            loadAirlines();
            loadFlights();
        }
    }, [token, navigate]);

    const loadAirlines = async () => {
        try {
            const data = await getAllAirlines(token);
            if (Array.isArray(data)) {
                setAirlines(data);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error('Failed to load airlines:', error);
            setMessage('Failed to load airlines. Please try again.');
        }
    };

    const loadFlights = async () => {
        try {
            const data = await getFlights(token);
            if (Array.isArray(data)) {
                setFlights(data);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error('Failed to load flights:', error);
            setMessage('Failed to load flights. Please try again.');
        }
    };

    const handleDeleteAirline = async (id) => {
        try {
            await deleteAirline(id, token);
            loadAirlines();
            setMessage('Airline deleted successfully!');
        } catch (error) {
            console.error('Failed to delete airline:', error);
            setMessage('Failed to delete airline. Please try again.');
        }
    };

    const handleDeleteFlight = async (id) => {
        try {
            await deleteFlight(id, token);
            loadFlights();
            setMessage('Flight deleted successfully!');
        } catch (error) {
            console.error('Failed to delete flight:', error);
            setMessage('Failed to delete flight. Please try again.');
        }
    };

    const handleAddAirline = async () => {
        try {
            await addAirline(airlineData, token);
            setMessage('Airline added successfully!');
            loadAirlines();
        } catch (error) {
            console.error('Failed to add airline:', error);
            setMessage('Failed to add airline. Please try again.');
        }
    };

    const handleAddFlight = async () => {
        try {
            await addFlight(flightData, token);
            setMessage('Flight added successfully!');
            loadFlights();
        } catch (error) {
            console.error('Failed to add flight:', error);
            setMessage('Failed to add flight. Please try again.');
        }
    };

    const handleEditAirline = async (id) => {
        try {
            const data = await getAirlineById(id, token);
            if (data && data.id && data.name) {
                setSelectedAirline(data);
                setAirlineData({ name: data.name });
                setCurrentAction('edit');
            } else {
                throw new Error('Invalid airline data');
            }
        } catch (error) {
            console.error('Failed to load airline:', error);
            setMessage('Failed to load airline. Please try again.');
        }
    };

    const handleEditFlight = async (id) => {
        try {
            const data = await getFlightById(id, token);
            if (data && data.id && data.airlineId) { // Adjusted to use airlineId instead of airline object
                setSelectedFlight(data);
                setFlightData({
                    airlineId: data.airlineId.toString(), // Ensure airlineId is string for select input compatibility
                    departureCity: data.departureCity,
                    arrivalCity: data.arrivalCity,
                    departureTime: data.departureTime,
                    totalSeats: data.totalSeats // Assuming totalSeats is required
                });
                setCurrentAction('editFlight');
            } else {
                throw new Error('Invalid flight data');
            }
        } catch (error) {
            console.error('Failed to load flight:', error);
            setMessage('Failed to load flight. Please try again.');
        }
    };

    const handleChangeAirline = (e) => {
        setAirlineData({
            ...airlineData,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeFlight = (e) => {
        setFlightData({
            ...flightData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const handleUpdateFlight = async (id) => {
        try {
            await updateFlight(id, flightData, token);
            setMessage('Flight updated successfully!');
            loadFlights();
        } catch (error) {
            console.error('Failed to update flight:', error);
            setMessage('Failed to update flight. Please try again.');
        }
    };

    return (
        <div className="admin-dashboard">
            <h2 className="dashboard-title">Admin Dashboard</h2>
            {message && <p className="message">{message}</p>}
            {currentAction === 'view' && (
                <div>
                    <div className="button-container">
                        <button className="button" onClick={() => setCurrentAction('addAirline')}>Add Airline</button>
                        <button className="button" onClick={() => setCurrentAction('addFlight')}>Add Flight</button>
                        <button className="button" onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="airlines-container">
                        <h3>Airlines</h3>
                        <ul>
                            {airlines.map((airline) => (
                                <li key={airline.id}>
                                    {airline.name}
                                    <div>
                                        <button className="button" onClick={() => handleEditAirline(airline.id)}>Edit</button>
                                        <button className="button" onClick={() => handleDeleteAirline(airline.id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flights-container">
                        <h3>Flights</h3>
                        <ul>
                            {flights.map((flight) => (
                                <li key={flight.id}>
                                    {flight.flightNumber} - {flight.airline.name} - {flight.departureCity} to {flight.arrivalCity}
                                    <div>
                                        <button className="button" onClick={() => handleEditFlight(flight.id)}>Edit</button>
                                        <button className="button" onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {currentAction === 'addAirline' && (
                <div className="form-container">
                    <h2 className="form-title">Add Airline</h2>
                    <form onSubmit={handleAddAirline}>
                        <input
                            type="text"
                            name="name"
                            value={airlineData.name}
                            onChange={handleChangeAirline}
                            className="form-input"
                            placeholder="Airline Name"
                            required
                        />
                        <div className="form-button-container">
                            <button type="submit" className="form-button">Add</button>
                            <button type="button" className="form-button-secondary" onClick={() => setCurrentAction('view')}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            {currentAction === 'addFlight' && (
                <div className="form-container">
                    <h2 className="form-title">Add Flight</h2>
                    <form onSubmit={handleAddFlight}>
                        <select
                            name="airlineId" // Use airlineId instead of airline object
                            value={flightData.airlineId}
                            onChange={handleChangeFlight}
                            className="form-input"
                            required
                        >
                            <option value="">Select Airline</option>
                            {airlines.map((airline) => (
                                <option key={airline.id} value={airline.id}>{airline.name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="departureCity"
                            value={flightData.departureCity}
                            onChange={handleChangeFlight}
                            className="form-input"
                            placeholder="Departure City"
                            required
                        />
                        <input
                            type="text"
                            name="arrivalCity"
                            value={flightData.arrivalCity}
                            onChange={handleChangeFlight}
                            className="form-input"
                            placeholder="Arrival City"
                            required
                        />
                        <input
                            type="datetime-local"
                            name="departureTime"
                            value={flightData.departureTime}
                            onChange={handleChangeFlight}
                            className="form-input"
                            required
                        />
                        <input
                            type="number"
                            name="totalSeats"
                            value={flightData.totalSeats}
                            onChange={handleChangeFlight}
                            className="form-input"
                            placeholder="Total Seats"
                            required
                        />
                        <div className="form-button-container">
                            <button type="submit" className="form-button">Add</button>
                            <button type="button" className="form-button-secondary" onClick={() => setCurrentAction('view')}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            {currentAction === 'editFlight' && selectedFlight && (
                <div className="form-container">
                    <h2 className="form-title">Edit Flight</h2>
                    <form onSubmit={() => handleUpdateFlight(selectedFlight.id)}>
                        <select
                            name="airlineId" // Use airlineId instead of airline object
                            value={flightData.airlineId}
                            onChange={handleChangeFlight}
                            className="form-input"
                            required
                        >
                            <option value="">Select Airline</option>
                            {airlines.map((airline) => (
                                <option key={airline.id} value={airline.id}>{airline.name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="departureCity"
                            value={flightData.departureCity}
                            onChange={handleChangeFlight}
                            className="form-input"
                            placeholder="Departure City"
                            required
                        />
                        <input
                            type="text"
                            name="arrivalCity"
                            value={flightData.arrivalCity}
                            onChange={handleChangeFlight}
                            className="form-input"
                            placeholder="Arrival City"
                            required
                        />
                        <input
                            type="datetime-local"
                            name="departureTime"
                            value={flightData.departureTime}
                            onChange={handleChangeFlight}
                            className="form-input"
                            required
                        />
                        <input
                            type="number"
                            name="totalSeats"
                            value={flightData.totalSeats}
                            onChange={handleChangeFlight}
                            className="form-input"
                            placeholder="Total Seats"
                            required
                        />
                        <div className="form-button-container">
                            <button type="submit" className="form-button">Update</button>
                            <button type="button" className="form-button-secondary" onClick={() => setCurrentAction('view')}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
