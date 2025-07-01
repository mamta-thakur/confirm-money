import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoanLogo from '../../assets/loan-logo.png';
// import ProgressSteps from '../ProgressSteps';
import api from '../../services/api';
import toast from 'react-hot-toast';
import ProgressBar from '../ProgressBar';
import ProgressSteps from '../ProgressSteps';
import { saveUserDetails } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';

const Step3 = ({ formData, setFormData, prevStep }) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLoanPreferences = async () => {
      try {
        const token = formData.token || localStorage.getItem("authToken");
        const userId = formData.userId || jwtDecode(token)?.user_id;

        if (!userId) {
          toast.error("User session expired. Please log in again.");
          return;
        }

        const response = await api.get(`/user/get-user-info?id=${userId}`);
        if (response.data.success && response.data.user) {
          const user = response.data.user;

          setFormData((prev) => ({
            ...prev,
            loanType: user.looking_for || '',
            loanPurpose: user.purpose || '',
            loanAmount: user.loan_amount || 5000,
            tenure: user.tenure_months || 6,
          }));
        }
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    };

    fetchUserLoanPreferences();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSliderChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: '' });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.loanType) newErrors.creditType = "Select loan type";
    if (!formData.loanPurpose) newErrors.loanPurpose = "Select loan purpose";
    if (!formData.loanAmount || formData.loanAmount < 5000) newErrors.loanAmount = "Loan amount too low";
    if (!formData.tenure || formData.tenure < 1) newErrors.tenure = "Tenure required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (!validate()) return;

    try {

      const token = formData.token; // already stored from OTP
      const decoded = jwtDecode(token);
      const userId = decoded.user_id;

      console.log("User ID:", userId);

      const payload = {
        id: userId, // Replace with dynamic ID if needed
        looking_for: formData.loanType || "Personal Loan",
        purpose: formData.loanPurpose || "Personal",
        loan_amount: formData.loanAmount || 5000,
        tenure_months: formData.tenure || 6
      };

      const response = await api.post('/user/loan-preferences', payload);

      if (response.data.success) {
        saveUserDetails({ ...formData, ...payload });
        // toast.success("Details saved successfully!");
        navigate('/loan-journey/offers');
      } else {
        toast.error(response.data.message || "Failed to save details.");
      }
    } catch (error) {
      console.error("Failed to save basic details:", error);
      toast.error("Something went wrong. Please try again.");
    }


    if (validate()) {
      saveUserDetails(formData);
      navigate('/loan-journey/offers');
    }
  };

  const min = 5000;
  const max = 1000000;
  const value = formData.loanAmount || min;
  const percent = ((value - min) / (max - min)) * 100;

  const minTenure = 3;
  const maxTenure = 60;
  const tenureValue = formData.tenure || minTenure;
  const tenurePercent = ((tenureValue - minTenure) / (maxTenure - minTenure)) * 100;

  return (
    <div className="p-2 mt-2 text-center">
      {/* <div className="mb-8">
        <img src={LoanLogo} alt="Loan Logo" className="mx-auto mb-6 w-32 h-auto" />
      </div> */}

      {/* <p className="text-sm text-gray-500 mb-1">99% to complete</p> */}
      {/* <div className="w-full h-1 bg-gray-200 mb-4 rounded-full">
        <div 
          className="h-full bg-green-500 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: '99%' }}
        ></div>
      </div> */}

      <ProgressBar formData={formData} currentStep={3} />
      <ProgressSteps currentStep={3} />

      {/* <div className="mb-6 mt-4 text-left">
        <h2 className="text-xl font-bold text-gray-800">
          Loan Requirements
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Tell us what you're looking for
        </p>
      </div> */}

      {/* Looking for */}
      <div className="mb-6 mt-10 text-left">
        <label className="block mb-2 font-medium text-gray-700">What are you looking for?</label>
        <select
          name="loanType"
          className="w-full p-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          value={formData.loanType || ''}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Personal Loan">Personal Loan</option>
          <option value="Business Loan">Business Loan </option>
          <option value="Education Loan">Education Loan </option>
          <option value="Auto Loan">Auto Loan</option>
          <option value="Home Loan">Home Loan</option>
          <option value="Loan Against Property">Loan Against Property</option>
          <option value="Gold Loan">Gold Loan</option>
          <option value="Credit Card">Credit Card</option>
        </select>
        {errors.loanType && <p className="text-red-500 text-xs mt-1">{errors.creditType}</p>}
      </div>

      {/* Purpose of Loan */}
      <div className="mb-6 text-left">
        <label className="block mb-2 font-medium text-gray-700">Purpose of Loan</label>
        <select
          name="loanPurpose"
          className="w-full p-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          value={formData.loanPurpose || ''}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>
          <option value="Consumer Durable">Consumer Durable</option>
          <option value="Vehicle Purchase">Vehicle Purchase</option>
          <option value="Home Buy / Renovation">Home Buy / Renovation</option>
          <option value="Emergency / Medical">Emergency / Medical</option>
          <option value="Wedding Expenses">Wedding Expenses</option>
          <option value="Debt Consolidation">Debt Consolidation</option>
        </select>
        {errors.loanPurpose && <p className="text-red-500 text-xs mt-1">{errors.loanPurpose}</p>}
      </div>

      {/* Loan Required */}
      <div className="mb-6 text-left">
        <div className="flex justify-between items-center mb-2">
          <label className="font-medium text-gray-700">Loan Required</label>
          <span className="font-semibold text-green-600">₹{(formData.loanAmount || 0).toLocaleString()}</span>
        </div>
        {/* <input
          type="range"
          min={1000}
          max={1000000}
          step={1000}
          value={formData.loanAmount || 0}
          onChange={(e) => handleSliderChange("loanAmount", parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        /> */}

        <input
          type="range"
          min={min}
          max={max}
          step={5000}
          value={value}
          onChange={(e) =>
            handleSliderChange("loanAmount", parseInt(e.target.value))
          }
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #22c55e ${percent}%, #e5e7eb ${percent}%)`
          }}
        />

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹5,000</span>
          <span>₹10,00,000</span>
        </div>
        {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount}</p>}
      </div>

      {/* Tenure */}
      <div className="mb-6 text-left">
        <div className="flex justify-between items-center mb-2">
          <label className="font-medium text-gray-700">Tenure (months)</label>
          <span className="font-semibold text-green-600">{formData.tenure || 0} months</span>
        </div>
        {/* <input
          type="range"
          min={1}
          max={60}
          step={1}
          value={formData.tenure || 0}
          onChange={(e) => handleSliderChange("tenure", parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        /> */}

        <input
          type="range"
          min={minTenure}
          max={maxTenure}
          step={3}
          value={tenureValue}
          onChange={(e) => handleSliderChange("tenure", parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #22c55e ${tenurePercent}%, #e5e7eb ${tenurePercent}%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>3 month</span>
          <span>60 months</span>
        </div>
        {errors.tenure && <p className="text-red-500 text-xs mt-1">{errors.tenure}</p>}
      </div>

      <div className="flex space-x-3 mt-8">
        <button
          onClick={prevStep}
          className="w-1/3 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition"
        >
          Back
        </button>
        
        <button
          onClick={handleSubmit}
          className="w-2/3 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 active:bg-yellow-600 transition"
        >
          Check Offers
        </button>
      </div>
    </div>
  );
};

export default Step3;