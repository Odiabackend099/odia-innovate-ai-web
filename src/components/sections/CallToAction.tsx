
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact');
  };

  const handleTalkToAI = () => {
    navigate('/widget');
  };

  return (
    <section className="ieq-section bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='60' cy='60' r='8'/%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='90' cy='90' r='6'/%3E%3Ccircle cx='30' cy='90' r='5'/%3E%3Ccircle cx='90' cy='30' r='7'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/15 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/20 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 ieq-container text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="ieq-heading-lg text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          
          <p className="ieq-body-lg text-white/90 mb-12 leading-relaxed">
            Join thousands of African businesses already using ODIAAA to revolutionize 
            their customer service, streamline operations, and unlock new opportunities across the continent.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={handleGetStarted}
              className="group bg-white text-primary px-12 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button 
              onClick={handleTalkToAI}
              className="group border-2 border-white text-white px-12 py-4 rounded-md font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>Talk to ODIAAA</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white/90">
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base">Projects Delivered</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2">15+</div>
              <div className="text-sm md:text-base">African Languages</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-sm md:text-base">Client Satisfaction</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm md:text-base">AI Support</div>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-16">
            <p className="text-lg text-white/80 mb-4">
              🌍 Serving businesses from Lagos to Cairo, Nairobi to Cape Town
            </p>
            <div className="flex justify-center space-x-2 text-2xl">
              <span>🇳🇬</span>
              <span>🇰🇪</span>
              <span>🇿🇦</span>
              <span>🇬🇭</span>
              <span>🇪🇬</span>
              <span>🇪🇹</span>
              <span>🇷🇼</span>
              <span>🇺🇬</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
