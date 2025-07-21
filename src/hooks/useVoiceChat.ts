
import { useState, useRef, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  agent?: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string;
}

export const useVoiceChat = (isOpen: boolean, agent?: Agent) => {
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

  // Initialize welcome message based on agent
  useEffect(() => {
    if (isOpen && messages.length === 0 && agent) {
      const getWelcomeMessage = (agentName: string, role: string) => {
        if (agentName === 'Lexi') {
          return `Hello! I'm Lexi, your Nigerian Customer Service Specialist. I'm here to help with customer support, order management, and service inquiries. I speak English, Pidgin, and understand Nigerian business culture. How can I assist you today? 🇳🇬`;
        } else if (agentName === 'Atlas') {
          return `Good day! I'm Atlas, your Financial Intelligence Expert for Nigeria. I specialize in Nigerian financial markets, CBN regulations, and business intelligence. I can help with financial insights, market analysis, and regulatory guidance. Wetin you wan know about? 🇳🇬💰`;
        }
        return `Hello! I'm ${agentName}, your ${role}. I understand Nigerian English, Pidgin, and local business contexts. How can I help you today? 🇳🇬`;
      };

      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'ai',
        content: getWelcomeMessage(agent.name, agent.role),
        timestamp: new Date(),
        agent: agent.id,
      };
      setMessages([welcomeMessage]);
      
      // Speak welcome message
      speakText(welcomeMessage.content);
    }
  }, [isOpen, agent]);

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
        title: `Connected to ${agent?.name || 'AI Agent'}! 🎤`,
        description: "I'm listening. Speak in English, Pidgin, or any Nigerian language.",
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
            agent: agent?.id,
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
    // Nigerian-context demo responses based on agent
    const lexiResponses = [
      "I need help with customer support",
      "How can I track my order?",
      "What are your business hours?",
      "I want to make a complaint",
      "Can you help me with my account?",
      "What payment methods do you accept?",
      "How far with my delivery?",
      "I need customer service in Yoruba",
    ];

    const atlasResponses = [
      "What's the current USD to Naira rate?",
      "Tell me about CBN policies",
      "How is the Nigerian stock market performing?",
      "I need financial analysis for my business",
      "What are the banking regulations in Nigeria?",
      "Help me understand investment opportunities",
      "How can I secure business funding?",
      "What about cryptocurrency regulations in Nigeria?",
    ];

    const responses = agent?.id === 'lexi' ? lexiResponses : atlasResponses;
    return responses[Math.floor(Math.random() * responses.length)];
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
      agent: agent?.id,
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setCurrentResponse('');
    setIsSpeaking(false);
    
    // Speak the response
    await speakText(response);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Agent-specific responses
    if (agent?.id === 'lexi') {
      return getLexiResponse(lowerInput);
    } else if (agent?.id === 'atlas') {
      return getAtlasResponse(lowerInput);
    }
    
    // Default responses
    if (lowerInput.includes('service') || lowerInput.includes('what do you do')) {
      return "We offer AI solutions tailored for Nigerian businesses. Would you like to speak with Lexi for customer service or Atlas for financial intelligence?";
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
    
    return "That's a great question! I'm here to help you with Nigerian business needs. Feel free to ask me anything. Wetin you wan know? 🚀";
  };

  const getLexiResponse = (input: string): string => {
    if (input.includes('order') || input.includes('delivery') || input.includes('track')) {
      return "I can help you track your order! For Nigerian deliveries, we work with local logistics partners. Orders within Lagos usually take 1-2 days, while other states take 2-5 days. Give me your order number and I'll check the status for you. How far with your delivery? 📦";
    }
    
    if (input.includes('payment') || input.includes('pay') || input.includes('money')) {
      return "We accept multiple payment methods for Nigerian customers: Bank transfer, Flutterwave, Paystack, USSD codes, and cash on delivery in major cities. You can pay in Naira or USD. Which payment method you wan use? 💳";
    }
    
    if (input.includes('complaint') || input.includes('problem') || input.includes('issue')) {
      return "I'm sorry to hear you're having issues! As your customer service specialist, I'm here to help resolve any problems quickly. Please tell me what's happening, and I'll make sure we sort it out. No wahala, we go fix am! 🤝";
    }
    
    if (input.includes('hours') || input.includes('time') || input.includes('open')) {
      return "Our customer service is available 24/7 through this voice platform! Our physical offices in Lagos, Abuja, and Port Harcourt operate Monday to Friday, 8 AM to 6 PM WAT. You can always talk to me anytime. When you need help? ⏰";
    }
    
    if (input.includes('yoruba') || input.includes('hausa') || input.includes('igbo') || input.includes('pidgin')) {
      return "Yes oh! I understand and can respond in Nigerian languages including Pidgin, and I'm learning Yoruba, Hausa, and Igbo. Feel free to mix languages when you talk - I understand the Nigerian way of speaking. Wetin language you prefer? 🗣️";
    }
    
    return "As your customer service specialist, I'm here to help with orders, payments, complaints, account issues, and any other customer needs. I understand Nigerian business culture and can assist in English or Pidgin. Wetin you need help with today? 😊";
  };

  const getAtlasResponse = (input: string): string => {
    if (input.includes('rate') || input.includes('dollar') || input.includes('naira') || input.includes('exchange')) {
      return "Current USD/NGN rate is around ₦460-480 per dollar on the parallel market, while CBN official rate is about ₦460. Rates change daily based on forex availability and CBN policies. I recommend checking with authorized dealers for current rates. You need forex for business transactions? 💱";
    }
    
    if (input.includes('cbn') || input.includes('central bank') || input.includes('policy') || input.includes('regulation')) {
      return "The CBN has been implementing several policies to stabilize the Naira and improve forex liquidity. Recent changes include RT200 program, diaspora remittance incentives, and new banking regulations. Which specific CBN policy you want to understand? 🏛️";
    }
    
    if (input.includes('investment') || input.includes('stock') || input.includes('market') || input.includes('nse')) {
      return "The Nigerian stock market (NGX) has shown resilience with banking and consumer goods sectors performing well. Key indices include NGX ASI and NGX-30. For business investments, consider sectors like fintech, agriculture, and renewable energy. Which investment area interests you? 📈";
    }
    
    if (input.includes('funding') || input.includes('loan') || input.includes('capital') || input.includes('credit')) {
      return "There are several funding options for Nigerian businesses: Bank of Industry (BOI) loans, commercial bank facilities, CBN intervention funds, angel investors, and fintech lending. Interest rates range from 5-25% depending on the scheme. What type of business funding you dey look for? 💰";
    }
    
    if (input.includes('crypto') || input.includes('bitcoin') || input.includes('digital currency')) {
      return "CBN has restrictions on crypto transactions through banks, but digital assets trading still happens through P2P platforms. SEC Nigeria is developing regulations for digital assets. Many Nigerians use crypto for remittances and investments. You want know about legal crypto options? ₿";
    }
    
    return "As your financial intelligence expert, I provide insights on Nigerian markets, CBN regulations, investment opportunities, business funding, and financial analysis. I understand the local financial landscape and regulatory environment. Which financial matter you want discuss? 💼";
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
