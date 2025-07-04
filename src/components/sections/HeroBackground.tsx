
import React from 'react';

interface HeroBackgroundProps {
  scrollY: number;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ scrollY }) => {
  return (
    <>
      {/* Parallax Background with African patterns */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-surface to-surface-elevated"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23479afc' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* African-inspired Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full opacity-10 animate-pulse"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div 
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full opacity-15"
          style={{ 
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        />
        <div 
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full opacity-10"
          style={{ 
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>
    </>
  );
};

export default HeroBackground;
