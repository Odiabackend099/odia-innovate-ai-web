
import React, { useRef, useEffect } from 'react';
import { Bot, Mic } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

interface VoiceChatMessagesProps {
  messages: Message[];
  currentResponse: string;
}

const VoiceChatMessages: React.FC<VoiceChatMessagesProps> = ({ messages, currentResponse }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] p-4 rounded-2xl ${
              message.type === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 shadow-md'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              {message.type === 'ai' && <Bot className="w-4 h-4 text-blue-600" />}
              {message.isVoice && <Mic className="w-4 h-4" />}
              <span className="text-sm opacity-75">
                {message.type === 'ai' ? 'ODIAAA' : 'You'}
              </span>
            </div>
            <p className="leading-relaxed">{message.content}</p>
            <div className="text-xs opacity-50 mt-2">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      
      {/* Current AI Response */}
      {currentResponse && (
        <div className="flex justify-start">
          <div className="max-w-[70%] p-4 rounded-2xl bg-white text-gray-800 shadow-md">
            <div className="flex items-center space-x-2 mb-2">
              <Bot className="w-4 h-4 text-blue-600" />
              <span className="text-sm opacity-75">ODIAAA</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
            <p className="leading-relaxed">{currentResponse}</p>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default VoiceChatMessages;
