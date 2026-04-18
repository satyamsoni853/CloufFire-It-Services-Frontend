import React from 'react';

const WhatMakesUsDifferent = () => {
  const items = [
    '10 Years In Industry',
    'Instant Response',
    'Quality Assurance',
    'Global Presence',
    'Dedicated Developers',
    'Client Priorities',
    'Happiest Clients',
    'Code Delivery Between Us',
    'Services Satisfactory',
  ];

  return (
    <section className="overflow-hidden bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1340px] px-6 md:px-14">
        <div className="mb-16 flex flex-col items-start justify-between gap-12 lg:flex-row">
          <h2 
            className="text-[#141414] lg:w-1/3 font-serif font-bold text-[48px] leading-[54px]"
          >
            What Makes <br /> Us Different
          </h2>
          <p 
            className="text-[#333333] lg:w-2/3 font-sans font-normal text-[18px] leading-[28px]"
          >
            Contact Skilled Developer From Virasat Answers For Getting Result-Oriented
            Solutions. Our Guaranteed Engineers Execute All Domains With A 100%
            Achievement Rate. We Generally Outperform Desires For Customers And
            Demonstrate That Redistributing Of Advancement And Support Industries To
            Virasat Services Is The Most Dependable And Moderate Choice. We Understand
            What Is Customer Satisfaction.
          </p>

        </div>

        <div className="relative overflow-hidden rounded-[20px] bg-[#FBB040] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const isLastInRow = (index + 1) % 3 === 0;
              const isLastRow = index >= 6;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center py-14 px-10 text-center transition-all duration-300 hover:bg-white/5
                    ${!isLastInRow ? 'lg:border-r border-white/20' : ''}
                    ${!isLastRow ? 'lg:border-b border-white/20' : ''}
                    ${(index + 1) % 2 !== 0 ? 'md:border-r md:border-white/20 lg:border-r-0' : ''}
                  `}
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl shadow-black/10">
                    <img
                      src="/services/icon.png"
                      alt="CloudFire Icon"
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <h3 className="text-[20px] font-serif font-bold text-white tracking-wide">{item}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatMakesUsDifferent;
