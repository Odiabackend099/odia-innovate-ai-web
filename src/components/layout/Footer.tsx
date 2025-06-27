
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <span className="text-2xl font-bold">ODIA.dev</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering African businesses with cutting-edge AI solutions. 
              From Lagos to Nairobi, we're building the future of AI in Africa.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin size={18} className="mr-3" />
                <span>Abuja, Nigeria</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail size={18} className="mr-3" />
                <span>hello@odia.dev</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={18} className="mr-3" />
                <span>+234 (0) 800 ODIA DEV</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-gray-300 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">Voice Automation</li>
              <li className="text-gray-300">Intelligent Chatbots</li>
              <li className="text-gray-300">Language NLP</li>
              <li className="text-gray-300">Healthcare AI</li>
              <li className="text-gray-300">Government AI</li>
              <li className="text-gray-300">Custom Solutions</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ODIA.dev. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
