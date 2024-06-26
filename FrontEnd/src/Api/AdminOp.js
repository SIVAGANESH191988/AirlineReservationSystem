import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin';

const getAllAirlines = async (token) => {
    const response = await axios.get(`${API_URL}/airlines`, {
        headers: {
            'Authorization': token
        }
    });
    return response.data;
};

const addAirline = async (airlineData, token) => {
    const response = await axios.post(`${API_URL}/airlines`, airlineData, {
        headers: {
            'Authorization': token
        }
    });
    return response.data;
};

const updateAirline = async (id, airlineData, token) => {
    const response = await axios.put(`${API_URL}/airlines/${id}`, airlineData, {
        headers: {
            'Authorization': token
        }
    });
    return response.data;
};

const deleteAirline = async (id, token) => {
    const response = await axios.delete(`${API_URL}/airlines/${id}`, {
        headers: {
            'Authorization': token
        }
    });
    return response.data;
};

const getAirlineById = async (id, token) => {
    const response = await axios.get(`${API_URL}/airlines/${id}`, {
        headers: {
            'Authorization': token
        }
    });
    return response.data;
};

const getAllFlights = async (token) => {
    const response = await axios.get(`${API_URL}/flights`, {
        headers: {
            'Authorization': token
        }
    });
    return response.data;
};

const addFlight = async (flightData, token) => {
    const response = await axios.post(`${API_URL}/flights`, flightData, {
        headers: {
            'Authorization': token
        }
    });
    return response.data;
};

const updateFlight = async (id, flightData, token) => {
    const response = await axios.put(`${API_URL}/flights/${id}`, flightData, {
        headers: {
            'Authorization': token
        }
    });
    return response.data;
};

const deleteFlight = async (id, token) => {
    const response = await axios.delete(`${API_URL}/flights/${id}`, {
        headers: {
            'Authorization': token
        }
    });
    return response.data;
};

const getFlightById = async (id, token) => {
    const response = await axios.get(`${API_URL}/flights/${id}`, {
        headers: {
            'Authorization': token
        }
    });
    return response.data;
};

export {
    getAllAirlines,
    addAirline,
    updateAirline,
    deleteAirline,
    getAirlineById,
    getAllFlights,
    addFlight,
    updateFlight,
    deleteFlight,
    getFlightById
};
