// src/components/steps/Step1.jsx
import React from 'react';

const Step1 = ({ nextStep, formData, setFormData }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Step 1: Personal Information</h2>
      <input
        type="text"
        placeholder="Full Name"
        className="w-full mb-4 p-2 border rounded"
        value={formData.name || ''}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-2 border rounded"
        value={formData.email || ''}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">
        Next
      </button>
    </div>
  );
};

export default Step1;
