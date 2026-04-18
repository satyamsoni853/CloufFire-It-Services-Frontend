import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Users, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Zap, 
  Award,
  ChevronRight,
  Code2,
  Database,
  Layers,
  Layout,
  Smartphone,
  Server
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DiscoverCloudfirePage = () => {
  const values = [
    {
      title: "Innovation First",
      icon: <Rocket className="w-8 h-8" />,
      description: "We constantly explore emerging technologies to bring the most advanced and efficient solutions to our clients."
    },
    {
      title: "Quality Assurance",
      icon: <ShieldCheck className="w-8 h-8" />,
      description: "Our rigorous testing and quality assurance processes ensure that every product we deliver exceeds expectations."
    },
    {
      title: "Client-Centricity",
      icon: <Users className="w-8 h-8" />,
      description: "Your success is our success. We build strong partnerships and tailor our approach to meet your unique needs."
    },
    {
      title: "Agile Execution",
      icon: <Zap className="w-8 h-8" />,
      description: "We adapt quickly to changes and deliver incremental value, ensuring your project stays on track."
    }
  ];

  const techStack = [
    { name: "Frontend", icon: <Layout />, techs: ["React", "Next.js", "Tailwind CSS", "TypeScript"] },
    { name: "Backend", icon: <Server />, techs: ["Node.js", "Python", "FastAPI", "Go"] },
    { name: "Mobile", icon: <Smartphone />, techs: ["React Native", "Flutter", "iOS", "Android"] },
    { name: "Cloud", icon: <Globe />, techs: ["AWS", "Azure", "Google Cloud", "Docker"] },
    { name: "Database", icon: <Database />, techs: ["PostgreSQL", "MongoDB", "Redis", "Firebase"] },
    { name: "Architecture", icon: <Layers />, techs: ["Microservices", "Serverless", "REST API", "GraphQL"] }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans">
      <Header />
      <div className="h-24 md:h-28 bg-[#292929]"></div>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[#292929] text-white">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-[20%] -right-[10%] w-[60%] h-[100%] rounded-full bg-[#ff7301] blur-[150px]"
          ></motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute top-[40%] -left-[10%] w-[50%] h-[80%] rounded-full bg-blue-600 blur-[120px]"
          ></motion.div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[#ff7301] text-sm font-bold border border-white/10 mb-8 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff7301] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff7301]"></span>
                  </span>
                  Innovation Since 2020
                </div>
                <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 leading-[1.1]">
                  Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7301] to-[#ff9845]">Digital Future</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
                  Cloudfire IT Services is a powerhouse of innovation, combining strategic thinking with technical excellence to build products that define industries.
                </p>
                <div className="flex flex-wrap gap-4 mb-12">
                  <button className="px-8 py-4 bg-[#ff7301] hover:bg-[#e66700] text-white rounded-full font-bold transition-all shadow-lg shadow-[#ff7301]/25 flex items-center gap-2 group">
                    Start a Project
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-full font-bold transition-all backdrop-blur-md">
                    Watch Showreel
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">100+</div>
                    <div className="text-gray-400 text-sm">Partners Globally</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">250+</div>
                    <div className="text-gray-400 text-sm">Products Shipped</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">15+</div>
                    <div className="text-gray-400 text-sm">Industry Awards</div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff7301]/20 to-blue-500/20 blur-2xl rounded-3xl"></div>
                <img 
                  src="/images/discover-hero.png" 
                  alt="Innovation" 
                  className="relative rounded-3xl shadow-2xl border border-white/10 w-full object-cover"
                />
                {/* Floating Card */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hidden md:block"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Uptime Guaranteed</div>
                      <div className="text-xs text-gray-500">99.9% Performance Rating</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-50 rounded-full opacity-50 blur-3xl"></div>
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400" className="rounded-3xl shadow-lg" alt="Team" />
                    <div className="bg-[#ff7301] p-8 rounded-3xl text-white">
                      <Award className="w-10 h-10 mb-4" />
                      <div className="text-3xl font-bold mb-1">No. 1</div>
                      <div className="text-sm opacity-80 uppercase font-bold tracking-widest">Tech Choice 2025</div>
                    </div>
                  </div>
                  <div className="pt-12 space-y-4">
                    <div className="bg-blue-600 p-8 rounded-3xl text-white">
                      <Users className="w-10 h-10 mb-4" />
                      <div className="text-3xl font-bold mb-1">50+</div>
                      <div className="text-sm opacity-80 uppercase font-bold tracking-widest">Expert Engineers</div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400" className="rounded-3xl shadow-lg" alt="Workspace" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h2 className="text-sm font-bold text-[#ff7301] uppercase tracking-[0.3em] mb-4">Our Journey</h2>
              <h3 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-8 leading-tight">
                From a Small Startup to a <span className="text-[#ff7301]">Global Tech Hub</span>
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded in 2020, Cloudfire started with a simple vision: to make high-end technology accessible to businesses of all sizes. What began as a 3-person team has now grown into a global network of innovators.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                We don't just write code; we solve problems. Our approach is deeply rooted in understanding the business goals of our partners and translating them into scalable digital products.
              </p>
              <div className="space-y-6">
                {[
                  { title: "2020: The Spark", desc: "Launched Cloudfire with a focus on web development." },
                  { title: "2022: Expansion", desc: "Added Mobile and Cloud divisions to our core offerings." },
                  { title: "2024: Global Impact", desc: "Partnered with Fortune 500 companies for digital transformation." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-px bg-gray-200 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#ff7301] ring-4 ring-orange-100 group-hover:scale-125 transition-transform"></div>
                    </div>
                    <div className="pb-8">
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-[#ff7301] uppercase tracking-[0.3em] mb-4">Our Toolkit</h2>
            <h3 className="text-4xl font-bold font-serif text-gray-900 mb-6">Modern Stack for Modern Problems</h3>
            <p className="text-gray-600 text-lg">We use the most reliable and scalable technologies to ensure your product stands the test of time.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#ff7301] mb-8 group-hover:bg-[#ff7301] group-hover:text-white transition-all">
                  {React.cloneElement(item.icon, { className: "w-8 h-8" })}
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-6">{item.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {item.techs.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold border border-gray-100">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-[#ff7301] uppercase tracking-[0.3em] mb-4">Core Principles</h2>
              <h3 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight">Values that Drive <br />Every Single Line of Code</h3>
            </div>
            <p className="text-gray-500 hidden lg:block max-w-xs mb-2">We believe in building more than just software; we build foundations for the future.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-[#fcfcfd] p-10 rounded-[40px] border border-gray-100 hover:border-[#ff7301]/30 transition-all duration-300 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#ff7301] mb-8 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#292929]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ff7301] -skew-x-12 translate-x-1/2 opacity-20"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-serif text-white mb-8">Ready to Build Something <span className="text-[#ff7301]">Extraordinary?</span></h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
              Whether you have a fully-formed idea or just a spark of innovation, we're ready to bring it to life with precision and scale.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="/contact" className="px-10 py-5 bg-[#ff7301] text-white rounded-full font-bold hover:bg-[#e66700] transition-all shadow-xl shadow-[#ff7301]/25">
                Schedule a Consultation
              </a>
              <a href="/expertise" className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-md">
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

 
    </div>
  );
};

export default DiscoverCloudfirePage;
