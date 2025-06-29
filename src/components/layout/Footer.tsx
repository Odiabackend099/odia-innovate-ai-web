
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const handleEmailClick = () => {
    window.open('mailto:hello@odia.dev', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:+2348000634233', '_blank');
  };

  const handleLocationClick = () => {
    window.open('https://maps.google.com/?q=Abuja,Nigeria', '_blank');
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6b35' fill-opacity='0.3'%3E%3Cpath d='M50 50c0-13.8-11.2-25-25-25S0 36.2 0 50s11.2 25 25 25 25-11.2 25-25zm25 0c0-13.8-11.2-25-25-25S25 36.2 25 50s11.2 25 25 25 25-11.2 25-25z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-500 rounded-full blur-2xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6 group">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 p-2 mr-4 group-hover:scale-105 transition-transform duration-300 relative">
                <img 
                  src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
                  alt="ODIA.dev Logo" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  ODIA.dev
                </span>
                <div className="text-blue-300 font-medium flex items-center">
                  🇳🇬 AI Solutions for Africa
                </div>
              </div>
            </Link>
            <p className="text-blue-200 mb-6 max-w-md leading-relaxed">
              Empowering African businesses with cutting-edge AI solutions. 
              From Lagos to Nairobi, we're building the future of AI in Africa. 🌍✨
            </p>
            <div className="space-y-4">
              <button
                onClick={handleLocationClick}
                className="flex items-center text-blue-200 hover:text-blue-100 transition-all duration-300 hover:translate-x-2 cursor-pointer group"
              >
                <MapPin size={20} className="mr-3 text-blue-400 group-hover:text-blue-300" />
                <span>🇳🇬 Abuja, Nigeria</span>
                <ExternalLink size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={handleEmailClick}
                className="flex items-center text-blue-200 hover:text-blue-100 transition-all duration-300 hover:translate-x-2 cursor-pointer group"
              >
                <Mail size={20} className="mr-3 text-blue-400 group-hover:text-blue-300" />
                <span>hello@odia.dev</span>
                <ExternalLink size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={handlePhoneClick}
                className="flex items-center text-blue-200 hover:text-blue-100 transition-all duration-300 hover:translate-x-2 cursor-pointer group"
              >
                <Phone size={20} className="mr-3 text-blue-400 group-hover:text-blue-300" />
                <span>📞 +234 (0) 800 ODIA DEV</span>
                <ExternalLink size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              🚀 Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-blue-200 hover:text-blue-100 transition-all duration-300 hover:translate-x-2 inline-block group">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-200 hover:text-blue-100 transition-all duration-300 hover:translate-x-2 inline-block group">
                  👥 About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-blue-200 hover:text-blue-100 transition-all duration-300 hover:translate-x-2 inline-block group">
                  🛠️ Services
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-blue-200 hover:text-blue-100 transition-all duration-300 hover:translate-x-2 inline-block group">
                  📊 Case Studies
                </Link>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-blue-200 hover:text-blue-100 transition-all duration-300 hover:translate-x-2 inline-block group cursor-pointer"
                >
                  📞 Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              🤖 AI Services
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-300 cursor-pointer text-left"
                >
                  🎤 Voice Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-300 cursor-pointer text-left"
                >
                  💬 Intelligent Chatbots
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-300 cursor-pointer text-left"
                >
                  🗣️ African Language NLP
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-300 cursor-pointer text-left"
                >
                  🏥 Healthcare AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-300 cursor-pointer text-left"
                >
                  🏛️ Government AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-300 cursor-pointer text-left"
                >
                  ⚡ Custom Solutions
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-300 text-sm flex items-center">
            © 2025 ODIA.dev. All rights reserved. 🇳🇬 Powered by African Innovation.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button
              onClick={() => navigate('/privacy')}
              className="text-blue-300 hover:text-blue-200 text-sm transition-colors duration-300 cursor-pointer"
            >
              🔒 Privacy Policy
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="text-blue-300 hover:text-blue-200 text-sm transition-colors duration-300 cursor-pointer"
            >
              📄 Terms of Service
            </button>
            <button
              onClick={() => navigate('/cookies')}
              className="text-blue-300 hover:text-blue-200 text-sm transition-colors duration-300 cursor-pointer"
            >
              🍪 Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
