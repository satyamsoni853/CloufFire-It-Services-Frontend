import React from 'react';

const industryCards = [
  {
    id: 1,
    title: "IT",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.",
    image: "/Industries/undraw_in-the-zone_07y7 1.svg",
  },
  {
    id: 2,
    title: "Healthcare",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.",
    image: "/Industries/undraw_medicine_hqqg 1.svg",
  },
  {
    id: 3,
    title: "Finance",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.",
    image: "/Industries/undraw_finance_m6vw 1.svg",
  },
  {
    id: 4,
    title: "Retail",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.",
    image: "/Industries/undraw_online-shopping_po8w 1.svg",
  },
  {
    id: 5,
    title: "Manufacturing",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.",
    image: "/Industries/undraw_factory_4d61 1.svg",
  },
  {
    id: 6,
    title: "Education",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.",
    image: "/Industries/undraw_education_3vwh 1.svg",
  },
];

const IndustriesServe = () => {
  return (
    <section className="bg-white py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-[#141414] text-[32px] md:text-[48px] font-bold font-serif leading-[1.2]">
            Industries We Serve
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-12 lg:gap-16">
          {industryCards.map((card) => (
            <div 
              key={card.id} 
              className="group rounded-[20px] p-8 md:p-10 text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden flex flex-col items-center justify-center bg-[#E6EDFF] w-full md:w-[401px] h-auto min-h-[450px] lg:h-[490px] max-w-full"
            >
              <img 
                src="/Industries/BG3.png" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover  "
              />
              
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="flex justify-center mb-8 w-full max-w-[308px] aspect-308/270">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <h3 className="text-[#141414] mb-3 text-[24px] md:text-[28px] font-serif font-normal">
                  {card.title}
                </h3>
                <p className="text-[#141414]/70 max-w-[280px] text-[14px] md:text-[15px] font-sans font-normal leading-[22px]">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustriesServe;
