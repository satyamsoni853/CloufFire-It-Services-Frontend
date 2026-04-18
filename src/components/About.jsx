import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-white text-center">
      <div className="max-w-[1040px] mx-auto px-4">
        <h2 className="font-serif text-[48px] font-bold text-[#111] mb-2 leading-tight">About US</h2>
        <p className="font-sans text-[18px] font-normal text-[#5f5f5f] leading-6 mb-10">Your Satisfaction, Our Mission</p>
        
        <div className="space-y-6">
          <p className="font-sans text-[18px] sm:text-[20px] leading-relaxed font-normal text-[#333] max-w-[900px] mx-auto">
            Virasat Solutions is a leading and skilled LMS, eLearning & eCommerce application Development Company. We have dedicated and passionate teams to cater to each and every aspect of your business.
          </p>
          
          <p className="font-sans text-[18px] sm:text-[20px] leading-relaxed font-normal text-[#333] max-w-[900px] mx-auto">
            Whether be it LMS design/development, e-Commerce applications, Moodle development, or CMS Development, we will assist you in all areas across the board.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
