import axios from 'axios';

export const processPayment = async (paymentData) => {
    try {
        const response = await axios.post('http://localhost:3001/api/payments', paymentData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
