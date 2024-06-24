import React, { useState } from 'react';
import { addAirline } from '../Api/airlines'; // Adjust the path as per your project structure

const AdminDashboard = () => {
    const [airlineData, setAirlineData] = useState({
        name: '',
        // Add other fields as needed
    });
    const [token, setToken] = useState(''); // State for authentication token

    const handleAddAirline = async (e) => {
        e.preventDefault();
        try {
            const response = await addAirline(airlineData, token);
            console.log('Airline added:', response); // Log response if needed
            // Optionally, update state or perform other actions upon success
        } catch (error) {
            console.error('Failed to add airline:', error);
            // Handle error, possibly show a message to the user
        }
    };

    const handleChange = (e) => {
        setAirlineData({
            ...airlineData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h2>Add Airline</h2>
            <form onSubmit={handleAddAirline}>
                <input type="text" name="name" value={airlineData.name} onChange={handleChange} placeholder="Airline Name" />
                {/* Add other input fields as per your airline data structure */}
                <button type="submit">Add Airline</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
