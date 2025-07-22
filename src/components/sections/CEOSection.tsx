
import React from 'react';

const CEOSection = () => {
  return (
    <section className="ieq-section bg-gray-50">
      <div className="ieq-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - CEO Image */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/e4ecf514-3800-415c-b885-be4fdded4cc7.png" 
                  alt="Austyn, CEO & Founder of ODIA.dev" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🇳🇬</span>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-accent/10 rounded-full blur-lg"></div>
          </div>

          {/* Right - CEO Message */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <h2 className="ieq-heading-lg text-gray-900 mb-6">
                Leading Africa's
                <span className="ieq-text-gradient block mt-2">AI Revolution</span>
              </h2>
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <blockquote className="ieq-body-lg text-gray-700 leading-relaxed mb-6 italic">
                  "At ODIA.dev, we're not just building AI solutions – we're crafting the future of African innovation. 
                  Every line of code, every conversation our AI has, brings us closer to a continent where 
                  technology serves humanity, understands our languages, and respects our cultures."
                </blockquote>
                <div className="flex items-center justify-center lg:justify-start">
                  <div>
                    <div className="font-bold text-lg text-primary">Austyn</div>
                    <div className="text-gray-600">CEO & Founder, ODIA.dev</div>
                    <div className="text-sm text-gray-500 mt-1">🇳🇬 Lagos, Nigeria</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
