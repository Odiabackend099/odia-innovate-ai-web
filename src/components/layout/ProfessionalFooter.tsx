
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, ExternalLink } from 'lucide-react';

const ProfessionalFooter = () => {
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

  const handleSocialClick = (platform: string) => {
    console.log(`Open ${platform} profile`);
  };

  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 ieq-pattern-grid opacity-5"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-primary/90"></div>

      <div className="relative z-10 ieq-container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6 group">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 p-2 mr-4 group-hover:bg-white/20 transition-colors duration-300">
                <img 
                  src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
                  alt="ODIA.dev Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">ODIA.dev</span>
                <div className="text-white/80 font-medium">AI Solutions for Africa</div>
              </div>
            </Link>
            
            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
              Transforming African business through intelligent AI solutions. 
              We partner with forward-thinking organizations to drive growth, 
              efficiency, and innovation across the continent.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleLocationClick}
                className="flex items-center text-white/80 hover:text-white transition-colors duration-300 group"
              >
                <MapPin size={18} className="mr-3 text-gold" />
                <span>Abuja, Nigeria</span>
                <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button
                onClick={handleEmailClick}
                className="flex items-center text-white/80 hover:text-white transition-colors duration-300 group"
              >
                <Mail size={18} className="mr-3 text-gold" />
                <span>hello@odia.dev</span>
                <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button
                onClick={handlePhoneClick}
                className="flex items-center text-white/80 hover:text-white transition-colors duration-300 group"
              >
                <Phone size={18} className="mr-3 text-gold" />
                <span>+234 (0) 800 ODIA DEV</span>
                <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => handleSocialClick('LinkedIn')}
                className="p-3 bg-white/10 hover:bg-gold hover:text-navy rounded-lg transition-colors duration-300"
              >
                <Linkedin size={18} />
              </button>
              <button
                onClick={() => handleSocialClick('Twitter')}
                className="p-3 bg-white/10 hover:bg-gold hover:text-navy rounded-lg transition-colors duration-300"
              >
                <Twitter size={18} />
              </button>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Solutions</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => navigate('/services/voice-ai')}
                  className="text-white/80 hover:text-white transition-colors duration-300 text-left"
                >
                  Voice AI Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/automation')}
                  className="text-white/80 hover:text-white transition-colors duration-300 text-left"
                >
                  Intelligent Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/analytics')}
                  className="text-white/80 hover:text-white transition-colors duration-300 text-left"
                >
                  Business Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/security')}
                  className="text-white/80 hover:text-white transition-colors duration-300 text-left"
                >
                  Enterprise Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services/consulting')}
                  className="text-white/80 hover:text-white transition-colors duration-300 text-left"
                >
                  Digital Transformation
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-white/80 hover:text-white transition-colors duration-300">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/80 hover:text-white transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-white/80 hover:text-white transition-colors duration-300">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 ODIA.dev. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button
              onClick={() => navigate('/privacy')}
              className="text-white/60 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="text-white/60 hover:text-white text-sm transition-colors duration-300"
            >
              Terms of Service
            </button>
            <button
              onClick={() => navigate('/cookies')}
              className="text-white/60 hover:text-white text-sm transition-colors duration-300"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;
