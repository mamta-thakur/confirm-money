import React, { useState } from 'react';
import Layout from '../../components/Layout';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Congrats from './Congrats';
import { Toaster } from 'react-hot-toast'; 


const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // shared data if needed
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />;
      case 5:
        return <Congrats formData={formData} />;
      default:
        return null;
    }
  };

  return (
    /* <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white p-2 rounded-2xl shadow-xl w-full max-w-xl">
        {renderStep()}
      </div>
    </div>*/
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex items-center justify-center p-4 bg-gray-100 min-h-[calc(100vh-160px)]">
        <div className="bg-white p-4 rounded-2xl shadow-xl w-full max-w-xl">
          {renderStep()}
        </div>
      </div>
    </Layout>
  );
};

export default MultiStepForm;