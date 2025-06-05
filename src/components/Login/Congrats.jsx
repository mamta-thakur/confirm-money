import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Info } from 'lucide-react';
import BgAnimation from '../BgAnimation';
import Navbar from '../../components/NavbarProducts';

const offers = [
  {
    id: 1,
    lender: "Poonawalla Fincorp",
    description: "Personal Loan",
    approval: "Excellent",
    loanAmount: "Upto Rs 5,00,000",
    interestRate: "Starting 12%",
    tenure: "Upto 36 months",
    processingFee: "2 to 6%",
    recommended: true,
    documents: [
      {
        title: "Identity proof",
        examples: ["PAN"]
      },
      {
        title: "Current Residence Proof",
        examples: ["Aadhaar", "Passport"]
      },
      {
        title: "Income Proof (Only for Loan Amount > 50k)",
        examples: ["Bank Statement(Soft Copy - 3 Months)"]
      }
    ]
  },
  {
    id: 2,
    lender: "Prefr",
    description: "Personal Loan",
    approval: "Good",
    loanAmount: "Upto Rs 5,00,000",
    interestRate: "Starting 15%",
    tenure: "Upto 36 months",
    processingFee: "2 to 5%",
    documents: [
      {
        title: "Identity proof",
        examples: ["PAN"]
      },
      {
        title: "Current Residence Proof",
        examples: ["Aadhaar", "Passport"]
      },
      {
        title: "Income Proof (Only for Loan Amount > 50k)",
        examples: ["Bank Statement(Soft Copy - 3 Months)"]
      }
    ]
  },
  {
    id: 3,
    lender: "IndusInd Bank",
    description: "Personal Loan",
    approval: "Average",
    loanAmount: "Upto Rs 3,00,000",
    interestRate: "Starting 14%",
    tenure: "Upto 24 months",
    processingFee: "1.5 to 4%",
    documents: [
      {
        title: "Identity proof",
        examples: ["PAN"]
      },
      {
        title: "Current Residence Proof",
        examples: ["Aadhaar", "Passport"]
      },
      {
        title: "Income Proof (Only for Loan Amount > 50k)",
        examples: ["Bank Statement(Soft Copy - 3 Months)"]
      }
    ]
  }
];

const Congrats = ({ formData }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  return (
    <>
    {/* <Toaster position="top-center" reverseOrder={false} /> */}
    <div className="relative min-h-screen from-indigo-100 via-white to-emerald-100 overflow-hidden">
        <div className="flex justify-center">
          <div className="sticky- top-0 w-full max-w-xl z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <Navbar />
          </div>
        </div>
        {/* Form Container */}
        <div className="relative z-10 flex justify-center min-h-[calc(100vh-1px)]">
          <motion.div
            // key={step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white/60- backdrop-blur-xl bg-gradient-to-br shadow-2xl- border border-white/30 p-8 w-full max-w-xl transition-all duration-300"
          >
            <BgAnimation />
            <AnimatePresence mode="wait">


              <div className="p-2 text-center">

                <div className="flex items-center justify-center mb-20 mt-6">
                  <div className="bg-green-100 rounded-full p-2">
                    <Check className="text-green-600 w-6 h-6" />
                  </div>
                  <h2 className="ml-2 text-xl font-bold text-gray-800">
                    Here are your curated offers...
                  </h2>
                </div>
                
                {offers.map((offer) => (
                  <div key={offer.id} className="border rounded-lg shadow-sm p-4 mb-5 text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{offer.lender}</h3>
                        {/* <p className="text-gray-600 text-sm">{offer.description}</p> */}
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
                        <p className="text-gray-500">Loan Amount</p>
                        <p className="font-medium">{offer.loanAmount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Tenure</p>
                        <p className="font-semibold">{offer.tenure}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Interest Rate(p.a.)</p>
                        <p className="font-medium">{offer.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Processing fees</p>
                        <p className="font-semibold">{offer.processingFee}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <button 
                        onClick={() => setSelectedOffer(offer.id === selectedOffer ? null : offer.id)}
                        className="flex items-center text-blue-600 hover:underline text-sm">
                        <Info className="w-4 h-4 mr-1" />
                        More Details
                      </button>
                      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 active:bg-green-700 transition text-sm">
                        Apply Now
                      </button>
                    </div>

                    {selectedOffer === offer.id && offer.documents && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 border-t pt-4"
                      >
                        <h4 className="font-semibold text-lg mb-3 text-center">Documents</h4>
                        <p className="font-medium text-gray-800 mb-3 text-center">List of Documents (Indicative)</p>
                        <div className="space-y-3">
                          {offer.documents.map((doc, index) => (
                            <div key={index}>
                              <p className="font-medium text-gray-800">{doc.title}</p>
                              <p className="text-xs text-gray-600">
                                 - Ex: {doc.examples.join(", ")}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}

                <div className="mt-6 text-sm text-gray-600">
                  <p>Need help choosing? Call us at <span className="text-blue-600 font-medium">1800-123-4567</span></p>
                </div>
              </div>

            </AnimatePresence>
          </motion.div>
        </div>
    </div>
    </>              
  );
};

export default Congrats;