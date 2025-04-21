// src/components/steps/Step2.jsx
import React from 'react';

const Step2 = ({ nextStep, prevStep, formData, setFormData }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Step 2: Financial Details</h2>
      <input
        type="number"
        placeholder="Monthly Income"
        className="w-full mb-4 p-2 border rounded"
        value={formData.income || ''}
        onChange={e => setFormData({ ...formData, income: e.target.value })}
      />
      <input
        type="number"
        placeholder="Desired Loan Amount"
        className="w-full mb-4 p-2 border rounded"
        value={formData.loan || ''}
        onChange={e => setFormData({ ...formData, loan: e.target.value })}
      />
      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
          Back
        </button>
        <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
