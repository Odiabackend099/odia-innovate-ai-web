
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
    <header className="webflow-glass sticky top-0 z-50 border-b">
      <nav className="webflow-container">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary p-2 group-hover:scale-105 transition-transform duration-300 relative">
                <img 
                  src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
                  alt="ODIA.dev" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold webflow-text-gradient">
                  ODIA.dev
                </span>
                <div className="text-xs text-muted-foreground font-medium">
                  AI Solutions Africa
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                   className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                     isActiveRoute(item.href)
                       ? 'bg-primary text-primary-foreground'
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
              className="webflow-button-primary"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary transition-colors duration-200 p-2 hover:bg-muted rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-colors duration-200 rounded-lg ${
                    isActiveRoute(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={handleGetStarted}
                className="webflow-button-primary w-full mt-4"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
