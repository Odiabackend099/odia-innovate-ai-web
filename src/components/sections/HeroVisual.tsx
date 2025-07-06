
import React from 'react';

interface HeroVisualProps {
  scrollY: number;
}

const HeroVisual: React.FC<HeroVisualProps> = ({ scrollY }) => {
  return (
    <div 
      className="relative"
      style={{
        transform: `translateY(${scrollY * -0.1}px)`,
      }}
    >
      {/* Professional card with AI avatar */}
      <div className="relative webflow-card p-8 transform hover:scale-105 transition-all duration-500">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl relative overflow-hidden">
            <img 
              src="/lovable-uploads/cf9b0f82-daed-451d-927c-d1ea453458c1.png" 
              alt="AI Assistant" 
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-primary/20 rounded-full"></div>
          </div>
          <h3 className="text-2xl font-bold webflow-text-gradient mb-4">
            Meet ODIA AI
          </h3>
          <p className="text-muted-foreground mb-6 font-medium">Your intelligent AI assistant for Africa</p>
          <div className="webflow-card bg-surface p-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <img 
                  src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
                  alt="AI" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-foreground leading-relaxed">
                  Hello! I'm your AI assistant designed specifically for African businesses. How can I help transform your operations today?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle background elements */}
      <div className="absolute -z-10 top-4 left-4 w-full h-full bg-primary/5 rounded-3xl"></div>
      <div className="absolute -z-20 top-8 left-8 w-full h-full bg-secondary/10 rounded-3xl"></div>
    </div>
  );
};

export default HeroVisual;
