import React from 'react';
import { Star, Quote } from 'lucide-react';

const NigerianTestimonials = () => {
  const testimonials = [
    {
      name: 'Adebayo Ogundimu',
      title: 'CEO, Lagos Fintech Hub',
      company: 'Lagos, Nigeria',
      content: 'ODIA AI transformed our customer service. Agent Lexi handles 80% of our WhatsApp inquiries in both English and Pidgin. Our response time went from hours to seconds!',
      rating: 5,
      avatar: '👨🏾‍💼'
    },
    {
      name: 'Dr. Fatima Aliyu',
      title: 'ICT Director, University of Abuja',
      company: 'Abuja, Nigeria',
      content: 'Agent MISS has revolutionized our student support system. Students can get help in Hausa, English, or Yoruba. It\'s like having a 24/7 academic assistant.',
      rating: 5,
      avatar: '👩🏾‍🎓'
    },
    {
      name: 'Emeka Okwu',
      title: 'Managing Director, EkoCorp Solutions',
      company: 'Port Harcourt, Nigeria',
      content: 'As a Nigerian business, we needed something that understands our market. ODIA AI gets it - the language, the culture, the business style. Game changer!',
      rating: 5,
      avatar: '👨🏾‍💻'
    },
    {
      name: 'Aisha Mohammed',
      title: 'Operations Manager, Northern Express',
      company: 'Kano, Nigeria',
      content: 'The multilingual support is incredible. Our customers in the North can interact in Hausa, while Lagos customers use English or Pidgin. Perfect for Nigerian businesses.',
      rating: 5,
      avatar: '👩🏾‍💼'
    },
    {
      name: 'Chinedu Eze',
      title: 'Legal Partner, Eze & Associates',
      company: 'Enugu, Nigeria',
      content: 'Agent Miss Legal has streamlined our document automation. NDPR compliance templates, contract drafting - it understands Nigerian legal requirements perfectly.',
      rating: 5,
      avatar: '⚖️'
    },
    {
      name: 'Bukola Adeyemi',
      title: 'Founder, Luxury Lagos Concierge',
      company: 'Lagos, Nigeria',
      content: 'Agent Atlas handles our VIP clients with sophistication. From yacht bookings to private jet arrangements, it maintains the luxury standard our Nigerian elite expect.',
      rating: 5,
      avatar: '👑'
    }
  ];

  return (
    <section className="webflow-section bg-gradient-to-br from-green-50 to-white">
      <div className="webflow-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold webflow-text-gradient mb-6">
            🇳🇬 Nigerian Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From Lagos to Kano, Nigerian businesses are transforming their operations with ODIA AI. 
            See how our voice AI platform is driving success across different industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="webflow-card group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-bl-full" />
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    <p className="text-xs text-green-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-green-500/30 mb-4" />
                
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="mt-6 pt-4 border-t border-green-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Verified Nigerian Business</span>
                    <div className="w-6 h-4 bg-green-600 rounded-sm flex items-center justify-center">
                      <div className="w-full h-2 bg-white rounded-sm flex">
                        <div className="w-1/2 bg-green-600"></div>
                        <div className="w-1/2 bg-white"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Join 200+ Nigerian Businesses Already Using ODIA AI
            </h3>
            <p className="text-green-100 mb-6">
              Start your free trial today and see why Nigerian businesses choose ODIA AI 
              for their voice automation needs. No setup fees, cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Talk to Sales Team
              </button>
            </div>
            <p className="text-xs text-green-200 mt-4">
              💬 WhatsApp us: +234 810 578 6326 | 🏢 Lagos office available for meetings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NigerianTestimonials;