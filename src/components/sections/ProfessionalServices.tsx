
import React from 'react';
import { 
  Bot, 
  Brain, 
  Mic, 
  BarChart3, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const ProfessionalServices = () => {
  const services = [
    {
      icon: Bot,
      title: 'Intelligent Automation',
      description: 'Streamline operations with AI-powered automation solutions tailored for African business contexts.',
      features: [
        'Process automation',
        'Workflow optimization',
        'Integration services',
        'Performance monitoring'
      ],
      featured: true
    },
    {
      icon: Mic,
      title: 'Voice AI Solutions',
      description: 'Advanced voice recognition and synthesis technology supporting multiple African languages.',
      features: [
        'Multi-language support',
        'Real-time processing',
        'Custom voice models',
        'API integration'
      ]
    },
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Custom ML models and algorithms designed to solve complex business challenges.',
      features: [
        'Predictive analytics',
        'Pattern recognition',
        'Anomaly detection',
        'Model deployment'
      ]
    },
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'Transform data into actionable insights with our comprehensive BI solutions.',
      features: [
        'Data visualization',
        'Real-time dashboards',
        'Advanced analytics',
        'Custom reporting'
      ]
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Robust security frameworks ensuring data protection and regulatory compliance.',
      features: [
        'Data encryption',
        'Access control',
        'Audit trails',
        'Compliance monitoring'
      ]
    },
    {
      icon: Zap,
      title: 'Digital Transformation',
      description: 'Comprehensive digital transformation strategies for modern African enterprises.',
      features: [
        'Strategy consulting',
        'Technology roadmap',
        'Change management',
        'Training programs'
      ]
    }
  ];

  const handleLearnMore = (serviceTitle: string) => {
    console.log(`Learn more about ${serviceTitle}`);
  };

  return (
    <section id="services" className="ieq-section bg-white">
      <div className="ieq-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-surface border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            Our Expertise
          </div>
          
          <h2 className="ieq-heading-lg mb-6">
            Comprehensive AI Solutions for
            <span className="ieq-text-gradient block mt-2">Enterprise Success</span>
          </h2>
          
          <p className="ieq-body-lg max-w-3xl mx-auto">
            From intelligent automation to advanced analytics, we deliver enterprise-grade 
            AI solutions that drive measurable business outcomes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`ieq-service-card animate-fade-in ${
                service.featured ? 'border-l-gold shadow-lg' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Featured Badge */}
              {service.featured && (
                <div className="absolute -top-3 left-6 bg-gold text-gold-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary group-hover:text-white" />
              </div>

              {/* Content */}
              <h3 className="ieq-heading-sm mb-3">{service.title}</h3>
              
              <p className="ieq-body mb-6">{service.description}</p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="ieq-body-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => handleLearnMore(service.title)}
                className="flex items-center space-x-2 text-primary font-semibold hover:text-primary/80 transition-colors duration-200 group/cta"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-navy rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="ieq-heading-md mb-4 text-white">
              Ready to Transform Your Business?
            </h3>
            <p className="ieq-body mb-8 max-w-2xl mx-auto text-white/90">
              Let's discuss how our AI solutions can drive growth, efficiency, 
              and innovation for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="ieq-button-gold">
                Schedule Consultation
              </button>
              <button className="bg-white/20 text-white px-8 py-4 rounded-md font-semibold hover:bg-white/30 transition-all duration-300">
                Download Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalServices;
