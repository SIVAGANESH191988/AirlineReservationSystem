import React, { useState } from 'react';
import { addAirline } from '../Api/airlines';

const AdminDashboard = () => {
    const [airlineData, setAirlineData] = useState({
        name: '',
        
    });
    const [token, setToken] = useState(''); 
    const handleAddAirline = async (e) => {
        e.preventDefault();
        try {
            const response = await addAirline(airlineData, token);
            console.log('Airline added:', response); 
        } catch (error) {
            console.error('Failed to add airline:', error);
            
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
