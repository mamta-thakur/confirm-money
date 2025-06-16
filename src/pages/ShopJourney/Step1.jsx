import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerShopUser,isShopUserRegistered, generateOTP, setAuthenticated } from '../../utils/auth';
import api from '../../services/api';
import toast from 'react-hot-toast';
import LoanLogo from '../../assets/loan-logo.png';
// import ProgressBar from '../ProgressBar';
// import ProgressSteps from '../ProgressSteps';

const Step1 = ({ nextStep, formData, setFormData, setIsReturningUser }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState(formData.mobile || '');
    const [mode, setMode] = useState('login');
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputsRef = useRef([]);
    const [timer, setTimer] = useState(60);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const isValidMobile = mobile.length === 10 && /^\d+$/.test(mobile);

    useEffect(() => {
    if (isValidMobile) {
        const userExists = isShopUserRegistered(mobile);
        setMode(userExists ? 'login' : 'register');
    }
    }, [mobile]);

    useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
    }, [timer]);

    const handleGenerateOTP = async () => {
    if (!isValidMobile) return;

    setLoading(true);

    try {
    //   await api.post('/send-otp', { mobile });
        
        const otp = generateOTP();
        console.log('Generated OTP:', otp);
        toast.success(`Your OTP is: ${otp}`);
        
        setFormData(prev => ({ 
        ...prev, 
        mobile, 
        otp,
        isNewUser: mode === 'register'
        }));

        localStorage.setItem('shop-otp', otp);
        
        setIsReturningUser(mode === 'login');
        setShowOTP(true);
        setTimer(60);
    } catch (error) {
        console.error("OTP request failed:", error);
        toast.error("Failed to send OTP. Please try again.");
    } finally {
        setLoading(false);
    }
  };

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

  const handleVerifyOTP = () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp === formData.otp?.toString()) {
      const updatedFormData = {
        ...formData,
        isAuthenticated: true
      };

    //   isNewUser = mode === 'register';
      if (formData.isNewUser) {
        registerShopUser(mobile, enteredOtp);
        toast.success('Registration successful!');
      }
      
      setFormData(updatedFormData);

      localStorage.setItem('userMobile', mobile);
      setAuthenticated(true);

      toast.success('OTP verified successfully!');
    //   nextStep();
    navigate('/shop');
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const isFormValid = checked1 && checked2 && otp.every(digit => digit !== '');

  return (
    <>
      
      <div className="p-2 mt-10 text-center">
        {/* <div className="mb-6">
          <img src={LoanLogo} alt="Loan Logo" className="mx-auto mb-6 w-32 h-auto" />
        </div> */}


        <div className="mb-8 mt-20">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'login' ? '' : ''}
          </h2>
          <p className="text-gray-600 mt-2 text-2xl">
            {mode === 'login' 
              ? 'Sign-up using Mobile Number' 
              : 'Sign-up using Mobile Number'}
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

        {!showOTP ? (
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
        ) : (
          <>
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

            <button
              onClick={handleVerifyOTP}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                isFormValid 
                  ? 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700' 
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
              disabled={!isFormValid}
            >
              Verify OTP
            </button>
          </>
        )}

        <p className="mt-4 text-sm text-gray-600">
          {mode === 'login' 
            ? "We'll verify your identity with a one-time password" 
            : ""}
        </p>
      </div>
    </>
  );
};

export default Step1;