
import React, { useEffect, useState } from 'react';
import AgentOdiaWidget from './AgentOdiaWidget';

interface EmbedWidgetProps {
  config?: {
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    theme?: 'light' | 'dark';
    language?: string;
    customColors?: {
      primary?: string;
      secondary?: string;
      background?: string;
    };
  };
}

const EmbedWidget: React.FC<EmbedWidgetProps> = ({ config = {} }) => {
  const [isClient, setIsClient] = useState(false);
  const [customStyles, setCustomStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    setIsClient(true);
    
    // Apply custom positioning
    const position = config.position || 'bottom-right';
    const positionStyles: React.CSSProperties = {};
    
    switch (position) {
      case 'bottom-left':
        positionStyles.bottom = '24px';
        positionStyles.left = '24px';
        break;
      case 'top-right':
        positionStyles.top = '24px';
        positionStyles.right = '24px';
        break;
      case 'top-left':
        positionStyles.top = '24px';
        positionStyles.left = '24px';
        break;
      default: // bottom-right
        positionStyles.bottom = '24px';
        positionStyles.right = '24px';
    }
    
    setCustomStyles(positionStyles);
    
    // Apply custom colors if provided
    if (config.customColors) {
      const root = document.documentElement;
      if (config.customColors.primary) {
        root.style.setProperty('--odiaaa-primary', config.customColors.primary);
      }
      if (config.customColors.secondary) {
        root.style.setProperty('--odiaaa-secondary', config.customColors.secondary);
      }
      if (config.customColors.background) {
        root.style.setProperty('--odiaaa-background', config.customColors.background);
      }
    }
  }, [config]);

  if (!isClient) {
    return null; // Avoid SSR issues
  }

  const customCSS = `
    .odiaaa-embed-widget {
      --odiaaa-primary: ${config.customColors?.primary || '#25D366'};
      --odiaaa-secondary: ${config.customColors?.secondary || '#128C7E'};
      --odiaaa-background: ${config.customColors?.background || '#ECE5DD'};
    }
    
    .odiaaa-embed-widget * {
      box-sizing: border-box;
    }
    
    @media (max-width: 640px) {
      .odiaaa-embed-widget {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
      }
    }
  `;

  return (
    <div 
      className="odiaaa-embed-widget"
      style={{
        position: 'fixed',
        zIndex: 9999,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        ...customStyles,
      }}
    >
      <AgentOdiaWidget isEmbedded={true} />
      
      {/* Custom CSS for theming */}
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
    </div>
  );
};

export default EmbedWidget;
