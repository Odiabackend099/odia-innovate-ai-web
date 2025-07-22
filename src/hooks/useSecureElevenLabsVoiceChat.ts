
import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../integrations/supabase/client';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  transcription?: string;
}

interface UseSecureElevenLabsVoiceChatReturn {
  messages: Message[];
  isRecording: boolean;
  isConnected: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  audioLevel: number;
  currentResponse: string;
  conversationId: string | null;
  startVoiceChat: () => Promise<void>;
  stopVoiceChat: () => Promise<void>;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  sendTextMessage: (message: string) => Promise<void>;
}

export const useSecureElevenLabsVoiceChat = (isOpen: boolean): UseSecureElevenLabsVoiceChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [currentResponse, setCurrentResponse] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  const websocketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();
  const audioChunksRef = useRef<Blob[]>([]);
  const silenceTimeoutRef = useRef<NodeJS.Timeout>();
  const isRecordingRef = useRef(false);

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'ai',
        content: 'Hello! I\'m your ODIA AI assistant with professional voice capabilities. I can understand and respond in multiple African languages including English, Pidgin, Yoruba, Hausa, and Swahili. How can I help you today?',
        timestamp: new Date(),
        isVoice: false
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const startVoiceChat = async (): Promise<void> => {
    try {
      console.log('Starting secure ElevenLabs voice chat...');
      
      // Create conversation session
      const { data: conversationData, error: convError } = await supabase.functions.invoke('elevenlabs-voice-chat', {
        body: {
          action: 'create_conversation',
          data: {
            userId: 'anonymous',
            sessionId: Date.now().toString(),
          }
        }
      });

      if (convError) throw convError;
      
      setConversationId(conversationData.conversation.id);

      // Get signed URL for ElevenLabs
      const { data: urlData, error: urlError } = await supabase.functions.invoke('elevenlabs-voice-chat', {
        body: {
          action: 'get_signed_url',
          data: { agentId: 'UgBBYS2sOqTuMpoF3BR0' }
        }
      });

      if (urlError) throw urlError;

      // Set up WebSocket connection
      websocketRef.current = new WebSocket(urlData.signedUrl);
      
      websocketRef.current.onopen = () => {
        console.log('ElevenLabs WebSocket connected');
        setIsConnected(true);
      };

      websocketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      };

      websocketRef.current.onclose = () => {
        console.log('ElevenLabs WebSocket disconnected');
        setIsConnected(false);
      };

      websocketRef.current.onerror = (error) => {
        console.error('ElevenLabs WebSocket error:', error);
        setIsConnected(false);
      };

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
      await setupAudioProcessing(stream);
      
    } catch (error) {
      console.error('Error starting voice chat:', error);
      throw error;
    }
  };

  const setupAudioProcessing = async (stream: MediaStream) => {
    // Set up audio context for level monitoring
    audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    const source = audioContextRef.current.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;
    
    source.connect(analyserRef.current);

    // Set up media recorder for voice activity detection
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus',
    });

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = async () => {
      if (audioChunksRef.current.length > 0) {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudioBlob(audioBlob);
        audioChunksRef.current = [];
      }
    };

    monitorAudioLevel();
    startVoiceActivityDetection();
  };

  const startVoiceActivityDetection = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    const SILENCE_THRESHOLD = 25;
    const SILENCE_DURATION = 1500; // 1.5 seconds of silence

    const detectVoiceActivity = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

      if (average > SILENCE_THRESHOLD) {
        // Voice detected
        if (!isRecordingRef.current) {
          startRecording();
        }
        // Reset silence timeout
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }
        silenceTimeoutRef.current = setTimeout(() => {
          if (isRecordingRef.current) {
            stopRecording();
          }
        }, SILENCE_DURATION);
      }

      if (isConnected) {
        requestAnimationFrame(detectVoiceActivity);
      }
    };

    detectVoiceActivity();
  };

  const startRecording = async (): Promise<void> => {
    if (!mediaRecorderRef.current || isRecordingRef.current) return;
    
    isRecordingRef.current = true;
    setIsRecording(true);
    setIsListening(true);
    
    audioChunksRef.current = [];
    mediaRecorderRef.current.start();
    
    console.log('Started recording with hands-free detection');
  };

  const stopRecording = (): void => {
    if (!mediaRecorderRef.current || !isRecordingRef.current) return;
    
    isRecordingRef.current = false;
    setIsRecording(false);
    setIsListening(false);
    
    mediaRecorderRef.current.stop();
    
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }
    
    console.log('Stopped recording');
  };

  const processAudioBlob = async (audioBlob: Blob) => {
    if (!conversationId) return;

    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        // Process audio through our secure endpoint
        const { data, error } = await supabase.functions.invoke('elevenlabs-voice-chat', {
          body: {
            action: 'process_audio',
            data: {
              audioData: base64Audio,
              conversationId,
              language: 'en'
            }
          }
        });

        if (error) throw error;

        // Send transcription to ElevenLabs
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
          websocketRef.current.send(JSON.stringify({
            user_audio_chunk: base64Audio
          }));
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error processing audio:', error);
    }
  };

  const handleWebSocketMessage = (data: any) => {
    console.log('WebSocket message:', data);
    
    if (data.type === 'user_transcript') {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: data.user_transcript,
        timestamp: new Date(),
        isVoice: true
      };
      setMessages(prev => [...prev, userMessage]);
    } else if (data.type === 'agent_response') {
      // Add AI response
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: data.agent_response,
        timestamp: new Date(),
        isVoice: true
      };
      setMessages(prev => [...prev, aiMessage]);
      setCurrentResponse('');
    } else if (data.type === 'agent_response_chunk') {
      // Update current response
      setCurrentResponse(prev => prev + data.chunk);
    } else if (data.type === 'audio_stream') {
      // Handle audio playback
      setIsSpeaking(true);
      playAudioChunk(data.audio_data);
    } else if (data.type === 'audio_stream_end') {
      setIsSpeaking(false);
    }
  };

  const playAudioChunk = (audioData: string) => {
    try {
      const audioBlob = new Blob([Uint8Array.from(atob(audioData), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const monitorAudioLevel = (): void => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateLevel = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      const normalizedLevel = average / 255;
      
      setAudioLevel(normalizedLevel);
      
      if (isConnected) {
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      }
    };
    
    updateLevel();
  };

  const sendTextMessage = async (message: string): Promise<void> => {
    if (!conversationId) return;

    try {
      // Store message
      await supabase.functions.invoke('elevenlabs-voice-chat', {
        body: {
          action: 'send_message',
          data: {
            conversationId,
            message,
            messageType: 'text'
          }
        }
      });

      // Add to UI
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: message,
        timestamp: new Date(),
        isVoice: false
      };
      setMessages(prev => [...prev, userMessage]);

      // Send to ElevenLabs
      if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
        websocketRef.current.send(JSON.stringify({
          user_message: message
        }));
      }
    } catch (error) {
      console.error('Error sending text message:', error);
    }
  };

  const stopVoiceChat = async (): Promise<void> => {
    try {
      console.log('Stopping secure ElevenLabs voice chat...');
      
      // Stop recording
      if (isRecordingRef.current) {
        stopRecording();
      }

      // Stop animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Close WebSocket
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }

      // Clean up audio resources
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        await audioContextRef.current.close();
        audioContextRef.current = null;
      }

      // Clear timeouts
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }

      analyserRef.current = null;
      setAudioLevel(0);
      setIsRecording(false);
      setIsListening(false);
      setIsSpeaking(false);
      setIsConnected(false);
      setCurrentResponse('');
      
    } catch (error) {
      console.error('Error stopping voice chat:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
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
  };
};
