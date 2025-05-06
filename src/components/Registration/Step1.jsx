import React, { useState } from 'react';
import Logo from "../../assets/loan-logo.png";
import api from '../../services/api';
import toast from 'react-hot-toast';

const Step1 = ({ nextStep, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(formData.mobile || '');

  const isValidMobile = mobile.length === 10 && /^\d+$/.test(mobile);

  const handleGenerateOTP = async () => {
    if (!isValidMobile) return;

    setLoading(true);
    
    try {
      // await api.post('/send-otp', { mobile });
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log('Generated OTP:', otp);
      toast.success(`Your OTP is: ${otp}`); 
      setFormData({ ...formData, mobile, otp });

      nextStep(); // proceed to OTP verification step
    } catch (error) {
      console.error("OTP request failed:", error);
      // Optionally show error to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 text-center">
      <img src={Logo} alt="Logo" className="mx-auto mb-6" />

      <p className="text-sm text-gray-500 mb-1">100% to complete</p>
      <div className="w-full h-1 bg-gray-200 mb-4 rounded-full">
        <div className="w-full h-full bg-green-500 rounded-full"></div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button className="px-4 py-2 rounded-full bg-green-100 text-green-700">Register</button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500">All Details</button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500">Offers</button>
      </div>

      <input
        type="tel"
        inputMode="numeric"
        maxLength={10}
        className="w-full mb-4 p-3 border rounded text-lg"
        placeholder="Enter Your Mobile Number"
        value={mobile}
        onChange={e => {
          const val = e.target.value;
          if (/^\d{0,10}$/.test(val)) setMobile(val);
        }}
      />

      <button
        onClick={handleGenerateOTP}
        disabled={!isValidMobile || loading}
        className={`w-full py-3 text-white font-semibold rounded ${
          isValidMobile && !loading ? 'bg-green-500' : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {loading ? 'Sending OTP...' : 'Generate OTP'}
      </button>
    </div>
  );
};

export default Step1;
