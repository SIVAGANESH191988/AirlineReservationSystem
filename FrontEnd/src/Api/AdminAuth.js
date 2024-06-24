import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // Update with your actual API URL

export const loginAdmin = async (username, password) => {
    return await axios.post(`${API_URL}/admin/login`, { username, password });
};

export const registerAdmin = async (admin) => {
    return await axios.post(`${API_URL}/admin/register`, admin);
};

export const logoutAdmin = async (token) => {
    return await axios.post(`${API_URL}/admin/logout`, {}, {
        headers: { Authorization: token }
    });
};
