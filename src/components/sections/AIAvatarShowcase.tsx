import React from 'react';
import { MessageSquare, Mic, Globe, Zap } from 'lucide-react';

const AIAvatarShowcase = () => {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Natural Conversations',
      description: 'Chat in 15+ African languages with cultural understanding'
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: 'Voice Interactions',
      description: 'Speak naturally with accent recognition and local dialects'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Cultural Context',
      description: 'Understands African business practices and social norms'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: '24/7 Availability',
      description: 'Always ready to assist across all time zones in Africa'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-surface-elevated to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23479afc' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='8'/%3E%3Ccircle cx='25' cy='25' r='4'/%3E%3Ccircle cx='75' cy='75' r='6'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
            Meet ODIAAA 🤖
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your intelligent AI companion, trained on African languages, cultures, and business practices. 
            Experience the future of human-AI interaction designed specifically for Africa.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - AI Avatar Demo */}
          <div className="relative">
            <div className="bg-gradient-to-br from-card/90 to-surface/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-border">
              {/* Chat Interface Demo */}
              <div className="bg-gradient-to-br from-background to-surface rounded-2xl p-6 mb-6 border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png" 
                      alt="ODIAAA AI Avatar" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-primary">ODIAAA</div>
                    <div className="text-sm text-muted-foreground">AI Assistant • Online</div>
                  </div>
                  <div className="ml-auto flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 rounded-2xl p-4 max-w-xs">
                    <p className="text-card-foreground text-sm">
                      Sannu! How can I help your business grow across Africa today? 🌍
                    </p>
                  </div>
                  <div className="bg-surface-elevated rounded-2xl p-4 max-w-xs ml-auto">
                    <p className="text-card-foreground text-sm">
                      I need help setting up customer service for my Lagos office
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-2xl p-4 max-w-xs">
                    <p className="text-card-foreground text-sm">
                      Excellent! I can help you deploy our voice automation system that supports Yoruba, Igbo, and Hausa. Would you like me to show you how it works? ✨
                    </p>
                  </div>
                </div>
              </div>

              {/* Voice Indicator */}
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-6 py-3 rounded-xl font-semibold flex items-center space-x-2">
                  <Mic className="w-5 h-5" />
                  <span>Try Voice Chat</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-primary-foreground/80 rounded animate-pulse"></div>
                    <div className="w-1 h-6 bg-primary-foreground/60 rounded animate-pulse delay-75"></div>
                    <div className="w-1 h-3 bg-primary-foreground/80 rounded animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating African flags */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl">🇳🇬</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-lg">🇰🇪</span>
            </div>
          </div>

          {/* Right - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-12 py-4 rounded-xl font-bold text-lg hover:from-primary-glow hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            🤖 Start Chatting with ODIAAA
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIAvatarShowcase;