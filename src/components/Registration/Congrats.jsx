import React from 'react';
import Logo from "../../assets/loan-logo.png";

const offers = [
  {
    id: 1,
    lender: "Poonawalla Fincorp Personal Loan",
    logo: "/assets/poonawalla-logo.png",
    approval: "Excellent",
    loanAmount: "upto ₹5 Lakh",
    interestRate: "from 16% p.a.",
    recommended: true
  },
  {
    id: 2,
    lender: "Prefr",
    logo: "/assets/prefr-logo.png",
    approval: "Good",
    loanAmount: "upto ₹5 Lakh",
    interestRate: "min 15%",
    recommended: false
  }
];

const Congrats = () => {
  return (
    <div className="p-2 text-center">
      <img src={Logo} alt="Logo" className="mx-auto mb-6" />

      <p className="text-sm text-gray-500 mb-1">100% completed</p>
      <div className="w-full h-1 bg-gray-200 mb-4 rounded-full">
        <div className="w-full h-full bg-green-500 rounded-full"></div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500">Register</button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500">Add details</button>
        <button className="px-4 py-2 rounded-full bg-green-100 text-green-700">Offers</button>
      </div>

      <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded mb-6 text-left">
        🎉 <strong>Congratulations!</strong><br />
        You are eligible for below loan offers
      </div>

      {offers.map((offer) => (
        <div key={offer.id} className="border rounded-lg shadow-sm p-4 mb-6 text-left">
          <div className="flex justify-between items-start">
            <div>
              <img src={offer.logo} alt={offer.lender} className="h-6 mb-2" />
              <h3 className="font-bold text-lg">{offer.lender}</h3>
            </div>
            {offer.recommended && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Recommended</span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Approval rate</p>
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
            <button className="text-blue-600 hover:underline text-sm">Offer Details</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">Apply Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Congrats;
