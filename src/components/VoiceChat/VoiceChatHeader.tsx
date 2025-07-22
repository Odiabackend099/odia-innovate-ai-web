
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '../ui/button';

interface VoiceChatHeaderProps {
  isConnected: boolean;
  onClose: () => void;
}

const VoiceChatHeader: React.FC<VoiceChatHeaderProps> = ({ isConnected, onClose }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">ODIA AI Voice Chat</h2>
          <p className="text-blue-100">Powered by ElevenLabs • Professional AI Assistant 🇳🇬</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
        
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          ✕
        </Button>
      </div>
    </div>
  );
};

export default VoiceChatHeader;
