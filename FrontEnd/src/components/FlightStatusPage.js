// src/components/FlightStatusPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightStatusPage = () => {
    const [flightId, setFlightId] = useState('');
    const [flightStatus, setFlightStatus] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setFlightId(e.target.value);
    };

    const fetchFlightStatus = async () => {
        try {
            const response = await axios.get(`/api/flight-status/${flightId}`);
            setFlightStatus(response.data);
            setError(null);
        } catch (error) {
            setError('Error fetching flight status');
            setFlightStatus(null);
        }
    };

    useEffect(() => {
        if (flightId) {
            fetchFlightStatus();
        }
    }, [flightId]);

    return (
        <div>
            <h2>Flight Status</h2>
            <input
                type="text"
                value={flightId}
                onChange={handleInputChange}
                placeholder="Enter Flight ID"
            />
            <button onClick={fetchFlightStatus}>Check Status</button>
            {error && <p>{error}</p>}
            {flightStatus && (
                <div>
                    <h3>Status for Flight {flightId}</h3>
                    <p>Status: {flightStatus.status}</p>
                    <p>Last Updated: {flightStatus.updateTime}</p>
                </div>
            )}
        </div>
    );
};

export default FlightStatusPage;
