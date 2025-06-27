
import React from 'react';

const Stats = () => {
  const stats = [
    { number: '50+', label: 'AI Solutions Deployed', icon: '🚀' },
    { number: '15+', label: 'African Languages', icon: '🌍' },
    { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
    { number: '24/7', label: 'Support Available', icon: '💬' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Businesses Across Africa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI solutions are making a real impact for companies from Lagos to Nairobi
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 mb-4 group-hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
