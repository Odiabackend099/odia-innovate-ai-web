import React from 'react';
import ElevenLabsHero from '../components/voice/ElevenLabsHero';
import AdvancedVoiceInterface from '../components/voice/AdvancedVoiceInterface';

const VoiceAgentsPage = () => {
  return (
    <div className="min-h-screen">
      <ElevenLabsHero />
      <div className="bg-background py-20">
        <AdvancedVoiceInterface />
      </div>
    </div>
  );
};

export default VoiceAgentsPage;