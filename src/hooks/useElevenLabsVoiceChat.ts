import { useState, useEffect, useRef } from 'react';
import { useConversation } from '@11labs/react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

interface UseElevenLabsVoiceChatReturn {
  messages: Message[];
  isRecording: boolean;
  isConnected: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  audioLevel: number;
  currentResponse: string;
  startVoiceChat: () => Promise<void>;
  stopVoiceChat: () => Promise<void>;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
}

export const useElevenLabsVoiceChat = (isOpen: boolean): UseElevenLabsVoiceChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [currentResponse, setCurrentResponse] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();

  // Initialize ElevenLabs conversation
  const conversation = useConversation({
    onConnect: () => {
      console.log('ElevenLabs conversation connected');
      setIsConnected(true);
    },
    onDisconnect: () => {
      console.log('ElevenLabs conversation disconnected');
      setIsConnected(false);
    },
    onMessage: (message) => {
      console.log('ElevenLabs message:', message);
      
      if (message.source === 'user') {
        // Add user message to chat
        const userMessage: Message = {
          id: Date.now().toString(),
          type: 'user',
          content: message.message,
          timestamp: new Date(),
          isVoice: true
        };
        setMessages(prev => [...prev, userMessage]);
      } else if (message.source === 'ai') {
        // Add AI response to chat
        const aiMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content: message.message,
          timestamp: new Date(),
          isVoice: true
        };
        setMessages(prev => [...prev, aiMessage]);
        setCurrentResponse('');
      }
    },
    onError: (error) => {
      console.error('ElevenLabs conversation error:', error);
    }
  });

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'ai',
        content: 'Hello! I\'m your AI assistant powered by ElevenLabs. You can speak to me naturally, and I\'ll respond with voice. How can I help you today?',
        timestamp: new Date(),
        isVoice: false
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const startVoiceChat = async (): Promise<void> => {
    try {
      console.log('Starting ElevenLabs voice chat...');
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      streamRef.current = stream;

      // Set up audio context for level monitoring
      audioContextRef.current = new AudioContext({
        sampleRate: 24000,
      });

      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      source.connect(analyserRef.current);

      // Start ElevenLabs conversation with agent ID
      await conversation.startSession({
        agentId: 'UgBBYS2sOqTuMpoF3BR0' // ODIA AI Voice Processing agent
      });

      monitorAudioLevel();
      
    } catch (error) {
      console.error('Error starting voice chat:', error);
      throw error;
    }
  };

  const stopVoiceChat = async (): Promise<void> => {
    try {
      console.log('Stopping ElevenLabs voice chat...');
      
      // Stop animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Stop ElevenLabs conversation
      await conversation.endSession();

      // Clean up audio resources
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        await audioContextRef.current.close();
        audioContextRef.current = null;
      }

      analyserRef.current = null;
      setAudioLevel(0);
      setIsRecording(false);
      
    } catch (error) {
      console.error('Error stopping voice chat:', error);
    }
  };

  const startRecording = async (): Promise<void> => {
    if (!isConnected) {
      console.warn('Not connected to ElevenLabs. Starting voice chat first...');
      await startVoiceChat();
    }
    
    setIsRecording(true);
    console.log('Recording started - ElevenLabs handles this automatically');
  };

  const stopRecording = (): void => {
    setIsRecording(false);
    console.log('Recording stopped - ElevenLabs handles this automatically');
  };

  const monitorAudioLevel = (): void => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateLevel = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Calculate average amplitude
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      const normalizedLevel = average / 255;
      
      setAudioLevel(normalizedLevel);
      
      animationFrameRef.current = requestAnimationFrame(updateLevel);
    };
    
    updateLevel();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stopVoiceChat();
    };
  }, []);

  // Stop voice chat when component closes
  useEffect(() => {
    if (!isOpen && isConnected) {
      stopVoiceChat();
    }
  }, [isOpen, isConnected]);

  return {
    messages,
    isRecording,
    isConnected,
    isSpeaking: conversation.isSpeaking || false,
    isListening: isRecording,
    audioLevel,
    currentResponse,
    startVoiceChat,
    stopVoiceChat,
    startRecording,
    stopRecording,
  };
};