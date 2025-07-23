
import React from 'react';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';

const ProfessionalStats = () => {
  const stats = [
    {
      icon: Users,
      value: '50+',
      label: 'Enterprise Clients',
      description: 'Trusted by leading organizations across Africa'
    },
    {
      icon: Globe,
      value: '12',
      label: 'Countries Served',
      description: 'Expanding AI solutions across African markets'
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Success Rate',
      description: 'Consistently delivering exceptional results'
    },
    {
      icon: Award,
      value: '15+',
      label: 'Languages Supported',
      description: 'Bridging communication barriers with AI'
    }
  ];

  return (
    <section className="ieq-section bg-white">
      <div className="ieq-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-surface border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            Our Impact
          </div>
          
          <h2 className="ieq-heading-lg mb-6">
            Driving Results Across
            <span className="ieq-text-gradient block mt-2">African Markets</span>
          </h2>
          
          <p className="ieq-body-lg max-w-3xl mx-auto">
            Our commitment to excellence is reflected in the measurable impact we've 
            delivered for organizations across the continent.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-xl bg-surface hover:bg-white hover:shadow-lg transition-all duration-300 border border-border group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <stat.icon className="w-8 h-8 text-primary group-hover:text-white" />
              </div>

              {/* Value */}
              <div className="ieq-heading-lg text-primary mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>

              {/* Label */}
              <h3 className="ieq-heading-sm mb-3">{stat.label}</h3>

              {/* Description */}
              <p className="ieq-body-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-surface to-white rounded-2xl p-8 lg:p-12 border border-border">
            <h3 className="ieq-heading-md mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="ieq-body mb-8 max-w-2xl mx-auto">
              Discover how our AI solutions can transform your business operations 
              and drive sustainable growth in your market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="ieq-button-primary">
                Schedule a Consultation
              </button>
              <button className="ieq-button-secondary">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalStats;
