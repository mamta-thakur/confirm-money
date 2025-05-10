import React, { useState, useEffect } from 'react';
import { isUserRegistered, generateOTP } from '../../utils/auth';
import api from '../../services/api';
import toast from 'react-hot-toast';
import LoanLogo from '../../assets/loan-logo.png';
import ProgressSteps from '../ProgressSteps';

const Step1 = ({ nextStep, formData, setFormData, setIsReturningUser }) => {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(formData.mobile || '');
  const [mode, setMode] = useState('login');

  const isValidMobile = mobile.length === 10 && /^\d+$/.test(mobile);

  // Check if user is registered when mobile number changes
  useEffect(() => {
    if (isValidMobile) {
      const userExists = isUserRegistered(mobile);
      setMode(userExists ? 'login' : 'register');
    }
  }, [mobile]);

  const handleGenerateOTP = async () => {
    if (!isValidMobile) return;

    setLoading(true);
    
    try {
      // await api.post('/send-otp', { mobile });
      
      const otp = generateOTP();
      console.log('Generated OTP:', otp);
      toast.success(`Your OTP is: ${otp}`);
      
      setFormData(prev => ({ 
        ...prev, 
        mobile, 
        otp,
        isNewUser: mode === 'register'
      }));
      
      setIsReturningUser(mode === 'login');
      nextStep();
    } catch (error) {
      console.error("OTP request failed:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const completionPercentage = mode === 'register' ? 0 : 25;

  return (
    <div className="p-2 text-center">
      <div className="mb-6">
        {/* <LoanLogo /> */}
        <img src={LoanLogo} alt="Loan Logo" className="mx-auto mb-6 w-32 h-auto" />
      </div>

      <p className="text-sm text-gray-500 mb-1">{completionPercentage}% to complete</p>
      <div className="w-full h-1 bg-gray-200 mb-4 rounded-full">
        <div 
          className="h-full bg-green-500 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>

      <ProgressSteps currentStep={1} />

      <div className="mb-8 mt-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {mode === 'login' ? 'Welcome Back!' : 'Get Started'}
        </h2>
        <p className="text-gray-600 mt-2">
          {mode === 'login' 
            ? 'Login with your mobile number' 
            : 'Register to check your loan eligibility'}
        </p>
      </div>

      <input
        type="tel"
        inputMode="numeric"
        maxLength={10}
        className="w-full mb-4 p-3 border rounded-lg text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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
        className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${
          isValidMobile && !loading 
            ? 'bg-green-500 hover:bg-green-600 active:bg-green-700' 
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {loading ? 'Sending OTP...' : (
          mode === 'login' ? 'Login with OTP' : 'Register with OTP'
        )}
      </button>

      <p className="mt-4 text-sm text-gray-600">
        {mode === 'login' 
          ? "We'll verify your identity with a one-time password" 
          : "Create an account to explore loan options tailored for you"}
      </p>
    </div>
  );
};

export default Step1;