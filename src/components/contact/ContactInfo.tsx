
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactInfo = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/widget');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-8">
        Contact Information
      </h2>
      
      <div className="space-y-8">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-lg">
            <MapPin className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Our Office</h3>
            <p className="text-blue-700">
              123 Innovation Hub<br />
              Central Business District<br />
              Abuja, Nigeria
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-lg">
            <Mail className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Email Us</h3>
            <p className="text-blue-700">
              General Inquiries: hello@odia.dev<br />
              Sales: sales@odia.dev<br />
              Support: support@odia.dev
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-lg">
            <Phone className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Call Us</h3>
            <p className="text-blue-700">
              Nigeria: +234 (0) 800 ODIA DEV<br />
              International: +234 (0) 901 234 5678
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 border border-blue-300 p-8 rounded-2xl">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">
          Prefer to Chat?
        </h3>
        <p className="text-blue-700 mb-6">
          Our AI assistant ODIAAA is available 24/7 to answer questions and help you explore our services.
        </p>
        <button 
          onClick={handleStartChat}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Start Chat Now
        </button>
      </div>
    </div>
  );
};

export default ContactInfo;
