// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFmwQ2QnKPQpYid5jFFp5JIhBPfz8LldA",
  authDomain: "confirm-money.firebaseapp.com",
  projectId: "confirm-money",
  storageBucket: "confirm-money.firebasestorage.app",
  messagingSenderId: "416076390716",
  appId: "1:416076390716:web:b30e91de0eb18d8b703e39",
  measurementId: "G-489EKYN1F3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Configure reCAPTCHA
export const setupRecaptcha = (containerId) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA solved');
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired');
      }
    });
  }
  return window.recaptchaVerifier;
};

// Send OTP
export const sendOTP = async (phoneNumber) => {
  try {
    const recaptchaVerifier = setupRecaptcha('recaptcha-container');
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

// Verify OTP
export const verifyOTP = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    return result;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export default app;