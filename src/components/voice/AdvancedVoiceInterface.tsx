import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useConversation } from '@11labs/react';
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, Settings, User, Bot } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

const AdvancedVoiceInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState('agent-lexi');
  const [audioLevel, setAudioLevel] = useState(0);

  const agents = [
    { id: 'agent-lexi', name: 'Lexi', role: 'Customer Support', color: 'bg-blue-500' },
    { id: 'agent-atlas', name: 'Atlas', role: 'Sales Expert', color: 'bg-green-500' },
    { id: 'agent-nova', name: 'Nova', role: 'Technical Support', color: 'bg-purple-500' }
  ];

  const conversation = useConversation({
    onConnect: () => {
      setIsConnected(true);
      addMessage('system', 'Connected to voice agent. How can I help you today?');
    },
    onDisconnect: () => {
      setIsConnected(false);
      setIsListening(false);
      setIsSpeaking(false);
      addMessage('system', 'Voice conversation ended.');
    },
    onMessage: (message: any) => {
      console.log('Voice message:', message);
      
      if (message.type === 'user_transcript') {
        addMessage('user', message.text);
      } else if (message.type === 'agent_response') {
        addMessage('agent', message.text);
        setIsSpeaking(true);
      } else if (message.type === 'agent_response_finished') {
        setIsSpeaking(false);
      } else if (message.type === 'user_speech_started') {
        setIsListening(true);
      } else if (message.type === 'user_speech_finished') {
        setIsListening(false);
      }
    },
    onError: (error: any) => {
      console.error('Voice conversation error:', error);
      addMessage('system', `Error: ${error?.message || 'Unknown error'}`);
    }
  });

  const addMessage = (type: 'user' | 'agent' | 'system', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: type === 'system' ? 'agent' : type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const startConversation = async () => {
    try {
      const id = await conversation.startSession({ agentId: selectedAgent });
      setConversationId(id);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      addMessage('system', 'Failed to start voice conversation. Please try again.');
    }
  };

  const endConversation = async () => {
    await conversation.endSession();
    setConversationId(null);
  };

  // Simulate audio level visualization
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening || isSpeaking) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
    } else {
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isListening, isSpeaking]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ElevenLabs Voice Agent Studio
        </h1>
        <p className="text-muted-foreground">
          Experience next-generation conversational AI with hyper-realistic voice synthesis
        </p>
      </div>

      {/* Agent Selector */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Select AI Agent</h3>
        <div className="grid grid-cols-3 gap-4">
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedAgent(agent.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedAgent === agent.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full ${agent.color} mb-3 flex items-center justify-center`}>
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold">{agent.name}</h4>
              <p className="text-sm text-muted-foreground">{agent.role}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Voice Interface */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* Status Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="font-medium">
                {!isConnected ? 'Disconnected' : 
                 isListening ? 'Listening...' :
                 isSpeaking ? 'Agent Speaking...' : 'Ready to Talk'}
              </span>
              {conversationId && (
                <Badge variant="outline" className="text-xs">
                  Session: {conversationId.slice(0, 8)}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Audio Visualizer */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8">
            <div className="flex items-center justify-center space-x-1 h-24">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full"
                  animate={{
                    height: (isListening || isSpeaking) 
                      ? `${Math.random() * audioLevel + 10}%`
                      : '20%',
                    opacity: (isListening || isSpeaking) ? 1 : 0.3
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isConnected ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={startConversation}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-2xl"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Start Voice Call
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={endConversation}
                  variant="destructive"
                  size="lg"
                  className="px-8 py-4 rounded-2xl"
                >
                  <PhoneOff className="w-5 h-5 mr-2" />
                  End Call
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </Card>

      {/* Conversation History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Conversation History</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Mic className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation to see messages here</p>
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {message.type === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdvancedVoiceInterface;