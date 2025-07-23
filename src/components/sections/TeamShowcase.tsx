
import React from 'react';
import { Linkedin, Mail, ExternalLink } from 'lucide-react';

const TeamShowcase = () => {
  const teamMembers = [
    {
      name: 'Dr. Adebayo Ogundimu',
      role: 'Chief Executive Officer',
      bio: 'Leading AI innovation across Africa with 15+ years of experience in enterprise technology solutions.',
      image: '/lovable-uploads/a6898fbe-7d74-4180-955a-9fd88a12a27c.png',
      linkedin: '#',
      email: 'adebayo@odia.dev'
    },
    {
      name: 'Fatima Al-Rashid',
      role: 'Chief Technology Officer',
      bio: 'Pioneering voice AI technology with expertise in machine learning and natural language processing.',
      image: '/lovable-uploads/99c152aa-1d3c-4930-b657-e7b6c4797733.png',
      linkedin: '#',
      email: 'fatima@odia.dev'
    },
    {
      name: 'Michael Okafor',
      role: 'Head of Engineering',
      bio: 'Building scalable AI infrastructure with a focus on reliability and performance optimization.',
      image: '/lovable-uploads/b2deb74a-bc63-4e33-897b-5ef74c40a832.png',
      linkedin: '#',
      email: 'michael@odia.dev'
    },
    {
      name: 'Dr. Amina Hassan',
      role: 'Head of Research',
      bio: 'Advancing AI research with specialization in African language processing and cultural adaptation.',
      image: '/lovable-uploads/c158171e-b9d7-401b-bc19-a2cd316227a5.png',
      linkedin: '#',
      email: 'amina@odia.dev'
    }
  ];

  const handleContactMember = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleLinkedIn = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section className="ieq-section bg-surface">
      <div className="ieq-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            Leadership Team
          </div>
          
          <h2 className="ieq-heading-lg mb-6">
            Meet Our
            <span className="ieq-text-gradient block mt-2">Expert Leadership</span>
          </h2>
          
          <p className="ieq-body-lg max-w-3xl mx-auto">
            Our diverse team of AI experts, engineers, and researchers are dedicated to 
            transforming African business through innovative technology solutions.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="ieq-team-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Profile Image */}
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Member Info */}
              <h3 className="ieq-heading-sm mb-2">{member.name}</h3>
              <div className="text-primary font-semibold mb-4">{member.role}</div>
              <p className="ieq-body-sm mb-6 text-left">{member.bio}</p>

              {/* Contact Links */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleContactMember(member.email)}
                  className="p-2 bg-surface hover:bg-primary hover:text-white rounded-full transition-colors duration-200"
                >
                  <Mail size={16} />
                </button>
                <button
                  onClick={() => handleLinkedIn(member.linkedin)}
                  className="p-2 bg-surface hover:bg-primary hover:text-white rounded-full transition-colors duration-200"
                >
                  <Linkedin size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-border">
            <h3 className="ieq-heading-md mb-4">Join Our Growing Team</h3>
            <p className="ieq-body mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for 
              AI innovation and African development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="ieq-button-primary">
                View Open Positions
              </button>
              <button className="ieq-button-secondary">
                Learn About Our Culture
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamShowcase;
