import React from 'react';

const offeringItems = [
  {
    title: 'E-Commerce',
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged.",
    icon: '/services/icon.png',
  },
  {
    title: 'E-Learning',
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged.",
    icon: '/services/icon.png',
  },
  {
    title: 'Framework',
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged.",
    icon: '/services/icon.png',
  },
  {
    title: 'CMS',
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged.",
    icon: '/services/icon.png',
  },
  {
    title: 'Moodle',
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged.",
    icon: '/services/icon.png',
  },
  {
    title: 'Drupal',
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged.",
    icon: '/services/icon.png',
  },
];

const CloudfireOfferings = () => {
  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Decorative dot grid - background */}
         <div className="absolute top-10 right-10 w-32 h-32 opacity-10 pointer-events-none hidden lg:block">
            <div className="grid grid-cols-7 gap-3">
            {[...Array(49)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
            ))}
            </div>
        </div>

      <div className="mx-auto w-full max-w-[1340px] px-6 md:px-14">
        <h2 className="text-[#141414] text-center mb-12 md:mb-16 text-[32px] md:text-[48px] font-bold font-serif leading-[1.2]">
          Services Offline By <br className="hidden md:block" /> Cloudfire
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16">
          {offeringItems.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center px-8 ${
                (i + 1) % 3 !== 0 ? 'lg:border-r border-gray-100' : ''
              } ${
                (i + 1) % 2 !== 0 && i < 6 ? 'md:border-r lg:border-r-0' : ''
              }`}
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <img src={item.icon} className="h-8 w-8 object-contain" alt={item.title} />
              </div>
              <h3 className="text-[#141414] mb-4 font-serif font-bold text-[23px] leading-[30px]">
                {item.title}
              </h3>
              <p className="text-[#666666] max-w-[320px] font-sans font-normal text-[15px] leading-[22px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CloudfireOfferings;
