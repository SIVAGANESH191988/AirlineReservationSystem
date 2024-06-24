import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Replace with your backend URL
export const addAirline = async (airlineData, token) => {
    try {
        const response = await axios.post(`${BASE_URL}admin/airlines`, airlineData, {
            headers: { Authorization: token }
        });
        return response.data; // Assuming backend returns the created airline data
    } catch (error) {
        throw error;
    }
};

export default addAirline;