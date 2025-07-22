
import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Phone, PhoneOff, Send, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface VoiceChatControlsProps {
  isConnected: boolean;
  isRecording: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  audioLevel: number;
  onStartVoiceChat: () => void;
  onStopVoiceChat: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSendTextMessage: (message: string) => void;
}

const VoiceChatControls: React.FC<VoiceChatControlsProps> = ({
  isConnected,
  isRecording,
  isListening,
  isSpeaking,
  audioLevel,
  onStartVoiceChat,
  onStopVoiceChat,
  onStartRecording,
  onStopRecording,
  onSendTextMessage,
}) => {
  const [textMessage, setTextMessage] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);

  const handleSendText = () => {
    if (textMessage.trim()) {
      onSendTextMessage(textMessage.trim());
      setTextMessage('');
      setShowTextInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendText();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-6">
      {!isConnected ? (
        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={onStartVoiceChat}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            Start Secure Voice Chat
          </Button>
          <p className="text-sm text-gray-600">
            🔒 Secure connection • 🎤 Hands-free detection • 🌍 Multi-language support
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Voice Controls */}
          <div className="flex items-center justify-center space-x-6">
            <Button
              onClick={onStopVoiceChat}
              variant="destructive"
              className="px-6 py-3 rounded-xl"
            >
              <PhoneOff className="w-5 h-5 mr-2" />
              End Call
            </Button>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording 
                    ? 'bg-red-600 animate-pulse shadow-lg shadow-red-500/50' 
                    : isListening 
                    ? 'bg-blue-600 animate-pulse shadow-lg shadow-blue-500/50'
                    : 'bg-gray-600'
                }`}>
                  {isRecording || isListening ? (
                    <Mic className="w-6 h-6 text-white" />
                  ) : (
                    <MicOff className="w-6 h-6 text-white" />
                  )}
                </div>
                
                {/* Audio Level Ring */}
                <div 
                  className="absolute inset-0 rounded-full border-4 border-green-500 opacity-70 transition-all duration-100"
                  style={{
                    transform: `scale(${1 + audioLevel * 0.5})`,
                    opacity: audioLevel > 0.1 ? 0.7 : 0,
                  }}
                />
              </div>
              
              {/* Audio Level Bars */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-6 rounded-full transition-all duration-100 ${
                      audioLevel * 100 > i * 8 ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-sm text-gray-600 font-medium">
                {isRecording ? '🔴 Recording...' : 
                 isListening ? '👂 Listening...' : 
                 '🤖 Hands-Free Active'}
              </p>
            </div>
            
            <div className="flex flex-col items-center space-x-2">
              <Button
                onClick={() => setShowTextInput(!showTextInput)}
                variant="outline"
                className="px-4 py-2 rounded-xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Text Mode
              </Button>
              
              <div className="flex items-center space-x-2 mt-2">
                <Volume2 className="w-5 h-5 text-gray-600" />
                <div className="flex items-center space-x-1">
                  {isSpeaking && (
                    <>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Text Input */}
          {showTextInput && (
            <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-xl">
              <Input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                onClick={handleSendText}
                disabled={!textMessage.trim()}
                className="px-4 py-2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          🎤 Speak naturally in English, Pidgin, Yoruba, Hausa, or Swahili
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Voice activity automatically detected • No button pressing required
        </p>
      </div>
    </div>
  );
};

export default VoiceChatControls;
