import React, { useState } from 'react';
import LoanLogo from '../../assets/loan-logo.png';
import ProgressSteps from './components/ProgressSteps';
import { saveUserDetails } from '../../utils/auth';

const Step4 = ({ formData, setFormData, nextStep, prevStep, isReturningUser }) => {
  const [errors, setErrors] = useState({});

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
    if (!formData.loanPurpose) newErrors.loanPurpose = "Select loan purpose";
    if (!formData.loanAmount || formData.loanAmount < 1000) newErrors.loanAmount = "Loan amount too low";
    if (!formData.tenure || formData.tenure < 1) newErrors.tenure = "Tenure required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      saveUserDetails(formData);
      nextStep();
    }
  };

  const completionPercentage = 99;

  return (
    <div className="p-2 text-center">
      <div className="mb-6">
        {/* <LoanLogo /> */}
        <img src={LoanLogo} alt="Loan Logo" className="mx-auto mb-6 w-32 h-auto" />
      </div>

      {/* <p className="text-sm text-gray-500 mb-1">{completionPercentage}% to complete</p> */}
      {/* <div className="w-full h-1 bg-gray-200 mb-4 rounded-full">
        <div 
          className="h-full bg-green-500 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div> */}

      <ProgressSteps currentStep={4} />

      <div className="mb-6 mt-4 text-left">
        <h2 className="text-xl font-bold text-gray-800">
          Loan Requirements
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Tell us what you're looking for
        </p>
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
          <option value="Home Renovation">Home Renovation</option>
          <option value="Medical Emergency">Medical Emergency</option>
          <option value="Education">Education</option>
          <option value="Wedding">Wedding</option>
          <option value="Business">Business</option>
          <option value="Other">Other</option>
        </select>
        {errors.loanPurpose && <p className="text-red-500 text-xs mt-1">{errors.loanPurpose}</p>}
      </div>

      {/* Loan Required */}
      <div className="mb-6 text-left">
        <div className="flex justify-between items-center mb-2">
          <label className="font-medium text-gray-700">Loan Required</label>
          <span className="font-semibold text-green-600">₹{(formData.loanAmount || 0).toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={1000}
          max={1000000}
          step={1000}
          value={formData.loanAmount || 0}
          onChange={(e) => handleSliderChange("loanAmount", parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹1,000</span>
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
        <input
          type="range"
          min={1}
          max={60}
          step={1}
          value={formData.tenure || 0}
          onChange={(e) => handleSliderChange("tenure", parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 month</span>
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

export default Step4;