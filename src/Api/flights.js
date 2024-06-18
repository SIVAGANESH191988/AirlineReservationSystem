import axios from 'axios';

const API_URL = 'http://localhost:8080/api/flights';

export const getFlights = () => {
    return axios.get(API_URL);
};

export const addFlight = (flight) => {
    return axios.post(API_URL, flight);
};

export const deleteFlight = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
