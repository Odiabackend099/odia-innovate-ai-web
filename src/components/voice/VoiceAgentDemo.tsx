import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, Zap, Brain, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { useConversation } from '@11labs/react';

interface VoiceAgentDemoProps {
  agentId: string;
  agentName: string;
  agentDescription: string;
  voiceId: string;
}

const VoiceAgentDemo: React.FC<VoiceAgentDemoProps> = ({
  agentId,
  agentName,
  agentDescription,
  voiceId
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs');
      setIsConnected(true);
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs');
      setIsConnected(false);
      setIsListening(false);
      setIsSpeaking(false);
    },
    onMessage: (message: any) => {
      console.log('Message received:', message);
      if (message.source === 'ai') {
        setIsSpeaking(true);
        setIsListening(false);
      } else if (message.source === 'user') {
        setIsListening(true);
        setIsSpeaking(false);
      }
    },
    onError: (error: any) => {
      console.error('ElevenLabs error:', error);
    }
  });

  const startConversation = async () => {
    try {
      const id = await conversation.startSession({ agentId });
      setConversationId(id);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const endConversation = async () => {
    await conversation.endSession();
    setConversationId(null);
  };

  // Simulate audio level animation
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
      
      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <motion.div
          animate={{ 
            scale: isSpeaking ? [1, 1.1, 1] : 1,
            rotate: isListening ? [0, 5, -5, 0] : 0
          }}
          transition={{ duration: 0.5, repeat: isSpeaking ? Infinity : 0 }}
          className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center"
        >
          <Brain className="w-10 h-10" />
        </motion.div>
        
        <h3 className="text-2xl font-bold mb-2">{agentName}</h3>
        <p className="text-slate-300 text-sm mb-4">{agentDescription}</p>
        
        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-2 text-xs">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
          <span>
            {!isConnected ? 'Disconnected' : 
             isListening ? 'Listening...' :
             isSpeaking ? 'Speaking...' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Audio Visualizer */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center justify-center space-x-1 h-16">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full"
              animate={{
                height: (isListening || isSpeaking) 
                  ? `${Math.random() * audioLevel + 10}%`
                  : '10%'
              }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex justify-center space-x-4">
        {!isConnected ? (
          <Button
            onClick={startConversation}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-2xl font-semibold"
          >
            <Mic className="w-5 h-5 mr-2" />
            Start Conversation
          </Button>
        ) : (
          <Button
            onClick={endConversation}
            variant="destructive"
            className="px-8 py-3 rounded-2xl font-semibold"
          >
            <MicOff className="w-5 h-5 mr-2" />
            End Call
          </Button>
        )}
        
        <Button
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 px-4 py-3 rounded-2xl"
        >
          {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </div>

      {/* Conversation ID */}
      {conversationId && (
        <div className="relative z-10 mt-4 text-center">
          <p className="text-xs text-slate-400">
            Session: {conversationId.slice(0, 8)}...
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default VoiceAgentDemo;