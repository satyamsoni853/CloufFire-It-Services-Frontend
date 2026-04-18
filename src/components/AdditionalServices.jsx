import React from 'react';

const AdditionalServices = () => {
  const sections = [
    {
      title: "E-Learning Solutions",
      subtitle: "We Provide Scalable E-Learning Platforms And LMS Solutions",
      platforms: ["Moodle", "Joomoodle", "WPLMS", "Mahara", "Learndash", "Learnpress", "Totara", "Opigno"],
      capabilities: [
        "Learning Management Systems (LMS)",
        "Course Platforms & Student Dashboards",
        "Video-Based Learning Systems",
        "Assessment & Certification Modules"
      ],
      image: "/services/e-learning.svg",
      reverse: false
    },
    {
      title: "E-Commerce Services",
      subtitle: "We Build High-Performance E-Commerce Platforms",
      platforms: ["Shopify", "Woocommerce", "Big-Commerce", "Magento", "OScommerce", "Prestashop", "Ubercart", "Wpcommerce", "Opencart"],
      capabilities: [
        "Custom Checkout & Payment Integrations",
        "Product Management Systems",
        "Order & Inventory Management",
        "Performance Optimization"
      ],
      image: "/services/e-commmerc e.svg",
      reverse: true
    },
    {
      title: "Digital Marketing",
      subtitle: "We Provide Strategic Digital Marketing Solutions To Grow Your Brand",
      platforms: [], // No platforms list for this one in screenshot
      capabilities: [
        "SEO (Technical, On-Page, Off-Page)",
        "Google Ads & PPC Campaigns",
        "Social Media Marketing",
        "Content & Email Marketing"
      ],
      image: "/services/digital.svg",
      reverse: false,
      isMarketing: true
    }
  ];

  return (
    <section className="py-20 bg-[#fafafa] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[80px]">
        <div className="space-y-32">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}
            >
              {/* Text Content */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-[#141414] font-serif font-bold text-[32px] lg:text-[48px] lg:leading-[54px] mb-2">{section.title}</h2>
                <p className="text-gray-500 font-sans font-normal text-[18px] leading-[24px] mb-8 lg:mb-10">{section.subtitle}</p>
                
                {section.platforms.length > 0 && (
                  <div className="mb-10">
                    <h4 className="text-[#141414] font-serif font-bold text-[24px] leading-[54px] mb-4">Platforms</h4>
                    <div className="grid grid-cols-2 gap-x-4 lg:gap-x-8 gap-y-3">
                      {section.platforms.map((platform, i) => (
                        <div key={i} className="flex items-center justify-center lg:justify-start gap-4 text-[#555] font-sans font-normal text-[18px] leading-[28px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff7e06] shrink-0" />
                          {platform}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-[#141414] font-serif font-bold text-[24px] leading-[54px] mb-4">
                    {section.isMarketing ? 'Services' : 'Capabilities'}
                  </h4>
                  <ul className="space-y-4">
                    {section.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start justify-center lg:justify-start gap-4 text-[#555] font-sans font-normal text-[18px] leading-[28px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff7e06] mt-3 shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image Content */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-full lg:w-[692px] lg:h-[499.88px]">
                  <img 
                    src={section.image} 
                    alt={section.title} 
                    className="w-full h-full object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-500" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;

