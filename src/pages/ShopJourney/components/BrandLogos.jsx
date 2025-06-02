import React from 'react';

const defaultBrands = [
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

const categoryBrands = {
  fashion: [
    { id: 'myntra', name: 'Myntra', url: 'https://www.myntra.com', logo: 'https://images.pexels.com/photos/6214472/pexels-photo-6214472.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'flipkart', name: 'Flipkart Fashion', url: 'https://www.flipkart.com/fashion', logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'amazon', name: 'Amazon Fashion', url: 'https://www.amazon.in/fashion', logo: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'ajio', name: 'AJIO', url: 'https://www.ajio.com', logo: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'nykaa', name: 'Nykaa Fashion', url: 'https://www.nykaafashion.com', logo: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  travel: [
    { id: 'makemytrip', name: 'MakeMyTrip', url: 'https://www.makemytrip.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'cleartrip', name: 'Cleartrip', url: 'https://www.cleartrip.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'goibibo', name: 'Goibibo', url: 'https://www.goibibo.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'yatra', name: 'Yatra', url: 'https://www.yatra.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'ixigo', name: 'Ixigo', url: 'https://www.ixigo.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'skyscanner', name: 'Skyscanner', url: 'https://www.skyscanner.co.in', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  electronics: [
    { id: 'amazon', name: 'Amazon Electronics', url: 'https://www.amazon.in/electronics', logo: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'flipkart', name: 'Flipkart Electronics', url: 'https://www.flipkart.com/electronics', logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'croma', name: 'Croma', url: 'https://www.croma.com', logo: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'reliance', name: 'Reliance Digital', url: 'https://www.reliancedigital.in', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'tata', name: 'Tata Cliq', url: 'https://www.tatacliq.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'bestbuy', name: 'Best Buy', url: 'https://www.bestbuy.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'snapdeal', name: 'Snapdeal', url: 'https://www.snapdeal.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' }                         
  ],
  groceries: [
    { id: 'flipkart', name: 'Flipkart Grocery', url: 'https://www.flipkart.com/grocery', logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'bigbasket', name: 'BigBasket', url: 'https://www.bigbasket.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'grofers', name: 'Grofers', url: 'https://www.grofers.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'shopclues', name: 'ShopClues', url: 'https://www.shopclues.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'croma', name: 'Croma', url: 'https://www.croma.com', logo: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'reliance', name: 'Reliance Digital', url: 'https://www.reliancedigital.in', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'tata', name: 'Tata Cliq', url: 'https://www.tatacliq.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'bestbuy', name: 'Best Buy', url: 'https://www.bestbuy.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'snapdeal', name: 'Snapdeal', url: 'https://www.snapdeal.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  phones: [
    { id: 'flipkart', name: 'Flipkart', url: 'https://www.flipkart.com', logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'bigbasket', name: 'BigBasket', url: 'https://www.bigbasket.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'grofers', name: 'Grofers', url: 'https://www.grofers.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'shopclues', name: 'ShopClues', url: 'https://www.shopclues.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'croma', name: 'Croma', url: 'https://www.croma.com', logo: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'bestbuy', name: 'Best Buy', url: 'https://www.bestbuy.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'snapdeal', name: 'Snapdeal', url: 'https://www.snapdeal.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'amazon', name: 'Amazon', url: 'https://www.amazon.in', logo: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ],
  gaming: [
    { id: 'amazon', name: 'Amazon Gaming', url: 'https://www.amazon.in/gaming', logo: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'flipkart', name: 'Flipkart Gaming', url: 'https://www.flipkart.com/gaming', logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'croma', name: 'Croma Gaming', url: 'https://www.croma.com/gaming', logo: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'reliance', name: 'Reliance Digital Gaming', url: 'https://www.reliancedigital.in/gaming', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'tata', name: 'Tata Cliq Gaming', url: 'https://www.tatacliq.com/gaming', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'bestbuy', name: 'Best Buy Gaming', url: 'https://www.bestbuy.com/gaming', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'snapdeal', name: 'Snapdeal Gaming', url: 'https://www.snapdeal.com/gaming', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  sports: [
    { id: 'decathlon', name: 'Decathlon', url: 'https://www.decathlon.in', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'nike', name: 'Nike', url: 'https://www.nike.com/in', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'adidas', name: 'Adidas', url: 'https://www.adidas.co.in', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'puma', name: 'Puma', url: 'https://in.puma.com', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'underarmour', name: 'Under Armour', url: 'https://www.underarmour.in/en-in/', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  food: [
    { id: 'swiggy', name: 'Swiggy', url: 'https://www.swiggy.com', logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'zomato', name: 'Zomato', url: 'https://www.zomato.com', logo: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'dominos', name: 'Domino\'s Pizza', url: 'https://www.dominos.co.in', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'pizzahut', name: 'Pizza Hut', url: 'https://www.pizzahut.co.in', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'kfc', name: 'KFC India', url: 'https://www.kfc.co.in', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  gifts: [
    { id: 'amazon', name: 'Amazon Gifts', url: 'https://www.amazon.in/gifts', logo: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'flipkart', name: 'Flipkart Gifts', url: 'https://www.flipkart.com/gifts', logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'myntra', name: 'Myntra Gifts', url: 'https://www.myntra.com/gifts', logo: 'https://images.pexels.com/photos/6214472/pexels-photo-6214472.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'ajio', name: 'AJIO Gifts', url: 'https://www.ajio.com/gifts', logo: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  deals: [
    { id: 'amazon', name: 'Amazon Deals', url: 'https://www.amazon.in/gp/goldbox', logo: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'flipkart', name: 'Flipkart Deals', url: 'https://www.flipkart.com/offers-store', logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'snapdeal', name: 'Snapdeal Deals', url: 'https://www.snapdeal.com/deals', logo: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ]
  // Add more categories as needed
};

const BrandLogos = ({ onBrandClick, selectedCategory }) => {
  const brands = selectedCategory ? categoryBrands[selectedCategory] || [] : defaultBrands;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Popular Brands</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3- md:grid-cols-4- gap-4">
        {brands.map((brand) => (
          <div 
            key={brand.id}
            className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onBrandClick(brand.url)}
          >
            <div className="aspect-video relative overflow-hidden rounded-md mb-2">
              {brand.logo ? (
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-400">{brand.name}</span>
                </div>
              )}
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