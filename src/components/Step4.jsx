// src/components/steps/Step4.jsx
import React from 'react';

const Step4 = ({ nextStep, prevStep, formData }) => {
  const handleSubmit = () => {
    // You can submit data to backend here
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Step 4: Review & Submit</h2>
      <div className="mb-4">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Income:</strong> {formData.income}</p>
        <p><strong>Loan:</strong> {formData.loan}</p>
        <p><strong>Employer:</strong> {formData.employer}</p>
        <p><strong>Job Title:</strong> {formData.job}</p>
      </div>
      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
          Back
        </button>
        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4;
