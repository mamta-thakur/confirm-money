import React, { useState } from 'react';
import Logo from "../../assets/loan-logo.png";

const Step3 = ({ nextStep, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error on input
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.profession) newErrors.profession = "Profession is required";
    if (!formData.income || isNaN(formData.income)) newErrors.income = "Valid income is required";
    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = "Valid PAN is required (e.g., ABCDE1234F)";
    }
    if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.aadhar || !/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = "Aadhar must be a 12-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="p-2 text-center">
      <img src={Logo} alt="Logo" className="mx-auto mb-6" />

      <p className="text-sm text-gray-500 mb-1">66% to complete</p>
      <div className="w-full h-1 bg-gray-200 mb-4 rounded-full">
        <div className="w-2/3 h-full bg-green-500 rounded-full"></div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500">Register</button>
        <button className="px-4 py-2 rounded-full bg-green-100 text-green-700">Add details</button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500">Offers</button>
      </div>

      <div className="space-y-4 text-left">

        {/* Name */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <input name="firstName" placeholder="First" className="p-3 border rounded w-full" onChange={handleChange} value={formData.firstName || ''} />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <input name="middleName" placeholder="Middle" className="p-3 border rounded w-full" onChange={handleChange} value={formData.middleName || ''} />
          <div>
            <input name="lastName" placeholder="Last" className="p-3 border rounded w-full" onChange={handleChange} value={formData.lastName || ''} />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>

        {/* Gender Dropdown - fix for iPhone with appearance-none */}
        <div>
          <select
            name="gender"
            className="w-full p-3 border rounded appearance-none"
            value={formData.gender || ''}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        {/* DOB - iPhone compatibility */}
        <div>
          <input
            name="dob"
            placeholder="Date of Birth"
            type="date"
            className="w-full p-3 border rounded"
            onChange={handleChange}
            value={formData.dob || ''}
            pattern="\d{4}-\d{2}-\d{2}"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        {/* Profession Dropdown - same appearance fix */}
        <div>
          <select
            name="profession"
            className="w-full p-3 border rounded appearance-none"
            value={formData.profession || ''}
            onChange={handleChange}
          >
            <option value="">Select Profession</option>
            <option value="Salaried">Salaried</option>
            <option value="Professional">Professional</option>
            <option value="Self Employed">Self Employed</option>
          </select>
          {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}
        </div>

        {/* Income */}
        <div>
          <input name="income" placeholder="Monthly Income" type="number" className="w-full p-3 border rounded" onChange={handleChange} value={formData.income || ''} />
          {errors.income && <p className="text-red-500 text-sm">{errors.income}</p>}
        </div>

        {/* PAN */}
        <div>
          <input name="pan" placeholder="PAN (ABCDE1234F)" className="w-full p-3 border rounded" onChange={handleChange} value={formData.pan || ''} />
          {errors.pan && <p className="text-red-500 text-sm">{errors.pan}</p>}
        </div>

        {/* Email */}
        <div>
          <input name="email" placeholder="Email Address" type="email" className="w-full p-3 border rounded" onChange={handleChange} value={formData.email || ''} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Aadhar */}
        <div>
          <input name="aadhar" placeholder="Aadhar Number (12 digits)" maxLength={12} className="w-full p-3 border rounded" onChange={handleChange} value={formData.aadhar || ''} />
          {errors.aadhar && <p className="text-red-500 text-sm">{errors.aadhar}</p>}
        </div>

      </div>

      <button
        onClick={handleNext}
        className="w-full mt-6 py-3 bg-yellow-300 text-black font-semibold rounded hover:bg-yellow-400 transition"
      >
        Next
      </button>
    </div>
  );
};

export default Step3;
