// Helper functions for authentication

// Check if user is already registered
export const isUserRegistered = (mobile: string): boolean => {
    const savedDetails = localStorage.getItem('userDetails');
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
    const savedDetails = localStorage.getItem('userDetails');
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
    localStorage.setItem('userDetails', JSON.stringify(details));
  };
  
  // Generate a random OTP
  export const generateOTP = (): number => {
    return Math.floor(1000 + Math.random() * 9000);
  };
  
  // Logout user
  // Clear user details from local storage and redirect
  export const logoutUser = () => {
    localStorage.removeItem('userDetails');
    window.location.href = '/'; // Redirect to home or login page
  };
  