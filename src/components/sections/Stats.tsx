
import React, { useEffect, useState } from 'react';

const Stats = () => {
  const [scrollY, setScrollY] = useState(0);
  
  const stats = [
    { number: '200+', label: 'Nigerian Businesses Served', icon: '🏢' },
    { number: '4', label: 'Nigerian Languages', icon: '🇳🇬' },
    { number: '99%', label: 'Uptime SLA', icon: '⚡' },
    { number: '₦15K', label: 'Starting Price/Month', icon: '💰' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-10 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-10"
          style={{ transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.1}deg)` }}
        />
        <div 
          className="absolute bottom-20 left-10 w-32 h-32 bg-blue-300 rounded-full opacity-15"
          style={{ transform: `translateY(${scrollY * -0.1}px) rotate(${scrollY * -0.1}deg)` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="text-center mb-16"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
              alt="ODIA.dev Logo" 
              className="w-12 h-12 mr-3"
            />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Leading Nigerian Voice AI Platform
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From Lagos startups to Abuja enterprises, Nigerian businesses trust ODIA AI 
            for their voice automation and customer service needs
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-500"
              style={{
                transform: `translateY(${scrollY * (0.02 + index * 0.01)}px)`,
              }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-4 group-hover:shadow-2xl transition-all duration-500 border border-blue-100 group-hover:border-blue-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-semibold">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
