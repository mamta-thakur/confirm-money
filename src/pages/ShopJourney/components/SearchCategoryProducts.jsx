import React, { useState } from 'react';

const SearchCategoryProducts = ({ onSearch, setIsLoading, setSelectedWebsite, setShowSearch }) => {
  const [query, setQuery] = useState('');
  const handleSearchOld = () => {
    onSearch(query);
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      setSelectedWebsite(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
      setTimeout(() => setIsLoading(false), 1000);
      setShowSearch(false);
    }
  };
  return (
    <>
      {/* <div className="mb-6">
        <div className="flex rounded-md shadow-sm">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            placeholder="Search categories or products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearchOld}
            className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-600 "
          >
            Search
          </button>
        </div>
      </div> */}

      <form onSubmit={handleSearch} className="py-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search categories or products..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchCategoryProducts;
