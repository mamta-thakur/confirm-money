// src/components/steps/Congrats.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Congrats = ({ formData }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Congratulations!</h2>
      <p className="mb-4">You're eligible for the following loan offers:</p>
      <ul className="text-left mb-6">
        <li>✅ Personal Loan up to ₹{parseInt(formData.loan) + 10000}</li>
        <li>✅ EMI plans for 6–24 months</li>
        <li>✅ Instant approval within 24 hours</li>
      </ul>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        View Products
      </Link>
    </div>
  );
};

export default Congrats;
