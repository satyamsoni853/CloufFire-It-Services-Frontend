import React from 'react';

const Achievements = () => {
  const achievements = [
    { icon: '/about/a 1-1.png', number: '14+', label: 'Year of Experience' },
    { icon: '/about/a 1-2.png', number: '600+', label: 'Happy Clients' },
    { icon: '/about/a 1-3.png', number: '250+', label: 'CMS Delivered' },
    { icon: '/about/a 1-4.png', number: '4.5', label: 'Service Rating' },
    { icon: '/about/a 1.png', number: '200+', label: 'LMS Delivered' },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="absolute right-0 top-0 hidden p-8 opacity-20 lg:block">
        <div className="grid grid-cols-6 gap-2">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-gray-400"></div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 hidden p-8 opacity-20 lg:block">
        <div className="grid grid-cols-6 gap-2">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-gray-400"></div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1340px] px-6 text-center sm:px-8 md:px-14 lg:px-16">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white rounded-[20px] border border-[#f0f0f0] shadow-[0_15px_45px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 p-8 w-full sm:w-[240px] md:w-[220px] lg:w-[230px] xl:w-[250px]"
            >
              <div className="mb-6 h-14 w-14 flex items-center justify-center shrink-0">
                <img src={item.icon} alt={item.label} className="h-full w-full object-contain" />
              </div>
              <div className="text-center">
                <h3 className="text-[34px] lg:text-[40px] font-serif font-bold text-primary leading-tight mb-2 italic">{item.number}</h3>
                <p className="text-[12px] font-sans font-bold text-gray-400 uppercase tracking-widest leading-tight">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
