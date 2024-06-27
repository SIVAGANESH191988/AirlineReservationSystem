import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAllAirlines,
    addAirline,
    updateAirline,
    deleteAirline,
    getAirlineById,
    getAllFlights,
    addFlight,
    updateFlight,
    deleteFlight,
    getFlightById
} from '../Api/AdminOp';
import '../components/AdminDashboard.css';

const AdminDashboard = () => {
    const [airlines, setAirlines] = useState([]);
    const [flights, setFlights] = useState([]);
    const [currentAction, setCurrentAction] = useState('view');
    const [selectedAirline, setSelectedAirline] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [airlineData, setAirlineData] = useState({ name: '' });
    const [flightData, setFlightData] = useState({
        departureCity: '',
        arrivalCity: '',
        airlineId: '',
        departureTime: '',
        totalSeats: '',
        availableSeats: ''
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
            setAirlines(data);
        } catch (error) {
            console.error('Failed to load airlines:', error);
            setMessage('Failed to load airlines. Please try again.');
        }
    };

    const loadFlights = async () => {
        try {
            const data = await getAllFlights(token);
            console.log('Flights data:', data); // Check what 'data' contains
            setFlights(data);
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

    const handleAddAirline = async (event) => {
        event.preventDefault();
        try {
            await addAirline(airlineData, token);
            setMessage('Airline added successfully!');
            setAirlineData({ name: '' });
            loadAirlines();
            setCurrentAction('view');
        } catch (error) {
            console.error('Failed to add airline:', error);
            setMessage('Failed to add airline. Please try again.');
        }
    };

    const handleAddFlight = async (event) => {
        event.preventDefault();
        try {
            await addFlight({
                ...flightData,
                airline: {
                    airlineID: flightData.airlineId
                }
            }, token);
            setMessage('Flight added successfully!');
            loadFlights();
            setCurrentAction('view');
        } catch (error) {
            console.error('Failed to add flight:', error);
            setMessage('Failed to add flight. Please try again.');
        }
    };

    const handleEditAirline = async (id) => {
        if (isNaN(id) || id === undefined || id === null) {
            console.error('Invalid airline ID:', id);
            setMessage('Failed to load airline. Please try again.');
            return;
        }
        try {
            const data = await getAirlineById(id, token);
            setSelectedAirline(data);
            setAirlineData({ name: data.name });
            setCurrentAction('editAirline');
        } catch (error) {
            console.error('Failed to load airline:', error);
            setMessage('Failed to load airline. Please try again.');
        }
    };

    const handleEditFlight = async (id) => {
        if (isNaN(id) || id === undefined || id === null) {
            console.error('Invalid flight ID:', id);
            setMessage('Failed to load flight. Please try again.');
            return;
        }
        try {
            const data = await getFlightById(id, token);
            setSelectedFlight(data);
            setFlightData({
                departureCity: data.departureCity,
                arrivalCity: data.arrivalCity,
                airlineId: data.airline.airlineID,
                departureTime: data.departureTime,
                totalSeats: data.totalSeats,
                availableSeats: data.availableSeats
            });
            setCurrentAction('editFlight');
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
        const { name, value } = e.target;
        setFlightData(prevData => ({
            ...prevData,
            [name]: name === 'airlineId' || name === 'totalSeats' || name === 'availableSeats'
                ? parseInt(value, 10)
                : value
        }));
    };

    const handleEditAirlineSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateAirline(selectedAirline.airlineID, airlineData, token);
            setMessage('Airline updated successfully!');
            loadAirlines();
            setCurrentAction('view');
        } catch (error) {
            console.error('Failed to update airline:', error);
            setMessage('Failed to update airline. Please try again.');
        }
    };

    const handleUpdateFlight = async (event) => {
        event.preventDefault();
        try {
            await updateFlight(selectedFlight.flightID, {
                ...flightData,
                airline: {
                    airlineID: flightData.airlineId
                }
            }, token);
            setMessage('Flight updated successfully!');
            loadFlights();
            setCurrentAction('view');
        } catch (error) {
            console.error('Failed to update flight:', error);
            setMessage('Failed to update flight. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard">
            <h2 className="dashboard-title">Admin Dashboard</h2>
            {message && <p className="message">{message}</p>}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <div className="actions-container">
                <button className="button" onClick={() => setCurrentAction('addAirline')}>Add Airline</button>
                <button className="button" onClick={() => setCurrentAction('addFlight')}>Add Flight</button>
            </div>
            {currentAction === 'view' && (
                <div className="view-container">
                    <div className="airlines-container">
                        <h3>Airlines</h3>
                        {airlines.length > 0 ? (
                            <ul>
                                {airlines.map((airline) => (
                                    <li key={airline.airlineID}>
                                        {airline.name}
                                        <div>
                                            <button className="button" onClick={() => handleEditAirline(airline.airlineID)}>Edit</button>
                                            <button className="button" onClick={() => handleDeleteAirline(airline.airlineID)}>Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No airlines available.</p>
                        )}
                    </div>
                    <div className="flights-container">
                        <h3>Flights</h3>
                        {flights.length > 0 ? (
                            <ul>
                                {flights.map((flight) => (
                                    <li key={flight.flightID}>
                                        {flight.departureCity} to {flight.arrivalCity} ({flight.airline.name})
                                        <div>
                                            <button className="button" onClick={() => handleEditFlight(flight.flightID)}>Edit</button>
                                            <button className="button" onClick={() => handleDeleteFlight(flight.flightID)}>Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No flights available.</p>
                        )}
                    </div>
                </div>
            )}
            {currentAction === 'addAirline' && (
                <form onSubmit={handleAddAirline}>
                    <h3>Add Airline</h3>
                    <input
                        type="text"
                        name="name"
                        value={airlineData.name}
                        onChange={handleChangeAirline}
                        placeholder="Airline Name"
                        required
                    />
                    <button type="submit">Add Airline</button>
                    <button type="button" onClick={() => setCurrentAction('view')}>Cancel</button>
                </form>
            )}
            {currentAction === 'editAirline' && (
                <form onSubmit={handleEditAirlineSubmit}>
                    <h3>Edit Airline</h3>
                    <input
                        type="text"
                        name="name"
                        value={airlineData.name}
                        onChange={handleChangeAirline}
                        placeholder="Airline Name"
                        required
                    />
                    <button type="submit">Update Airline</button>
                    <button type="button" onClick={() => setCurrentAction('view')}>Cancel</button>
                </form>
            )}
            {currentAction === 'addFlight' && (
                <form onSubmit={handleAddFlight}>
                    <h3>Add Flight</h3>
                    <input
                        type="text"
                        name="departureCity"
                        value={flightData.departureCity}
                        onChange={handleChangeFlight}
                        placeholder="Departure City"
                        required
                    />
                    <input
                        type="text"
                        name="arrivalCity"
                        value={flightData.arrivalCity}
                        onChange={handleChangeFlight}
                        placeholder="Arrival City"
                        required
                    />
                    <select
                        name="airlineId"
                        value={flightData.airlineId}
                        onChange={handleChangeFlight}
                        required
                    >
                        <option value="">Select Airline ID</option>
                        {airlines.map((airline) => (
                            <option key={airline.airlineID} value={airline.airlineID}>
                                {airline.airlineID}
                            </option>
                        ))}
                    </select>
                    <input
                        type="datetime-local"
                        name="departureTime"
                        value={flightData.departureTime}
                        onChange={handleChangeFlight}
                        required
                    />
                    <input
                        type="number"
                        name="totalSeats"
                        value={flightData.totalSeats}
                        onChange={handleChangeFlight}
                        placeholder="Total Seats"
                        required
                    />
                    <input
                        type="number"
                        name="availableSeats"
                        value={flightData.availableSeats}
                        onChange={handleChangeFlight}
                        placeholder="Available Seats"
                        required
                    />
                    <button type="submit">Add Flight</button>
                    <button type="button" onClick={() => setCurrentAction('view')}>Cancel</button>
                </form>
            )}
            {currentAction === 'editFlight' && (
                <form onSubmit={handleUpdateFlight}>
                    <h3>Edit Flight</h3>
                    <input
                        type="text"
                        name="departureCity"
                        value={flightData.departureCity}
                        onChange={handleChangeFlight}
                        placeholder="Departure City"
                        required
                    />
                    <input
                        type="text"
                        name="arrivalCity"
                        value={flightData.arrivalCity}
                        onChange={handleChangeFlight}
                        placeholder="Arrival City"
                        required
                    />
                    <select
                        name="airlineId"
                        value={flightData.airlineId}
                        onChange={handleChangeFlight}
                        required
                    >
                        <option value="">Select Airline ID</option>
                        {airlines.map((airline) => (
                            <option key={airline.airlineID} value={airline.airlineID}>
                                {airline.airlineID}
                            </option>
                        ))}
                    </select>
                    <input
                        type="datetime-local"
                        name="departureTime"
                        value={flightData.departureTime}
                        onChange={handleChangeFlight}
                        required
                    />
                    <input
                        type="number"
                        name="totalSeats"
                        value={flightData.totalSeats}
                        onChange={handleChangeFlight}
                        placeholder="Total Seats"
                        required
                    />
                    <input
                        type="number"
                        name="availableSeats"
                        value={flightData.availableSeats}
                        onChange={handleChangeFlight}
                        placeholder="Available Seats"
                        required
                    />
                   <button type="submit">Update Flight</button>
                   <button type="button" onClick={() => setCurrentAction('view')}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default AdminDashboard;
