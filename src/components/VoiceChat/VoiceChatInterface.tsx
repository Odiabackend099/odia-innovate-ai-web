
import React from 'react';
import { useSecureElevenLabsVoiceChat } from '../../hooks/useSecureElevenLabsVoiceChat';
import VoiceChatHeader from './VoiceChatHeader';
import VoiceChatMessages from './VoiceChatMessages';
import VoiceChatControls from './VoiceChatControls';

interface VoiceChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceChatInterface: React.FC<VoiceChatInterfaceProps> = ({ isOpen, onClose }) => {
  const {
    messages,
    isRecording,
    isConnected,
    isSpeaking,
    isListening,
    audioLevel,
    currentResponse,
    conversationId,
    startVoiceChat,
    stopVoiceChat,
    startRecording,
    stopRecording,
    sendTextMessage,
  } = useSecureElevenLabsVoiceChat(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex flex-col overflow-hidden">
        <VoiceChatHeader 
          isConnected={isConnected} 
          onClose={onClose}
          conversationId={conversationId}
        />
        <VoiceChatMessages 
          messages={messages} 
          currentResponse={currentResponse} 
        />
        <VoiceChatControls
          isConnected={isConnected}
          isRecording={isRecording}
          isListening={isListening}
          isSpeaking={isSpeaking}
          audioLevel={audioLevel}
          onStartVoiceChat={startVoiceChat}
          onStopVoiceChat={stopVoiceChat}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onSendTextMessage={sendTextMessage}
        />
      </div>
    </div>
  );
};

export default VoiceChatInterface;
