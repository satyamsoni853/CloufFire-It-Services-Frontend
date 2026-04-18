import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Globe, 
  Quote, 
  ChevronRight, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Building2,
  Activity,
  GraduationCap
} from 'lucide-react';
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
      metricLabel: "Faster Processing",
      icon: <Building2 className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800"
    },
    {
      client: "HealthPlus Network",
      industry: "Healthcare",
      challenge: "Needed a secure, HIPAA-compliant patient portal that integrated seamlessly with existing Electronic Health Records (EHR).",
      solution: "Developed a custom React-based patient portal with robust API integrations and end-to-end data encryption.",
      impact: "Over 100,000 patients onboarded within the first month, with a 98% user satisfaction rate.",
      metric: "100k+",
      metricLabel: "Active Patients",
      icon: <Activity className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800"
    },
    {
      client: "EduSmart Solutions",
      industry: "EdTech",
      challenge: "Struggling to manage rapid user growth; their platform was crashing during online exam seasons.",
      solution: "Implemented robust load balancing, caching layers using Redis, and optimized database queries.",
      impact: "Successfully handled 50,000 concurrent users during peak exam periods with zero downtime.",
      metric: "0",
      metricLabel: "Downtime Events",
      icon: <GraduationCap className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechCorp Global",
      quote: "Cloudfire transformed our infrastructure from a bottleneck into a competitive advantage. Their team is world-class.",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "Dr. James Miller",
      role: "Director of IT, HealthPlus",
      quote: "Security was our top priority. Cloudfire delivered a solution that exceeded all regulatory standards without sacrificing UX.",
      avatar: "https://i.pravatar.cc/150?u=james"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-sans">
      <Header />
      <div className="h-24 md:h-28 bg-[#292929]"></div>
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-[#292929] text-white">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img src="/images/client-success-hero.png" alt="Success Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#292929]/80 via-[#292929]/90 to-[#292929]"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff7301]/10 rounded-full text-[#ff7301] text-sm font-bold border border-[#ff7301]/20 mb-8 backdrop-blur-md">
              <Award className="w-4 h-4" />
              Delivering Excellence Since 2020
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 leading-[1.1]">
              Impact That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7301] to-[#ff9845]">Drives Growth</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              We measure our success by the success of our partners. Discover how we've helped industry leaders scale, innovate, and lead.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
              {[
                { label: "Client Retention", value: "98%" },
                { label: "Cost Saved", value: "$12M+" },
                { label: "Uptime", value: "99.99%" },
                { label: "Projects", value: "250+" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-[#ff7301] mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-xs uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">Trusted by Global Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Simulated Logos */}
             <div className="text-xl font-bold font-serif">TECHCORP</div>
             <div className="text-xl font-bold font-serif">GLOBAL BANK</div>
             <div className="text-xl font-bold font-serif">HEALTH+</div>
             <div className="text-xl font-bold font-serif">EDUCARE</div>
             <div className="text-xl font-bold font-serif">SMARTLOGIC</div>
          </div>
        </div>
      </section>

      {/* Detailed Success Stories */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-[#ff7301] uppercase tracking-[0.3em] mb-4">Case Studies</h2>
              <h3 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight">Featured <br />Success Stories</h3>
            </div>
            <p className="text-gray-500 hidden lg:block max-w-xs mb-2">Deep dives into how we solved real-world problems for our clients.</p>
          </div>

          <div className="space-y-24">
            {stories.map((story, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="lg:w-1/2 relative group">
                  <div className="absolute -inset-4 bg-[#ff7301]/10 rounded-[40px] blur-2xl group-hover:bg-[#ff7301]/20 transition-all"></div>
                  <img src={story.image} className="relative rounded-[40px] shadow-2xl w-full aspect-[4/3] object-cover" alt={story.client} />
                  <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20">
                    <div className="text-4xl font-bold font-serif text-[#ff7301] mb-1">{story.metric}</div>
                    <div className="text-xs font-bold text-gray-900 uppercase tracking-widest">{story.metricLabel}</div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#ff7301]">
                      {story.icon}
                    </div>
                    <span className="text-sm font-bold text-[#ff7301] uppercase tracking-widest">{story.industry}</span>
                  </div>
                  <h4 className="text-4xl font-bold text-gray-900 mb-6">{story.client}</h4>
                  
                  <div className="space-y-8 mb-10">
                    <div>
                      <h5 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4" /> The Challenge
                      </h5>
                      <p className="text-gray-600 leading-relaxed">{story.challenge}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Our Solution
                      </h5>
                      <p className="text-gray-600 leading-relaxed">{story.solution}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> The Impact
                      </h5>
                      <p className="text-gray-600 leading-relaxed font-medium text-gray-800">{story.impact}</p>
                    </div>
                  </div>
                  
                  <button className="flex items-center gap-2 text-[#ff7301] font-bold hover:gap-4 transition-all">
                    Read Full Case Study <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-[#ff7301] uppercase tracking-[0.3em] mb-4">Voice of the Client</h2>
            <h3 className="text-4xl font-bold font-serif mb-6">What Industry Leaders Say</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 p-12 rounded-[40px] border border-white/10 relative">
                <Quote className="absolute top-10 right-12 w-16 h-16 text-white/5" />
                <p className="text-2xl font-medium leading-relaxed mb-10 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} className="w-16 h-16 rounded-full border-2 border-[#ff7301]/30" alt={t.name} />
                  <div>
                    <div className="font-bold text-xl">{t.name}</div>
                    <div className="text-[#ff7301] text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Stats */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="bg-[#ff7301] rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
               <div className="lg:w-1/2">
                 <h3 className="text-4xl md:text-5xl font-bold font-serif mb-8 leading-tight">Expertise in Every Industry</h3>
                 <p className="text-orange-100 text-lg mb-8">From healthcare to finance, our tailored solutions solve specific industry challenges with precision.</p>
                 <div className="grid grid-cols-2 gap-6">
                   {['Fintech', 'Healthcare', 'EdTech', 'E-commerce', 'Logistics', 'Real Estate'].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <CheckCircle2 className="w-5 h-5 text-orange-200" />
                       <span className="font-bold">{item}</span>
                     </div>
                   ))}
                 </div>
               </div>
               <div className="lg:w-1/2 grid grid-cols-2 gap-8">
                 <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                   <div className="text-4xl font-bold mb-2">98%</div>
                   <div className="text-xs font-bold uppercase tracking-widest text-orange-200">User Satisfaction</div>
                 </div>
                 <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                   <div className="text-4xl font-bold mb-2">45%</div>
                   <div className="text-xs font-bold uppercase tracking-widest text-orange-200">Avg. Cost Reduction</div>
                 </div>
                 <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                   <div className="text-4xl font-bold mb-2">10M+</div>
                   <div className="text-xs font-bold uppercase tracking-widest text-orange-200">Lines of Code</div>
                 </div>
                 <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                   <div className="text-4xl font-bold mb-2">24/7</div>
                   <div className="text-xs font-bold uppercase tracking-widest text-orange-200">Global Support</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-8">Ready to Build Your <br />Next Success Story?</h2>
            <p className="text-gray-500 text-xl mb-12">Let's collaborate to solve your most complex challenges and achieve unprecedented growth.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="px-10 py-5 bg-[#ff7301] text-white rounded-full font-bold hover:bg-[#e66700] transition-all shadow-xl shadow-[#ff7301]/25">
                Contact Our Experts
              </a>
              <a href="/pricing" className="px-10 py-5 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all">
                View Pricing Plans
              </a>
            </div>
          </motion.div>
        </div>
      </section>

     
    </div>
  );
};

export default ClientSuccessPage;
