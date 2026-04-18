import React from 'react';

const peopleWorkItems = [
  {
    id: 1,
    title: "Skilled Developers",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 3.png",
  },
  {
    id: 2,
    title: "Customer Satisfaction",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 31.png",
  },
  {
    id: 3,
    title: "Instant Response",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 33.png",
  },
  {
    id: 4,
    title: "Quality Assurance",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 34.png",
  },
];

const WorkWithPeople = () => {
    return (
        <section className="bg-white py-24 md:py-32 relative overflow-hidden">
            
            {/* Dot grid decoration */}
            <div className="absolute top-10 right-10 w-32 h-32 opacity-10 pointer-events-none hidden lg:block">
                <div className="grid grid-cols-7 gap-3">
                {[...Array(49)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
                ))}
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-20">
                    <h2 
                      className="text-[#141414] text-[32px] md:text-[48px] font-bold font-serif leading-[54px]"
                    >
                        What Work With Our People
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-8 lg:gap-12 max-w-[1100px] mx-auto">
                    {peopleWorkItems.map((item) => (
                        <div 
                          key={item.id} 
                          className="bg-white p-8 md:p-12 rounded-[12px] shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col items-start text-left w-full lg:w-[503px] min-h-[335px] max-w-full"
                        >
                            <div className="w-20 h-20 bg-[#FBB040] rounded-[10px] mb-8 flex items-center justify-center shadow-md">
                                <img 
                                  src={item.icon} 
                                  alt={item.title} 
                                  className="w-12 h-12 object-contain" 
                                />
                            </div>
                            <h3 className="font-serif font-bold text-[28px] mb-[16px] text-[#141414]">
                                {item.title}
                            </h3>
                            <p className="font-sans font-normal text-[15px] leading-[1.6] text-[#141414]/70">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WorkWithPeople;
