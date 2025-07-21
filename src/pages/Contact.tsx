
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatWidget from '../components/ChatWidget';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import AgentOdiaWidget from '../components/AgentOdiaWidget';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <ContactHero />

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>

        {/* Additional CTA Section with African theme */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 mx-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6b35' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                🌍 Ready to Transform Africa with AI?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join businesses across Nigeria, Kenya, Ghana, and beyond in leveraging 
                cutting-edge AI solutions built for Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🚀 Start Your Project
                </button>
                <button 
                  onClick={() => {
                    const widgetButton = document.querySelector('[aria-label="Open Agent Odia Assistant"]') as HTMLButtonElement;
                    if (widgetButton) {
                      widgetButton.click();
                    }
                  }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  🤖 Talk to Agent Odia
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
      
      {/* Add Agent Odia Widget */}
      <AgentOdiaWidget />
    </div>
  );
};

export default Contact;
