import React, { useEffect, useRef, useState } from 'react';
import LoanLogo from '../../assets/loan-logo.png';
import toast from 'react-hot-toast';
import { saveUserDetails, getUserDetails } from '../../utils/auth';
import ProgressSteps from '../ProgressSteps';

const Step2 = ({ nextStep, prevStep, formData, setFormData, isReturningUser }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  // Load saved details for returning users
  useEffect(() => {
    if (isReturningUser) {
      const savedDetails = getUserDetails();
      if (savedDetails?.otp) {
        const otpDigits = savedDetails.otp.toString().padStart(4, '0').split('');
        setOtp(otpDigits);
      }
    }
  }, [isReturningUser]);

  // Countdown Timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResendOTP = () => {
    toast.success("New OTP sent!");
    setTimer(60);
  };

  const isFormValid = checked1 && checked2 && otp.every(digit => digit !== '');
  const completionPercentage = isReturningUser ? 50 : 25;

  const handleNextStep = () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp === formData.otp?.toString()) {
      const updatedFormData = {
        ...formData,
        isAuthenticated: true
      };
      
      if (isReturningUser) {
        const savedDetails = getUserDetails();
        if (savedDetails) {
          Object.assign(updatedFormData, savedDetails, { isAuthenticated: true });
        }
      }
      
      setFormData(updatedFormData);
      saveUserDetails(updatedFormData);
      
      toast.success('OTP verified successfully!');
      nextStep();
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

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

      <ProgressSteps currentStep={2} />

      <div className="mb-8 mt-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Verify Your Number
        </h2>
        <p className="text-gray-600 mt-2">
          Enter the 4-digit OTP sent to {formData.mobile}
        </p>
      </div>

      <div className="flex justify-center space-x-3 mb-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-14 h-14 text-center border rounded-lg text-xl font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            value={digit}
            onChange={e => handleOtpChange(e.target.value, index)}
            onKeyDown={e => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <div className="text-center mb-4">
        {timer > 0 ? (
          <p className="text-sm text-gray-600">
            Resend OTP in ({timer.toString().padStart(2, '0')}s)
          </p>
        ) : (
          <button 
            onClick={handleResendOTP}
            className="text-green-600 text-sm font-medium hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>

      <div className="text-left text-xs text-gray-600 space-y-3 mb-6">
        <div className="flex items-start">
          <input 
            type="checkbox" 
            id="terms"
            className="mt-1 mr-2" 
            checked={checked1} 
            onChange={e => setChecked1(e.target.checked)} 
          />
          <label htmlFor="terms" className="cursor-pointer">
            You agree to LoanEasy's Privacy Policy and T&C and consent to be contacted{' '}
            <span className="text-green-500 underline">Read More</span>
          </label>
        </div>
        
        <div className="flex items-start">
          <input 
            type="checkbox" 
            id="consent"
            className="mt-1 mr-2" 
            checked={checked2} 
            onChange={e => setChecked2(e.target.checked)} 
          />
          <label htmlFor="consent" className="cursor-pointer">
            You hereby consent to LoanEasy being your authorized representative{' '}
            <span className="text-green-500 underline">Read More</span>
          </label>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={prevStep}
          className="w-1/3 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition"
        >
          Back
        </button>
        
        <button
          onClick={handleNextStep}
          className={`w-2/3 py-3 rounded-lg font-semibold transition ${
            isFormValid 
              ? 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700' 
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!isFormValid}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default Step2;