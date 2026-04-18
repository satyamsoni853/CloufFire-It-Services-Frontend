import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { teamMembers } from '../data/teamData';

const TeamMemberPage = () => {
  const { slug } = useParams();
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-white pt-34 pb-20">
      

      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 md:px-14 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Avatar */}
          <div className="relative">
            <div className={`aspect-square w-full rounded-[40px] overflow-hidden border-8 border-white shadow-2xl ${member.highlight ? 'ring-4 ring-primary' : 'ring-1 ring-gray-100'}`}>
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Social Links Overlay or Below */}
            <div className="mt-8 flex justify-center gap-4">
              <a href={member.linkedin} className="h-12 w-12 flex items-center justify-center rounded-full bg-[#f8f9fa] text-[#0077b5] hover:bg-primary hover:text-white transition-all duration-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href={member.twitter} className="h-12 w-12 flex items-center justify-center rounded-full bg-[#f8f9fa] text-[#1da1f2] hover:bg-primary hover:text-white transition-all duration-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="flex flex-col">
            <span className="text-primary font-bold uppercase tracking-[4px] text-sm mb-4">Meet Our Best</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-4 leading-tight">
              I am {member.name}
            </h1>
            <p className="text-xl text-primary font-medium mb-10 italic">
              {member.role}
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-primary"></span>
                  Professional Bio
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed font-sans">
                  {member.bio}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-primary"></span>
                  Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {member.expertise.map((skill, si) => (
                    <span key={si} className="px-5 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-gray-100">
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-secondary px-8 py-4 text-white font-bold hover:bg-primary transition-all duration-300 transform hover:-translate-y-1">
                Collaborate with Me
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TeamMemberPage;
