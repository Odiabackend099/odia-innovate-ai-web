
import React from 'react';
import { TrendingUp, Clock, Users } from 'lucide-react';

const CaseStudies = () => {
  const caseStudies = [
    {
      industry: 'Banking',
      title: 'Major Nigerian Bank Reduces Call Volume by 40%',
      description: 'Implemented AI-powered customer service that handles 80% of routine inquiries automatically.',
      metrics: [
        { icon: TrendingUp, value: '40%', label: 'Call Reduction' },
        { icon: Clock, value: '24/7', label: 'Availability' },
        { icon: Users, value: '100K+', label: 'Customers Served' }
      ],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      color: 'from-blue-500 to-blue-600'
    },
    {
      industry: 'Healthcare',
      title: 'Hospital Network Achieves 24/7 Patient Access',
      description: 'AI triage system processes patient symptoms and schedules appointments across 15 clinics.',
      metrics: [
        { icon: Users, value: '50K+', label: 'Patients Helped' },
        { icon: Clock, value: '85%', label: 'Faster Triage' },
        { icon: TrendingUp, value: '95%', label: 'Satisfaction Rate' }
      ],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      color: 'from-green-500 to-green-600'
    },
    {
      industry: 'Government',
      title: 'State Government Improves Citizen Services',
      description: 'Multi-language AI assistant helps citizens access government services and information.',
      metrics: [
        { icon: Users, value: '85%', label: 'Citizen Satisfaction' },
        { icon: TrendingUp, value: '60%', label: 'Faster Processing' },
        { icon: Clock, value: '24/7', label: 'Service Access' }
      ],
      image: 'https://images.unsplash.com/photo-1573495804318-76491de6d17a?w=600&h=400&fit=crop',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from organizations across Africa using our AI solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-4 left-4 bg-gradient-to-r ${study.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {study.industry}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                  {study.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {study.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="flex justify-center mb-2">
                        <metric.icon className="text-blue-600" size={20} />
                      </div>
                      <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                      <div className="text-xs text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all duration-300">
                  Read Full Case Study
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
