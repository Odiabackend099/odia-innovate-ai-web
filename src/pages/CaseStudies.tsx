
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CaseStudies from '../components/sections/CaseStudies';
import ChatWidget from '../components/ChatWidget';

const CaseStudiesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from organizations across Africa using our AI solutions 
            to transform their operations and serve customers better
          </p>
        </div>
      </section>

      <CaseStudies />
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear directly from organizations that have transformed their operations with our AI solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                quote: "ODIA.dev's AI solution reduced our call center workload by 40% while improving customer satisfaction. Their understanding of African languages was game-changing.",
                author: "Sarah Adebayo",
                role: "Head of Customer Service",
                company: "First Bank Nigeria"
              },
              {
                quote: "The healthcare AI helped us provide 24/7 patient support across all our clinics. Now patients can get help in their local language anytime.",
                author: "Dr. Michael Wanjiku",
                role: "Medical Director",
                company: "Nairobi Health Network"
              },
              {
                quote: "Citizens can now access government services in Hausa, English, and Yoruba. Our satisfaction scores have increased by 85%.",
                author: "Aisha Mustapha",
                role: "Digital Services Director",
                company: "Kaduna State Government"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-blue-600 text-4xl mb-4">"</div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  {testimonial.quote}
                </p>
                <div className="border-t pt-6">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600 font-medium">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default CaseStudiesPage;
