// src/api/flights.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/flights';

export const getFlights = async (token) => {
    try {
        const response = await axios.get(BASE_URL, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getFlightById = async (id, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addFlight = async (flightData, token) => {
    try {
        const response = await axios.post(BASE_URL, flightData, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateFlight = async (id, flightData, token) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, flightData, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteFlight = async (id, token) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, {
            headers: { Authorization: token }
        });
    } catch (error) {
        throw error;
    }
};
