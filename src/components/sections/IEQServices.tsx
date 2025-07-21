
import React from 'react';
import { 
  Bot, 
  Globe, 
  Smartphone, 
  BarChart3, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const IEQServices = () => {
  const services = [
    {
      icon: Bot,
      title: 'AI Customer Support',
      description: 'Intelligent chatbots that understand African languages and cultural contexts.',
      features: [
        'Multi-language support (15+ African languages)',
        '24/7 automated responses',
        'Human handoff capabilities',
        'Custom training for your business'
      ],
      popular: true
    },
    {
      icon: Globe,
      title: 'Voice AI Solutions',
      description: 'Advanced voice recognition and synthesis for African markets.',
      features: [
        'Local accent recognition',
        'Voice-enabled applications',
        'Call center automation',
        'Real-time translation'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile-First AI',
      description: 'AI solutions optimized for mobile devices and low-bandwidth environments.',
      features: [
        'Offline-capable AI',
        'SMS and WhatsApp integration',
        'Progressive Web Apps',
        'Data-efficient algorithms'
      ]
    },
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'AI-powered analytics and insights for African business contexts.',
      features: [
        'Market trend analysis',
        'Customer behavior insights',
        'Predictive analytics',
        'Custom dashboards'
      ]
    },
    {
      icon: Shield,
      title: 'Secure AI Implementation',
      description: 'Enterprise-grade security and compliance for your AI solutions.',
      features: [
        'Data privacy compliance',
        'Secure cloud deployment',
        'Regular security audits',
        'Local data residency'
      ]
    },
    {
      icon: Zap,
      title: 'Custom AI Development',
      description: 'Tailored AI solutions built specifically for your business needs.',
      features: [
        'Custom model training',
        'API development',
        'Legacy system integration',
        'Ongoing support & maintenance'
      ]
    }
  ];

  const handleLearnMore = (serviceTitle: string) => {
    // Navigate to services detail or open modal
    console.log(`Learn more about ${serviceTitle}`);
  };

  return (
    <section id="services" className="ieq-section bg-white">
      <div className="ieq-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-light border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            Our Solutions
          </div>
          
          <h2 className="ieq-heading-lg text-gray-900 mb-6">
            Comprehensive AI Solutions for 
            <span className="ieq-text-gradient block mt-2">African Businesses</span>
          </h2>
          
          <p className="ieq-body-lg text-gray-600 max-w-3xl mx-auto">
            From intelligent customer support to advanced analytics, we provide end-to-end 
            AI solutions that understand and serve African markets.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`ieq-card group hover:shadow-lg transition-all duration-300 relative ${
                service.popular ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className="w-12 h-12 bg-blue-light rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary group-hover:text-white" />
              </div>

              {/* Content */}
              <h3 className="ieq-heading-sm text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="ieq-body text-gray-600 mb-6">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => handleLearnMore(service.title)}
                className="flex items-center space-x-2 text-primary font-medium hover:text-primary/80 transition-colors duration-200 group/cta"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <h3 className="ieq-heading-md text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="ieq-body text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI solutions can transform your business 
              and help you better serve your customers across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="ieq-button-primary">
                Schedule a Consultation
              </button>
              <button className="ieq-button-outline">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IEQServices;
