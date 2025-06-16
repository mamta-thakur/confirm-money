import React from 'react';
import { ShoppingCart, DollarSign, CreditCard } from 'lucide-react';
import cartFundingImg from '../../../assets/cart-funding.png';
import personalLoanImg from '../../../assets/personal-loan.png';
import businessLoanImg from '../../../assets/business-loan.png';

const creditOptions = [
  {
    id: 'cart-funding',
    name: 'Cart Funding',
    imageUrl: cartFundingImg, // Shopping cart placeholder
    url: '/loan-journey'
  },
  {
    id: 'personal-loan',
    name: 'Personal Loan',
    imageUrl: personalLoanImg, // Money/finance placeholder
    url: '/loan-journey'
  },
  {
    id: 'business-loan',
    name: 'Business Loan',
    imageUrl: businessLoanImg, // Business/briefcase placeholder
    url: '/loan-journey'
  }
];

// const creditOptions = [
//   {
//     id: 'bnpl',
//     name: 'Buy Now Pay Later',
//     description: 'Shop now and pay in installments',
//     icon: <cartFundingImg className="h-6 w-6 text-blue-500" />,
//     available: false,
//     url: 'https://confirm.credit'
//   },
//   {
//     id: 'personal-loan',
//     name: 'Personal Loan',
//     description: 'Flexible personal loans for your needs',
//     icon: <DollarSign className="h-6 w-6 text-green-500" />,
//     available: false,
//     url: 'https://confirm.credit'
//   },
//   {
//     id: 'cards',
//     name: 'Cards',
//     description: 'Credit cards with exclusive benefits',
//     icon: <CreditCard className="h-6 w-6 text-purple-500" />,
//     available: false,
//     url: 'https://confirm.credit'
//   }
// ];

const ShopSidebar = () => {
  const handleOptionClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full md:w-1/5- bg-gray-100 border-t-2 border-green-500 h-full- h-[40%] overflow-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-0">Get Financing</h2>
        
        <div className="grid grid-cols-3 gap-5 p-4">
          {creditOptions.map((option) => (
            <div 
              key={option.id}
              onClick={() => handleOptionClick(option.url)}
              className="bg-white- rounded-lg- p-10- border- border-gray-200- cursor-pointer- hover:shadow-md- hover:border-gray-300- transition-all- duration-200-"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-6 bg-white rounded-lg">
                  <img 
                    src={option.imageUrl} 
                    alt={option.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm leading-tight">{option.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;