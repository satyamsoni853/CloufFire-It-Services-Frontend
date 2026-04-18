import React from 'react';

const ExpertiseIntro = () => {
    return (
        <section className="bg-white py-20 md:py-24">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-center max-w-[1400px]">
                
                {/* Left side: Images & Badge */}
                <div className="flex justify-center md:justify-start">
                    <img 
                        src="/Expertise/Group 1321314690.png" 
                        alt="Experts Advice Composition" 
                        className="w-full max-w-[578px] aspect-578/703 object-contain drop-shadow-xl"
                    />
                </div>

                {/* Right side: Text content */}
                <div className="max-w-2xl">
                    <span className="block text-primary mb-4 uppercase text-[16px] md:text-[18px] font-bold font-sans leading-[28px]">
                        EXPERIENCE
                    </span>
                    <h2 className="text-[#141414] mb-8 text-[32px] md:text-[48px] font-bold font-serif leading-[1.2]">
                        Advice From <br className="hidden md:block" /> Our Experts
                    </h2>
                    
                    <div className="space-y-6 text-[#141414]/70 font-sans font-normal text-[15px] leading-[22px]">
                        {[...Array(4)].map((_, i) => (
                           <p key={i}>
                                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.
                           </p>
                        ))}
                    </div>

                </div>
            </div>
            
             {/* Decorative pattern at bottom right */}
             <div className="absolute bottom-0 right-[5%] w-32 h-32 opacity-10 pointer-events-none hidden lg:block">
                <div className="grid grid-cols-5 gap-3">
                    {[...Array(25)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpertiseIntro;
