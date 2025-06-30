
import React from 'react';

interface HeroContentProps {
  currentText: string;
  scrollY: number;
  onTalkToAI: () => void;
  onExploreServices: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ 
  currentText, 
  scrollY, 
  onTalkToAI, 
  onExploreServices 
}) => {
  return (
    <div 
      className="text-center lg:text-left"
      style={{
        transform: `translateY(${scrollY * 0.1}px)`,
      }}
    >
      <div className="flex items-center justify-center lg:justify-start mb-6">
        <div className="relative">
          <img 
            src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
            alt="ODIA.dev Logo" 
            className="w-16 h-16 mr-4 drop-shadow-lg"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            ODIA.dev
          </h1>
          <p className="text-sm text-blue-600 font-medium flex items-center">
            🇳🇬 Powered by African Innovation
          </p>
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
        From Lagos to Nairobi, we bring the future to Africa today. 🌍
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <button 
          onClick={onTalkToAI}
          className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
        >
          <span className="group-hover:scale-105 transition-transform duration-300 inline-block">
            🤖 Talk to Our AI Agent
          </span>
        </button>
        <button 
          onClick={onExploreServices}
          className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          🚀 Explore Services
        </button>
      </div>

      <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-2 animate-pulse"></div>
          Available 24/7 🕐
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2 animate-pulse"></div>
          15+ African Languages 🗣️
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
