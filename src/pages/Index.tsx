
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import IEQHero from '../components/sections/IEQHero';
import CEOSection from '../components/sections/CEOSection';
import CofounderSection from '../components/sections/CofounderSection';
import AIAvatarShowcase from '../components/sections/AIAvatarShowcase';
import IEQServices from '../components/sections/IEQServices';
import Stats from '../components/sections/Stats';
import CaseStudies from '../components/sections/CaseStudies';
import CallToAction from '../components/sections/CallToAction';
import ChatWidget from '../components/ChatWidget';
import PWAInstallPrompt from '../components/PWAInstallPrompt';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <IEQHero />
        <CEOSection />
        <CofounderSection />
        <AIAvatarShowcase />
        <Stats />
        <IEQServices />
        <CaseStudies />
        <CallToAction />
      </main>
      <Footer />
      <ChatWidget />
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
