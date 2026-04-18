import React from "react";

const CTABanner = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1270px] mx-auto px-6">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="w-full max-w-[700px] h-auto min-h-[250px] mx-auto bg-gradient-to-br from-[#ffb44a] to-[#ff7e00] rounded-[30px] flex flex-col items-center justify-center text-center p-8 shadow-xl shadow-orange-500/20 relative overflow-hidden">
            {/* Main Content */}
            <div className="relative z-10 w-full flex flex-col items-center">
              {/* Heading: Georgia, Bold, 28px */}
              <h2 className="font-['Georgia',serif] font-bold text-[28px] text-gray-900 mb-2 leading-tight">
                Ready to Get Started?
              </h2>

              {/* Description: Segoe UI, 400, 18px, LH 26px */}
              <p className="font-sans font-normal text-[18px] leading-[26px] text-gray-900/90 max-w-[550px] mb-6">
                Experience our AI-powered talent matching and transform How you
                build your tech team.
              </p>

              {/* Button: w-[277px] h-[40px] */}
              <button className="w-[277px] h-[40px] bg-white text-gray-900 rounded-lg font-sans font-normal text-[16px] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                Schedule Your Consultation
                <span className="text-[12px]">▶</span>
              </button>
            </div>

            {/* Subtle Decorative Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;

