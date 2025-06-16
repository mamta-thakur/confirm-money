import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Info, X } from 'lucide-react';
import BgAnimation from '../BgAnimation';
import Navbar from '../NavbarProducts';

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
    logoColor: "bg-blue-600",
    logoText: "P",
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
    logoColor: "bg-purple-600",
    logoText: "P",
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
    logoColor: "bg-red-600",
    logoText: "I",
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

const Offers = ({ formData }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleMoreDetails = (offer) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOffer(null);
  };

  return (
    <>
      <div className="relative min-h-screen from-indigo-100 via-white to-emerald-100 overflow-hidden">
        <div className="flex justify-center">
          <div className="sticky- top-0 w-full max-w-xl z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <Navbar />
          </div>
        </div>
        
        {/* Form Container */}
        <div className="relative z-10 flex justify-center min-h-[calc(100vh-1px)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white/60- backdrop-blur-xl bg-gradient-to-br shadow-2xl- border border-white/30 px-8 py-2 w-full max-w-xl transition-all duration-300"
          >
            <BgAnimation />
            <AnimatePresence mode="wait">
              <div className="p-2 text-center">
                <div className="flex items-center- justify-center- mb-10 mt-6">
                  {/* <div className="bg-green-100 rounded-full p-2">
                    <Check className="text-green-600 w-6 h-6" />
                  </div> */}
                  <h2 className="ml-2 text-xl font-bold text-gray-800">
                    Here are your offers
                  </h2>
                </div>
                
                {offers.map((offer) => (
                  <div key={offer.id} className="border rounded-lg shadow-sm p-4 mb-5 text-left">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        {/* Logo */}
                        {/* <div className={`${offer.logoColor} text-white rounded-lg w-12 h-12 flex items-center justify-center font-bold text-lg mr-3`}>
                          {offer.logoText}
                        </div> */}
                        <div>
                          <h3 className="font-bold text-lg">{offer.lender}</h3>
                          <p className="text-gray-600 text-sm">{offer.description}</p>
                        </div>
                      </div>
                      {offer.recommended && (
                        <div className="flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          <Star className="w-3 h-3 mr-1" />
                          Recommended
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Loan Amount</p>
                        <p className="font-medium">{offer.loanAmount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Interest Rate(p.a.)</p>
                        <p className="font-medium">{offer.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Tenure</p>
                        <p className="font-semibold">{offer.tenure}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Processing fees</p>
                        <p className="font-semibold">{offer.processingFee}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <button 
                        onClick={() => handleMoreDetails(offer)}
                        className="flex items-center text-blue-600 hover:underline text-sm"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        More Details
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
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {showModal && selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <div className="flex items-center">
                  {/* <div className={`${selectedOffer.logoColor} text-white rounded-lg w-10 h-10 flex items-center justify-center font-bold text-sm mr-3`}>
                    {selectedOffer.logoText}
                  </div> */}
                  <h3 className="text-xl font-bold text-gray-900">More Details</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">

                {/* Documents Section */}
                {selectedOffer.documents && (
                  <div className="mb-6">
                    {/* <h4 className="font-semibold text-lg mb-3 text-center">Documents</h4> */}
                    {/* <p className="font-medium text-gray-800 mb-4 text-center text-sm">List of Documents (Indicative)</p> */}
                    <div className="space-y-3">
                      {selectedOffer.documents.map((doc, index) => (
                        <div key={index} className="border-l-4 border-green-500 pl-3">
                          <p className="font-medium text-gray-800">{doc.title}</p>
                          <p className="text-xs text-gray-600">
                            - Ex: {doc.examples.join(", ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Apply Button */}
                <div className="flex justify-center">
                  <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 active:bg-green-700 transition font-medium">
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>              
  );
};

export default Offers;