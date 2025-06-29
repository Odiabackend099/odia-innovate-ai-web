
export interface SpeechToTextOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export interface TextToSpeechOptions {
  language?: string;
  voice?: string;
  rate?: number;
  pitch?: number;
}

// Speech-to-Text using Web Speech API
export class SpeechToText {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;

  constructor() {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
    } else if (typeof window !== 'undefined' && 'SpeechRecognition' in window) {
      this.recognition = new (window as any).SpeechRecognition();
    }
  }

  async startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    options: SpeechToTextOptions = {}
  ): Promise<void> {
    if (!this.recognition) {
      throw new Error('Speech recognition not supported in this browser');
    }

    if (this.isListening) {
      return;
    }

    this.recognition.lang = this.getLanguageCode(options.language || 'en');
    this.recognition.continuous = options.continuous || false;
    this.recognition.interimResults = options.interimResults || true;

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      let isFinal = false;

      for (let i = event.resultIndex || 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          isFinal = true;
        }
      }

      onResult(transcript, isFinal);
    };

    this.recognition.onerror = () => {
      onError('Speech recognition error: Unknown error');
    };

    this.recognition.addEventListener('start', () => {
      this.isListening = true;
    });

    this.recognition.addEventListener('end', () => {
      this.isListening = false;
    });

    this.recognition.start();
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  private getLanguageCode(language: string): string {
    const languageMap: Record<string, string> = {
      'en': 'en-US',
      'pcm': 'en-NG', // Pidgin falls back to Nigerian English
      'yo': 'yo-NG',
      'ig': 'ig-NG',
      'ha': 'ha-NG',
      'bin': 'en-NG', // Edo falls back to Nigerian English
      'ish': 'en-NG', // Esan falls back to Nigerian English  
      'afe': 'en-NG', // Afemai falls back to Nigerian English
    };

    return languageMap[language] || 'en-US';
  }
}

// Text-to-Speech using Web Speech API
export class TextToSpeech {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
    }
  }

  private loadVoices(): void {
    if (!this.synth) return;

    const updateVoices = () => {
      this.voices = this.synth!.getVoices();
    };

    updateVoices();
    this.synth.addEventListener('voiceschanged', updateVoices);
  }

  async speak(text: string, options: TextToSpeechOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language
      utterance.lang = this.getLanguageCode(options.language || 'en');
      
      // Set voice if available
      if (options.voice) {
        const voice = this.voices.find(v => v.name.includes(options.voice!));
        if (voice) {
          utterance.voice = voice;
        }
      } else {
        // Auto-select appropriate voice for language
        const voice = this.voices.find(v => v.lang.startsWith(utterance.lang.split('-')[0]));
        if (voice) {
          utterance.voice = voice;
        }
      }

      // Set speech parameters
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));

      this.synth.speak(utterance);
    });
  }

  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  private getLanguageCode(language: string): string {
    const languageMap: Record<string, string> = {
      'en': 'en-US',
      'pcm': 'en-NG',
      'yo': 'yo-NG',
      'ig': 'ig-NG', 
      'ha': 'ha-NG',
      'bin': 'en-NG',
      'ish': 'en-NG',
      'afe': 'en-NG',
    };

    return languageMap[language] || 'en-US';
  }
}

// Utility functions
export const speechToText = new SpeechToText();
export const textToSpeech = new TextToSpeech();

export async function convertAudioToText(audioBlob: Blob, language: string = 'en'): Promise<string> {
  // This is a placeholder for actual audio-to-text conversion
  // In a real implementation, you would send the audio to a backend service
  // that uses services like Whisper, Google Speech-to-Text, etc.
  
  console.log('Converting audio to text for language:', language);
  console.log('Audio blob size:', audioBlob.size);
  
  // Mock response for development
  return `[Voice message transcribed in ${language}]`;
}
