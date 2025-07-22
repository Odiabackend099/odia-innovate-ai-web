import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Globe, Brain, Mic, MessageSquare, Bot, Users } from 'lucide-react';
import { Button } from '../ui/button';
import VoiceAgentDemo from './VoiceAgentDemo';

const ElevenLabsHero = () => {
  const agents = [
    {
      id: 'agent-lexi',
      name: 'Agent Lexi',
      description: 'Customer Support Specialist - Handles inquiries, bookings, and support with empathy',
      voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah voice
      features: ['24/7 Availability', 'Multi-language', 'Emotional Intelligence', 'Context Aware']
    },
    {
      id: 'agent-atlas',
      name: 'Agent Atlas',
      description: 'Sales & Business Developer - Converts leads and drives revenue growth',
      voiceId: 'TX3LPaxmHKxFdv7VOQHJ', // Liam voice
      features: ['Sales Optimization', 'Lead Qualification', 'Revenue Focused', 'Persuasive Communication']
    },
    {
      id: 'agent-nova',
      name: 'Agent Nova',
      description: 'Technical Support Expert - Solves complex technical issues with precision',
      voiceId: 'cgSgspJ2msm6clMCkdW9', // Jessica voice
      features: ['Technical Expertise', 'Problem Solving', 'Documentation', 'API Integration']
    }
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '10M+', label: 'Conversations Handled' },
    { icon: <Globe className="w-6 h-6" />, value: '50+', label: 'Languages Supported' },
    { icon: <Zap className="w-6 h-6" />, value: '<200ms', label: 'Response Time' },
    { icon: <Brain className="w-6 h-6" />, value: '99.9%', label: 'Accuracy Rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Powered by ElevenLabs Voice Intelligence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              The Future of
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Voice AI Agents
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Experience hyper-realistic AI agents that understand context, emotion, and intent. 
              Built with ElevenLabs' cutting-edge voice technology for enterprise-grade conversations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg rounded-2xl font-semibold">
                <Mic className="w-5 h-5 mr-2" />
                Try Live Demo
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-2xl"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Voice Agents Showcase */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Meet Your AI Workforce
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-300 max-w-3xl mx-auto"
            >
              Each agent is specialized for specific business functions, powered by advanced 
              ElevenLabs voice models and conversational AI.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-6"
              >
                <VoiceAgentDemo
                  agentId={agent.id}
                  agentName={agent.name}
                  agentDescription={agent.description}
                  voiceId={agent.voiceId}
                />
                
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Key Capabilities</h4>
                  <div className="space-y-2">
                    {agent.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Enterprise-Grade Voice Intelligence
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'Advanced NLU',
                description: 'Deep understanding of context, intent, and emotional nuances in conversations'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Real-time Processing',
                description: 'Ultra-low latency responses with streaming voice synthesis and recognition'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Multi-language Support',
                description: 'Native-level fluency across 50+ languages with cultural awareness'
              },
              {
                icon: <Bot className="w-8 h-8" />,
                title: 'Custom Agent Training',
                description: 'Train agents on your data with custom personalities and knowledge bases'
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: 'Omnichannel Integration',
                description: 'Deploy across phone, web, mobile apps, and messaging platforms'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Team Collaboration',
                description: 'Human-AI handoff, supervision, and collaborative problem solving'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Deploy Voice AI?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Get started with our enterprise voice agents in minutes. 
              Scale from prototype to production with ElevenLabs infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg rounded-2xl font-semibold">
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-2xl"
              >
                Book Enterprise Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ElevenLabsHero;