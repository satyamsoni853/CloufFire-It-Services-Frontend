import React from 'react';

const testimonials = [
  {
    text: "Quick, attentive to their customers' needs, caring and compassionate. Will be using them for all my A/C needs from now on. No ifs, ands, or buts about it.",
    author: 'Freddie Wes',
    rating: 4,
  },
  {
    text: "Fast response and very professional and honest service. We called for an inspection and estimate on possible repairs as we're trying to sell our home.",
    author: 'Bielka Gonzalez',
    rating: 5,
  },
  {
    text: 'I recently used All Year Cooling for service of cleaning of my ducts. The entire process was smooth and the team was super responsive. Mauricio deserves a raise!',
    author: 'Evergreen Health',
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#FAFBFF] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 md:px-14 lg:px-16">
        <h2 className="mb-12 text-center font-serif text-[34px] font-bold text-gray-900 sm:text-[42px] md:mb-16 md:text-[54px]">
          Our Testimonials
        </h2>

        <div className="ticker-mask relative overflow-hidden pt-4">
          <div className="animate-[ticker_40s_linear_infinite] flex w-max gap-6 hover:pause-hover lg:gap-10">
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="flex h-full w-[350px] shrink-0 flex-col justify-between rounded-sm border border-gray-100 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-xl sm:w-[409.91px] sm:p-8"
              >
                <div className="mb-4 overflow-hidden">
                  <div className="mb-4">
                    <svg width="40" height="28" viewBox="0 0 60 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.3 42L24.3 0H12L3 42H15.3ZM42.3 42L51.3 0H39L30 42H42.3Z" fill="#F7941D" />
                    </svg>
                  </div>

                  <p className="font-sans text-base leading-relaxed text-[#333] sm:text-[17px]">
                    {t.text}
                  </p>
                </div>

                <div className="shrink-0">
                  <div className="mb-4 h-[1px] w-full bg-gray-200"></div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-serif text-base font-bold text-[#222] sm:text-[17px]">
                      {t.author}
                    </span>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill={idx < t.rating ? '#FFD700' : '#E0E0E0'}>
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

