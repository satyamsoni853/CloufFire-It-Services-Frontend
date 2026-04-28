import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-white text-center">
      <div className="max-w-[1040px] mx-auto px-4">
        <h2 className="font-serif text-[48px] font-bold text-[#111] mb-2 leading-tight">About US</h2>
        <p className="font-sans text-[18px] font-normal text-[#5f5f5f] leading-6 mb-6">Your Satisfaction, Our Mission</p>
        
        <div className="space-y-6">
          <p className="font-sans text-[18px] sm:text-[20px] leading-relaxed font-normal text-[#333] max-w-[900px] mx-auto">
            Virasat Solutions a leading and skilled LMS, eLearning &amp; eCommerce application Development Company. We, at Virasat Solutions, have dedicated and passionate teams to cater to each and every aspect of your eLearning &amp; eCommerce business.
          </p>
          
          <p className="font-sans text-[18px] sm:text-[20px] leading-relaxed font-normal text-[#333] max-w-[900px] mx-auto">
            Whether be it LMS (Learning Management System) design and development, e-Commerce web and mobile applications development, Moodle development, PHP Frameworks &amp; CMS development, etc. We will assist you on all the areas.
          </p>

          <p className="font-sans text-[18px] sm:text-[20px] leading-relaxed font-normal text-[#333] max-w-[900px] mx-auto">
            And we also offer the best maintenance and support solutions according to the client’s requirements Like Custom Theme Development, Plugin Development, Migration, Integration, and Customization Services.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
