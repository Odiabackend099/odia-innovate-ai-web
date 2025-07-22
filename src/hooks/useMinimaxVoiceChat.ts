import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

export const useMinimaxVoiceChat = (isOpen: boolean) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [currentResponse, setCurrentResponse] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Hello! I\'m ODIAAA, your AI assistant. You can speak to me by clicking the microphone button or typing your message.',
        timestamp: new Date(),
        isVoice: false
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const startVoiceChat = useCallback(async () => {
    try {
      console.log('Starting voice chat...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      setIsConnected(true);
      setIsListening(true);
      monitorAudioLevel();
      
      console.log('Voice chat connected successfully');
    } catch (error) {
      console.error('Error starting voice chat:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  }, []);

  const stopVoiceChat = useCallback(() => {
    console.log('Stopping voice chat...');
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }
    
    if (analyserRef.current) {
      analyserRef.current = null;
    }

    setIsConnected(false);
    setIsListening(false);
    setAudioLevel(0);
  }, []);

  const startRecording = useCallback(async () => {
    if (!isConnected) {
      await startVoiceChat();
    }

    try {
      console.log('Starting recording...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      audioChunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        processVoiceInput(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, [isConnected, startVoiceChat]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      console.log('Stopping recording...');
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const processVoiceInput = useCallback(async (audioBlob: Blob) => {
    try {
      console.log('Processing voice input...');
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (reader.result) {
          const base64Audio = (reader.result as string).split(',')[1];
          
          // Convert speech to text (placeholder - you can integrate with speech-to-text service)
          const transcript = await convertSpeechToText(base64Audio);
          
          // Add user message
          const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: transcript,
            timestamp: new Date(),
            isVoice: true
          };
          
          setMessages(prev => [...prev, userMessage]);
          
          // Generate AI response
          await generateAIResponse(transcript);
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error processing voice input:', error);
    }
  }, []);

  const convertSpeechToText = async (audioBase64: string): Promise<string> => {
    // This is a placeholder. In a real implementation, you would use a speech-to-text service
    // For now, return a demo response
    return "I just spoke to you via voice";
  };

  const generateAIResponse = useCallback(async (userInput: string) => {
    try {
      setCurrentResponse('');
      
      // Get AI response text
      const aiResponseText = getAIResponse(userInput);
      
      // Simulate typing effect
      for (let i = 0; i <= aiResponseText.length; i++) {
        setCurrentResponse(aiResponseText.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      
      // Add AI message
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponseText,
        timestamp: new Date(),
        isVoice: false
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setCurrentResponse('');
      
      // Generate and play speech using MiniMax
      await speakTextWithMinimax(aiResponseText);
      
    } catch (error) {
      console.error('Error generating AI response:', error);
    }
  }, []);

  const speakTextWithMinimax = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true);
      console.log('Generating speech with MiniMax for:', text.substring(0, 50) + '...');
      
      const { data, error } = await supabase.functions.invoke('minimax-tts', {
        body: { text, voice_id: 'female-shaonv' }
      });

      if (error) {
        console.error('Error calling MiniMax TTS:', error);
        return;
      }

      if (data?.audioUrl) {
        // Stop any currently playing audio
        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
          currentAudioRef.current = null;
        }

        // Play the new audio
        const audio = new Audio(data.audioUrl);
        currentAudioRef.current = audio;
        
        audio.onended = () => {
          setIsSpeaking(false);
          currentAudioRef.current = null;
        };
        
        audio.onerror = (error) => {
          console.error('Error playing audio:', error);
          setIsSpeaking(false);
          currentAudioRef.current = null;
        };

        await audio.play();
        console.log('Audio playback started');
      }
    } catch (error) {
      console.error('Error with MiniMax TTS:', error);
      setIsSpeaking(false);
    }
  }, []);

  const getAIResponse = (input: string): string => {
    const responses = [
      "I understand your message. How can I help you further with your request?",
      "That's an interesting point. Let me provide you with some insights on that topic.",
      "Thank you for sharing that with me. Based on what you've said, I'd recommend the following approach.",
      "I see what you're looking for. Here's my perspective on this matter.",
      "That's a great question! Let me break this down for you in a helpful way."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const monitorAudioLevel = useCallback(() => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average);
      
      animationRef.current = requestAnimationFrame(monitorAudioLevel);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVoiceChat();
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
    };
  }, [stopVoiceChat]);

  return {
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
    stopRecording
  };
};