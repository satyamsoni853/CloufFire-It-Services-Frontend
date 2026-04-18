import React from 'react';

const ContactCards = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-6 text-center max-w-[1200px]">
        <div className="mb-12 md:mb-16">
          <h2 className="text-[#141414] mb-4 text-[32px] md:text-[48px] font-bold font-serif leading-[1.2]">
            Get In Touch With Us
          </h2>
          <p className="text-[#141414]/70 max-w-2xl mx-auto text-[16px] md:text-[18px] font-sans font-normal">
            Simple and inviting, encouraging clients to reach out
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
          {/* Email Card */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center mb-8 bg-white shadow-sm hover:shadow-md transition-shadow">
              <img src="/Contact/Icon1.png" alt="Email" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="text-[#F6821F] font-bold text-[18px] mb-2 uppercase tracking-wide">
              Email
            </h3>
            <p className="text-[#141414] font-medium text-[16px]">
              sample@123.com
            </p>
          </div>

          {/* Phone Card */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center mb-8 bg-white shadow-sm hover:shadow-md transition-shadow">
              <img src="/Contact/Icon2.png" alt="Call Us" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="text-[#F6821F] font-bold text-[18px] mb-2 uppercase tracking-wide">
              Call Us
            </h3>
            <p className="text-[#141414] font-medium text-[16px]">
              (00) 123 456 789
            </p>
          </div>

          {/* Location Card */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center mb-8 bg-white shadow-sm hover:shadow-md transition-shadow">
              <img src="/Assests/address.png" alt="Our Location" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="text-[#F6821F] font-bold text-[18px] mb-2 uppercase tracking-wide">
              Our Location
            </h3>
            <p className="text-[#141414] font-medium text-[16px] text-center">
              Plot No.33, (225), Sohna, <br />
              Gurugram, Haryana 122103
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCards;
