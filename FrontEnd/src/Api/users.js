// src/api/users.js

import axios from 'axios';

export const getUsers = async () => {
    try {
        const response = await axios.get('/api/users');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

export const addUser = async (userData) => {
    try {
        const response = await axios.post('/api/users', userData);
        return response.data;
    } catch (error) {
        throw new Error('Error adding user');
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`/api/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating user');
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`/api/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting user');
    }
};

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
