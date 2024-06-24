import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/login', null, { 
            params: {
                username: credentials.username,
                password: credentials.password
            }
        }).then(response => {
            alert('Login successful');
            console.log('Response:', response.data);
        }).catch(error => {
            alert('Login failed');
            console.error('Error:', error.response ? error.response.data : error.message);
        });
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
