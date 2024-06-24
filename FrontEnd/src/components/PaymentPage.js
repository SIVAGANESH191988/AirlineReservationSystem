import React, { useState } from 'react';
import { processPayment } from '../api/payments';

const PaymentPage = ({ bookingID }) => {
    const [paymentData, setPaymentData] = useState({
        paymentMethod: '',
        amount: 0
    });

    const handleChange = (e) => {
        setPaymentData({
            ...paymentData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        processPayment({ ...paymentData, bookingID }).then(response => {
            alert('Payment successful');
        }).catch(error => {
            alert('Payment failed');
        });
    };

    return (
        <div>
            <h2>Payment</h2>
            <form onSubmit={handleSubmit}>
                <select name="paymentMethod" onChange={handleChange}>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                </select>
                <input type="number" name="amount" placeholder="Amount" onChange={handleChange} />
                <button type="submit">Pay</button>
            </form>
        </div>
    );
};

export default PaymentPage;
