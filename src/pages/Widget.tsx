
import React from 'react';
import Header from '../components/layout/Header';
import OdiaaaWidget from '../components/OdiaaaWidget';

const WidgetPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <OdiaaaWidget isEmbedded={true} />
          </div>
          
          <div className="mt-6 text-center text-gray-600">
            <p className="text-sm">
              This is the standalone ODIAAA widget page.
            </p>
            <p className="text-xs mt-2">
              Perfect for embedding in iframes or testing the widget functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetPage;
