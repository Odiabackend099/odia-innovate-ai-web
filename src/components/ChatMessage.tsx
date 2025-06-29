
import React, { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const formatTime = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const playAudio = async (audioUrl: string) => {
    if (audioElement) {
      audioElement.pause();
      setAudioElement(null);
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(audioUrl);
    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onended = () => {
      setIsPlaying(false);
      setAudioElement(null);
    };
    
    setAudioElement(audio);
    await audio.play();
  };

  const isUser = message.sender === 'user';
  const messageAlignment = isUser ? 'justify-end' : 'justify-start';
  const messageBg = isUser ? 'bg-[#DCF8C6]' : 'bg-white';
  const messageColor = isUser ? 'text-gray-800' : 'text-gray-800';

  return (
    <div className={`flex ${messageAlignment} mb-2`}>
      <div className={`max-w-xs lg:max-w-md ${messageBg} rounded-2xl px-4 py-2 shadow-sm ${messageColor}`}>
        {message.type === 'voice' && message.audioUrl ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => playAudio(message.audioUrl!)}
                className="bg-[#25D366] text-white p-2 rounded-full hover:bg-[#128C7E] transition-colors flex-shrink-0"
                aria-label={isPlaying ? "Pause voice message" : "Play voice message"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  {/* Voice wave visualization */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className={`bg-[#25D366] rounded-full transition-all duration-300 ${
                        isPlaying ? 'animate-pulse' : ''
                      }`}
                      style={{
                        width: '3px',
                        height: `${Math.random() * 20 + 8}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Voice message
                </div>
              </div>
              
              <Volume2 size={14} className="text-gray-400" />
            </div>
            
            {message.content && (
              <div className="text-sm mt-2 p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-500 mb-1">Transcript:</div>
                {message.content}
              </div>
            )}
          </div>
        ) : (
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </div>
          
          {isUser && (
            <div className="flex space-x-1">
              <div className={`w-1 h-1 rounded-full ${
                message.status === 'sent' ? 'bg-gray-400' :
                message.status === 'delivered' ? 'bg-gray-400' :
                message.status === 'read' ? 'bg-[#25D366]' : 'bg-gray-300'
              }`} />
              <div className={`w-1 h-1 rounded-full ${
                message.status === 'delivered' || message.status === 'read' ? 'bg-gray-400' :
                message.status === 'read' ? 'bg-[#25D366]' : 'bg-gray-300'
              }`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
