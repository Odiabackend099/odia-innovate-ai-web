import React from 'react';

const CofounderSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-surface relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23479afc' fill-opacity='0.15'%3E%3Cpath d='M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Eva's Message */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
                Technical Excellence for Africa
              </h2>
              <div className="bg-gradient-to-br from-card/80 to-surface-elevated/80 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-lg">
                <blockquote className="text-xl text-card-foreground leading-relaxed mb-6 italic">
                  "My vision is to bridge the technological gap between Africa and the world. 
                  We're building AI that doesn't just speak African languages – it thinks with African wisdom, 
                  solves African problems, and scales African innovation globally."
                </blockquote>
                <div className="flex items-center justify-center lg:justify-start">
                  <div>
                    <div className="font-bold text-lg text-primary">Eva Jensen</div>
                    <div className="text-muted-foreground">Co-founder & CTO, ODIA.dev</div>
                    <div className="text-sm text-muted-foreground mt-1">🇩🇰 Copenhagen, Denmark</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Eva's Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-border">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="/lovable-uploads/99c152aa-1d3c-4930-b657-e7b6c4797733.png" 
                  alt="Eva Jensen, Co-founder of ODIA.dev" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🇩🇰</span>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-500/20 to-primary-glow/20 rounded-full blur-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CofounderSection;