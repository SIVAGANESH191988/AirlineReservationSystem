import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', null, {
                params: {
                    username: credentials.username,
                    password: credentials.password
                }
            });
            const token = response.data; // The token is the response data
            localStorage.setItem('userToken', token); // Store the token directly
            alert('Login successful');
            navigate('/search-flights'); // Redirect to flight search page
        } catch (error) {
            alert('Login failed');
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
