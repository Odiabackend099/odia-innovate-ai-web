
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Mic, MessageSquare, Stethoscope, Building, Zap } from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'voice-automation',
      icon: <Mic className="w-8 h-8" />,
      title: 'Voice Automation',
      description: 'Transform customer service with intelligent voice systems that understand multiple African languages and dialects.',
      features: ['Multi-language support', 'Natural conversation', '24/7 availability'],
      gradient: 'from-blue-500 to-blue-700',
      flag: '🇳🇬'
    },
    {
      id: 'intelligent-chatbots',
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Intelligent Chatbots',
      description: 'Deploy smart chatbots that understand context, culture, and local business practices across Africa.',
      features: ['Cultural awareness', 'Context understanding', 'Business integration'],
      gradient: 'from-green-500 to-green-700',
      flag: '🇰🇪'
    },
    {
      id: 'african-language-nlp',
      icon: <Bot className="w-8 h-8" />,
      title: 'African Language NLP',
      description: 'Advanced natural language processing specifically trained on African languages and cultural contexts.',
      features: ['Yoruba, Hausa, Swahili', 'Cultural context', 'Dialect recognition'],
      gradient: 'from-orange-500 to-red-600',
      flag: '🇬🇭'
    },
    {
      id: 'healthcare-ai',
      icon: <Stethoscope className="w-8 h-8" />,
      title: 'Healthcare AI',
      description: 'Specialized AI solutions for African healthcare challenges, from diagnosis assistance to patient management.',
      features: ['Diagnosis support', 'Patient management', 'Multilingual health'],
      gradient: 'from-purple-500 to-purple-700',
      flag: '🇿🇦'
    },
    {
      id: 'government-ai',
      icon: <Building className="w-8 h-8" />,
      title: 'Government AI',
      description: 'Streamline public services with AI solutions designed for African government and civic applications.',
      features: ['Public service automation', 'Citizen engagement', 'Multilingual support'],
      gradient: 'from-indigo-500 to-indigo-700',
      flag: '🇪🇹'
    },
    {
      id: 'custom-solutions',
      icon: <Zap className="w-8 h-8" />,
      title: 'Custom Solutions',
      description: 'Tailored AI solutions for unique African business challenges and opportunities.',
      features: ['Custom development', 'Local integration', 'Scalable solutions'],
      gradient: 'from-yellow-500 to-orange-600',
      flag: '🇷🇼'
    }
  ];

  const handleLearnMore = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  const handleStartJourney = () => {
    navigate('/contact');
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-background to-surface relative overflow-hidden">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23479afc' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
            AI Solutions Across Africa 🌍
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
              className="group bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border hover:border-primary/50"
            >
              <div className="flex items-center mb-6">
                <div className={`bg-gradient-to-br ${service.gradient} text-white p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {service.icon}
                </div>
                <span className="ml-3 text-2xl">{service.flag}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm">
                    <div className={`w-2 h-2 bg-gradient-to-br ${service.gradient} rounded-full mr-3`}></div>
                    <span className="text-card-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => handleLearnMore(service.id)}
                className={`w-full bg-gradient-to-r ${service.gradient} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
              >
                Learn More 🚀
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={handleStartJourney}
            className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-12 py-4 rounded-xl font-bold text-lg hover:from-primary-glow hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            🌟 Start Your AI Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
