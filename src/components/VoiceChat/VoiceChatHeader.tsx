
import React from 'react';
import { Bot, Shield, Zap } from 'lucide-react';
import { Button } from '../ui/button';

interface VoiceChatHeaderProps {
  isConnected: boolean;
  onClose: () => void;
  conversationId?: string | null;
}

const VoiceChatHeader: React.FC<VoiceChatHeaderProps> = ({ 
  isConnected, 
  onClose, 
  conversationId 
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <span>ODIA AI Voice Chat</span>
            <Shield className="w-5 h-5 text-green-400" />
          </h2>
          <p className="text-blue-100 flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Secure ElevenLabs • Hands-Free Intelligence • Multi-Language 🇳🇬</span>
          </p>
          {conversationId && (
            <p className="text-xs text-blue-200 mt-1">
              Session: {conversationId.slice(0, 8)}...
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm font-medium">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
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
