
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
      <div className="flex items-center justify-center lg:justify-start mb-8">
        <div className="relative">
          <img 
            src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
            alt="ODIA.dev" 
            className="w-12 h-12 mr-4"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold webflow-text-gradient">
            ODIA.dev
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Nigeria's First Voice-Based AI Infrastructure Company
          </p>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
        <span className="webflow-text-gradient">
          {currentText}
        </span>
        <span className="animate-pulse text-primary ml-1">|</span>
      </h1>
      
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
        Building legacy through voice AI infrastructure. From WhatsApp onboarding to university support, 
        we deploy intelligent agents that speak Nigerian languages and understand our business culture.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
        <button 
          onClick={onTalkToAI}
          className="webflow-button-primary group px-8 py-4 text-lg shadow-xl hover:shadow-2xl"
        >
          🎙️ Deploy Voice Agent Now
        </button>
        <button 
          onClick={onExploreServices}
          className="webflow-button-outline px-8 py-4 text-lg"
        >
          🤖 Meet Our AI Agents
        </button>
      </div>

      <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
          ⚡ Live in 48 Hours
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
          🇳🇬 Nigerian-Built Technology
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
          🎙️ Voice AI Infrastructure
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
