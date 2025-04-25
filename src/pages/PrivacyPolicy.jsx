import React from 'react';
import Layout from '../components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          Your privacy is important to us. This privacy policy explains how we collect, use, and safeguard your information.
        </p>
        <p className="text-gray-600">
          We collect personal information when you interact with our website and services. This information is used solely for
          the purpose of improving our services.
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
