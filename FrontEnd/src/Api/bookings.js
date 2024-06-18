// src/api/bookings.js

import axios from 'axios';

export const getBookingsByUserId = async (userId) => {
    try {
        const response = await axios.get(`/api/bookings`, { params: { userId } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createBooking = async (bookingData) => {
    try {
        const response = await axios.post(`/api/bookings`, bookingData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteBooking = async (id) => {
    try {
        await axios.delete(`/api/bookings/${id}`);
    } catch (error) {
        throw error;
    }
};
