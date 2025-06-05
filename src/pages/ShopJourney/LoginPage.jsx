import React, { useState, useEffect } from 'react';
// import Layout from '../../components/Layout';
import Step1 from './Step1';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserDetails } from '../../utils/auth';
import BgAnimation from '../../components/BgAnimation';
import Navbar from '../../components/NavbarProducts';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isReturningUser, setIsReturningUser] = useState(false);

  // Check if user has saved data on load
  useEffect(() => {
    const savedDetails = getUserDetails();
    if (savedDetails) {
      setFormData(savedDetails);
      setIsReturningUser(true);
    }
  }, []);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  
  const renderStep = () => {
    const stepProps = { 
      nextStep, 
      prevStep, 
      formData, 
      setFormData,
      isReturningUser,
      setIsReturningUser
    };

    switch (step) {
      case 1: return <Step1 {...stepProps} />;
      case 2: return <Step2 {...stepProps} />;
      case 3: return <Step3 {...stepProps} />;
      default: return null;
    }
  };

  return (
    <>
    {/* <Layout> */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="relative min-h-screen bg-gradient-to-br- from-indigo-100 via-white to-emerald-100 overflow-hidden">
          <div className="flex justify-center">
            <div className="sticky- top-0 w-full max-w-xl z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
              <Navbar />
            </div>
          </div>
      
          {/* Form Container */}
          <div className="relative z-10 flex items-center- justify-center min-h-[calc(100vh-1px)]">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-white/60- backdrop-blur-xl bg-gradient-to-br shadow-2xl- border border-white/30 p-8 w-full max-w-xl transition-all duration-300"
            >
              <BgAnimation />
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

export default LoginPage;