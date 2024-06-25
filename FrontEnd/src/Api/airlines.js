import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/airlines';

export const getAllAirlines = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAirlineById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addAirline = async (airlineData, token) => {
    try {
        console.log('Adding airline:', airlineData);
        const response = await axios.post(API_URL, airlineData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding airline:', error);
        throw error;
    }
};

export const updateAirline = async (id, airlineData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, airlineData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteAirline = async (id, token) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': token
            }
        });
    } catch (error) {
        throw error;
    }
};
