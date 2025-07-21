
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Mic, MessageSquare, Stethoscope, Building, Zap } from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'voice-automation',
      icon: <Mic className="w-6 h-6" />,
      title: 'Voice Automation',
      description: 'Transform customer service with intelligent voice systems that understand multiple African languages and dialects.',
      features: ['Multi-language support', 'Natural conversation', '24/7 availability'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'intelligent-chatbots',
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Intelligent Chatbots',
      description: 'Deploy smart chatbots that understand context, culture, and local business practices across Africa.',
      features: ['Cultural awareness', 'Context understanding', 'Business integration'],
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'african-language-nlp',
      icon: <Bot className="w-6 h-6" />,
      title: 'African Language NLP',
      description: 'Advanced natural language processing specifically trained on African languages and cultural contexts.',
      features: ['Yoruba, Hausa, Swahili', 'Cultural context', 'Dialect recognition'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'healthcare-ai',
      icon: <Stethoscope className="w-6 h-6" />,
      title: 'Healthcare AI',
      description: 'Specialized AI solutions for African healthcare challenges, from diagnosis assistance to patient management.',
      features: ['Diagnosis support', 'Patient management', 'Multilingual health'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'government-ai',
      icon: <Building className="w-6 h-6" />,
      title: 'Government AI',
      description: 'Streamline public services with AI solutions designed for African government and civic applications.',
      features: ['Public service automation', 'Citizen engagement', 'Multilingual support'],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'custom-solutions',
      icon: <Zap className="w-6 h-6" />,
      title: 'Custom Solutions',
      description: 'Tailored AI solutions for unique African business challenges and opportunities.',
      features: ['Custom development', 'Local integration', 'Scalable solutions'],
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
            AI Solutions Across Africa
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From Lagos to Cairo, Nairobi to Cape Town - we're building AI solutions 
            that understand Africa's unique challenges and opportunities.
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
