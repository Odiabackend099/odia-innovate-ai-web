
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Mic, MessageSquare, Stethoscope, Building, Zap } from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'voice-automation',
      icon: <Mic className="w-6 h-6" />,
      title: '🎙️ Voice AI Infrastructure',
      description: 'Deploy intelligent voice agents that understand Nigerian accents, speak local languages, and integrate directly with your business systems via our MCP platform.',
      features: ['Nigerian English + Pidgin recognition', 'Yoruba, Igbo, Hausa support', 'Live Deployment: 48 hours'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'whatsapp-automation',
      icon: <MessageSquare className="w-6 h-6" />,
      title: '📱 Agent Lexi - WhatsApp Business Expert',
      description: 'Agent Lexi handles your entire customer journey - from first contact to payment confirmation via Flutterwave integration.',
      features: ['WhatsApp Business integration', 'Flutterwave payment automation', '99.9% Uptime Guaranteed'],
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'university-support',
      icon: <Bot className="w-6 h-6" />,
      title: '📚 Agent MISS - University Academic Assistant',
      description: 'Agent MISS provides multilingual academic support for universities across Nigeria, with deep integration into academic systems.',
      features: ['Multilingual student support', 'University data integration', '24/7 Academic Support'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'luxury-travel',
      icon: <Stethoscope className="w-6 h-6" />,
      title: '✈️ Agent Atlas - Luxury & Travel Concierge',
      description: 'Agent Atlas handles high-end bookings, VIP inquiries, and premium customer experiences with sophisticated automation.',
      features: ['Luxury travel bookings', 'VIP client management', 'White-Glove Service'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'legal-documents',
      icon: <Building className="w-6 h-6" />,
      title: '⚖️ Agent Miss Legal - Legal Document Expert',
      description: 'Legal documents and contract templates with NDPR compliance automation for Nigerian businesses.',
      features: ['Legal documents & contracts', 'NDPR compliance automation', 'Nigerian Legal Compliance'],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'emergency-response',
      icon: <Zap className="w-6 h-6" />,
      title: '🆘 Protect.NG (CrossAI) - Coming Q2 2025',
      description: 'Multilingual Emergency Response System with voice-activated emergency assistance and government agency integration.',
      features: ['Multi-language emergency support', 'Real-time location services', 'Launching Nationwide 2025'],
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
            Meet Our AI Agent Squad
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From WhatsApp onboarding to university support - our voice-first agents speak Nigerian languages 
            and understand our business culture. Deploy in 48 hours.
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
            🎙️ Deploy Your Voice Agent (48 Hours)
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
