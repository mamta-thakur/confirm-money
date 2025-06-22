import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/loan-logo.png";
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-200 py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-20">
          
          {/* Logo + Description */}
          <div className="md:w-2/5">
            <a href="/" className="inline-block mb-4">
              <img src={Logo} alt="Confirm Logo" className="h-16 w-auto" />
            </a>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-3">
              Confirm.Money is your all-in-one site for comparing loans and shopping online. You can see offers from many lenders and choose flexible payment plans for your purchases.
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-2">© 2025 KonnectSquare LLP. All rights reserved.</p>
          </div>

          <div className="md:w-1/5" />

          {/* Important Links */}
          <div className="md:w-2/5">
            <h4 className="text-base md:text-lg font-semibold mb-4">Important Links</h4>
            <ul className="text-sm md:text-base text-gray-600 space-y-1">
              <li className="font-medium text-gray-800">Products</li>
              <li><Link to="/loan-journey" className="hover:text-green-600 transition">Confirm.Credit</Link></li>
              <li><Link to="/shop" className="hover:text-green-600 transition">Confirm.Shop</Link></li>

              <li className="font-medium text-gray-800 pt-4">Legal</li>
              <li><Link to="/terms" className="hover:text-green-600 transition">Terms of Use</Link></li>
              <li><Link to="/privacy" className="hover:text-green-600 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:w-1/5">
            <h4 className="text-base md:text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm md:text-base text-gray-700 mb-1 font-medium">+91 9699033291</p>
            <p className="text-sm md:text-base text-gray-700 mb-4">contact@confirm.Money</p>
            <div className="flex space-x-4 text-green-600 text-xl">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
