import React, { useEffect, useRef, useState } from 'react';
import Logo from "../../assets/loan-logo.png";
import toast from 'react-hot-toast';

const Step2 = ({ nextStep, prevStep, formData, setFormData }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  // 1️⃣ Load saved details from localStorage (on login)
  useEffect(() => {
    const savedDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (savedDetails?.otp) {
      const otpDigits = savedDetails.otp.toString().padStart(4, '0').split('');
      setOtp(otpDigits);
    }
  }, []);

  // 2️⃣ Countdown Timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // OTP handler
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

  const isFormValid = checked1 && checked2 && otp.every(digit => digit !== '');

  // 3️⃣ Submit handler
  const handleNextStep = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === formData.otp?.toString()) {
      // Save userDetails to localStorage
      const detailsToSave = {
        ...formData,
        otp: enteredOtp,
      };
      localStorage.setItem('userDetails', JSON.stringify(detailsToSave));
      toast.success('OTP verified and details saved!');
      nextStep();
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="p-2 text-center">
      <img src={Logo} alt="Logo" className="mx-auto mb-6" />

      <p className="text-sm text-gray-500 mb-1">75% to complete</p>
      <div className="w-full h-1 bg-gray-200 mb-4 rounded-full">
        <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button className="px-4 py-2 rounded-full bg-green-100 text-green-700">Register</button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500">All Details</button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500">Offers</button>
      </div>

      <div className="flex justify-center space-x-2 mb-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-12 h-12 text-center border rounded text-xl"
            value={digit}
            onChange={e => handleOtpChange(e.target.value, index)}
            onKeyDown={e => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <p className="text-red-500 text-sm mb-4">
        ({timer > 0 ? `00:${timer.toString().padStart(2, '0')}` : 'Expired'})
      </p>

      <div className="text-left text-xs text-gray-600 space-y-2 mb-4">
        <p>
          <input type="checkbox" className="mr-2" checked={checked1} onChange={e => setChecked1(e.target.checked)} />
          You agree to FREED’s Privacy Policy and T&C and consent to be contacted{' '}
          <span className="text-green-500 underline">Read More</span>
        </p>
        <p>
          <input type="checkbox" className="mr-2" checked={checked2} onChange={e => setChecked2(e.target.checked)} />
          You hereby consent to FREED being your authorized representative{' '}
          <span className="text-green-500 underline">Read More</span>
        </p>
      </div>

      <button
        onClick={handleNextStep}
        className={`w-full py-3 rounded font-semibold ${
          isFormValid ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
        disabled={!isFormValid}
      >
        Next
      </button>
    </div>
  );
};

export default Step2;
