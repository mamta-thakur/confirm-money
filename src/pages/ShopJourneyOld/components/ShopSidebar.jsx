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
    id: 'emi',
    name: 'EMI Options',
    description: 'Convert to 3-12 month EMIs',
    icon: <Clock className="h-5 w-5 text-green-500" />,
    available: false
  },
  {
    id: 'cashback',
    name: 'Cashback',
    description: 'Get up to 5% cashback on purchases',
    icon: <Wallet className="h-5 w-5 text-purple-500" />,
    available: false
  },
  {
    id: 'rewards',
    name: 'Shopping Rewards',
    description: 'Earn points on every purchase',
    icon: <Gift className="h-5 w-5 text-pink-500" />,
    available: false
  }
];

const ShopSidebar = () => {
  return (
    <div className="w-full md:w-1/5 bg-gray-100 border-l h-full overflow-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Options</h2>
        
        <div className="space-y-3 mb-6">
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
                  <h3 className="font-medium text-gray-800">{option.name}</h3>
                  <p className="text-xs text-gray-500">{option.description}</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t text-center">
                <span className="text-xs font-medium text-amber-600">Coming Soon</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-yellow-100 via-white to-emerald-100 from-blue-500- to-purple-500- text-white- p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Special Offer</h3>
          <p className="text-sm mb-3">Get exclusive discounts when you shop with our partner brands!</p>
          <button className="text-xs bg-white text-blue-600 font-medium py-1.5 px-3 rounded-full">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;