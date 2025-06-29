
import { useState, useCallback, useRef } from 'react';
import { ChatMessage, SendMessageRequest } from '../types/chat';
import { sendMessage as sendMessageAPI } from '../utils/api';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const sessionIdRef = useRef<string>(generateSessionId());

  function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  const sendMessage = useCallback(async (request: SendMessageRequest) => {
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      content: request.message,
      sender: 'user',
      type: request.message_type || 'text',
      timestamp: new Date(),
      status: 'sending',
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Update message status to sent
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' } 
            : msg
        )
      );

      // Show typing indicator
      setIsTyping(true);

      // Send to API
      const response = await sendMessageAPI({
        ...request,
        session_id: sessionIdRef.current,
      });

      // Update message status to delivered
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'delivered' } 
            : msg
        )
      );

      // Add AI response
      const aiMessage: ChatMessage = {
        id: `msg_${Date.now()}_ai`,
        content: response.reply,
        sender: 'ai',
        type: response.audio_url ? 'voice' : 'text',
        audioUrl: response.audio_url,
        timestamp: new Date(),
        status: 'delivered',
      };

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, aiMessage]);
        
        // Mark user message as read
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessage.id 
              ? { ...msg, status: 'read' } 
              : msg
          )
        );
      }, 1000 + Math.random() * 2000); // Simulate realistic response time

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Update message status to failed
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'failed' } 
            : msg
        )
      );

      // Add error message
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        type: 'text',
        timestamp: new Date(),
        status: 'delivered',
      };

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, errorMessage]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    sessionIdRef.current = generateSessionId();
  }, []);

  return {
    messages,
    isLoading,
    isTyping,
    sendMessage,
    clearMessages,
    sessionId: sessionIdRef.current,
  };
};
