import React, { useState } from 'react';
import { X, Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '../ui/button';
import VoiceWaveform from './VoiceWaveform';
import { useVoiceChat } from '../../hooks/useVoiceChat';

interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  avatar: string;
  color: string;
}

interface VoiceInterfaceProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ agent, isOpen, onClose }) => {
  const {
    messages,
    isRecording,
    isConnected,
    isSpeaking,
    isListening,
    audioLevel,
    currentResponse,
    startVoiceChat,
    stopVoiceChat,
    startRecording,
    stopRecording,
  } = useVoiceChat(isOpen, agent);

  const [hasStarted, setHasStarted] = useState(false);

  const handleStartVoiceChat = async () => {
    await startVoiceChat();
    setHasStarted(true);
  };

  const handleEndVoiceChat = () => {
    stopVoiceChat();
    setHasStarted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary/95 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <h2 className="text-xl font-bold">Voice Chat</h2>
            <p className="text-white/80 text-sm">with {agent.name}</p>
          </div>
          <Button
            onClick={handleEndVoiceChat}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Agent Avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src={agent.avatar}
              alt={agent.name}
              className={`w-32 h-32 rounded-full shadow-2xl transition-all duration-300 ${
                isSpeaking ? 'speaking-glow' : ''
              }`}
            />
            {isConnected && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-pulse">
                <Volume2 className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="text-center mb-8">
          {!hasStarted && (
            <p className="text-lg text-white/80">
              Ready to start voice conversation
            </p>
          )}
          {hasStarted && !isConnected && (
            <p className="text-lg text-white/80">
              Connecting to microphone...
            </p>
          )}
          {isConnected && !isRecording && !isSpeaking && (
            <p className="text-lg text-white/80">
              I'm listening. Press and hold to speak.
            </p>
          )}
          {isRecording && (
            <p className="text-lg text-white/80">
              Listening to your voice...
            </p>
          )}
          {isSpeaking && (
            <p className="text-lg text-white/80">
              {agent.name} is speaking...
            </p>
          )}
          {currentResponse && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg text-white">
              <p className="text-sm">{currentResponse}</p>
            </div>
          )}
        </div>

        {/* Waveform */}
        <div className="flex justify-center mb-8">
          <VoiceWaveform isActive={isRecording || isSpeaking} />
        </div>

        {/* Voice Controls */}
        <div className="flex gap-4 items-center justify-center">
          {!hasStarted ? (
            <Button
              onClick={handleStartVoiceChat}
              className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Mic className="w-6 h-6 mr-2" />
              Start Voice Chat
            </Button>
          ) : (
            <>
              {!isConnected ? (
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Button
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    className={`
                      w-20 h-20 rounded-full text-2xl transition-all duration-200
                      ${isRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse scale-110' 
                        : 'bg-accent hover:bg-accent/90 hover:scale-110'
                      }
                      text-white shadow-lg
                    `}
                    disabled={isSpeaking}
                  >
                    {isRecording ? <MicOff /> : <Mic />}
                  </Button>
                  
                  <Button
                    onClick={handleEndVoiceChat}
                    variant="outline"
                    className="px-6 py-3 text-white border-white/50 hover:bg-white/10"
                  >
                    End Call
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-sm text-white/60">
            🇳🇬 Speak in English, Pidgin, or any Nigerian language
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;