// Replace these with actual API requests
export const sendOtp = async (mobile) => {
    console.log("Sending OTP to:", mobile);
    // Simulate API call
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };
  
  export const verifyOtp = async (mobile, otp) => {
    console.log("Verifying OTP for:", mobile, otp);
    if (otp === "1234") {
      return Promise.resolve({ name: "Test User", mobile });
    } else {
      return Promise.reject("Invalid OTP");
    }
  };
  