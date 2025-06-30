
import React, { useState, useEffect } from 'react';
import VoiceChatInterface from '../VoiceChat/VoiceChatInterface';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroVisual from './HeroVisual';
import HeroScrollIndicator from './HeroScrollIndicator';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);
  const fullText = 'AI Solutions for African Innovation';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTalkToAI = () => {
    setIsVoiceChatOpen(true);
  };

  const handleExploreServices = () => {
    // Scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll to services section by estimation
      window.scrollTo({
        top: window.innerHeight * 2,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        <HeroBackground scrollY={scrollY} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center min-h-screen">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Column - Content */}
            <HeroContent 
              currentText={currentText}
              scrollY={scrollY}
              onTalkToAI={handleTalkToAI}
              onExploreServices={handleExploreServices}
            />

            {/* Right Column - Visual */}
            <HeroVisual scrollY={scrollY} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <HeroScrollIndicator scrollY={scrollY} />
      </section>

      {/* Voice Chat Interface */}
      <VoiceChatInterface 
        isOpen={isVoiceChatOpen}
        onClose={() => setIsVoiceChatOpen(false)}
      />
    </>
  );
};

export default Hero;
