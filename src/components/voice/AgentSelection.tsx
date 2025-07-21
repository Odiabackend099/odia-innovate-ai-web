import React from 'react';
import { Button } from '../ui/button';
import { Mic, TrendingUp, UserCheck } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  avatar: string;
  icon: React.ReactNode;
  color: string;
}

interface AgentSelectionProps {
  onSelectAgent: (agent: Agent) => void;
  className?: string;
}

const agents: Agent[] = [
  {
    id: 'lexi',
    name: 'Lexi',
    role: 'Customer Service Specialist',
    specialization: 'Nigerian customer support, order management, service inquiries',
    avatar: '/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png', // Using existing placeholder
    icon: <UserCheck className="w-6 h-6" />,
    color: 'from-accent to-accent/80'
  },
  {
    id: 'atlas',
    name: 'Atlas',
    role: 'Financial Intelligence Expert',
    specialization: 'Nigerian financial markets, CBN regulations, business intelligence',
    avatar: '/lovable-uploads/99c152aa-1d3c-4930-b657-e7b6c4797733.png', // Using existing placeholder
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-primary to-primary-glow'
  }
];

const AgentSelection: React.FC<AgentSelectionProps> = ({ onSelectAgent, className = '' }) => {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Choose Your AI Assistant
        </h2>
        <p className="text-lg text-muted-foreground">
          Select an agent to start your voice conversation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-card rounded-2xl p-8 shadow-xl border-2 border-border hover:border-accent transition-all duration-300 hover:-translate-y-2 group"
          >
            {/* Agent Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-24 h-24 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                />
                <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${agent.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                  {agent.icon}
                </div>
              </div>
            </div>

            {/* Agent Info */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {agent.name}
              </h3>
              <p className="text-lg font-semibold text-primary mb-3">
                {agent.role}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {agent.specialization}
              </p>
            </div>

            {/* Start Voice Chat Button */}
            <Button
              onClick={() => onSelectAgent(agent)}
              className={`w-full bg-gradient-to-r ${agent.color} text-white rounded-full px-8 py-3 font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
            >
              <Mic className="w-5 h-5 mr-2" />
              Talk to {agent.name}
            </Button>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          🇳🇬 Optimized for Nigerian English, Pidgin, and local business contexts
        </p>
      </div>
    </div>
  );
};

export default AgentSelection;