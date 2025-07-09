// Helper functions for authentication

import api, { setAuthToken } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';


// Mock user storage
const USER_DETAILS_KEY = 'userDetails';

// Check if user is already registered
export const isUserRegistered = (mobile: string): boolean => {
    const savedDetails = localStorage.getItem(USER_DETAILS_KEY);
    if (!savedDetails) return false;
    
    try {
      const details = JSON.parse(savedDetails);
      return details.mobile === mobile;
    } catch (error) {
      console.error('Error parsing user details:', error);
      return false;
    }
  };
  
  // Get user details if saved
  export const getUserDetails = () => {
    const savedDetails = localStorage.getItem(USER_DETAILS_KEY);
    if (!savedDetails) return null;
    
    try {
      return JSON.parse(savedDetails);
    } catch (error) {
      console.error('Error parsing user details:', error);
      return null;
    }
  };
  
  // Save user details
  export const saveUserDetails = (details: any) => {
    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(details));
  };

  // Save user details
  export const saveConcentDetails = (details: any) => {
    localStorage.setItem('userConcentDetails', JSON.stringify(details));
  };
  
  // Generate a random OTP
  export const generateOTP = (): number => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP for consistency
  };
  
  // Logout user
  // Clear user details from local storage and redirect
  export const logoutUser = async(formData = null) => {
    try {
      const token = formData?.token || localStorage.getItem('authToken');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.user_id;

        // Call logout API
        await api.post('/user/logout', { user_id: userId });
      }

      // Sign out from Firebase
      if (auth.currentUser) {
        await signOut(auth);
      }
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      localStorage.removeItem('userDetails');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('registeredUsers');
      localStorage.removeItem('shop-otp');
      localStorage.removeItem('userMobile');
      localStorage.removeItem('authToken');
      
      // Clear Firebase reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      setAuthToken(null);
      window.location.href = '/'; // Redirect to home or login page
    }
  };
  
////////////////////////////////////////////////////////////////////

// Mock user storage
const USERS_KEY = 'registeredUsers';

export const isShopUserRegistered = (mobile: string): boolean => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    return users.includes(mobile);
  } catch (error) {
    console.error('Error checking user registration:', error);
    return false;
  }
};

export const registerShopUser = (mobile: string): void => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (!users.includes(mobile)) {
      users.push(mobile);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const setAuthenticated = (value: boolean): void => {
  localStorage.setItem('isAuthenticated', value.toString());
};