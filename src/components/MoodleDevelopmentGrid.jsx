import React from 'react';

const serviceCards = [
  {
    id: 1,
    type: "text",
    content: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since."
  },
  {
    id: 2,
    type: "card",
    title: "Development",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 2.png",
  },
  {
    id: 3,
    type: "card",
    title: "Hosting",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 3.png",
  },
  {
    id: 4,
    type: "card",
    title: "Integration",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 21.png",
  },
  {
    id: 5,
    type: "card",
    title: "Theme",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 22.png",
  },
  {
    id: 6,
    type: "card",
    title: "Support",
    icon: "/Industries/donate-icon-in-black-colors-donation-signs-illustration-png 23.png",
  }
];

const MoodleDevelopmentGrid = () => {
    return (
        <section 
          className="relative bg-primary pt-24 pb-48 md:pt-32 md:pb-64 lg:pt-40 lg:pb-80 overflow-hidden [clip-path:ellipse(100%_85%_at_50%_15%)]" 
        >
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-secondary mb-6 leading-tight">
                        Our Moodle Development Services
                    </h2>
                    <p className="text-secondary/80 font-medium text-lg">
                        Find Answers To All Of Your Questions Here
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                   {serviceCards.map((card) => {
                       if (card.type === 'text') {
                           return (
                               <div key={card.id} className="bg-white rounded-4xl p-8 md:p-12 flex items-center justify-center shadow-lg transform hover:scale-[1.02] transition-transform">
                                   <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
                                       {card.content}
                                   </p>
                               </div>
                           );
                       }
                       return (
                           <div key={card.id} className="bg-white rounded-4xl p-10 md:p-14 flex flex-col items-center justify-center text-center shadow-xl group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                               <div className="w-20 h-20 md:w-24 md:h-24 mb-8 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                                   <img 
                                     src={card.icon} 
                                     alt={card.title} 
                                     className="w-full h-full object-contain"
                                   />
                               </div>
                               <h3 className="text-2xl md:text-3xl font-serif font-black text-secondary leading-tight">
                                   {card.title}
                               </h3>
                           </div>
                       );
                   })}
                </div>
            </div>
            
            {/* Background Decorative patterns */}
            <div className="absolute top-20 right-0 w-96 h-96 opacity-10 pointer-events-none -translate-x-24">
                <img src="/Industries/BG1.png" alt="" className="w-full h-full object-contain rotate-45" />
            </div>
             <div className="absolute top-1/2 left-0 w-64 h-64 opacity-10 pointer-events-none translate-x-12">
                <img src="/Industries/BG2.png" alt="" className="w-full h-full object-contain" />
            </div>
        </section>
    );
};

export default MoodleDevelopmentGrid;
