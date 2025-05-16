import React, { useState } from 'react';
// import Layout from '../../components/Layout';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Congrats from './Congrats';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    const stepProps = { nextStep, prevStep, formData, setFormData };

    switch (step) {
      case 1: return <Step1 {...stepProps} />;
      case 2: return <Step2 {...stepProps} />;
      case 3: return <Step3 {...stepProps} />;
      case 4: return <Step4 {...stepProps} />;
      case 5: return <Congrats formData={formData} />;
      default: return null;
    }
  };

  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Background */}
      <div className="relative min-h-[calc(100vh-160px)] bg-gradient-to-br from-indigo-100 via-white to-emerald-100 overflow-hidden">

        {/* SVG Background Blobs */}
        <svg className="absolute top-[-60px] left-[-80px] w-[300px] h-[300px] opacity-30 animate-pulse" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#6EE7B7" d="M44.8,-55.1C56.6,-44.9,63.4,-28.3,64.3,-12.2C65.2,3.9,60.3,19.4,52.6,34.2C44.9,49.1,34.5,63.3,20.3,67.9C6.1,72.5,-11.9,67.5,-26.2,58.4C-40.5,49.2,-51.1,36,-61.1,20.9C-71.2,5.7,-80.6,-11.3,-75.5,-25.2C-70.5,-39.2,-51.1,-50.2,-34.1,-59.6C-17,-69,-2.2,-76.7,13.5,-76.5C29.1,-76.2,58.2,-68.9,44.8,-55.1Z" transform="translate(100 100)" />
        </svg>

        <svg className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] opacity-30 animate-pulse delay-200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#A5B4FC" d="M43.7,-64.5C57.7,-57.3,69.1,-44.2,73.7,-29.4C78.3,-14.6,76.1,2,67.7,15.8C59.2,29.6,44.4,40.5,29.3,50.1C14.2,59.8,-1.1,68.2,-17.1,66.2C-33,64.3,-49.6,52,-61.8,36.6C-73.9,21.1,-81.7,2.6,-78.3,-13.5C-74.8,-29.7,-60.2,-43.6,-45.2,-50.8C-30.2,-58,-15.1,-58.6,0.3,-59.1C15.7,-59.6,31.4,-60.9,43.7,-64.5Z" transform="translate(100 100)" />
        </svg>

        {/* Form Container */}
        <div className="relative z-10 flex items-center justify-center p-6 min-h-[calc(100vh-160px)]">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white/60 backdrop-blur-xl shadow-2xl border border-white/30 p-8 rounded-3xl w-full max-w-xl transition-all duration-300"
          >
          

            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default MultiStepForm;
