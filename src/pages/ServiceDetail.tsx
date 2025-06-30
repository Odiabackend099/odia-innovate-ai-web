
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatWidget from '../components/ChatWidget';
import { ArrowLeft, CheckCircle, Star, Globe, Users, Zap } from 'lucide-react';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const services = {
    'voice-automation': {
      title: 'Voice Automation',
      flag: '🇳🇬',
      gradient: 'from-blue-500 to-blue-700',
      description: 'Transform customer service with intelligent voice systems that understand multiple African languages and dialects.',
      longDescription: 'Our Voice Automation solution revolutionizes customer service across Africa by providing intelligent, multilingual voice systems that understand not just words, but cultural context, local expressions, and regional dialects.',
      features: [
        'Multi-language support (15+ African languages)',
        'Natural conversation flow',
        '24/7 availability',
        'Cultural context awareness',
        'Accent and dialect recognition',
        'Integration with existing systems',
        'Real-time translation',
        'Voice analytics and insights'
      ],
      benefits: [
        'Reduce customer service costs by up to 70%',
        'Improve customer satisfaction scores',
        'Handle 10x more calls simultaneously',
        'Provide consistent service quality',
        'Expand to new markets easily',
        'Reduce training costs for staff'
      ],
      useCases: [
        'Banking customer service',
        'Telecom support lines',
        'Healthcare appointment booking',
        'Government service hotlines',
        'E-commerce order tracking',
        'Insurance claim processing'
      ],
      pricing: {
        starter: '$500/month',
        professional: '$2000/month',
        enterprise: 'Custom pricing'
      },
      testimonial: {
        text: "ODIA.dev's voice automation has transformed our customer service. We now handle calls in Yoruba, Hausa, and English seamlessly, and our customer satisfaction has increased by 85%.",
        author: "Adaora Okafor",
        role: "CTO, First Bank Nigeria",
        company: "First Bank Nigeria"
      }
    },
    'intelligent-chatbots': {
      title: 'Intelligent Chatbots',
      flag: '🇰🇪',
      gradient: 'from-green-500 to-green-700',
      description: 'Deploy smart chatbots that understand context, culture, and local business practices across Africa.',
      longDescription: 'Our Intelligent Chatbots go beyond simple Q&A. They understand cultural nuances, business contexts, and can engage in meaningful conversations that feel natural to African users.',
      features: [
        'Cultural awareness and sensitivity',
        'Context understanding',
        'Business process integration',
        'WhatsApp Business API integration',
        'Multi-platform deployment',
        'Learning and adaptation',
        'Sentiment analysis',
        'Escalation management'
      ],
      benefits: [
        'Increase lead conversion by 40%',
        'Reduce response time to under 30 seconds',
        'Handle unlimited conversations',
        'Provide 24/7 customer support',
        'Integrate with existing CRM systems',
        'Generate detailed analytics'
      ],
      useCases: [
        'E-commerce customer support',
        'Lead generation and qualification',
        'Appointment scheduling',
        'Order tracking and updates',
        'FAQ automation',
        'Product recommendations'
      ],
      pricing: {
        starter: '$300/month',
        professional: '$1200/month',
        enterprise: 'Custom pricing'
      },
      testimonial: {
        text: "The chatbot understands our customers' needs perfectly. It's like having a Kenyan customer service representative available 24/7 who speaks both English and Swahili fluently.",
        author: "James Mwangi",
        role: "Marketing Director, Safaricom",
        company: "Safaricom Kenya"
      }
    },
    'african-language-nlp': {
      title: 'African Language NLP',
      flag: '🇬🇭',
      gradient: 'from-orange-500 to-red-600',
      description: 'Advanced natural language processing specifically trained on African languages and cultural contexts.',
      longDescription: 'Our African Language NLP models are built from the ground up to understand African languages, not just translate them. We capture cultural nuances, idioms, and context that generic AI models miss.',
      features: [
        'Native support for Yoruba, Hausa, Swahili, Twi, Zulu, Amharic',
        'Cultural context understanding',
        'Dialect and accent recognition',
        'Sentiment analysis in local languages',
        'Entity recognition for African names and places',
        'Language translation between African languages',
        'Code-switching detection',
        'Colloquial expression understanding'
      ],
      benefits: [
        'Reach 80% more of your target audience',
        'Improve engagement rates by 60%',
        'Reduce miscommunication',
        'Build stronger customer relationships',
        'Expand to new African markets',
        'Preserve cultural authenticity'
      ],
      useCases: [
        'Social media monitoring',
        'Customer feedback analysis',
        'Content localization',
        'Voice assistants',
        'Educational applications',
        'Legal document processing'
      ],
      pricing: {
        starter: '$800/month',
        professional: '$3000/month',
        enterprise: 'Custom pricing'
      },
      testimonial: {
        text: "Finally, an AI that truly understands Twi and Ga! Our customer feedback analysis has become so much more accurate and insightful.",
        author: "Akosua Frimpong",
        role: "Data Scientist, MTN Ghana",
        company: "MTN Ghana"
      }
    },
    'healthcare-ai': {
      title: 'Healthcare AI',
      flag: '🇿🇦',
      gradient: 'from-purple-500 to-purple-700',
      description: 'Specialized AI solutions for African healthcare challenges, from diagnosis assistance to patient management.',
      longDescription: 'Our Healthcare AI addresses unique African healthcare challenges with solutions designed for resource-constrained environments, multilingual patient populations, and diverse healthcare systems.',
      features: [
        'Multilingual symptom checking',
        'Patient triage and prioritization',
        'Appointment scheduling automation',
        'Medical record digitization',
        'Drug interaction warnings',
        'Telemedicine support',
        'Health education in local languages',
        'Epidemic monitoring and alerts'
      ],
      benefits: [
        'Reduce patient wait times by 85%',
        'Improve diagnostic accuracy',
        'Increase healthcare accessibility',
        'Reduce administrative burden',
        'Enable remote healthcare delivery',
        'Provide 24/7 health information'
      ],
      useCases: [
        'Hospital patient triage',
        'Clinic appointment systems',
        'Mobile health applications',
        'Telemedicine platforms',
        'Health information hotlines',
        'Medical research support'
      ],
      pricing: {
        starter: '$1000/month',
        professional: '$4000/month',
        enterprise: 'Custom pricing'
      },
      testimonial: {
        text: "ODIA.dev's Healthcare AI has revolutionized how we serve our patients. We can now provide quality healthcare information in Zulu, Xhosa, and English, reaching communities we couldn't serve before.",
        author: "Dr. Nomsa Dlamini",
        role: "Chief Medical Officer, Groote Schuur Hospital",
        company: "University of Cape Town"
      }
    },
    'government-ai': {
      title: 'Government AI',
      flag: '🇪🇹',
      gradient: 'from-indigo-500 to-indigo-700',
      description: 'Streamline public services with AI solutions designed for African government and civic applications.',
      longDescription: 'Our Government AI solutions help African governments provide better citizen services, improve transparency, and increase efficiency while respecting local governance structures and cultural values.',
      features: [
        'Multilingual citizen service portals',
        'Automated form processing',
        'Document verification systems',
        'Public service chatbots',
        'Citizens complaint management',
        'Service request tracking',
        'Multi-channel communication',
        'Analytics and reporting'
      ],
      benefits: [
        'Increase citizen satisfaction by 85%',
        'Reduce service delivery time by 70%',
        'Improve government transparency',
        'Reduce administrative costs',
        'Enable 24/7 public services',
        'Better resource allocation'
      ],
      useCases: [
        'Citizen service portals',
        'License and permit applications',
        'Tax information systems',
        'Public complaint platforms',
        'Emergency service coordination',
        'Public information dissemination'
      ],
      pricing: {
        starter: '$1500/month',
        professional: '$5000/month',
        enterprise: 'Custom pricing'
      },
      testimonial: {
        text: "Our citizens can now access government services in Amharic, Oromo, and English 24/7. The efficiency gains have been remarkable, and citizen satisfaction has never been higher.",
        author: "Ato Bekele Gerima",
        role: "Director of Digital Services, Federal Democratic Republic of Ethiopia",
        company: "Ethiopian Government"
      }
    },
    'custom-solutions': {
      title: 'Custom Solutions',
      flag: '🇷🇼',
      gradient: 'from-yellow-500 to-orange-600',
      description: 'Tailored AI solutions for unique African business challenges and opportunities.',
      longDescription: 'Every African business is unique. Our Custom Solutions team works with you to build AI systems that address your specific challenges, integrate with your existing systems, and scale with your business.',
      features: [
        'Tailored AI model development',
        'Custom integration solutions',
        'Scalable cloud architecture',
        'Ongoing support and maintenance',
        'Training and knowledge transfer',
        'Performance optimization',
        'Security and compliance',
        'Multi-platform deployment'
      ],
      benefits: [
        'Perfect fit for your business needs',
        'Competitive advantage through innovation',
        'Scalable solutions that grow with you',
        'Expert support throughout the journey',
        'Rapid deployment and results',
        'Cost-effective custom development'
      ],
      useCases: [
        'Fintech fraud detection',
        'Agricultural AI systems',
        'Supply chain optimization',
        'Educational technology',
        'Energy management systems',
        'Transportation logistics'
      ],
      pricing: {
        starter: 'Starting at $5000',
        professional: '$15000 - $50000',
        enterprise: 'Custom pricing'
      },
      testimonial: {
        text: "ODIA.dev built a custom AI solution for our agricultural cooperative that predicts crop yields and optimizes farming schedules. It's transformed how our 10,000+ farmers operate.",
        author: "Jean-Baptiste Nsengimana",
        role: "CEO, Rwanda Agricultural Cooperative",
        company: "COPANI Rwanda"
      }
    }
  };

  const service = services[serviceId as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </button>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`bg-gradient-to-br ${service.gradient} text-white p-4 rounded-2xl`}>
                  <Zap className="w-8 h-8" />
                </div>
                <span className="text-4xl">{service.flag}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {service.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {service.longDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`bg-gradient-to-r ${service.gradient} text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                  Get Started Today 🚀
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                  Schedule Demo 📅
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Pricing Plans</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Starter</span>
                    <span className="text-lg font-bold text-blue-600">{service.pricing.starter}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Professional</span>
                    <span className="text-lg font-bold text-blue-600">{service.pricing.professional}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Enterprise</span>
                    <span className="text-lg font-bold text-blue-600">{service.pricing.enterprise}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for African businesses and contexts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <CheckCircle className={`w-8 h-8 text-green-500 mb-4`} />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Business Benefits
              </h2>
              <div className="space-y-6">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <Star className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Use Cases
              </h2>
              <div className="space-y-6">
                {service.useCases.map((useCase, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <Globe className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-lg">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            What Our Clients Say
          </h2>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="flex justify-center mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 italic leading-relaxed">
              "{service.testimonial.text}"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {service.testimonial.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">{service.testimonial.author}</p>
                <p className="text-gray-600">{service.testimonial.role}</p>
                <p className="text-blue-600 font-medium">{service.testimonial.company}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 bg-gradient-to-r ${service.gradient} text-white`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of African businesses already using our AI solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Start Free Trial 🎯
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
              Contact Sales Team 📞
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm opacity-75">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              500+ Happy Clients
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              15+ Countries Served
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              4.9/5 Rating
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default ServiceDetail;
