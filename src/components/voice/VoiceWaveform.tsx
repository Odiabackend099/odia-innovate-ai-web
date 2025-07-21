import React from 'react';

interface VoiceWaveformProps {
  isActive: boolean;
  className?: string;
}

const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ isActive, className = '' }) => {
  return (
    <div className={`flex gap-1 items-center justify-center h-10 ${className}`}>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`
            w-1 bg-gradient-to-t from-accent to-primary rounded-full transition-all duration-300
            ${isActive ? 'wave-animation' : 'h-2'}
            ${isActive && index === 0 ? 'h-8' : ''}
            ${isActive && index === 1 ? 'h-6' : ''}
            ${isActive && index === 2 ? 'h-10' : ''}
            ${isActive && index === 3 ? 'h-6' : ''}
            ${isActive && index === 4 ? 'h-8' : ''}
          `}
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;