import React, { useState } from 'react';

const HireTalent = () => {
  const [activeTab, setActiveTab] = useState('hire');

  const content = {
    hire: {
      heading: (
        <>
          Hire Talent Without<br />
          <span className="block">Notice Period</span>
        </>
      ),
      description: "Access Immediate Joiners From A Pool Of Full-Time Employees Shared By 800+ IT Companies Like Yours To Hire Them On Project Basis",
      buttonText: "Post Job",
      img: "/Assests/hiring.svg"
    },
    share: {
      heading: (
        <>
          Share Talent &amp;<br />
          <span className="block">Generate Revenue</span>
        </>
      ),
      description: "Deploy your benched IT professionals to promising projects instantly. Share your expertise and create new revenue streams for your organization.",
      buttonText: "Share Resource",
      img: "/Assests/hiring.svg"
    }
  };

  const currentContent = content[activeTab];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-[1270px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Header & Toggle Section (Order 1 on Mobile, Right side on Desktop) */}
          <div className="flex-1 order-1 md:order-2 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Toggle Button */}
            <div 
              className="inline-flex bg-white rounded-full p-1 mb-8 border border-gray-100 shadow-xl shadow-gray-200/50 relative"
              style={{ width: '337px', height: '60px' }}
            >
              <div 
                className="absolute top-1 bottom-1 bg-[#fbb03b] rounded-full transition-all duration-300 shadow-lg shadow-orange-500/20"
                style={{ 
                  left: activeTab === 'hire' ? '4px' : 'calc(50% + 4px)',
                  width: '165px'
                }}
              ></div>
              <button 
                onClick={() => setActiveTab('hire')}
                className={`relative rounded-full transition-colors z-10 flex items-center justify-center whitespace-nowrap`}
                style={{ 
                  width: '165px', 
                  height: '100%',
                  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '26px',
                  color: activeTab === 'hire' ? 'black' : '#6b7280'
                }}
              >
                HIRE TALENT
              </button>
              <button 
                onClick={() => setActiveTab('share')}
                className={`relative rounded-full transition-colors z-10 flex items-center justify-center whitespace-nowrap`}
                style={{ 
                  width: '165px', 
                  height: '100%',
                  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '26px',
                  color: activeTab === 'share' ? 'black' : '#6b7280'
                }}
              >
                SHARE TALENT
              </button>
            </div>

            <h2 className="text-[48px] font-serif font-bold text-gray-900 leading-[1.1] mb-8 transition-opacity duration-300">
              {currentContent.heading}
            </h2>
            
            {/* Desktop-only description & button (Hidden on Mobile) */}
            <div className="hidden md:block">
              <p className="text-[18px] text-[#5f5f5f] leading-relaxed mb-12 max-w-lg font-medium transition-opacity duration-300">
                {currentContent.description}
              </p>
              <button className="bg-primary text-black px-12 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-orange-500/40 transition-transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-orange-500/20">
                {currentContent.buttonText}
              </button>
            </div>
          </div>

          {/* Imaging Section (Order 2 on Mobile, Left side on Desktop) */}
          <div className="flex-1 order-2 md:order-1 relative flex justify-center">
            <div className="relative w-full max-w-xl transition-transform hover:scale-105 duration-700">
              <img 
                src={currentContent.img} 
                className="w-full h-auto" 
                alt="Illustration" 
              />
            </div>
          </div>

          {/* Mobile-only description & button (Order 3 on Mobile, Hidden on Desktop) */}
          <div className="md:hidden order-3 flex flex-col items-center text-center">
            <p className="text-[18px] text-[#5f5f5f] leading-relaxed mb-10 max-w-lg font-medium transition-opacity duration-300 px-4">
              {currentContent.description}
            </p>
            <button className="bg-primary text-black px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
              {currentContent.buttonText}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HireTalent;
