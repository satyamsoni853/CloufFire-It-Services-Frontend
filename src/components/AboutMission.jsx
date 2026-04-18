import React from "react";

const AboutMission = () => {
  return (
    <section id="about-mission" className="relative py-[90px] pb-[100px] bg-white overflow-hidden md:py-[60px] md:pb-[70px] px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-center mx-auto max-w-[1280px]">
        {/* Left — Image composition */}
        <div className="relative py-[20px] pl-[30px] md:p-0">
          {/* Small decorative diamonds */}
          <svg
            className="absolute pointer-events-none md:hidden top-[40px] left-0"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            aria-hidden="true"
          >
            <rect
              x="9"
              y="0"
              width="12"
              height="12"
              rx="2"
              transform="rotate(45 9 0)"
              fill="#ff7301"
              opacity="0.15"
            />
          </svg>
          <svg
            className="absolute pointer-events-none md:hidden bottom-[30px] right-[60px]"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            aria-hidden="true"
          >
            <rect
              x="9"
              y="0"
              width="12"
              height="12"
              rx="2"
              transform="rotate(45 9 0)"
              fill="#ff7301"
              opacity="0.12"
            />
          </svg>

          <img
            src="/about/left-about.png"
            alt="Our experienced team collaborating in a modern workspace"
            className="w-[578px] h-[703px] object-cover block rounded-[20px] md:w-full md:max-w-[400px] md:h-auto md:mx-auto"
          />
        </div>

        {/* Right — Text content */}
        <div className="py-[20px]">
          <span className="block text-[13px] font-bold tracking-[4px] uppercase text-[#ff7301] mb-[12px]">ABOUT US</span>

          <h2 className="font-serif font-bold text-[48px] leading-[54px] text-[#111] mb-[28px] lg:text-[36px] md:text-[32px] md:leading-[1.2]">
            Your Satisfaction,
            <br />
            Our Mission
          </h2>

          <p className="font-sans font-normal text-[18px] leading-[28px] text-[#666] mb-[20px] md:text-[16px] md:leading-[24px]">
            Virasat Solutions A Leading And Skilled LMS, ELearning &amp;
            ECommerce Application Development Company. We, At Virasat
            Solutions, Have Dedicated And Passionate Teams To Cater To Each
            And Every Aspect Of Your ELearning &amp; ECommerce Business.
          </p>

          <p className="font-sans font-normal text-[18px] leading-[28px] text-[#666] mb-[20px] md:text-[16px] md:leading-[24px]">
            Whether Be It LMS{" "}
            <span className="text-[#ff7301] font-semibold italic">
              (Learning Management System)
            </span>{" "}
            Design And Development, E-Commerce Web And Mobile Applications
            Development, Moodle Development, PHP Frameworks &amp; CMS
            Development, Etc. We Will Assist You On All The Areas.
          </p>

          <p className="font-sans font-normal text-[18px] leading-[28px] text-[#666] mb-[20px] md:text-[16px] md:leading-[24px]">
            And We Also Offer The Best Maintenance And Support Solutions
            According To The Client's Requirements Like Custom Theme
            Development, Plugin Development, Migration, Integration, And
            Customization Services.
          </p>
        </div>
      </div>

      {/* Decorative dot grid — bottom right */}
      <div className="absolute right-[50px] bottom-[50px] grid grid-cols-7 gap-[10px] opacity-20 md:hidden" aria-hidden="true">
        {[...Array(49)].map((_, i) => (
          <span key={i} className="w-[4px] h-[4px] rounded-full bg-[#aaa]" />
        ))}
      </div>
    </section>
  );
};

export default AboutMission;
