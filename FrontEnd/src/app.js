import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import FlightSearchPage from './components/FlightSearchPage';
import FlightDetailsPage from './components/FlightDetailsPage';
import BookingConfirmationPage from './components/BookingConfirmationPage';
import UserProfilePage from './components/UserProfilePage';
import PaymentPage from './components/PaymentPage';
import BookingManagementPage from './components/BookingManagementPage';
import FlightStatusPage from './components/FlightStatusPage';
import AdminDashboard from './components/AdminDashboard';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import LocalisationSettingsPage from './components/LocalisationSettingsPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search-flights" element={<FlightSearchPage />} />
            <Route path="/flight-details" element={<FlightDetailsPage />} />
            <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmationPage />} />
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/manage-bookings" element={<BookingManagementPage />} />
            <Route path="/flight-status" element={<FlightStatusPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/localisation-settings" element={<LocalisationSettingsPage />} />
        </Routes>
    );
};

export default App;
