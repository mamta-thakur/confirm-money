import React from 'react';
import LoanLogo from '../../assets/loan-logo.png';
import ProgressSteps from '../ProgressSteps';
import { Check, Star, Info } from 'lucide-react';

const offers = [
  {
    id: 1,
    lender: "Poonawalla Fincorp",
    description: "Personal Loan",
    approval: "Excellent",
    loanAmount: "upto ₹5 Lakh",
    interestRate: "from 16% p.a.",
    processingFee: "2.5%",
    recommended: true
  },
  {
    id: 2,
    lender: "Prefr",
    description: "Personal Loan",
    approval: "Good",
    loanAmount: "upto ₹5 Lakh",
    interestRate: "min 15%",
    processingFee: "2%",
    recommended: false
  },
  {
    id: 3,
    lender: "IndusInd Bank",
    description: "Personal Loan",
    approval: "Average",
    loanAmount: "upto ₹3 Lakh",
    interestRate: "from 14% p.a.",
    processingFee: "1.5%",
    recommended: false
  }
];

const Congrats = ({ formData }) => {
  return (
    <div className="p-2 text-center">
      <div className="mb-6">
        {/* <LoanLogo /> */}
        <img src={LoanLogo} alt="Loan Logo" className="mx-auto mb-6 w-32 h-auto" />
      </div>

      <p className="text-sm text-gray-500 mb-1">100% completed</p>
      <div className="w-full h-1 bg-gray-200 mb-4 rounded-full">
        <div className="w-full h-full bg-green-500 rounded-full"></div>
      </div>

      <ProgressSteps currentStep={5} />

      <div className="flex items-center justify-center mb-6 mt-6">
        <div className="bg-green-100 rounded-full p-2">
          <Check className="text-green-600 w-6 h-6" />
        </div>
        <h2 className="ml-2 text-xl font-bold text-gray-800">
          Congratulations!
        </h2>
      </div>

      <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg mb-6 text-left">
        <p className="font-medium">
          Based on your profile, you are eligible for the following loan offers:
        </p>
      </div>

      {offers.map((offer) => (
        <div key={offer.id} className="border rounded-lg shadow-sm p-4 mb-5 text-left">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{offer.lender}</h3>
              <p className="text-gray-600 text-sm">{offer.description}</p>
            </div>
            {offer.recommended && (
              <div className="flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                <Star className="w-3 h-3 mr-1" />
                Recommended
              </div>
            )}
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Approval chance</p>
              <p className="font-medium">{offer.approval}</p>
            </div>
            <div>
              <p className="text-gray-500">Loan Amount</p>
              <p className="font-medium">{offer.loanAmount}</p>
            </div>
            <div>
              <p className="text-gray-500">Interest Rate</p>
              <p className="font-medium">{offer.interestRate}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <button className="flex items-center text-blue-600 hover:underline text-sm">
              <Info className="w-4 h-4 mr-1" />
              Offer Details
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 active:bg-green-700 transition text-sm">
              Apply Now
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 text-sm text-gray-600">
        <p>Need help choosing? Call us at <span className="text-blue-600 font-medium">1800-123-4567</span></p>
      </div>
    </div>
  );
};

export default Congrats;