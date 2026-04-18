import React, { useState } from 'react';

const offers = [
  {
    title: 'Rapid AI Talent Deployment',
    subtitle: 'We Offer Unlimited Moodle',
    content: 'Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry\'s Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged.'
  },
  {
    title: 'Global Delivery Excellence',
    subtitle: 'Expert Scaling Teams',
    content: 'Our global team ensures that you have access to top-tier talent regardless of geographic location. We maintain rigorous standards for vetting and onboarding to ensure seamless integration into your existing workflows. It has survived not only five centuries, but also the leap into electronic typesetting.'
  },
  {
    title: 'Secure Scalable Solutions',
    subtitle: 'Enterprise Ready Systems',
    content: 'Security is at the heart of everything we build. Our solutions are designed to scale with your business while maintaining the highest levels of data protection and compliance with international standards. Our team of experts works around the clock to ensure your platform\'s integrity.'
  }
];

const CoreOfferings = () => {
  const [activeOffer, setActiveOffer] = useState('Rapid AI Talent Deployment');
  const currentOffer = offers.find(o => o.title === activeOffer);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1270px] mx-auto px-6 flex flex-col items-center">
        {/* Main Title */}
        <h2 className="font-serif font-bold text-[32px] sm:text-[48px] mb-4 text-center text-gray-900 leading-tight">
          Core Offerings
        </h2>
        
        {/* Subtitle */}
        <p className="font-sans font-normal text-sm sm:text-[18px] leading-[24px] text-center text-gray-500 mb-12 sm:mb-16 max-w-2xl px-4">
          Comprehensive AI Solutions To Transform Your Talent Acquisition Strategy
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[30px] items-start justify-center w-full">
          
          {/* Left List (Small boxes) */}
          <div className="flex flex-col gap-5 w-full lg:w-[380px] shrink-0">
            {offers.map((offer) => {
              const isActive = activeOffer === offer.title;
              return (
                <React.Fragment key={offer.title}>
                  <div 
                    className={`w-full lg:w-[380px] min-h-[170px] p-6 sm:p-8 rounded-[20px] cursor-pointer transition-all duration-300 text-left border-2 flex flex-col justify-between ${
                      isActive 
                        ? 'bg-white border-[#ff7301] shadow-[0_15px_40px_rgba(255,115,1,0.15)]' 
                        : 'bg-white border-gray-100 shadow-sm hover:border-gray-200'
                    }`}
                    onClick={() => setActiveOffer(offer.title)}
                  >
                    <div className="flex items-start gap-5">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg text-2xl shrink-0">
                          <img src="/Assests/icon.png" className="w-6 h-6 object-contain" alt="offer icon" />
                       </div>
                       <div className="pt-1">
                         <div className="font-serif font-bold text-[18px] leading-tight text-gray-900 mb-1">
                           {offer.title}
                         </div>
                         <div className="font-sans font-normal text-[14px] leading-relaxed text-gray-500">
                           {offer.subtitle}
                         </div>
                       </div>
                    </div>
                    <div className={`mt-4 flex items-center gap-2 font-sans font-semibold text-[14px] ${
                      isActive ? 'text-[#ff7301]' : 'text-gray-400'
                    }`}>
                      Learn more <span className="text-[10px]">▶</span>
                    </div>
                  </div>

                  {/* Mobile inline expanded detail — only visible on mobile when active */}
                  {isActive && (
                    <div className="block lg:hidden w-full bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-left">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-6 shrink-0">
                         <img src="/Assests/icon.png" className="w-8 h-8 object-contain" alt="Current Highlight" />
                      </div>
                      
                      <h3 className="font-serif font-bold text-xl text-gray-900 mb-4 leading-tight">
                        {offer.title}
                      </h3>
                      
                      <div className="font-sans font-normal text-[15px] leading-relaxed text-gray-600">
                        <p className="mb-4">{offer.content}</p>
                        <p>{offer.content}</p>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right Detail (Large box) — hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex w-full lg:w-[860px] h-auto lg:h-[550px] bg-white p-8 sm:p-14 rounded-[30px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] text-left flex-col items-start">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-8 sm:mb-12 shrink-0">
               <img src="/Assests/icon.png" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" alt="Current Highlight" />
            </div>
            
            <h3 className="font-serif font-bold text-2xl sm:text-[28px] text-gray-900 mb-6 sm:mb-8 leading-tight">
              {currentOffer.title}
            </h3>
            
            <div className="space-y-6 overflow-y-auto w-full">
              <div className="font-sans font-normal text-base sm:text-[18px] leading-relaxed sm:leading-[26px] text-gray-600">
                <p className="mb-6">{currentOffer.content}</p>
                <p>{currentOffer.content}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoreOfferings;

