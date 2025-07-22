
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Mic, MessageSquare, Stethoscope, Building, Zap } from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'whatsapp-automation',
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'WhatsApp Business Automation',
      description: 'Automate your Nigerian business customer service with Agent Lexi. Handle onboarding, trials, and upgrades seamlessly.',
      features: ['Nigerian business queries', 'Customer onboarding', 'Trial management', 'Sales automation'],
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'voice-ai-agents',
      icon: <Mic className="w-6 h-6" />,
      title: 'Voice AI Agents',
      description: 'Deploy intelligent voice agents that speak English, Pidgin, Yoruba, and Hausa. Perfect for Nigerian customer service.',
      features: ['Multi-language support', 'Nigerian accent recognition', '24/7 availability', 'Real-time responses'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'university-support',
      icon: <Bot className="w-6 h-6" />,
      title: 'University AI Support',
      description: 'Agent MISS provides academic assistance and multilingual support for Nigerian universities and educational institutions.',
      features: ['Academic assistance', 'Multilingual support', 'Student services', 'Administrative automation'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'legal-documentation',
      icon: <Building className="w-6 h-6" />,
      title: 'Legal Documentation AI',
      description: 'Agent Miss Legal helps with contract templates, NDPR compliance, and Nigerian legal document automation.',
      features: ['Contract templates', 'NDPR compliance', 'Legal automation', 'Nigerian law focus'],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'luxury-concierge',
      icon: <Stethoscope className="w-6 h-6" />,
      title: 'Luxury & Travel Concierge',
      description: 'Agent Atlas provides VIP bookings and high-end client management for Nigerian entrepreneurs and luxury businesses.',
      features: ['VIP bookings', 'Travel management', 'Luxury services', 'High-end client care'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'custom-solutions',
      icon: <Zap className="w-6 h-6" />,
      title: 'Custom Voice Solutions',
      description: 'Tailored voice AI solutions for Nigerian businesses. From fintech to e-commerce, we build what you need.',
      features: ['Custom development', 'Nigerian market focus', 'Scalable solutions', 'API integration'],
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  const handleLearnMore = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  const handleStartJourney = () => {
    navigate('/contact');
  };

  return (
    <section id="services" className="webflow-section bg-gradient-to-br from-background to-surface relative overflow-hidden">
      <div className="webflow-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold webflow-text-gradient mb-6">
            Voice AI Solutions for Nigerian Businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From Lagos SMEs to Abuja enterprises - our specialized AI agents understand Nigerian business culture, 
            languages, and market dynamics. Build automation that works for your customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="webflow-card group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className={`${service.bgColor} ${service.color} p-3 rounded-xl`}>
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm">
                    <div className={`w-1.5 h-1.5 ${service.bgColor} rounded-full mr-3`}></div>
                    <span className="text-card-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => handleLearnMore(service.id)}
                className="webflow-button-primary w-full"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={handleStartJourney}
            className="webflow-button-primary px-12 py-4 text-lg shadow-xl hover:shadow-2xl"
          >
            Start Your AI Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
