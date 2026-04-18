import React from 'react';

const CMSBuilders = () => {
  const cmsData = [
    {
      title: "CMS Platforms",
      image: "/services/cms1.jpg",
      list: ["WordPress", "Drupal", "Joomla", "Magento", "Shopify"]
    },
    {
      title: "Website Builders",
      image: "/services/cms2.jpg",
      list: ["Squarespace", "Wix", "Webflow", "Framer"]
    },
    {
      title: "Headless CMS",
      image: "/services/cms3.jpg",
      list: ["Strapi", "Contentful", "Sanity"]
    }
  ];

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[80px]">
        <div className="text-center mb-16 max-w-[900px] mx-auto px-4">
          <h2 className="text-[#141414] font-serif font-bold text-[48px] mb-4">CMS & Website Builders</h2>
          <p className="text-gray-500 font-sans font-normal text-[18px] leading-[24px]">
            We develop, customize, and maintain websites across all major CMS and builders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
          {cmsData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[25px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#eee] flex flex-col items-center p-6 lg:p-4 transition-all hover:-translate-y-2 w-full max-w-[408px] lg:w-[408px] lg:h-[469px]"
            >
              <div className="w-full lg:w-[372px] lg:h-[239px] mb-6 lg:mb-5 rounded-[20px] overflow-hidden mx-auto">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-[#141414] font-serif font-bold text-[23px] leading-[30px] mb-5">{item.title}</h3>
              <div className="w-full flex justify-center px-4">
                <ul className="space-y-3 inline-block">
                  {item.list.map((li, i) => (
                    <li key={i} className="text-[#555] font-sans font-normal text-[16px] leading-[22px] flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff7e06] flex-shrink-0" />
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CMSBuilders;

