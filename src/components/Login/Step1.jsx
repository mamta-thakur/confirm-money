import React, { useState, useEffect, useRef } from 'react';
import { isUserRegistered, generateOTP } from '../../utils/auth';
import api, { setAuthToken } from '../../services/api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoanLogo from '../../assets/loan-logo.png';
import ProgressBar from '../ProgressBar';
import ProgressSteps from '../ProgressSteps';
import { saveConcentDetails } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';
import { sendOTP, verifyOTP } from '../../services/firebase';

const Step1 = ({ nextStep, formData, setFormData, setIsReturningUser }) => {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(formData.mobile || '');
  const [mode, setMode] = useState('login');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [useFirebase, setUseFirebase] = useState(true);
  const [mockOTP, setMockOTP] = useState(null);

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
      if (useFirebase) {
        try {
          // Try Firebase first
          const phoneNumber = `+91${mobile}`;
          const confirmation = await sendOTP(phoneNumber);
          setConfirmationResult(confirmation);
          toast.success('OTP sent successfully!');
        } catch (firebaseError) {
          console.warn('Firebase OTP failed, falling back to mock OTP:', firebaseError);
          
          // Check if it's a billing error
          if (firebaseError.code === 'auth/billing-not-enabled') {
            toast.error('Firebase Phone Auth requires a paid plan. Using mock OTP for demo.');
            setUseFirebase(false);
            
            // Generate mock OTP
            const generatedOTP = generateOTP();
            setMockOTP(generatedOTP);
            toast.success(`Demo OTP: ${generatedOTP} (This is for testing only)`);
          } else {
            throw firebaseError;
          }
        }
      } else {
        // Use mock OTP system
        const generatedOTP = generateOTP();
        setMockOTP(generatedOTP);
        toast.success(`Demo OTP: ${generatedOTP} (This is for testing only)`);
      }
      
      setFormData(prev => ({ 
        ...prev, 
        mobile,
        isNewUser: mode === 'register'
      }));
      
      setIsReturningUser(mode === 'login');
      setShowOTP(true);
      setTimer(60);
    } catch (error) {
      console.error("OTP request failed:", error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/too-many-requests') {
        toast.error("Too many requests. Please try again later.");
      } else if (error.code === 'auth/invalid-phone-number') {
        toast.error("Invalid phone number format.");
      } else if (error.code === 'auth/billing-not-enabled') {
        toast.error("Firebase Phone Auth requires billing to be enabled. Please upgrade your Firebase plan.");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return; // Prevent resending if timer is active
    
    try {
      setLoading(true);
      
      if (useFirebase && confirmationResult) {
        const phoneNumber = `+91${mobile}`;
        const confirmation = await sendOTP(phoneNumber);
        setConfirmationResult(confirmation);
        toast.success("New OTP sent via Firebase!");
      } else {
        // Resend mock OTP
        const generatedOTP = generateOTP();
        setMockOTP(generatedOTP);
        toast.success(`New Demo OTP: ${generatedOTP}`);
      }
      
      setTimer(60);
    } catch (error) {
      console.error("Resend OTP failed:", error);
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    // const enteredOtp = otp.join('');
    const enteredOtp = otp;
    
    if (enteredOtp.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    if (!confirmationResult && !mockOTP) {
      toast.error('Please request OTP first');
      return;
    }

    setVerifying(true);

    try {
      let authSuccess = false;
      let firebaseToken = null;

      if (useFirebase && confirmationResult) {
        // Verify OTP with Firebase
        const result = await verifyOTP(confirmationResult, enteredOtp);
        
        if (result.user) {
          // Get Firebase ID token
          firebaseToken = await result.user.getIdToken();
          authSuccess = true;
        }
      } else if (mockOTP) {
        // Verify mock OTP
        if (enteredOtp === mockOTP.toString()) {
          authSuccess = true;
          // For mock, we'll create a dummy token or use a different endpoint
        } else {
          throw new Error('Invalid OTP');
        }
      }

      if (authSuccess) {
        let response;
        
        if (firebaseToken) {
          // Use Firebase auth endpoint
          response = await api.post('/user/firebase-auth', {
            firebase_token: firebaseToken,
            mobile_number: mobile,
            type: "credit"
          });
        } else {
          // Use mock auth endpoint or create a demo session
          response = await api.post('/user/mock-auth', {
            mobile_number: mobile,
            type: "credit",
            demo: true
          });
        }

        if (response.data.success) {
          const token = response.data.token;
          const decoded = jwtDecode(token);
          const userId = decoded.user_id;

          localStorage.setItem("authToken", token);
          localStorage.setItem("isAuthenticated", true);
          setAuthToken(token);

          setFormData(prev => ({
            ...prev,
            token,
            userId,
            isAuthenticated: true,
            authMethod: useFirebase ? 'firebase' : 'mock'
          }));

          toast.success('OTP verified successfully!');
          nextStep();
        } else {
          toast.error(response.data.message || 'Authentication failed');
        }
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/invalid-verification-code') {
        toast.error('Invalid OTP. Please try again.');
      } else if (error.code === 'auth/code-expired') {
        toast.error('OTP expired. Please request a new one.');
      } else if (error.message === 'Invalid OTP') {
        toast.error('Invalid OTP. Please try again.');
      } else {
        toast.error('Verification failed. Please try again.');
      }
    } finally {
      setVerifying(false);
    }
  };

  const isFormValid = checked1 && checked2 && otp.every(digit => digit !== '');
  const completionPercentage = mode === 'register' ? 0 : 25;

  return (
    <div className="p-2 mt-2 text-center">
      {/* Hidden reCAPTCHA container */}
      <div id="recaptcha-container"></div>

      {/* Demo Mode Indicator */}
      {!useFirebase && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Demo Mode:</strong> Using mock OTP for testing. 
            Upgrade Firebase to Blaze plan for real SMS.
          </p>
        </div>
      )}

      <ProgressBar formData={formData} currentStep={1} />
      <ProgressSteps currentStep={1} />

      <div className="mb-8 mt-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {mode === 'login' ? '' : ''}
        </h2>

        <p className="text-gray-600 mt-10 text-2xl font-semibold leading-snug">
          {mode === 'login' ? (
            <>
              Unlock Best Offers <br />
              {/* from <span className="font-extrabold text-3xl">30+ Lenders</span> */}
            </>
          ) : (
            <>
              Unlock Best Offers <br />
              {/* from <span className="font-extrabold text-3xl">30+ Lenders</span> */}
            </>
          )}
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
              <label htmlFor="consent" className="cursor-pointer">
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
              <label htmlFor="terms" className="cursor-pointer">
                I acknowledge that I have read and agree to Confirm's <a href="terms" target="_blank" className="text-green-500 underline">Terms of Use</a>, and <a href="privacy" target="_blank" className="text-green-500 underline"> Privacy Policy</a>. {' '}
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
              mode === 'login' ? 'Proceed' : 'Proceed'
            )}
          </button>
        </>
      ) : (
        <>
          {/* Show current OTP in demo mode */}
          {!useFirebase && mockOTP && (
            <div className="mb-4 p-3 bg-blue-100 border border-blue-400 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Demo OTP:</strong> {mockOTP}
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-3 mb-3">

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              className="w-full p-3 border rounded-lg text-lg text-center font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500 transition tracking-widest"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={handleOtpChange}
            />
            
            {/* {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center border rounded-lg text-xl font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                value={digit}
                onChange={e => handleOtpChange(e.target.value, index)}
                onKeyDown={e => handleKeyDown(e, index)}
              />
            ))} */}

          </div>

          <div className="text-center mb-4">
            {timer > 0 ? (
              <p className="text-sm text-gray-600">
                Resend OTP in ({timer.toString().padStart(2, '0')}s)
              </p>
            ) : (
              <button 
                onClick={handleResendOTP}
                disabled={loading}
                className="text-green-600 text-sm font-medium hover:underline disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Resend OTP'}
              </button>
            )}
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={!isFormValid || verifying}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              isFormValid && !verifying
                ? 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700' 
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            {verifying ? 'Verifying...' : 'Verify & Login'}
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
            {/* By logging in, you agree to following <br />
            Confirm's Credit Report Terms, <a href="terms" target="_blank" className="text-green-500 underline">Terms of Use</a>, and <a href="privacy" target="_blank" className="text-green-500 underline"> Privacy Policy</a>. */}
          </>
        )}
      </p>
    </div>
  );
};

export default Step1;