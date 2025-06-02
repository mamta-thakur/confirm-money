import React, { useState } from 'react';

const SearchCategoryProducts = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="mb-6">
      <div className="flex rounded-md shadow-sm">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          placeholder="Search categories or products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-600 "
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchCategoryProducts;
