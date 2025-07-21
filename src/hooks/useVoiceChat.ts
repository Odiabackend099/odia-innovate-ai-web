
import { useState, useRef, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

export const useVoiceChat = (isOpen: boolean) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [currentResponse, setCurrentResponse] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'ai',
        content: "Hello! I'm ODIAAA, your AI assistant for Africa. I can help you with our AI solutions, pricing, demos, and more. You can speak to me or type your questions. How can I assist you today? 🇳🇬",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      
      // Speak welcome message
      speakText(welcomeMessage.content);
    }
  }, [isOpen]);

  const startVoiceChat = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        } 
      });
      
      streamRef.current = stream;
      
      // Set up audio context for visualization
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      
      // Start audio level monitoring
      monitorAudioLevel();
      
      setIsConnected(true);
      setIsListening(true);
      
      toast({
        title: "Voice Chat Connected! 🎤",
        description: "I'm listening. Start speaking to me in English or any African language.",
      });
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use voice chat.",
        variant: "destructive",
      });
    }
  };

  const stopVoiceChat = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    setIsConnected(false);
    setIsListening(false);
    setIsRecording(false);
    setAudioLevel(0);
    
    toast({
      title: "Voice Chat Ended",
      description: "Voice chat session has been terminated.",
    });
  };

  const startRecording = async () => {
    if (!streamRef.current) return;
    
    try {
      const mediaRecorder = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        await processVoiceInput(audioBlob);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording();
        }
      }, 10000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Error",
        description: "Failed to start recording. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const processVoiceInput = async (audioBlob: Blob) => {
    try {
      // Convert audio to base64 for processing
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        // Simulate speech-to-text processing
        const transcript = await convertSpeechToText(base64Audio);
        
        if (transcript.trim()) {
          const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: transcript,
            timestamp: new Date(),
            isVoice: true,
          };
          
          setMessages(prev => [...prev, userMessage]);
          
          // Process AI response
          await generateAIResponse(transcript);
        }
      };
      reader.readAsDataURL(audioBlob);
      
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast({
        title: "Voice Processing Error",
        description: "Failed to process your voice input. Please try again.",
        variant: "destructive",
      });
    }
  };

  const convertSpeechToText = async (audioBase64: string): Promise<string> => {
    // Simulate speech-to-text with demo responses
    const demoResponses = [
      "What services do you offer?",
      "Can you tell me about your pricing?",
      "I need help with AI solutions for my business",
      "Do you support Nigerian languages?",
      "How can I schedule a demo?",
      "What makes your AI solutions unique for Africa?",
      "Can you help with healthcare AI?",
      "I'm interested in voice automation",
    ];
    
    return demoResponses[Math.floor(Math.random() * demoResponses.length)];
  };

  const generateAIResponse = async (userInput: string) => {
    setIsSpeaking(true);
    
    // Simulate typing effect
    const response = getAIResponse(userInput);
    setCurrentResponse('');
    
    for (let i = 0; i < response.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setCurrentResponse(response.substring(0, i + 1));
    }
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setCurrentResponse('');
    setIsSpeaking(false);
    
    // Speak the response
    await speakText(response);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('service') || lowerInput.includes('what do you do')) {
      return "We offer 6 main AI solutions tailored for Africa: 🇳🇬 Voice Automation for call centers with multi-language support, 🇰🇪 Intelligent Chatbots for WhatsApp and web, 🇬🇭 African Language NLP for Yoruba, Hausa, Swahili and more, 🇿🇦 Healthcare AI for patient management, 🇪🇹 Government AI for citizen services, and 🇷🇼 Custom Solutions. Which one interests you most?";
    }
    
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('pricing')) {
      return "Our pricing is designed for African businesses! We offer flexible packages starting from $500/month for small businesses, $2000/month for medium enterprises, and custom enterprise solutions. We also provide payment plans in local currencies. Would you like me to connect you with our sales team for a personalized quote? 💰";
    }
    
    if (lowerInput.includes('demo') || lowerInput.includes('schedule') || lowerInput.includes('meeting')) {
      return "I'd love to schedule a demo for you! Our demos showcase real AI solutions working with African languages and contexts. You can book a session at demo@odia.dev or call +234-800-ODIA-AI. We offer virtual demos every weekday at 10 AM and 3 PM WAT. What time works best for you? 📅";
    }
    
    if (lowerInput.includes('language') || lowerInput.includes('nigerian') || lowerInput.includes('african')) {
      return "Yes! We specialize in African languages including Yoruba, Hausa, Igbo, Swahili, Amharic, Twi, Zulu, and 15+ others. Our AI models are trained on African linguistic patterns and cultural contexts - not just translations! We understand pidgin English, local expressions, and cultural nuances. Which languages do you need support for? 🗣️";
    }
    
    if (lowerInput.includes('healthcare') || lowerInput.includes('hospital') || lowerInput.includes('medical')) {
      return "Our Healthcare AI is transforming African healthcare! We provide: 🏥 Patient triage systems, 📋 Appointment scheduling in local languages, 🩺 Symptom checking with cultural context, 💊 Medicine information systems, and 📱 Mobile health assistants. We've helped hospitals in Lagos, Nairobi, and Accra reduce wait times by 85%. Want to see how it works?";
    }
    
    if (lowerInput.includes('government') || lowerInput.includes('citizen') || lowerInput.includes('public')) {
      return "Our Government AI solutions help African governments serve citizens better! We provide: 🏛️ 24/7 citizen service chatbots, 📋 Automated form processing, 🗣️ Multi-language support, 📊 Service analytics, and 🤝 Citizen engagement platforms. We've helped government agencies achieve 85% citizen satisfaction rates. Which government services are you looking to improve?";
    }
    
    if (lowerInput.includes('unique') || lowerInput.includes('different') || lowerInput.includes('why')) {
      return "What makes us unique is our deep African focus! 🌍 We're built BY Africans FOR Africa: Our AI understands local contexts, cultural nuances, and business practices. We're mobile-first (perfect for African internet), support local payment methods, and provide training in local languages. We don't just adapt Western AI - we build from the ground up for African needs!";
    }
    
    if (lowerInput.includes('voice') || lowerInput.includes('automation') || lowerInput.includes('call')) {
      return "Our Voice Automation is perfect for African businesses! 📞 It handles customer calls in multiple languages, understands accents and dialects, provides 24/7 support, integrates with existing systems, and reduces costs by up to 70%. Perfect for banks, telcos, and customer service centers. We support English, Pidgin, Yoruba, Hausa, Swahili, and more!";
    }
    
    return "That's a great question! I'm here to help you understand how ODIA.dev can transform your business with AI solutions built specifically for Africa. You can ask me about our services, pricing, demos, African language support, or anything else. What would you like to know more about? 🚀";
  };

  const speakText = async (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      // Try to use a more natural voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.includes('en') && 
        (voice.name.includes('Google') || voice.name.includes('Microsoft'))
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const monitorAudioLevel = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateLevel = () => {
      if (!analyserRef.current || !isConnected) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average);
      
      requestAnimationFrame(updateLevel);
    };
    
    updateLevel();
  };

  return {
    messages,
    setMessages,
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
  };
};
