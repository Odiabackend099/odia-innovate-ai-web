
import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroScrollIndicatorProps {
  scrollY: number;
}

const HeroScrollIndicator: React.FC<HeroScrollIndicatorProps> = ({ scrollY }) => {
  const handleScrollClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
      style={{
        transform: `translateX(-50%) translateY(${scrollY * -0.2}px)`,
      }}
      onClick={handleScrollClick}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white/90 transition-colors">
        <ArrowDown className="text-blue-600" size={24} />
      </div>
    </div>
  );
};

export default HeroScrollIndicator;
