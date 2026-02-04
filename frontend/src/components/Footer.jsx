import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black text-blue-600 tracking-tight mb-4">FASHION FUSION</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Pakistan ka bharosay mand online store. Best quality products aur fast delivery hamari pehchan hai.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 text-sm transition">Home</Link></li>
              <li><Link to="/my-orders" className="text-gray-600 hover:text-blue-600 text-sm transition">My Orders</Link></li>
              <li><Link to="/cart-page" className="text-gray-600 hover:text-blue-600 text-sm transition">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Contact Support */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Support</h3>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FaEnvelope className="text-blue-500" />
              <a href="mailto:nabilroghani96@gmail.com" className="text-sm hover:text-blue-600 break-all">
                nabilroghani96@gmail.com
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-2">Hum 24/7 aapki khidmat ke liye hazir hain.</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-blue-600 transition"><FaFacebook size={20} /></a>
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-pink-600 transition"><FaInstagram size={20} /></a>
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-blue-400 transition"><FaTwitter size={20} /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Fashion Fusion. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-gray-400">Privacy Policy</span>
            <span className="text-xs text-gray-400">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;