
import React from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfessionalHero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact');
  };

  const handleWatchDemo = () => {
    navigate('/demo');
  };

  const achievements = [
    { label: 'Enterprise Clients', value: '50+' },
    { label: 'African Languages', value: '15+' },
    { label: 'Success Rate', value: '98%' },
    { label: 'Countries Served', value: '12' }
  ];

  const features = [
    'Enterprise-grade AI solutions',
    'Multi-language support',
    'Scalable infrastructure',
    '24/7 professional support'
  ];

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background Image with IEQ Capital Navy Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(214 100% 15% / 0.85), hsl(214 100% 10% / 0.9)), url('/lovable-uploads/2fef13c1-05fa-4c94-ab3c-871a9db245c7.png')`
        }}
      />
      
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 ieq-pattern-grid opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 ieq-container py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-surface border border-primary/20 rounded-full text-sm font-medium text-primary mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              Leading AI Solutions Provider
            </div>

            {/* Main Heading */}
            <h1 className="ieq-heading-xl mb-6 animate-slide-up">
              Transforming African Business with
              <span className="ieq-text-gradient block mt-2">
                Intelligent AI Solutions
              </span>
            </h1>

            {/* Subtitle */}
            <p className="ieq-body-lg mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              We partner with forward-thinking organizations across Africa to deliver 
              cutting-edge AI solutions that drive growth, efficiency, and innovation.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 text-sm text-text-secondary animate-fade-in"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <button 
                onClick={handleGetStarted}
                className="ieq-button-primary group flex items-center justify-center"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button 
                onClick={handleWatchDemo}
                className="ieq-button-secondary group flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '0.9s' }}>
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="ieq-heading-sm text-primary mb-1">{achievement.value}</div>
                  <div className="ieq-body-sm">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="lg:col-span-5 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-border">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-gold/5 flex items-center justify-center p-8">
                  <img 
                    src="/lovable-uploads/e6dc8533-41a4-4de8-b5c6-f47f6f4ec273.png" 
                    alt="AI Solutions Dashboard" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                
                {/* Status Card */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-border animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-sm font-semibold text-text-primary">AI Systems Online</div>
                      <div className="text-xs text-text-secondary">Processing across 15+ languages</div>
                    </div>
                  </div>
                </div>
                
                {/* Success Rate Card */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-border animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-xs text-text-secondary">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Background Elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gold/5 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2 text-text-tertiary">
          <span className="text-xs font-medium">Discover More</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-text-tertiary to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalHero;
