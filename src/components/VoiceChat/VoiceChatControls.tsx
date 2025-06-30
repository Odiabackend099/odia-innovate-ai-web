
import React from 'react';
import { Mic, MicOff, Volume2, Phone, PhoneOff } from 'lucide-react';
import { Button } from '../ui/button';

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
}) => {
  return (
    <div className="bg-white border-t border-gray-200 p-6">
      <div className="flex items-center justify-center space-x-6">
        {!isConnected ? (
          <Button
            onClick={onStartVoiceChat}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            Start Voice Chat
          </Button>
        ) : (
          <>
            <Button
              onClick={onStopVoiceChat}
              variant="destructive"
              className="px-6 py-3 rounded-xl"
            >
              <PhoneOff className="w-5 h-5 mr-2" />
              End Call
            </Button>
            
            <div className="flex flex-col items-center space-y-2">
              <Button
                onClick={isRecording ? onStopRecording : onStartRecording}
                className={`w-16 h-16 rounded-full ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>
              
              {/* Audio Level Indicator */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-4 rounded-full transition-all duration-100 ${
                      audioLevel > i * 25 ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-sm text-gray-600">
                {isRecording ? 'Recording...' : isListening ? 'Listening...' : 'Tap to speak'}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
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
          </>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          🎤 Speak in English, Pidgin, Yoruba, Hausa, or Swahili
        </p>
      </div>
    </div>
  );
};

export default VoiceChatControls;
