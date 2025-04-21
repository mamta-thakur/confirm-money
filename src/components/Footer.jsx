import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-300 py-16">
      <div className="container mx-auto px-6 lg:px-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600">Press</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-600">Web Design</a></li>
              <li><a href="#" className="hover:text-blue-600">SEO Services</a></li>
              <li><a href="#" className="hover:text-blue-600">App Development</a></li>
              <li><a href="#" className="hover:text-blue-600">Cloud Hosting</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe</h3>
            <p className="text-sm mb-4 text-gray-600">Sign up for our newsletter to get the latest news and updates.</p>
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
