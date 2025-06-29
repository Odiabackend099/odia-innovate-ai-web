
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square, Play, Pause } from 'lucide-react';
import { useVoiceRecording } from '../hooks/useVoiceRecording';
import { Language } from '../types/language';

interface VoiceRecorderProps {
  onRecordingComplete: (transcript: string, audioBlob: Blob) => void;
  language: Language;
  disabled?: boolean;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onRecordingComplete,
  language,
  disabled = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const {
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
    getAudioData,
  } = useVoiceRecording({
    onRecordingComplete: async (blob: Blob) => {
      const audioUrl = URL.createObjectURL(blob);
      setRecordedAudio(audioUrl);
      
      // Convert speech to text (mock implementation - replace with actual API call)
      const transcript = await convertSpeechToText(blob, language.code);
      onRecordingComplete(transcript, blob);
    },
  });

  // Mock speech-to-text function (replace with actual implementation)
  const convertSpeechToText = async (audioBlob: Blob, languageCode: string): Promise<string> => {
    // This would typically call your backend API or use Web Speech API
    return `[Voice message in ${languageCode}]`;
  };

  // Waveform visualization
  useEffect(() => {
    if (isRecording && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const drawWaveform = () => {
        const audioData = getAudioData();
        if (!audioData) {
          animationRef.current = requestAnimationFrame(drawWaveform);
          return;
        }

        const { dataArray, bufferLength } = audioData;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#25D366';
        
        const barWidth = canvas.width / bufferLength * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
          
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }

        animationRef.current = requestAnimationFrame(drawWaveform);
      };

      drawWaveform();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording, getAudioData]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!audioRef.current || !recordedAudio) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleSendRecording = () => {
    if (audioBlob) {
      // The recording was already processed in the onRecordingComplete callback
      clearRecording();
      setRecordedAudio(null);
    }
  };

  const handleDiscardRecording = () => {
    clearRecording();
    setRecordedAudio(null);
  };

  return (
    <div className="space-y-4">
      {/* Waveform Canvas */}
      {isRecording && (
        <div className="bg-gray-100 rounded-lg p-4">
          <canvas
            ref={canvasRef}
            width={300}
            height={60}
            className="w-full h-15 rounded"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-600">Recording...</span>
            <span className="text-sm font-mono text-red-600">
              {formatTime(recordingTime)}
            </span>
          </div>
        </div>
      )}

      {/* Recorded Audio Playback */}
      {recordedAudio && !isRecording && (
        <div className="bg-gray-100 rounded-lg p-4">
          <audio
            ref={audioRef}
            src={recordedAudio}
            onEnded={handleAudioEnded}
            className="hidden"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={handlePlayPause}
              className="bg-[#25D366] text-white p-2 rounded-full hover:bg-[#128C7E] transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <span className="text-sm text-gray-600">
              Recorded message ready
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handleSendRecording}
                className="bg-[#25D366] text-white px-3 py-1 rounded-full text-sm hover:bg-[#128C7E] transition-colors"
              >
                Send
              </button>
              <button
                onClick={handleDiscardRecording}
                className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recording Controls */}
      <div className="flex items-center justify-center space-x-4">
        {!isRecording && !recordedAudio && (
          <button
            onClick={startRecording}
            disabled={disabled}
            className="bg-[#25D366] text-white p-4 rounded-full hover:bg-[#128C7E] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            aria-label="Start recording"
          >
            <Mic size={24} />
          </button>
        )}

        {isRecording && (
          <>
            {!isPaused ? (
              <button
                onClick={pauseRecording}
                className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition-colors"
                aria-label="Pause recording"
              >
                <Pause size={20} />
              </button>
            ) : (
              <button
                onClick={resumeRecording}
                className="bg-[#25D366] text-white p-3 rounded-full hover:bg-[#128C7E] transition-colors"
                aria-label="Resume recording"
              >
                <Mic size={20} />
              </button>
            )}
            
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
              aria-label="Stop recording"
            >
              <Square size={20} />
            </button>
          </>
        )}
      </div>

      {/* Recording Status */}
      <div className="text-center">
        {!isRecording && !recordedAudio && (
          <p className="text-sm text-gray-600">
            Tap the microphone to start recording in {language.name}
          </p>
        )}
        {isRecording && (
          <p className="text-sm text-red-600 font-medium">
            {isPaused ? 'Recording paused' : 'Recording in progress...'}
          </p>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
