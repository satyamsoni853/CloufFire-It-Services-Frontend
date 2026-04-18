import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ClientSuccessPage = () => {
  const stories = [
    {
      client: "TechCorp Global",
      industry: "Fintech",
      challenge: "Legacy systems were slowing down transaction processing and causing frequent downtimes during peak hours.",
      solution: "Migrated their core infrastructure to a highly available, auto-scaling AWS cloud environment with containerized microservices.",
      impact: "99.99% uptime achieved, transaction speed increased by 300%, and operational costs reduced by 45%.",
      metric: "300%",
      metricLabel: "Faster Processing"
    },
    {
      client: "HealthPlus Network",
      industry: "Healthcare",
      challenge: "Needed a secure, HIPAA-compliant patient portal that integrated seamlessly with existing Electronic Health Records (EHR).",
      solution: "Developed a custom React-based patient portal with robust API integrations and end-to-end data encryption.",
      impact: "Over 100,000 patients onboarded within the first month, with a 98% user satisfaction rate.",
      metric: "100k+",
      metricLabel: "Active Patients"
    },
    {
      client: "EduSmart Solutions",
      industry: "EdTech",
      challenge: "Struggling to manage rapid user growth; their platform was crashing during online exam seasons.",
      solution: "Implemented robust load balancing, caching layers using Redis, and optimized database queries.",
      impact: "Successfully handled 50,000 concurrent users during peak exam periods with zero downtime.",
      metric: "0",
      metricLabel: "Downtime Events"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-64 pb-20 bg-[#292929] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
            Client <span className="text-[#ff7301]">Success</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover how Cloudfire IT Services empowers businesses to overcome complex technological challenges and achieve unprecedented growth.
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="bg-white rounded-[32px] p-8 shadow-lg shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{story.client}</h3>
                  <span className="bg-orange-50 text-[#ff7301] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {story.industry}
                  </span>
                </div>
                
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">The Challenge</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{story.challenge}</p>
                </div>
                
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Our Solution</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{story.solution}</p>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">The Impact</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{story.impact}</p>
                </div>

                <div className="bg-[#ff7301] text-white p-6 rounded-2xl text-center">
                  <p className="text-4xl font-bold font-serif mb-1">{story.metric}</p>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-90">{story.metricLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-6">
            Ready to be our next success story?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Let's collaborate to build scalable, innovative solutions that drive your business forward.
          </p>
          <a href="/contact" className="inline-block bg-[#ff7301] text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 transition-all">
            Start Your Journey
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientSuccessPage;
