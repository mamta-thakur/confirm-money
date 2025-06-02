import React from 'react';
import { CreditCard, Wallet, Gift, Clock } from 'lucide-react';

const creditOptions = [
  {
    id: 'bnpl',
    name: 'Buy Now Pay Later',
    description: 'Shop now and pay in installments',
    icon: <CreditCard className="h-5 w-5 text-blue-500" />,
    available: false
  },
  {
    id: 'personal-loan',
    name: 'Personal Loan',
    description: 'Flexible personal loans for your needs',
    icon: <CreditCard className="h-5 w-5 text-green-500" />,
    available: false
  },
  {
    id: 'cards',
    name: 'Cards',
    description: 'Credit cards with exclusive benefits',
    icon: <Wallet className="h-5 w-5 text-purple-500" />,
    available: false
  }
];

const ShopSidebar = () => {
  return (
    <div className="w-full md:w-1/5- bg-gray-100 border-t-2 border-green-500 h-full- h-[35%] overflow-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Get Financing</h2>
        
        <div className="grid grid-cols-3 gap-4">
          {creditOptions.map((option) => (
            <div 
              key={option.id}
              className="bg-white rounded-lg p-3 border border-gray-200"
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  {option.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{option.name}</h4>
                  {/* <p className="text-xs text-gray-500">{option.description}</p> */}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t text-center">
                <span className="text-xs font-medium text-amber-600">Coming Soon</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;