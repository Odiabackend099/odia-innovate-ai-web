
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import CEOSection from '../components/sections/CEOSection';
import CofounderSection from '../components/sections/CofounderSection';
import AIAvatarShowcase from '../components/sections/AIAvatarShowcase';
import Services from '../components/sections/Services';
import Stats from '../components/sections/Stats';
import CaseStudies from '../components/sections/CaseStudies';
import CallToAction from '../components/sections/CallToAction';
import ChatWidget from '../components/ChatWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CEOSection />
        <CofounderSection />
        <AIAvatarShowcase />
        <Stats />
        <Services />
        <CaseStudies />
        <CallToAction />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
