import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-300 py-16">
      <div className="container mx-auto px-6 lg:px-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Column 1 - Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul>
              <li>
                <Link to="/privacy" className="hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/call-to-action" className="hover:text-blue-600">
                  Call to Action
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Contact Info (Optional) */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-sm text-gray-600">
              support@yourcompany.com<br />
              +1 (123) 456-7890
            </p>
          </div>

          {/* Column 3 - Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe</h3>
            <p className="text-sm mb-4 text-gray-600">
              Sign up for our newsletter to get updates.
            </p>
            <form>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-2 mb-4 bg-gray-100 text-gray-800 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#6EC6A8] hover:bg-[#5EB89B] text-white rounded"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-16">
          <p>© 2025 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
