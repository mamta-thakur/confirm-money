import React from 'react';

const brands = [
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://www.amazon.com'
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://www.flipkart.com'
  },
  {
    id: 'makemytrip',
    name: 'MakeMyTrip',
    logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://www.makemytrip.com'
  },
  {
    id: 'myntra',
    name: 'Myntra',
    logo: 'https://images.pexels.com/photos/6214472/pexels-photo-6214472.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://www.myntra.com'
  },
  {
    id: 'ajio',
    name: 'AJIO',
    logo: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://www.ajio.com'
  },
  {
    id: 'nykaa',
    name: 'Nykaa',
    logo: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://www.nykaa.com'
  },
  {
    id: 'swiggy',
    name: 'Swiggy',
    logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://www.swiggy.com'
  },
  {
    id: 'zomato',
    name: 'Zomato',
    logo: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: 'https://www.zomato.com'
  }
];

const BrandLogos = ({ onBrandClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Popular Brands</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div 
            key={brand.id}
            className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onBrandClick(brand.url)}
          >
            <div className="aspect-video relative overflow-hidden rounded-md mb-2">
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <span className="text-yellow-500 font-medium px-2 py-1">{brand.name}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">Shop now</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandLogos;