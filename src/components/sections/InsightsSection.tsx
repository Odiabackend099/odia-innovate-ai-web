
import React from 'react';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';

const InsightsSection = () => {
  const insights = [
    {
      category: 'Industry Report',
      title: 'The Future of AI in African Business: 2024 Trends & Opportunities',
      excerpt: 'An in-depth analysis of AI adoption across African markets and emerging opportunities for enterprise transformation.',
      date: '2024-01-15',
      readTime: '8 min read',
      image: '/lovable-uploads/e4ecf514-3800-415c-b885-be4fdded4cc7.png',
      featured: true
    },
    {
      category: 'Technology',
      title: 'Building Scalable Voice AI Systems for Multilingual Markets',
      excerpt: 'Technical insights into developing voice AI solutions that work across multiple African languages and dialects.',
      date: '2024-01-10',
      readTime: '6 min read',
      image: '/lovable-uploads/f7d1e5e1-2175-4874-a21f-28dc1af09b34.png'
    },
    {
      category: 'Case Study',
      title: 'How Nigerian Banks Are Leveraging AI for Customer Service Excellence',
      excerpt: 'Real-world examples of AI implementation in Nigerian banking sector and measurable business outcomes.',
      date: '2024-01-05',
      readTime: '5 min read',
      image: '/lovable-uploads/cf9b0f82-daed-451d-927c-d1ea453458c1.png'
    }
  ];

  const handleReadMore = (title: string) => {
    console.log(`Read more about: ${title}`);
  };

  const handleViewAll = () => {
    console.log('View all insights');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="ieq-section bg-surface">
      <div className="ieq-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            Latest Insights
          </div>
          
          <h2 className="ieq-heading-lg mb-6">
            Industry Knowledge &
            <span className="ieq-text-gradient block mt-2">Expert Analysis</span>
          </h2>
          
          <p className="ieq-body-lg max-w-3xl mx-auto">
            Stay informed with our latest research, industry insights, and thought leadership 
            on AI innovation across African markets.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`ieq-news-card animate-fade-in ${
                insight.featured ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${
                insight.featured ? 'h-64 lg:h-80' : 'h-48'
              }`}>
                <img 
                  src={insight.image} 
                  alt={insight.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {insight.category}
                  </span>
                </div>
                {insight.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold text-gold-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`p-6 ${insight.featured ? 'lg:p-8' : ''}`}>
                <div className="flex items-center space-x-4 mb-4 text-text-tertiary">
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} />
                    <span className="ieq-body-sm">{formatDate(insight.date)}</span>
                  </div>
                  <span className="ieq-body-sm">{insight.readTime}</span>
                </div>

                <h3 className={`font-semibold mb-3 text-text-primary ${
                  insight.featured ? 'ieq-heading-sm' : 'text-lg'
                }`}>
                  {insight.title}
                </h3>
                
                <p className={`ieq-body mb-6 ${
                  insight.featured ? 'ieq-body-lg' : ''
                }`}>
                  {insight.excerpt}
                </p>

                <button
                  onClick={() => handleReadMore(insight.title)}
                  className="flex items-center space-x-2 text-primary font-semibold hover:text-primary/80 transition-colors duration-200 group/cta"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button
            onClick={handleViewAll}
            className="ieq-button-secondary group"
          >
            <span>View All Insights</span>
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
