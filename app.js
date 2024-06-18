import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import LocalisationSettingsPage from './components/LocalisationSettingsPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/register" component={RegistrationPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/search-flights" component={FlightSearchPage} />
                <Route path="/flight-details" component={FlightDetailsPage} />
                <Route path="/booking-confirmation" component={BookingConfirmationPage} />
                <Route path="/user-profile" component={UserProfilePage} />
                <Route path="/payment" component={PaymentPage} />
                <Route path="/manage-bookings" component={BookingManagementPage} />
                <Route path="/flight-status" component={FlightStatusPage} />
                <Route path="/admin-dashboard" component={AdminDashboard} />
                <Route path="/localisation-settings" component={LocalisationSettingsPage} />
            </Switch>
        </Router>
    );
};

export default App;
