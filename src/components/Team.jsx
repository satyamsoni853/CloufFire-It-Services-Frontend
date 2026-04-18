import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { teamMembers } from '../data/teamData';

const TeamModal = ({ member, onClose }) => {
  if (!member) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl w-full max-w-[600px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-gray-900 text-3xl transition-colors">&times;</button>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[260px] h-64 md:h-auto bg-gray-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 p-8">
            <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden">
               <img src={member.image} className="w-full h-full object-cover" alt={member.name} />
            </div>
          </div>
          <div className="flex-1 p-8 md:p-10 text-left">
            <span className="font-sans font-bold text-xs text-primary uppercase tracking-widest block mb-1">{member.role}</span>
            <h3 className="font-serif font-bold text-[32px] text-gray-900 leading-tight mb-4">{member.name}</h3>
            <p className="text-gray-600 font-sans text-[15px] leading-relaxed mb-8">
              {member.bio || "Leading our initiatives with deep technical expertise and a passion for innovation. Committed to delivering world-class AI solutions that transform businesses and empower teams globally."}
            </p>
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-colors cursor-pointer">in</div>
               <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-colors cursor-pointer">f</div>
               <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-colors cursor-pointer">𝕏</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section className="relative bg-white py-16 md:py-20 lg:py-24">
      {/* Background Dots */}
      <div className="absolute right-10 top-10 hidden opacity-20 md:block">
        <div className="grid grid-cols-6 gap-2">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-gray-400"></div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1340px] px-6 sm:px-8 md:px-14 lg:px-16">
        <h2 className="mb-12 text-center text-[34px] font-bold text-gray-900 sm:text-[42px] md:mb-16 md:text-5xl lg:mb-20">
          Our Team
        </h2>

        <div className="mx-auto mb-12 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
          {teamMembers.map((member, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div
                className={`relative mb-5 h-36 w-36 rounded-full p-1.5 transition-transform duration-300 group-hover:scale-105 sm:h-52 sm:w-52 md:mb-6 md:h-64 md:w-64 lg:h-72 lg:w-72 ${
                  member.highlight
                    ? 'border-[3.5px] border-primary shadow-[0_15px_40px_rgba(255,115,1,0.15)]'
                    : 'border-2 border-transparent hover:border-primary/30'
                }`}
              >
                <div className="h-full w-full overflow-hidden rounded-full border-2 border-white shadow-inner">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full border-[3.5px] border-primary bg-white text-primary shadow-xl transition-all group-hover:scale-110 active:scale-95 sm:bottom-4 sm:right-4 sm:h-14 sm:w-14">
                  <span className="text-2xl font-bold sm:text-3xl">+</span>
                </div>
              </div>

              <div className="text-center">
                <h3
                  className={`mb-1 text-[18px] sm:text-[24px] font-serif font-bold transition-colors ${
                    member.highlight ? 'text-primary' : 'text-gray-900 group-hover:text-primary'
                  }`}
                >
                  {member.name}
                </h3>
                <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-primary/80 sm:text-[14px]">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedMember && <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />}

        <div className="mt-12 flex justify-center">
          <Link
            to="/team"
            className="flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-base font-bold text-black shadow-xl shadow-orange-500/20 transition-all hover:shadow-orange-500/40 hover:-translate-y-1 active:scale-[0.98] sm:px-12 sm:text-lg"
          >
            Our Team
            <span className="text-[10px]">▶</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Team;
