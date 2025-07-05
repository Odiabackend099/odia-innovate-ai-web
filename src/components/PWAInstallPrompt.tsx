import React, { useState } from 'react';
import { usePWA } from '../hooks/usePWA';
import { Download, X, Share2 } from 'lucide-react';
import { Button } from './ui/button';

const PWAInstallPrompt = () => {
  const { isInstallable, installApp, shareApp } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isDismissed) return null;

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setIsDismissed(true);
    }
  };

  const handleShare = async () => {
    await shareApp();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-2xl z-50 max-w-sm mx-auto">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
            <img 
              src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
              alt="ODIA.dev" 
              className="w-6 h-6 rounded"
            />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground text-sm">Install ODIA.dev</h3>
            <p className="text-xs text-muted-foreground">Get the full app experience</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="p-1 h-auto text-muted-foreground hover:text-card-foreground"
        >
          <X size={16} />
        </Button>
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={handleInstall}
          className="flex-1 bg-gradient-to-r from-primary to-primary-glow text-white text-sm py-2 px-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
        >
          <Download size={16} className="mr-2" />
          Install
        </Button>
        <Button
          variant="outline"
          onClick={handleShare}
          className="px-3 py-2 rounded-xl"
        >
          <Share2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;