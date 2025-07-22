import React from 'react';
import { Check, Star, Zap, Building2 } from 'lucide-react';

const NigerianPricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '₦15,000',
      period: '/month',
      description: 'Perfect for small Nigerian businesses getting started with voice AI',
      features: [
        '1,000 voice interactions',
        'WhatsApp automation',
        'English & Pidgin support',
        'Basic analytics dashboard',
        'Email support',
        'Agent Lexi access'
      ],
      highlighted: false,
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Business',
      price: '₦35,000',
      period: '/month',
      description: 'Ideal for growing Nigerian enterprises and SMEs',
      features: [
        '5,000 voice interactions',
        'All AI agents (Lexi, MISS, Atlas, Legal)',
        'Multi-channel automation',
        'English, Pidgin, Yoruba, Hausa',
        'Advanced analytics',
        'WhatsApp Business API',
        'Priority support',
        'Custom integrations'
      ],
      highlighted: true,
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Enterprise',
      price: '₦75,000',
      period: '/month',
      description: 'For large Nigerian organizations and government agencies',
      features: [
        'Unlimited voice interactions',
        'Custom agent deployment',
        'White-label solutions',
        'On-premise deployment',
        'NDPR compliance tools',
        '24/7 phone support',
        'Dedicated account manager',
        'Custom voice models',
        'API access'
      ],
      highlighted: false,
      icon: <Star className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="webflow-section bg-gradient-to-br from-background to-muted/30">
      <div className="webflow-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold webflow-text-gradient mb-6">
            Nigerian Naira Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transparent pricing designed for Nigerian businesses. No hidden fees, 
            pay in Naira with Flutterwave. Start your voice AI journey today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`webflow-card relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted 
                  ? 'ring-2 ring-primary shadow-2xl scale-105' 
                  : 'hover:shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2 text-sm font-semibold">
                  🇳🇬 Most Popular for Nigerian SMEs
                </div>
              )}
              
              <div className={`p-8 ${plan.highlighted ? 'pt-16' : 'pt-8'}`}>
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-r ${plan.color} text-white p-3 rounded-xl mr-4`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-card-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Billed monthly in Nigerian Naira
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-card-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {plan.highlighted ? 'Start Free Trial' : 'Get Started'}
                </button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  💳 Pay securely with Flutterwave
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🇳🇬 Built for Nigerian Businesses
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-2">💳</div>
                  <div className="font-semibold">Flutterwave Payments</div>
                  <div className="text-gray-600">Secure Naira transactions</div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-2">🏢</div>
                  <div className="font-semibold">Lagos-Based Support</div>
                  <div className="text-gray-600">Local team, local understanding</div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-semibold">WhatsApp First</div>
                  <div className="text-gray-600">Nigeria's preferred platform</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NigerianPricing;