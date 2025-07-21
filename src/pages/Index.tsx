
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Mic, Brain, Globe, Shield } from 'lucide-react';
import AgentSelection from '../components/voice/AgentSelection';
import VoiceInterface from '../components/voice/VoiceInterface';
import FloatingAgentAvatars from '../components/voice/FloatingAgentAvatars';
import PWAInstallPrompt from '../components/PWAInstallPrompt';

interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  avatar: string;
  icon: React.ReactNode;
  color: string;
}

const Index = () => {
  const [showAgentSelection, setShowAgentSelection] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isVoiceInterfaceOpen, setIsVoiceInterfaceOpen] = useState(false);

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowAgentSelection(false);
    setIsVoiceInterfaceOpen(true);
  };

  const handleCloseVoiceInterface = () => {
    setIsVoiceInterfaceOpen(false);
    setSelectedAgent(null);
  };

  const startVoiceChat = () => {
    setShowAgentSelection(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-primary/95 backdrop-blur-sm border-b border-primary/20 fixed w-full z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src="/lovable-uploads/e4ecf514-3800-415c-b885-be4fdded4cc7.png"
                alt="ODIA Logo"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-white">ODIA Voice AI</h1>
                <p className="text-sm text-white/80">Nigerian Business Intelligence</p>
              </div>
            </div>
            <div className="text-sm text-white/80">
              Nigeria's Premier Voice Platform 🇳🇬
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary via-primary-glow to-accent min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Voice-First AI for
              <span className="block gradient-animated">Nigerian Business</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Talk to specialized AI agents who understand Nigerian English, 
              Pidgin, and your business context. No typing required.
            </p>

            {/* Main CTA */}
            <div className="mb-16">
              <Button
                onClick={startVoiceChat}
                className="bg-white text-primary hover:bg-white/90 rounded-full px-12 py-6 text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Mic className="w-8 h-8 mr-3" />
                Start Voice Conversation
              </Button>
              <p className="text-white/70 text-sm mt-4">
                Choose your AI agent and start talking immediately
              </p>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Agents</h3>
                <p className="text-white/80 text-sm">Lexi for customer service, Atlas for finance</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Nigerian-First</h3>
                <p className="text-white/80 text-sm">Built for Nigerian accents and business culture</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Enterprise Ready</h3>
                <p className="text-white/80 text-sm">Secure, scalable, mobile-optimized</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Agent Selection Modal */}
      {showAgentSelection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-foreground">Choose Your AI Agent</h2>
                <Button
                  onClick={() => setShowAgentSelection(false)}
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </Button>
              </div>
              <AgentSelection onSelectAgent={handleSelectAgent} />
            </div>
          </div>
        </div>
      )}

      {/* Voice Interface */}
      {selectedAgent && (
        <VoiceInterface
          agent={selectedAgent}
          isOpen={isVoiceInterfaceOpen}
          onClose={handleCloseVoiceInterface}
        />
      )}

      {/* Floating Agent Avatars */}
      <FloatingAgentAvatars
        selectedAgent={selectedAgent?.id}
        isSpeaking={false} // This would be connected to voice state
      />

      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
