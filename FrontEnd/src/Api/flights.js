// src/Api/flights.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Function to get all flights
export const getFlights = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/flights`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to add a new flight
export const addFlight = async (flightData, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/flights`, flightData, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to delete a flight
export const deleteFlight = async (flightID, token) => {
    try {
        await axios.delete(`${BASE_URL}/flights/${flightID}`, {
            headers: { Authorization: token }
        });
    } catch (error) {
        throw error;
    }
};
