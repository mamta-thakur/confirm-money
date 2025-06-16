import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isShopUserRegistered, isAuthenticated } from '../../utils/auth';
import ShopCategories from './components/ShopCategories';
import BrandLogos from './components/BrandLogos';
import ShopSidebar from './components/ShopSidebar';
import BrowserView from './components/BrowserView';
import ShopBanner from './components/ShopBanner';
import SearchCategoryProducts from './components/SearchCategoryProducts';
import Navbar from '../../components/NavbarProducts';

// import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
// import { getUserDetails } from '../../utils/auth';
import BgAnimation from '../../components/BgAnimation';


const ShopPage = () => {
  const navigate = useNavigate();
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  // useEffect(() => {
  //   // Check if user is authenticated
  //   const userMobile = localStorage.getItem('userMobile');
  //   if (!userMobile || !isShopUserRegistered(userMobile) || !isAuthenticated()) {
  //     // Redirect to login if not authenticated
  //     navigate('/shop-journey');
  //   }
  // }, [navigate])

  const handleBrandClick = (url) => {
    setIsLoading(true);
    setSelectedWebsite(url);
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedWebsite(null);
  };

  return (
    <>
      
      <div className="relative min-h-screen bg-gradient-to-br- from-indigo-100 via-white to-emerald-100 overflow-hidden">
        {/* Form Container */}
        <div className="relative z-10 flex items-center- justify-center min-h-[calc(100vh-1px)]- h-screen">
          <motion.div
            // key={step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white/60- backdrop-blur-xl bg-gradient-to-br shadow-2xl- border border-white/30 p-8- w-full max-w-xl transition-all duration-300"
          >
            {/* <BgAnimation /> */}
            <AnimatePresence mode="wait">

              {/* <div className="flex- flex-col- md:flex-row h-screen bg-gray-50"> */}
                {/* Main content area (80%) */}
                <Navbar />
                <div className="w-full md:w-4/5- h-full- h-[60%] overflow-auto">
                  {selectedWebsite ? (
                    <BrowserView url={selectedWebsite} isLoading={isLoading} onBack={() => {setSelectedWebsite(null); setSelectedCategory(null); }} />
                  ) : (
                    <div className="p-4 md:p-6 bg-gradient-to-br from-indigo-100 via-white to-emerald-100 ">
                      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shop and Save</h1>
                      {/* <ShopBanner /> */}
                      <SearchCategoryProducts onSearch={handleCategoryClick} setIsLoading={setIsLoading} setSelectedWebsite={setSelectedWebsite} setShowSearch={(value) => setShowSearch(value)} />
                      <ShopCategories onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory}/>
                      <BrandLogos onBrandClick={handleBrandClick} selectedCategory={selectedCategory} />
                    </div>
                  )}
                </div>

                {/* Sidebar (20%) */}
                <ShopSidebar />
              {/* </div> */}

            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;