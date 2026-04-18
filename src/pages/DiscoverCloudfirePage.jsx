import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DiscoverCloudfirePage = () => {
  const values = [
    {
      title: "Innovation First",
      icon: "💡",
      description: "We constantly explore emerging technologies to bring the most advanced and efficient solutions to our clients."
    },
    {
      title: "Uncompromising Quality",
      icon: "⭐",
      description: "Our rigorous testing and quality assurance processes ensure that every product we deliver exceeds expectations."
    },
    {
      title: "Client-Centricity",
      icon: "🤝",
      description: "Your success is our success. We build strong partnerships and tailor our approach to meet your unique needs."
    },
    {
      title: "Agile Execution",
      icon: "⚡",
      description: "We adapt quickly to changes and deliver incremental value, ensuring your project stays on track and within budget."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-64 pb-20 bg-gradient-to-br from-[#292929] to-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[100%] rounded-full bg-[#ff7301] blur-[150px]"></div>
          <div className="absolute top-[60%] -left-[10%] w-[40%] h-[80%] rounded-full bg-blue-600 blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
              Discover <span className="text-[#ff7301]">Cloudfire</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              We are a premier IT services company dedicated to transforming businesses through cutting-edge technology, innovative design, and strategic engineering.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold backdrop-blur-md border border-white/20">Established 2020</span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold backdrop-blur-md border border-white/20">Global Reach</span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold backdrop-blur-md border border-white/20">100+ Projects Delivered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At Cloudfire IT Services, our mission is to empower organizations by providing scalable, secure, and intuitive digital solutions. We bridge the gap between complex technology and business objectives.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you are a startup looking to build your MVP or an enterprise needing a complete digital transformation, our team of expert developers, designers, and strategists are here to guide you every step of the way.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-orange-50 rounded-[40px] p-10 relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#ff7301] rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-100 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What Sets Us Apart</h3>
                <ul className="space-y-4">
                  {[
                    "Deep technical expertise across modern tech stacks.",
                    "Transparent communication and agile methodology.",
                    "Focus on scalable architecture and security.",
                    "Dedicated support and maintenance."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#ff7301] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600">The principles that guide our work, shape our culture, and drive our success.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-20 bg-[#ff7301] text-white text-center">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6">Join Our Growing Team</h2>
          <p className="text-orange-100 text-lg mb-10 max-w-2xl mx-auto">
            We are always looking for passionate individuals to join us in building the future of technology.
          </p>
          <a href="/careers" className="inline-block bg-white text-[#ff7301] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-xl">
            View Open Positions
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DiscoverCloudfirePage;
