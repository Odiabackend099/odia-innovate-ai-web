
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname === href;
  };

  const handleGetStarted = () => {
    navigate('/contact');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary-glow p-1 group-hover:scale-105 transition-transform duration-300 relative">
                <img 
                  src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
                  alt="ODIA.dev Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  ODIA.dev
                </span>
                <div className="text-xs text-primary font-medium flex items-center">
                  🇳🇬 AI Solutions Africa
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                   className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg hover:scale-105 ${
                     isActiveRoute(item.href)
                       ? 'text-primary-foreground bg-gradient-to-r from-primary to-primary-glow shadow-lg'
                       : 'text-foreground hover:text-primary hover:bg-muted'
                   }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:from-primary-glow hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🚀 Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary transition-colors duration-300 p-2 hover:bg-muted rounded-lg"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-background/95 backdrop-blur-sm border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-base font-semibold transition-all duration-300 rounded-lg ${
                    isActiveRoute(item.href)
                      ? 'text-primary-foreground bg-gradient-to-r from-primary to-primary-glow'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={handleGetStarted}
                className="block w-full mt-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:from-primary-glow hover:to-primary transition-all duration-300 text-center"
              >
                🚀 Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
