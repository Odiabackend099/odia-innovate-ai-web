
import React from 'react';
import ProfessionalHeader from '../components/layout/ProfessionalHeader';
import ProfessionalFooter from '../components/layout/ProfessionalFooter';
import ProfessionalHero from '../components/sections/ProfessionalHero';
import TeamShowcase from '../components/sections/TeamShowcase';
import ProfessionalServices from '../components/sections/ProfessionalServices';
import ProfessionalStats from '../components/sections/ProfessionalStats';
import InsightsSection from '../components/sections/InsightsSection';
import CallToAction from '../components/sections/CallToAction';
import ChatWidget from '../components/ChatWidget';
import PWAInstallPrompt from '../components/PWAInstallPrompt';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ProfessionalHeader />
      <main>
        <ProfessionalHero />
        <TeamShowcase />
        <ProfessionalServices />
        <ProfessionalStats />
        <InsightsSection />
        <CallToAction />
      </main>
      <ProfessionalFooter />
      <ChatWidget />
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
