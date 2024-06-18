// src/pages/RegistrationPage.js
import React, { useState } from 'react';
import axios from 'axios';

function RegistrationPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', phone: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input name="phone" type="text" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
