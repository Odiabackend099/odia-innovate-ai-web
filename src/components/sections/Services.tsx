
import React from 'react';
import { Phone, MessageSquare, Book, Heart, Users, Settings } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Phone,
      title: 'Voice Automation',
      description: 'Advanced call center AI and speech-to-text solutions for African languages.',
      features: ['Call center automation', 'Multi-language support', 'Real-time transcription'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MessageSquare,
      title: 'Intelligent Chatbots',
      description: 'WhatsApp, web, and mobile chatbots that understand African context.',
      features: ['WhatsApp integration', 'Web & mobile ready', 'Context-aware responses'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Book,
      title: 'Language NLP',
      description: 'Process and understand African languages including Hausa, Yoruba, and Swahili.',
      features: ['African language processing', 'Sentiment analysis', 'Text classification'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Heart,
      title: 'Healthcare AI',
      description: 'Patient triage, appointment scheduling, and medical assistance.',
      features: ['Patient triage', 'Appointment scheduling', '24/7 medical support'],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Government AI',
      description: 'Citizen services automation and e-government solutions.',
      features: ['Citizen service automation', 'Form processing', 'Multi-channel support'],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Settings,
      title: 'Custom AI Solutions',
      description: 'Tailored AI solutions designed for your specific business needs.',
      features: ['Custom development', 'API integration', 'Scalable architecture'],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our AI Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive AI services designed for African businesses and organizations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="text-white" size={32} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
