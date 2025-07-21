
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatWidget from '../components/ChatWidget';

const About = () => {
  const team = [
    {
      name: 'Austyn',
      role: 'CEO & Founder',
      bio: 'Visionary leader driving AI innovation across Africa. Passionate about bridging technological gaps and empowering African businesses.',
      image: '/lovable-uploads/e4ecf514-3800-415c-b885-be4fdded4cc7.png'
    },
    {
      name: 'Eva Jensen',
      role: 'Co-founder & CTO',
      bio: 'Technical excellence architect with deep expertise in AI systems. Leading our technical vision for Africa.',
      image: '/lovable-uploads/99c152aa-1d3c-4930-b657-e7b6c4797733.png'
    },
    {
      name: 'Dr. Amina Kone',
      role: 'Head of AI Research',
      bio: 'AI researcher with 15+ years experience. Former Google AI team member specializing in African language processing.',
      image: '/lovable-uploads/a6898fbe-7d74-4180-955a-9fd88a12a27c.png'
    },
    {
      name: 'Kwame Asante',
      role: 'Senior ML Engineer',
      bio: 'ML engineer specializing in African language processing and NLP systems development.',
      image: '/lovable-uploads/c158171e-b9d7-401b-bc19-a2cd316227a5.png'
    },
    {
      name: 'Fatima Okonkwo',
      role: 'Head of Products',
      bio: 'Product strategist focused on AI solutions for African markets and user experience.',
      image: '/lovable-uploads/f7d1e5e1-2175-4874-a21f-28dc1af09b34.png'
    }
  ];

  const values = [
    {
      title: 'African-First Approach',
      description: 'We build AI solutions designed specifically for African contexts, languages, and cultures.',
      icon: '🌍'
    },
    {
      title: 'Local Expertise',
      description: 'Our team understands the unique challenges and opportunities across African markets.',
      icon: '🎯'
    },
    {
      title: 'Mobile-First Design',
      description: 'All our solutions are optimized for mobile devices, the primary internet access point in Africa.',
      icon: '📱'
    },
    {
      title: 'Cultural Understanding',
      description: 'We incorporate local customs, languages, and business practices into our AI solutions.',
      icon: '🤝'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About ODIA.dev
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to democratize AI technology across Africa, 
            making advanced AI solutions accessible to businesses of all sizes.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To empower African businesses with cutting-edge AI technology that understands 
                local contexts, languages, and cultures. We believe AI should bridge gaps, 
                not create them.
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                An Africa where every business, regardless of size or location, has access to 
                intelligent AI solutions that help them grow, serve their customers better, 
                and compete globally.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ODIA.dev
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another AI company. We're your partners in African innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate technologists building the future of AI for Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default About;
