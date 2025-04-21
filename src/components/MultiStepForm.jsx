// // components/MultiStepForm.jsx
// import React, { useState } from 'react';
// import Step1 from './Step1';
// import Step2 from './Step2';
// import Step3 from './Step3';
// import Step4 from './Step4';
// // import Congrats from './Congrats';

// const MultiStepForm = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({});

//   const next = () => setStep(prev => prev + 1);
//   const prev = () => setStep(prev => prev - 1);

//   const updateData = (newData) => {
//     setFormData(prev => ({ ...prev, ...newData }));
//   };

//   return (
//     <div className="w-full max-w-lg mx-auto p-6">
//       {step === 1 && <Step1 next={next} updateData={updateData} />}
//       {step === 2 && <Step2 next={next} prev={prev} updateData={updateData} />}
//       {step === 3 && <Step3 next={next} prev={prev} updateData={updateData} />}
//       {step === 4 && <Step4 data={formData} />}
//     </div>
//   );
// };

// export default MultiStepForm;

// src/components/MultiStepForm.jsx
import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Congrats from './Congrats';

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl">
        {renderStep()}
      </div>
    </div>
  );
};

export default MultiStepForm;