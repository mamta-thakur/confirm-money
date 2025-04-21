// src/components/steps/Step3.jsx
import React from 'react';

const Step3 = ({ nextStep, prevStep, formData, setFormData }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Step 3: Employment Details</h2>
      <input
        type="text"
        placeholder="Employer Name"
        className="w-full mb-4 p-2 border rounded"
        value={formData.employer || ''}
        onChange={e => setFormData({ ...formData, employer: e.target.value })}
      />
      <input
        type="text"
        placeholder="Job Title"
        className="w-full mb-4 p-2 border rounded"
        value={formData.job || ''}
        onChange={e => setFormData({ ...formData, job: e.target.value })}
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

export default Step3;
