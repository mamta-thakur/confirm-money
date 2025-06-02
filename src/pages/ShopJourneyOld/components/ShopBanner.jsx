import React from 'react';

const ShopBanner = () => {
  return (
    <div
      className="rounded-xl p-6 md:p-10 mb-6 bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-6 md:p-10 rounded-xl max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Lorem Ipsum <br />
          <span className="text-white font-bold">What is Lorem Ipsum?</span>
        </h2>
        <p className="text-lg text-gray-200 mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-full flex items-center overflow-hidden w-full max-w-xl">
          <input
            type="text"
            placeholder="What are you looking for today?"
            className="flex-grow px-6 py-3 text-black outline-none"
          />
          <button className="bg-black text-white px-5 py-3 hover:bg-gray-800">
            ➔
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopBanner;
