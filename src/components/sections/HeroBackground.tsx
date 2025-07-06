
import React from 'react';

interface HeroBackgroundProps {
  scrollY: number;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ scrollY }) => {
  return (
    <>
      {/* Clean professional background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-surface to-surface-elevated"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Subtle geometric elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-40 right-20 w-40 h-40 bg-secondary rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
      </div>
    </>
  );
};

export default HeroBackground;
