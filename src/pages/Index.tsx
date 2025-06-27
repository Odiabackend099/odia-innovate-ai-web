
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Stats from '../components/sections/Stats';
import CaseStudies from '../components/sections/CaseStudies';
import ChatWidget from '../components/ChatWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <CaseStudies />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
