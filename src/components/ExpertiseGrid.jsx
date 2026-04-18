import React from 'react';

const expertiseItems = [
  {
    id: 1,
    title: "Mobile Apps",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_mobile-apps_p0aa 1.svg",
  },
  {
    id: 2,
    title: "UI/UX Design",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_proud-designer_1rcm 1.svg",
  },
  {
    id: 3,
    title: "Digital Commerce",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_mobile-payments_uate 1.svg",
  },
  {
    id: 4,
    title: "DevOps",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_maintenance_4unj 1.svg",
  },
  {
    id: 5,
    title: "Artificial Intelligence",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_artificial-intelligence_43qa 1.svg",
  },
  {
    id: 6,
    title: "Cloud",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_cloud-sync_h1ig 1.svg",
  },
  {
    id: 7,
    title: "Salesforce",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_business-decisions_7vkl 1.svg",
  },
  {
    id: 8,
    title: "OTT Platforms",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_data-reports_l2u3 1.svg",
  },
  {
    id: 9,
    title: "Blockchain",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_crypto-portfolio_mf2i 1.svg",
  },
  {
    id: 10,
    title: "AWS Services",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_database-tables_yft5 1.svg",
  },
  {
    id: 11,
    title: "Application Security",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_mobile-encryption_flk2 1.svg",
  },
  {
    id: 12,
    title: "E-Learning Solutions",
    desc: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
    image: "/Expertise/undraw_online-learning_tgmv 1.svg",
  },
];

const ExpertiseGrid = () => {
  return (
    <section className="bg-white py-20 md:py-28 relative overflow-hidden">
        {/* Decorative dot grid - background */}
         <div className="absolute top-10 right-10 w-32 h-32 opacity-10 pointer-events-none hidden lg:block">
            <div className="grid grid-cols-7 gap-3">
            {[...Array(49)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
            ))}
            </div>
        </div>

      <div className="container mx-auto px-6 max-w-[1240px]">
        <div className="mb-20">
          <h2 className="font-serif font-bold text-[32px] md:text-[48px] text-[#141414] mb-4">
            Our Expertise
          </h2>
          <p className="font-sans font-normal text-[18px] md:text-[20px] text-[#141414]/70">
             Your Satisfaction, Our Mission
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
          {expertiseItems.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col items-center group w-full"
            >
              {/* Illustration and Layout */}
              <div className="flex justify-center mb-[-60px] relative w-full h-auto max-w-[362px] aspect-362/318">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
 
               {/* Bottom Content Box */}
              <div className="rounded-[12px] px-8 pb-8 pt-20 text-left shadow-lg flex z-10 flex-col justify-start w-full md:w-[338px] min-h-[197px] bg-gradient-to-t from-[#ED862D] to-[#FBB040] max-w-full">
                <h3 className="text-[#141414] mb-3 leading-tight text-[22px] font-serif font-bold max-w-[280px]">
                  {item.title}
                </h3>
                <p className="text-[#141414]/90 text-[14px] font-sans font-normal leading-[1.6] max-w-[289.12px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExpertiseGrid;
