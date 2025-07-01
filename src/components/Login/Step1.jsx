import React, { useState, useEffect, useRef } from 'react';
import { isUserRegistered, generateOTP } from '../../utils/auth';
import api, { setAuthToken } from '../../services/api';
import toast from 'react-hot-toast';
import LoanLogo from '../../assets/loan-logo.png';
import ProgressBar from '../ProgressBar';
import ProgressSteps from '../ProgressSteps';
import { saveConcentDetails } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';

const Step1 = ({ nextStep, formData, setFormData, setIsReturningUser }) => {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(formData.mobile || '');
  const [mode, setMode] = useState('login');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const isValidMobile = (mobile.length === 10 && /^\d+$/.test(mobile));
  const isConcentGiven = checked1 && checked2;

  useEffect(() => {
    if (isValidMobile) {
      const userExists = isUserRegistered(mobile);
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
      // const otp = generateOTP();
      const send_otp  = await api.post('/user/send', { mobile_number: mobile, type: "credit" });

      console.log(send_otp);

      const otp = send_otp.data.otp; 
      // const otp = generateOTP();
      console.log('Generated OTP:', otp);
      toast.success(`Your OTP is: ${otp}`);
      
      setFormData(prev => ({ 
        ...prev, 
        mobile, 
        otp,
        isNewUser: mode === 'register'
      }));
      
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
    if (timer > 0) return; // Prevent resending if timer is active
    handleGenerateOTP();
    toast.success("New OTP sent!");
    setTimer(60);
  };

  const handleVerifyOTP = async() => {
    const enteredOtp = otp.join('');

    try {
      const response = await api.post('/user/verify-otp', {
        mobile_number: formData.mobile,
        otp: enteredOtp
      });

      if (response.data.success) {
        const token = response.data.token;
        const decoded = jwtDecode(token);
        const userId = decoded.user_id;

        localStorage.setItem("authToken", token);
        // Set token globally
        setAuthToken(token);

        setFormData(prev => ({
          ...prev,
          token,
          userId,
          isAuthenticated: true
        }));

        toast.success('OTP verified successfully!');
        nextStep();
      } else {
        toast.error(response.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      toast.error('Verification failed. Please try again.');
    }

    // if (enteredOtp === formData.otp?.toString()) {
    //   const updatedFormData = {
    //     ...formData,
    //     isAuthenticated: true
    //   };
      
    //   setFormData(updatedFormData);
    //   toast.success('OTP verified successfully!');
    //   nextStep();
    // } else {
    //   toast.error('Invalid OTP. Please try again.');
    // }
  };

  const isFormValid = checked1 && checked2 && otp.every(digit => digit !== '');
  const completionPercentage = mode === 'register' ? 0 : 25;

  return (
    <div className="p-2 mt-2 text-center">
      {/* <div className="mb-8">
        <img src={LoanLogo} alt="Loan Logo" className="mx-auto mb-6 w-32 h-auto" />
      </div> */}

      <ProgressBar formData={formData} currentStep={1} />
      <ProgressSteps currentStep={1} />


      <div className="mb-8 mt-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {mode === 'login' ? '' : ''}
        </h2>

        {/* <p className="text-2xl font-semibold text-blue-800 leading-snug">
          Unlock Best Offers <br />
          from <span className="font-extrabold text-3xl">30+ Lenders</span>
        </p> */}

        <p className="text-gray-600 mt-10 text-2xl font-semibold leading-snug">
          {mode === 'login' ? (
            <>
              Unlock Best Offers <br />
              from <span className="font-extrabold text-3xl">30+ Lenders</span>
            </>
          ) : (
            <>
              Unlock Best Offers <br />
              from <span className="font-extrabold text-3xl">30+ Lenders</span>
            </>
          )}
        </p>
      </div>

      {/* <div className="mb-8 mt-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {mode === 'login' ? '' : ''}
        </h2>
        {mode === 'login' ? (
          <p className="text-2xl font-semibold text-blue-800 leading-snug">
            Unlock Best Offers <br />
            from <span className="font-extrabold text-3xl">30+ Lenders</span>
          </p>
        ) : (
          <p className="text-gray-600 text-xl">Sign-up using Mobile Number</p>
        )}
      </div> */}

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
        <>
        <div className="text-left text-xs text-gray-600 space-y-3 mb-6">
            <div className="flex items-start">
              <input 
                type="checkbox" 
                id="consent"
                className="mt-1 mr-2" 
                checked={checked2} 
                onChange={e => setChecked2(e.target.checked)} 
              />
              <label htmlFor="consent" className="cursor-pointer-">
                I acknowledge that this is my mobile number and authorise Confirm to use it for communications related to my loan application. {' '}
              </label>
            </div>

            <div className="flex items-start">
              <input 
                type="checkbox" 
                id="terms"
                className="mt-1 mr-2" 
                checked={checked1} 
                onChange={e => setChecked1(e.target.checked)} 
              />
              <label htmlFor="terms" className="cursor-pointer-">
                I acknowledge that I have read and agree to Confirm's <a href="terms" target="_blank" className="text-green-500 underline">Credit Report Terms</a>, <a href="terms" target="_blank" className="text-green-500 underline">Terms of Use</a>, and <a href="privacy" target="_blank" className="text-green-500 underline"> Privacy Policy</a>. {' '}
              </label>
            </div>
          </div>
        
          <button
            onClick={handleGenerateOTP}
            disabled={!isValidMobile || loading || !isConcentGiven}
            className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${
              isValidMobile && !loading && isConcentGiven 
                ? 'bg-green-500 hover:bg-green-600 active:bg-green-700' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {loading ? 'Sending OTP...' : (
              mode === 'login' ? 'Proceed with OTP' : 'Proceed with OTP'
            )}
          </button>
        
        </>
        
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

          

          <button
            onClick={handleVerifyOTP}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              isFormValid 
                ? 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700' 
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
          >
            Verify & Login
          </button>
        </>
      )}

      <p className="mt-4 text-sm text-gray-600">
        {mode === 'login' ? (
          <>
            {/* By logging in, you agree to following <br />
            Confirm's Credit Report Terms, <a href="terms" target="_blank" className="text-green-500 underline">Terms of Use</a>, and <a href="privacy" target="_blank" className="text-green-500 underline"> Privacy Policy</a>. */}
          </>
        ) : (
          <>
            By logging in, you agree to following <br />
            Confirm's Credit Report Terms, <a href="terms" target="_blank" className="text-green-500 underline">Terms of Use</a>, and <a href="privacy" target="_blank" className="text-green-500 underline"> Privacy Policy</a>.
          </>
        )}
      </p>
    </div>
  );
};

export default Step1;