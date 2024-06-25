import React, { useState } from 'react';
import { registerAdmin } from '../api/AdminAuth'; // Adjust path as per your file structure

const AdminRegister = () => {
    const [admin, setAdmin] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerAdmin(admin);
            alert('Admin registered successfully');
            setAdmin({
                username: '',
                password: '',
                email: ''
            });
        } catch (error) {
            setError('Registration failed. Please check the details.');
        }
    };

    return (
        <div>
            <h2>Admin Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={admin.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={admin.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={admin.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AdminRegister;
