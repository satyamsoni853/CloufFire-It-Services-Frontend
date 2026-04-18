import React from 'react';

const Network = () => {
  return (
    <section id="network" className="bg-white py-12 text-center sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 md:px-14 lg:px-16">
        <h2 className="mb-6 font-serif text-[32px] font-bold leading-tight text-gray-900 sm:mb-4 sm:text-[48px]">
          A Truly Unique Global Cloud Network
        </h2>

        <p className="mx-auto mb-12 max-w-2xl px-4 font-sans text-sm font-normal leading-relaxed text-gray-500 sm:mb-20 sm:text-[18px] sm:leading-[24px]">
          Powering Innovation Across Industries With Cutting-Edge AI Talent Solutions
        </p>

        <div className="flex flex-col items-center gap-12 lg:grid lg:grid-cols-2">
          <div className="group relative order-1 flex w-full justify-center">
            <div className="relative w-full max-w-[657px]">
              <div className="absolute inset-0 scale-110 rounded-full bg-gray-50 opacity-50 blur-3xl"></div>
              <img
                src="/Assests/connected-world.svg"
                className="relative z-10 h-auto w-full object-contain opacity-100 transition-transform duration-1000 group-hover:scale-105"
                alt="Global Map"
              />
            </div>
          </div>

          <div className="order-2 w-full">
            <div className="grid grid-cols-2 items-center justify-center gap-4 sm:gap-6 lg:flex lg:flex-wrap lg:justify-center lg:gap-8">
              {[
                { val: '14+', label: 'Year of Experience' },
                { val: '600+', label: 'Happy Clients' },
                { val: '250+', label: 'CMS Delivered' },
                { val: '4.5', label: 'Service Rating' },
                { val: '200+', label: 'LMS Delivered' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex h-[110px] w-full flex-col items-center justify-center rounded-[20px] border border-gray-100/50 bg-white p-4 text-center shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-[136px] sm:p-6 lg:w-[266px] lg:p-8 ${
                    idx === 4 ? 'col-span-2 mx-auto max-w-[220px] sm:max-w-[280px] lg:max-w-none' : ''
                  }`}
                >
                  <h3 className="mb-1 font-sans text-[28px] font-bold leading-tight text-[#ffb44a] sm:text-[47px]">
                    {stat.val}
                  </h3>
                  <p className="px-1 font-sans text-[10px] font-normal uppercase tracking-wider text-gray-500 sm:text-[16px] sm:capitalize sm:tracking-normal">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Network;

