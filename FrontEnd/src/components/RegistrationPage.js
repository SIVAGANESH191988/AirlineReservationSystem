import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'; // Adjust the path based on your file structure

function RegistrationPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data:', form); // Check this log
      const response = await axios.post('http://localhost:8080/api/auth/register', form);
      alert('Registration successful!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='register-container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input name="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={handleChange} />
        <input name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
        <input name="phone" type="text" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
