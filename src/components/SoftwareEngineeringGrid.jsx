import React from 'react';

const offeringItems = [
  {
    title: 'Software Engineering Services We Offer',
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    image: '/service/services.png',
  },
  {
    title: 'Software Engineering Services We Offer',
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    image: '/service/services.png',
  },
  {
    title: 'Software Engineering Services We Offer',
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    image: '/service/services.png',
  },
  {
    title: 'Software Engineering Services We Offer',
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    image: '/service/services.png',
  },
  {
    title: 'Software Engineering Services We Offer',
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    image: '/service/services.png',
  },
];

const SoftwareEngineeringGrid = () => {
  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Decorative dot grid - background */}
         <div className="absolute top-10 left-10 w-32 h-32 opacity-10 pointer-events-none hidden lg:block">
            <div className="grid grid-cols-7 gap-3">
            {[...Array(49)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
            ))}
            </div>
        </div>

      <div className="mx-auto w-full max-w-[1340px] px-6 md:px-14">
        <h2 
            className="text-[#141414] text-center mb-12 md:mb-16 lg:mb-20 text-[32px] md:text-[48px] font-bold font-serif leading-[1.2]"
        >
          Software Engineering <br className="hidden md:block" /> Services We Offer
        </h2>


        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {offeringItems.slice(0, 3).map((item, i) => (
            <div
              key={i}
              className="group flex h-full flex-col rounded-[24px] bg-white p-6 shadow-[0_10px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="mb-8 aspect-video w-full overflow-hidden rounded-[16px]">
                <img
                  src={item.image}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={item.title}
                />
              </div>
              <div className="flex grow flex-col px-2 pb-2">
                <h3 className="mb-4 text-[22px] font-bold leading-tight text-[#141414]">
                  {item.title}
                </h3>
                <p className="mb-8 grow text-[15px] leading-relaxed text-[#666666] opacity-90">
                    {item.desc}
                </p>
                <button className="self-start rounded-[10px] bg-primary px-8 py-3 text-[15px] font-bold text-black transition-all hover:opacity-90 shadow-lg shadow-orange-500/20 active:scale-95">
                  Know more
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mx-auto lg:max-w-[880px]">
          {offeringItems.slice(3, 5).map((item, i) => (
            <div
              key={i}
              className="group flex h-full flex-col rounded-[24px] bg-white p-6 shadow-[0_10px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="mb-8 aspect-[1.5/1] w-full overflow-hidden rounded-[16px]">
                <img
                  src={item.image}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={item.title}
                />
              </div>
              <div className="flex grow flex-col px-2 pb-2">
                <h3 className="mb-4 text-[22px] font-bold leading-tight text-[#141414]">
                  {item.title}
                </h3>
                <p className="mb-8 grow text-[15px] leading-relaxed text-[#666666] opacity-90">
                    {item.desc}
                </p>
                <button className="self-start rounded-[10px] bg-primary px-8 py-3 text-[15px] font-bold text-black transition-all hover:opacity-90 shadow-lg shadow-orange-500/20 active:scale-95">
                  Know more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftwareEngineeringGrid;
