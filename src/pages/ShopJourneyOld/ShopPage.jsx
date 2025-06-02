import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isShopUserRegistered, isAuthenticated } from '../../utils/auth';
import ShopCategories from './components/ShopCategories';
import BrandLogos from './components/BrandLogos';
import ShopSidebar from './components/ShopSidebar';
import BrowserView from './components/BrowserView';
import ShopBanner from './components/ShopBanner';
import SearchCategoryProducts from './components/SearchCategoryProducts';


const ShopPage = () => {
  const navigate = useNavigate();
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const userMobile = localStorage.getItem('userMobile');
    if (!userMobile || !isShopUserRegistered(userMobile) || !isAuthenticated()) {
      // Redirect to login if not authenticated
      navigate('/shop-journey');
    }
  }, [navigate])

  const handleBrandClick = (url) => {
    setIsLoading(true);
    setSelectedWebsite(url);
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Main content area (80%) */}
      <div className="w-full md:w-4/5 h-full overflow-auto">
        {selectedWebsite ? (
          <BrowserView url={selectedWebsite} isLoading={isLoading} onBack={() => setSelectedWebsite(null)} />
        ) : (
          <div className="p-4 md:p-6 bg-gradient-to-br from-indigo-100 via-white to-emerald-100 ">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Shop and Save</h1>
            <ShopBanner />
            <SearchCategoryProducts onSearch={(query) => console.log("Search for:", query)} />
            <ShopCategories />
            <BrandLogos onBrandClick={handleBrandClick} />
          </div>
        )}
      </div>

      {/* Sidebar (20%) */}
      <ShopSidebar />
    </div>
  );
};

export default ShopPage;