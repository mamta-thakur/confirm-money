// Helper functions for authentication

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
  
  // Generate a random OTP
  export const generateOTP = (): number => {
    return Math.floor(1000 + Math.random() * 9000);
  };
  
  // Logout user
  // Clear user details from local storage and redirect
  export const logoutUser = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('registeredUsers');
    localStorage.removeItem('shop-otp');
    localStorage.removeItem('userMobile');
    window.location.href = '/'; // Redirect to home or login page
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