import React from 'react';

interface FloatingAgentAvatarsProps {
  selectedAgent?: string;
  isSpeaking?: boolean;
  className?: string;
}

const FloatingAgentAvatars: React.FC<FloatingAgentAvatarsProps> = ({ 
  selectedAgent, 
  isSpeaking = false, 
  className = '' 
}) => {
  const lexiAvatar = '/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png';
  const atlasAvatar = '/lovable-uploads/99c152aa-1d3c-4930-b657-e7b6c4797733.png';

  return (
    <>
      {/* Lexi - Bottom Left */}
      <div className={`fixed bottom-8 left-8 z-40 ${className}`}>
        <div 
          className={`
            w-16 h-16 rounded-full shadow-xl transition-all duration-300
            ${selectedAgent === 'lexi' ? 'scale-110' : 'scale-90 opacity-60'}
            ${selectedAgent === 'lexi' && isSpeaking ? 'speaking-glow' : ''}
          `}
        >
          <img
            src={lexiAvatar}
            alt="Lexi"
            className="w-full h-full rounded-full object-cover"
          />
          {selectedAgent === 'lexi' && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
          )}
        </div>
        {selectedAgent === 'lexi' && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card px-2 py-1 rounded text-xs font-medium shadow-lg">
            Lexi
          </div>
        )}
      </div>

      {/* Atlas - Bottom Right */}
      <div className={`fixed bottom-8 right-8 z-40 ${className}`}>
        <div 
          className={`
            w-16 h-16 rounded-full shadow-xl transition-all duration-300
            ${selectedAgent === 'atlas' ? 'scale-110' : 'scale-90 opacity-60'}
            ${selectedAgent === 'atlas' && isSpeaking ? 'speaking-glow' : ''}
          `}
        >
          <img
            src={atlasAvatar}
            alt="Atlas"
            className="w-full h-full rounded-full object-cover"
          />
          {selectedAgent === 'atlas' && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse" />
          )}
        </div>
        {selectedAgent === 'atlas' && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card px-2 py-1 rounded text-xs font-medium shadow-lg">
            Atlas
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingAgentAvatars;