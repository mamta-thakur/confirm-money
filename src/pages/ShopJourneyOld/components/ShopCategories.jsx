import React from 'react';
import { 
  Home, ShoppingBag, Plane, Shirt, Gift, 
  Tv, Phone, Gamepad2, Dumbbell, Utensils 
} from 'lucide-react';

const categories = [
  { id: 'home', name: 'Home', icon: <Home size={20} /> },
  { id: 'fashion', name: 'Fashion', icon: <Shirt size={20} /> },
  { id: 'travel', name: 'Travel', icon: <Plane size={20} /> },
  { id: 'electronics', name: 'Electronics', icon: <Tv size={20} /> },
  { id: 'phones', name: 'Phones', icon: <Phone size={20} /> },
  { id: 'gaming', name: 'Gaming', icon: <Gamepad2 size={20} /> },
  { id: 'sports', name: 'Sports', icon: <Dumbbell size={20} /> },
  { id: 'food', name: 'Food', icon: <Utensils size={20} /> },
  { id: 'gifts', name: 'Gifts', icon: <Gift size={20} /> },
  { id: 'deals', name: 'Deals', icon: <ShoppingBag size={20} /> },
];

const ShopCategories = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Categories</h2>
      
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 bg-white hover:bg-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
          >
            <div className="text-green-500 mb-2">
              {category.icon}
            </div>
            <span className="text-xs font-medium text-gray-600">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategories;