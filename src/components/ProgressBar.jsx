import React from 'react';

const ProgressBar = ({ formData, currentStep }) => {
  // Calculate progress based on filled fields and current step
  const calculateProgress = () => {
    let progress = 0;
    
    if (currentStep === 1) {
      if (formData.mobile) progress += 15;
      if (formData.otp) progress += 15;
    } else if (currentStep === 2) {
      progress = 33; // Base progress for reaching step 2
      // if (formData.firstName) progress += 5;
      // if (formData.lastName) progress += 5;
      if (formData.name) progress += 10;
      if (formData.gender) progress += 5;
      if (formData.dob) progress += 5;
      if (formData.profession) progress += 5;
      if (formData.income) progress += 5;
      if (formData.pan) progress += 5;
    } else if (currentStep === 3) {
      progress = 66; // Base progress for reaching step 3
      if (formData.loanPurpose) progress += 11;
      if (formData.loanAmount) progress += 11;
      if (formData.tenure) progress += 12;
    }

    return Math.min(100, Math.max(0, progress));
  };

  const progress = calculateProgress();

  return (
    <div className="relative pt-1 px-4 mb-8">
      <div className="flex items-center justify-between mb-6">
        {/* <div className="text-sm text-gray-600 font-medium">Progress</div>
        <div className="text-sm text-green-600 font-semibold">{Math.round(progress)}%</div> */}
      </div>
      <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
        <div
          style={{ width: `${progress}%` }}
          className="animate-[grow_0.4s_ease-in-out] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-400 to-green-600"
        />
      </div>
      <div className="absolute top-4 left-0 right-0 flex justify-between px-0">
        {[
          { step: 1, label: 'Register' },
          { step: 2, label: 'Details' },
          { step: 3, label: 'Offers' }
        ].map(({ step, label }) => (
          <div
            key={step}
            className={`flex flex-col items-center ${
              step <= currentStep ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                step <= currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step}
            </div>
            <span className="text-xs- mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;