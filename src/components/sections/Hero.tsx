
import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const fullText = 'AI Solutions for African Innovation';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-full opacity-30"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        />
        <div 
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-blue-400 rounded-full opacity-25"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column - Content */}
          <div 
            className="text-center lg:text-left"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <img 
                src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
                alt="ODIA.dev Logo" 
                className="w-16 h-16 mr-4 drop-shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  ODIA.dev
                </h1>
                <p className="text-sm text-blue-600 font-medium">Powered by African Innovation</p>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {currentText}
              </span>
              <span className="animate-pulse text-blue-600">|</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Empowering African businesses with cutting-edge AI technology. 
              From voice automation to intelligent chatbots, we bring the future to Africa today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <span className="group-hover:scale-105 transition-transform duration-300 inline-block">
                  Talk to Our AI Agent
                </span>
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Explore Services
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-2 animate-pulse"></div>
                Available 24/7
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2 animate-pulse"></div>
                15+ African Languages
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div 
            className="relative"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 border border-blue-100">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <img 
                    src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
                    alt="AI Assistant" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                  Meet ODIAAA
                </h3>
                <p className="text-gray-600 mb-6 font-medium">Your intelligent AI assistant</p>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-left border border-blue-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <img 
                        src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
                        alt="AI" 
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed">
                        Hello! I'm ODIAAA, your AI assistant. How can I help you transform your business with AI today?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl transform rotate-6 opacity-20 blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{
          transform: `translateX(-50%) translateY(${scrollY * -0.2}px)`,
        }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
          <ArrowDown className="text-blue-600" size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
