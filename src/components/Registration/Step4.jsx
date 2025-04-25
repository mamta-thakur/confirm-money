import React, { useState } from 'react';
import Logo from "../../assets/loan-logo.png";

const Step4 = ({ formData, setFormData, nextStep }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSliderChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
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
      nextStep();
    }
  };

  return (
    <div className="p-2 text-center">
      <img src={Logo} alt="Logo" className="mx-auto mb-6" />

      <p className="text-sm text-gray-500 mb-1">99% to complete</p>
      <div className="w-full h-1 bg-gray-200 mb-4 rounded-full">
        <div className="w-[99%] h-full bg-green-500 rounded-full"></div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500">Register</button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500">Add details</button>
        <button className="px-4 py-2 rounded-full bg-green-100 text-green-700">Offers</button>
      </div>

      {/* Purpose of Loan */}
      <div className="mb-6 text-left">
        <label className="block mb-1 font-medium">Purpose of Loan</label>
        <select
          name="loanPurpose"
          className="w-full p-3 border rounded"
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
        {errors.loanPurpose && <p className="text-red-500 text-sm">{errors.loanPurpose}</p>}
      </div>

      {/* Loan Required */}
      <div className="mb-6 text-left">
        <label className="block mb-1 font-medium">Loan Required: ₹{formData.loanAmount || 0}</label>
        <input
          type="range"
          min={1000}
          max={1000000}
          step={1000}
          value={formData.loanAmount || 0}
          onChange={(e) => handleSliderChange("loanAmount", parseInt(e.target.value))}
          className="w-full"
        />
        {errors.loanAmount && <p className="text-red-500 text-sm">{errors.loanAmount}</p>}
      </div>

      {/* Tenure */}
      <div className="mb-6 text-left">
        <label className="block mb-1 font-medium">Tenure (months): {formData.tenure || 0}</label>
        <input
          type="range"
          min={1}
          max={60}
          step={1}
          value={formData.tenure || 0}
          onChange={(e) => handleSliderChange("tenure", parseInt(e.target.value))}
          className="w-full"
        />
        {errors.tenure && <p className="text-red-500 text-sm">{errors.tenure}</p>}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full mt-4 py-3 bg-yellow-300 text-black font-semibold rounded hover:bg-yellow-400 transition"
      >
        Check Offers
      </button>
    </div>
  );
};

export default Step4;
