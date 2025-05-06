import React from 'react';
import Layout from '../components/Layout';

const TermsAndConditions = () => {
  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
        
        <p className="mb-4">
          Welcome to our website. These terms and conditions outline the rules and regulations for the use of our site and services.
          By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use the site if
          you do not accept all the terms stated on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. License</h2>
        <p className="mb-4">
          Unless otherwise stated, we or our licensors own the intellectual property rights for all material on the website.
          All intellectual property rights are reserved. You may view and/or print pages for your own personal use subject to
          restrictions set in these terms.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>You must not republish material from the website</li>
          <li>You must not sell, rent, or sub-license material</li>
          <li>You must not reproduce, duplicate, or copy material</li>
          <li>You must not redistribute content from this website</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Comments</h2>
        <p className="mb-4">
          Certain parts of this website offer the opportunity for users to post and exchange opinions and information.
          We do not screen, edit, or review Comments prior to their appearance on the website and Comments do not reflect our views or opinions.
        </p>
        <p className="mb-4">
          We reserve the right to monitor all Comments and to remove any that can be considered inappropriate, offensive, or cause a breach of these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Hyperlinking</h2>
        <p className="mb-4">
          Organizations may link to our website without prior written approval, including government agencies, search engines, and news organizations.
          These links must not be misleading and should not falsely imply sponsorship or endorsement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Content Liability</h2>
        <p className="mb-4">
          We shall have no responsibility or liability for any content appearing on your website.
          You agree to indemnify and defend us against all claims arising out of or based upon your website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Reservation of Rights</h2>
        <p className="mb-4">
          We reserve the right to request that you remove all links or any particular link to our website.
          You agree to immediately remove all links upon our request.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Removal of Links</h2>
        <p className="mb-4">
          If you find any link on our website that is offensive for any reason, you may contact us.
          We will consider requests to remove links but will have no obligation to do so.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Disclaimer</h2>
        <p className="mb-4">
          To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating
          to our website and the use of this website. Nothing in this disclaimer will:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Limit or exclude our or your liability for death or personal injury</li>
          <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation</li>
          <li>Limit any of our or your liabilities in any way that is not permitted under applicable law</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
        <p className="mb-4">
          These terms and conditions are governed by and construed in accordance with the laws of [Your Country] and you
          irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Information</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at:
        </p>
        <p>
          <strong>Email:</strong> legal@example.com<br />
          <strong>Phone:</strong> +1 (123) 456-7890
        </p>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
