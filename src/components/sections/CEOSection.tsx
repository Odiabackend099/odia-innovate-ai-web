import React from 'react';

const CEOSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-surface to-surface-elevated relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23479afc' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='6'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - CEO Image */}
          <div className="relative">
            <div className="relative bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-border">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="/lovable-uploads/e4ecf514-3800-415c-b885-be4fdded4cc7.png" 
                  alt="Austyn, CEO of ODIA.dev" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🇳🇬</span>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-green-600/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-full blur-lg animate-pulse"></div>
          </div>

          {/* Right - CEO Message */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
                Leading Africa's AI Revolution
              </h2>
              <div className="bg-gradient-to-br from-card/80 to-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-lg">
                <blockquote className="text-xl text-card-foreground leading-relaxed mb-6 italic">
                  "At ODIA.dev, we're not just building AI solutions – we're crafting the future of African innovation. 
                  Every line of code, every conversation our AI has, brings us closer to a continent where 
                  technology serves humanity, understands our languages, and respects our cultures."
                </blockquote>
                <div className="flex items-center justify-center lg:justify-start">
                  <div>
                    <div className="font-bold text-lg text-primary">Austyn</div>
                    <div className="text-muted-foreground">CEO & Founder, ODIA.dev</div>
                    <div className="text-sm text-muted-foreground mt-1">🇳🇬 Lagos, Nigeria</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;