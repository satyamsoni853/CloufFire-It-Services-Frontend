import React from 'react';

const serviceCards = [
  {
    id: 1,
    title: "Development",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 2.png",
  },
  {
    id: 2,
    title: "Hosting",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 3.png",
  },
  {
    id: 3,
    title: "Integration",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 21.png",
  },
  {
    id: 4,
    title: "Theme",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 22.png",
  },
  {
    id: 5,
    title: "Support",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 23.png",
  },
  {
    id: 6,
    title: "Security",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 24.png",
  },
  
];

const MoodleServices = () => {
    return (
        <section 
          className="relative pt-16 pb-32 md:pt-24 md:pb-64 rounded-b-[50%_20%] lg:rounded-b-[50%_15%] overflow-hidden bg-gradient-to-b from-[#FBB040] to-[#ED862D] min-h-[788px]"
        >
            <div className="container mx-auto px-6 relative z-10 max-w-[1300px]">
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-[#141414] mb-4 text-[32px] md:text-[48px] font-bold font-serif leading-[1.2]">
                        Our Moodle Development services
                    </h2>
                    <p className="font-sans font-normal leading-[24px] text-[#141414] text-[16px] md:text-[18px]">
                        Find answers to all of your questions here
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                   {serviceCards.map((card) => (
                       <div 
                         key={card.id} 
                         className="bg-white rounded-[12px] flex flex-col items-center justify-center text-center shadow-lg group hover:shadow-2xl transition-all duration-300 w-full md:w-[400px] h-[160px] max-w-full"
                       >
                           <div className="w-16 h-16 mb-2 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                               <img 
                                 src={card.icon} 
                                 alt={card.title} 
                                 className="w-full h-full object-contain [filter:invert(53%)_sepia(85%)_saturate(1352%)_hue-rotate(345deg)_brightness(101%)_contrast(97%)]"
                               />
                           </div>
                           <h3 className="font-serif font-bold text-[20px] text-[#141414]">
                               {card.title}
                           </h3>
                       </div>
                   ))}
                </div>

            </div>
            


            {/* Decorative dot grid - bottom right */}
            <div className="absolute bottom-10 right-10 w-40 h-40 opacity-10 pointer-events-none hidden lg:block">
                <div className="grid grid-cols-7 gap-3">
                    {[...Array(49)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-gray-900 rounded-full"></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MoodleServices;

