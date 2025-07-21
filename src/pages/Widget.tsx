
import React from 'react';
import AgentOdiaWidget from '../components/AgentOdiaWidget';

const WidgetPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <AgentOdiaWidget isEmbedded={true} />
        </div>
        
        <div className="mt-6 text-center text-gray-600">
          <p className="text-sm">
            This is the standalone Agent Odia widget page.
          </p>
          <p className="text-xs mt-2">
            Perfect for embedding in iframes or testing the widget functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WidgetPage;
