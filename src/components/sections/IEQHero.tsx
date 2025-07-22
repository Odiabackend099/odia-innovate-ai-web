
import React from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IEQHero = () => {
  const navigate = useNavigate();

  const handleTalkToAI = () => {
    navigate('/widget');
  };

  const handleExploreServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight * 2,
        behavior: 'smooth'
      });
    }
  };

  const stats = [
    { label: 'Projects Delivered', value: '50+' },
    { label: 'African Languages', value: '15+' },
    { label: 'Client Satisfaction', value: '98%' },
    { label: 'Countries Served', value: '12+' }
  ];

  const features = [
    'AI-powered customer support',
    'Multi-language capabilities',
    'Mobile-first design',
    '24/7 availability'
  ];

  return (
    <section className="ieq-hero-bg min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23479afc' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 ieq-container py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-light border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              AI Solutions for Africa
            </div>

            {/* Main Heading */}
            <h1 className="ieq-heading-xl text-gray-900 mb-6 animate-slide-up">
              Transform Your Business with
              <span className="ieq-text-gradient block mt-2">
                Intelligent AI Solutions
              </span>
            </h1>

            {/* Subtitle */}
            <p className="ieq-body-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in">
              Empower your African business with cutting-edge AI technology that understands 
              local contexts, languages, and cultures. Join the digital transformation today.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-3 mb-8 max-w-md mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-2 text-sm text-gray-600 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button 
                onClick={handleExploreServices}
                className="ieq-button-primary group"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button 
                onClick={handleTalkToAI}
                className="ieq-button-outline group"
              >
                <Play className="w-4 h-4 mr-2" />
                <span>Talk to Agent Odia</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center lg:text-left animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="ieq-heading-sm text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-blue-accent/10 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/e6dc8533-41a4-4de8-b5c6-f47f6f4ec273.png" 
                    alt="AI Technology Dashboard" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">AI Agent Active</div>
                      <div className="text-xs text-gray-500">Processing in 15+ languages</div>
                    </div>
                  </div>
                </div>
                
                {/* Stats Card */}
                <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">98%</div>
                    <div className="text-xs text-gray-500">Satisfaction Rate</div>
                  </div>
                </div>
              </div>

              {/* Background Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-accent/10 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 text-gray-400 animate-bounce">
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default IEQHero;
