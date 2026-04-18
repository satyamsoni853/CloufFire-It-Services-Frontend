import React, { useState } from 'react';

const faqItems = [
  {
    title: 'Initial Consultation',
    content: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged."
  },
  { title: 'Finance', content: 'We help you optimize financial systems with state-of-the-art software solutions.' },
  { title: 'Finance', content: 'We help you optimize financial systems with state-of-the-art software solutions.' },
  { title: 'Finance', content: 'We help you optimize financial systems with state-of-the-art software solutions.' },
  { title: 'Finance', content: 'We help you optimize financial systems with state-of-the-art software solutions.' },
  { title: 'Finance', content: 'We help you optimize financial systems with state-of-the-art software solutions.' }
];

const SoftwareEngineeringFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="font-serif font-bold text-[36px] md:text-[52px] text-gray-900 text-center mb-20 leading-tight">
          Our Software Engineering Services Help You
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Accordions */}
          <div className="space-y-4">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div 
                  key={i} 
                  className={`border-none rounded-2xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.03)] transition-all duration-300 ${isOpen ? 'bg-white shadow-[0_15px_45px_rgba(0,0,0,0.08)]' : 'bg-[#F5F5F5]'}`}
                >
                  <button 
                    className="w-full flex items-center justify-between p-5 sm:p-7 text-left group"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <span className={`font-[Georgia] font-normal text-[18px] sm:text-[20px] leading-tight md:leading-[12px] transition-colors ${isOpen ? 'text-[#ff7301]' : 'text-[#333]'}`}>
                      {item.title}
                    </span>
                    <span className={`text-3xl font-light transition-transform ${isOpen ? 'rotate-0 text-[#ff7301]' : 'rotate-0 text-[#ff7301]'}`}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-7 pb-10">
                      <p className="font-sans font-normal text-[18px] leading-[26px] text-gray-600">
                        {item.content}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Large Image */}
          <div className="rounded-[40px] overflow-hidden shadow-2xl w-full max-w-[570px] h-auto md:h-[762px] mx-auto">
            <img 
              src="/service/helpyou.png" 
              className="w-full h-full object-cover" 
              alt="Software Engineering Services" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftwareEngineeringFAQ;

