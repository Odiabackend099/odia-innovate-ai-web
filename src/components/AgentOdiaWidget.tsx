
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import VoiceRecorder from './VoiceRecorder';
import LanguageSelector from './LanguageSelector';
import ChatMessage from './ChatMessage';
import { useChat } from '../hooks/useChat';
import { Language } from '../types/language';

interface AgentOdiaWidgetProps {
  isEmbedded?: boolean;
  onClose?: () => void;
}

const AgentOdiaWidget: React.FC<AgentOdiaWidgetProps> = ({ isEmbedded = false, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'en',
    name: 'English',
    flag: '🇳🇬'
  });
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [textInput, setTextInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading, isTyping, sendMessage } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string, type: 'text' | 'voice' = 'text') => {
    if (!content.trim()) return;
    
    await sendMessage({
      message: content,
      language: selectedLanguage.code,
      message_type: type,
    });
    
    if (type === 'text') {
      setTextInput('');
    }
  };

  const handleVoiceComplete = (transcript: string, audioBlob: Blob) => {
    handleSendMessage(transcript, 'voice');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(textInput);
    }
  };

  if (!isOpen && !isEmbedded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open Agent Odia Assistant"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  const widgetContent = (
    <div className={`bg-[#ECE5DD] flex flex-col h-full ${isMinimized ? 'h-16' : 'h-[600px]'} transition-all duration-300`}>
      {/* Header */}
      <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#128C7E] font-bold text-sm">AO</span>
          </div>
          <div>
            <h3 className="font-semibold">Agent Odia</h3>
            <p className="text-xs opacity-90">AI Assistant for Africa</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
          
          {!isEmbedded && (
            <>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onClose?.();
                }}
                className="p-1 hover:bg-white/20 rounded"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-600 py-8">
                <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <p className="text-lg font-medium mb-2">Welcome to Agent Odia!</p>
                <p className="text-sm">Your AI assistant for Africa. How can I help you today?</p>
              </div>
            )}
            
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-2 max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white p-4 border-t">
            <div className="flex items-center space-x-2 mb-3">
              <button
                onClick={() => setInputMode('text')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  inputMode === 'text'
                    ? 'bg-[#25D366] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setInputMode('voice')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  inputMode === 'voice'
                    ? 'bg-[#25D366] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Voice
              </button>
            </div>

            {inputMode === 'text' ? (
              <div className="flex items-center space-x-2">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Type your message in ${selectedLanguage.name}...`}
                  className="flex-1 border rounded-2xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#25D366] max-h-20"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage(textInput)}
                  disabled={!textInput.trim() || isLoading}
                  className="bg-[#25D366] text-white p-2 rounded-full hover:bg-[#128C7E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            ) : (
              <VoiceRecorder
                onRecordingComplete={handleVoiceComplete}
                language={selectedLanguage}
                disabled={isLoading}
              />
            )}
          </div>
        </>
      )}
    </div>
  );

  if (isEmbedded) {
    return widgetContent;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="w-[380px] bg-white rounded-lg shadow-2xl overflow-hidden">
        {widgetContent}
      </div>
    </div>
  );
};

export default AgentOdiaWidget;
