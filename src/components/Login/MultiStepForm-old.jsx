import React, { useState, useEffect } from 'react';
// import Layout from '../../components/Layout';
import Step1 from './Step1-old';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Offers from './Offers';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserDetails } from '../../utils/auth';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    const savedDetails = getUserDetails();
    if (savedDetails) {
      setFormData(savedDetails);
      setIsReturningUser(true);
      if (savedDetails.isAuthenticated) setStep(4);
    }
  }, []);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    const stepProps = { nextStep, prevStep, formData, setFormData, isReturningUser, setIsReturningUser };
    switch (step) {
      case 1: return <Step1 {...stepProps} />;
      case 2: return <Step2 {...stepProps} />;
      case 3: return <Step3 {...stepProps} />;
      case 4: return <Step4 {...stepProps} />;
      case 5: return <Offers formData={formData} />;
      default: return null;
    }
  };

  return (
    <>
      {/* <Layout> */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="relative min-h-[calc(100vh-160px)] bg-gradient-to-br from-indigo-100 via-white to-emerald-100 overflow-hidden">
      <motion.div
      className="absolute w-40 h-40 bg-purple-300 rounded-full top-10 left-10 opacity-30"
      animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    <motion.div
      className="absolute w-32 h-32 bg-green-200 rounded-full bottom-10 right-10 opacity-20"
      animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
      transition={{ duration: 10, repeat: Infinity }}
    />
    <motion.div
      className="absolute w-24 h-24 bg-pink-200 rounded-full top-1/2 left-1/3 opacity-20"
      animate={{ y: [0, 40, 0], x: [0, -25, 0] }}
      transition={{ duration: 12, repeat: Infinity }}
    />

    {/* New coin animation */}
    <motion.div
      className="absolute w-16 h-16 bg-yellow-300- rounded-full top-1/4 left-1/4 opacity-50"
      animate={{ y: [0, 50, 0], x: [0, 30, 0], rotate: [0, 360, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer coin circle */}
        <circle cx="50" cy="50" r="45" fill="#FFD700" stroke="#DAA520" strokeWidth="5" />
        {/* Inner shine ring */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="#FFF8DC" strokeWidth="3" strokeDasharray="6 6" />
        {/* Rupee Sign */}
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="32"
          fontWeight="bold"
          fill="#B8860B"
          fontFamily="Arial"
        >
          ₹
        </text>
      </svg>

    </motion.div>

    {/* New money animation */}
    <motion.div
      className="absolute w-20 h-20 rounded-full bottom-1/4 right-1/4 opacity-50"
      animate={{ y: [0, -40, 0], x: [0, -20, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 8, repeat: Infinity }}
    >

      <svg
        width="120"
        height="60"
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Note body */}
        <rect x="2" y="2" width="116" height="56" rx="8" fill="#A8E6CF" stroke="#34A853" strokeWidth="4" />

        {/* Center circle */}
        <circle cx="60" cy="30" r="12" fill="#34A853" opacity="0.2" />

        {/* Rupee symbol */}
        <text x="60" y="35" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#388E3C" fontFamily="Arial"
        >
          ₹
        </text>

        {/* Left eye */}
        <circle cx="20" cy="30" r="5" fill="#34A853" />

        {/* Right eye */}
        <circle cx="100" cy="30" r="5" fill="#34A853" />
      </svg>

    </motion.div>
    
    {/* Animated Blobs */}
    <motion.div
      className="absolute top-10 left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-60 blur-2xl"
      animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-[60%] left-[20%] w-32 h-32 bg-green-400 rounded-full opacity-40 blur-2xl"
      animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-10 right-10 w-52 h-52 bg-blue-400 rounded-full opacity-30 blur-3xl"
      animate={{ y: [0, 15, 0], x: [0, 5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-[20%] left-[70%] w-24 h-24 bg-emerald-500 rounded-full opacity-40 blur-2xl"
      animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Form Container */}
    <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-160px)]">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="bg-white/60 backdrop-blur-xl shadow-2xl border border-white/30 p-8 w-full max-w-xl transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </motion.div>
    </div>
  </div>
  {/* </Layout> */}
  </>
  );
};

export default MultiStepForm;
