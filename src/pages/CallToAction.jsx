import React from 'react';
import Layout from '../components/Layout';

const CallToAction = () => {
  return (
    <Layout>
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#6EC6A8]">Take the First Step</h1>
        <p className="text-lg text-gray-700 mb-8">
          Join thousands of others who have already taken control of their financial future.
        </p>
        <button className="px-8 py-3 bg-[#6EC6A8] text-white font-semibold rounded hover:bg-[#5EB89B] transition duration-300">
          Get Started
        </button>
      </div>
    </Layout>
  );
};

export default CallToAction;
