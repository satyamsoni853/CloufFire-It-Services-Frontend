import React from 'react';

const Interview = () => {
  return (
    <section className="py-12 sm:py-24 bg-white text-center">
      <div className="max-w-[1270px] mx-auto px-6">
        {/* Main Heading */}
        <h2 className="font-serif text-[32px] md:text-[48px] font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
          Experience The Future Of Interviews
        </h2>
        
        {/* Main Subtitle */}
        <p className="font-sans text-base sm:text-[18px] leading-relaxed text-gray-500 max-w-3xl mx-auto mb-12 sm:mb-20 opacity-80">
          Our AI-Powered Interview System Provides In-Depth Candidate Evaluation With Real-Time Analysis, Helping You Make Better Hiring Decisions Faster.
        </p>
        
        {/* The Main "2-Box" Container Card */}
        <div className="bg-white rounded-[40px] p-4 sm:p-[31px] shadow-[0_30px_100px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col lg:flex-row gap-8 lg:gap-0 w-full max-w-[1280px] h-auto lg:h-[709px] mx-auto overflow-hidden text-left relative before:absolute before:inset-0 before:rounded-[40px] before:border-t-2 before:border-t-white before:pointer-events-none">
          
          {/* Left Column (Orange Box) */}
          <div className="w-full lg:w-[566px] h-auto lg:h-[647px] bg-primary p-8 sm:p-10 lg:p-14 rounded-[30px] lg:rounded-none text-white flex flex-col justify-center shrink-0">
            <h3 className="font-serif text-[28px] sm:text-[32px] font-bold mb-8 lg:mb-12 leading-tight">
              Book Your Free AI Interview Today
            </h3>
            
            <div className="space-y-6 sm:space-y-10">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex gap-4 sm:gap-6 items-start">
                  <div className="bg-white p-2.5 sm:p-3 rounded-xl shadow-lg shrink-0">
                    <img src="/Assests/icon.png" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" alt="Benefit Icon" />
                  </div>
                  <div>
                    <div className="font-sans font-bold text-base sm:text-[18px] leading-tight mb-2 text-white">
                      Lorem Ipsum Is Simply Dummy Text
                    </div>
                    <div className="font-sans font-normal text-sm sm:text-[14px] leading-relaxed text-white/90">
                      Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Form) */}
          <div className="flex-1 p-6 sm:p-10 lg:p-16 bg-white flex flex-col justify-start">
            <h3 className="font-serif text-[28px] sm:text-[32px] font-bold mb-8 lg:mb-10 text-gray-900 leading-tight">
              Schedule Your Free AI Interview
            </h3>
            
            <form className="space-y-6 sm:space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="block font-sans font-semibold text-[14px] text-gray-600 ml-1">Full Name</label>
                <input type="text" placeholder="Name" className="w-full px-5 py-3 sm:px-6 sm:py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f7941d] focus:border-transparent outline-none transition-all placeholder:text-gray-300" />
              </div>
              
              <div className="space-y-2">
                <label className="block font-sans font-semibold text-[14px] text-gray-600 ml-1">Email Address</label>
                <input type="email" placeholder="email@gmail.com" className="w-full px-5 py-3 sm:px-6 sm:py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f7941d] focus:border-transparent outline-none transition-all placeholder:text-gray-300" />
              </div>
              
              <div className="space-y-2 text-left">
                <label className="block font-sans font-semibold text-[14px] text-gray-600 ml-1">Phone Number</label>
                <input type="text" placeholder="+0 123 456 789" className="w-full px-5 py-3 sm:px-6 sm:py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f7941d] focus:border-transparent outline-none transition-all placeholder:text-gray-300" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-2 text-left">
                  <label className="block font-sans font-semibold text-[14px] text-gray-600 ml-1">Job Role</label>
                  <div className="relative">
                    <select className="w-full px-5 py-3 sm:px-6 sm:py-4 bg-white border border-gray-200 rounded-xl outline-none appearance-none cursor-pointer text-gray-400 focus:ring-2 focus:ring-[#f7941d]">
                      <option>Select Job Role</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#f7941d] text-xs">▼</div>
                  </div>
                </div>
                <div className="flex-1 space-y-2 text-left">
                  <label className="block font-sans font-semibold text-[14px] text-gray-600 ml-1">Experience Level</label>
                  <div className="relative">
                    <select className="w-full px-5 py-3 sm:px-6 sm:py-4 bg-white border border-gray-200 rounded-xl outline-none appearance-none cursor-pointer text-gray-400 focus:ring-2 focus:ring-[#f7941d]">
                      <option>Select Experience</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#f7941d] text-xs">▼</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 sm:pt-6">
                <button type="submit" className="w-full bg-primary text-black py-4 sm:py-5 rounded-xl font-sans font-bold text-base sm:text-[17px] hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                  Schedule My Free AI Interview <span className="text-[10px]">▶</span>
                </button>
                <p className="text-[12px] text-center mt-6 text-gray-400 font-medium">
                  By submitting, you agree to our <span className="text-primary font-bold underline cursor-pointer">Privacy Policy</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interview;
