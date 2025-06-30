
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff, Zap, Bot } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

interface VoiceChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

const VoiceChatInterface: React.FC<VoiceChatInterfaceProps> = ({ isOpen, onClose }) => {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">ODIAAA Voice Chat</h2>
              <p className="text-blue-100">AI Assistant for Africa 🇳🇬</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
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

        {/* Voice Controls */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex items-center justify-center space-x-6">
            {!isConnected ? (
              <Button
                onClick={startVoiceChat}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Start Voice Chat
              </Button>
            ) : (
              <>
                <Button
                  onClick={stopVoiceChat}
                  variant="destructive"
                  className="px-6 py-3 rounded-xl"
                >
                  <PhoneOff className="w-5 h-5 mr-2" />
                  End Call
                </Button>
                
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-16 h-16 rounded-full ${
                      isRecording 
                        ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </Button>
                  
                  {/* Audio Level Indicator */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-4 rounded-full transition-all duration-100 ${
                          audioLevel > i * 25 ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {isRecording ? 'Recording...' : isListening ? 'Listening...' : 'Tap to speak'}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5 text-gray-600" />
                  <div className="flex items-center space-x-1">
                    {isSpeaking && (
                      <>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              🎤 Speak in English, Pidgin, Yoruba, Hausa, or Swahili
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatInterface;
