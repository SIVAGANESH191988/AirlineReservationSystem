import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const loginAdmin = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/admin/login`, { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerAdmin = async (admin) => {
    try {
        const response = await axios.post(`${API_URL}/admin/register`, admin);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logoutAdmin = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/admin/logout`, {}, {
            headers: { Authorization: `${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
