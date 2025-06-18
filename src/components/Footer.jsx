import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-300 py-16">
      <div className="container mx-auto px-6 lg:px-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Column 1 - Company Description */}
          <div>
            <h3 className="text-xl font-bold mb-4">Confirm Logo</h3>
            <p className="text-sm text-gray-600 mb-4">
              Confirm.Money is your all-in-one site for comparing loans and shopping online.
              You can see offers from many lenders and choose flexible payment plans for your purchases.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Copyright © 2025 KonnectSquare LLP
            </p>
          </div>

          {/* Column 2 - Important Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Important Links</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="font-semibold">Products:</li>
              <li>
                <Link to="/loan-journey" className="hover:text-blue-600">Confirm.Credit</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-blue-600">Confirm.Shop</Link>
              </li>
              <li className="font-semibold mt-4">Legal:</li>
              <li>
                <Link to="/terms" className="hover:text-blue-600">Terms of Use</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact us</h3>
            <p className="text-sm text-gray-600 mb-2">+91 9699033291</p>
            <p className="text-sm text-gray-600 mb-4">contact@confirm.Money</p>
            <div className="flex space-x-4 mt-2 text-xl text-blue-600">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
