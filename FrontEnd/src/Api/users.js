// src/api/users.js

import axios from 'axios';

export const getUserProfile = async (userId) => {
    try {
        const response = await axios.get(`/api/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user profile');
    }
};

export const updateUserProfile = async (userId, userData) => {
    try {
        const response = await axios.put(`/api/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating user profile');
    }
};
