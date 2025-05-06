import React from 'react';
import Layout from '../components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          This Privacy Policy outlines how we collect, use, disclose, and protect your information when you visit our website. By using our services, you agree to the collection and use of information in accordance with this policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect several types of information, including:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Personal identification information (Name, email address, phone number, etc.)</li>
          <li>Usage data (IP address, browser type, pages visited, time spent, etc.)</li>
          <li>Cookies and tracking technologies</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the collected information for various purposes, including:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To provide and maintain our services</li>
          <li>To improve user experience</li>
          <li>To communicate with you, including newsletters and promotional materials</li>
          <li>To monitor and analyze usage patterns</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties. However, we may share your information with:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Service providers who help us operate our website and services</li>
          <li>Law enforcement if required by law or to protect our legal rights</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies</h2>
        <p className="mb-4">
          Cookies are small files that are stored on your device. We use cookies to enhance your browsing experience. You can set your browser to refuse cookies or alert you when cookies are being sent.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Security</h2>
        <p className="mb-4">
          We take reasonable measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Third-Party Links</h2>
        <p className="mb-4">
          Our website may contain links to other websites that are not operated by us. We are not responsible for the privacy practices of these external sites.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Children’s Privacy</h2>
        <p className="mb-4">
          Our services are not directed to individuals under the age of 13. We do not knowingly collect personally identifiable information from children.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with the updated date.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <p className="mb-4">
          <strong>Email:</strong> support@example.com<br />
          <strong>Phone:</strong> +1 (123) 456-7890
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
