
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-300 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 p-2 mr-4">
                <img 
                  src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
                  alt="ODIA.dev Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  ODIA.dev
                </span>
                <div className="text-blue-300 font-medium">AI Solutions for Africa</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Empowering African businesses with cutting-edge AI solutions. 
              From Lagos to Nairobi, we're building the future of AI in Africa.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300 hover:text-blue-300 transition-colors duration-300">
                <MapPin size={20} className="mr-3 text-blue-400" />
                <span>Abuja, Nigeria</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-blue-300 transition-colors duration-300">
                <Mail size={20} className="mr-3 text-blue-400" />
                <span>hello@odia.dev</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-blue-300 transition-colors duration-300">
                <Phone size={20} className="mr-3 text-blue-400" />
                <span>+234 (0) 800 ODIA DEV</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-300 transition-all duration-300 hover:translate-x-2 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-300 transition-all duration-300 hover:translate-x-2 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-blue-300 transition-all duration-300 hover:translate-x-2 inline-block">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-gray-300 hover:text-blue-300 transition-all duration-300 hover:translate-x-2 inline-block">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-300 transition-all duration-300 hover:translate-x-2 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              Services
            </h3>
            <ul className="space-y-4">
              <li className="text-gray-300 hover:text-blue-300 transition-colors duration-300 cursor-pointer">Voice Automation</li>
              <li className="text-gray-300 hover:text-blue-300 transition-colors duration-300 cursor-pointer">Intelligent Chatbots</li>
              <li className="text-gray-300 hover:text-blue-300 transition-colors duration-300 cursor-pointer">Language NLP</li>
              <li className="text-gray-300 hover:text-blue-300 transition-colors duration-300 cursor-pointer">Healthcare AI</li>
              <li className="text-gray-300 hover:text-blue-300 transition-colors duration-300 cursor-pointer">Government AI</li>
              <li className="text-gray-300 hover:text-blue-300 transition-colors duration-300 cursor-pointer">Custom Solutions</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 ODIA.dev. All rights reserved. Powered by African Innovation.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-300 text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-300 text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-300 text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
