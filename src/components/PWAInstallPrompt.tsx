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
    <div className="fixed bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm border border-green-200 rounded-2xl p-4 shadow-2xl z-50 max-w-sm mx-auto">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🇳🇬</span>
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground text-sm">Install ODIA AI</h3>
            <p className="text-xs text-muted-foreground">Nigeria's Voice AI Platform</p>
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

      <div className="mb-3 text-xs text-muted-foreground">
        🚀 Get faster access to voice AI agents<br/>
        💬 Works offline with cached content<br/>
        📱 Native app experience
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={handleInstall}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm py-2 px-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
        >
          <Download size={16} className="mr-2" />
          Install App
        </Button>
        <Button
          variant="outline"
          onClick={handleShare}
          className="px-3 py-2 rounded-xl border-green-200 hover:bg-green-50"
        >
          <Share2 size={16} />
        </Button>
      </div>
      
      <p className="text-xs text-center text-muted-foreground mt-2">
        Free to install • Works on all devices
      </p>
    </div>
  );
};

export default PWAInstallPrompt;