
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
      {/* Background African pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full rounded-3xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6b35' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      <div className="relative z-10 bg-card/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 border border-border">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg relative overflow-hidden">
            <img 
              src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
              alt="AI Assistant" 
              className="w-12 h-12 object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary-foreground/20"></div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
            Meet ODIAAA 🇳🇬
          </h3>
          <p className="text-muted-foreground mb-6 font-medium">Your intelligent AI assistant for Africa</p>
          <div className="bg-gradient-to-br from-surface to-surface-elevated rounded-2xl p-6 text-left border border-border">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center flex-shrink-0">
                <img 
                  src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
                  alt="AI" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-foreground leading-relaxed">
                  Sannu! I'm ODIAAA, your AI assistant. How can I help transform your business across Africa? 🌍✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-green-600/10 rounded-3xl transform rotate-6 opacity-30 blur-sm"></div>
    </div>
  );
};

export default HeroVisual;
