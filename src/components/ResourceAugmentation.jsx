import React from 'react';
import DotGrid from './DotGrid';

const ResourceAugmentation = () => {
  const resourceData = [
    {
      title: "Models",
      image: "/services/resource1.jpg",
      list: [
        "Remote (Work From Home)",
        "On-Site Client Deployment",
        "Hybrid Engagement"
      ]
    },
    {
      title: "Services",
      image: "/services/resource2.jpg",
      list: [
        "Dedicated Developers & Teams",
        "Project-Based Hiring",
        "Long-Term Contracts"
      ]
    }
  ];

  return (
    <section className="py-20 bg-[#fafafa] relative overflow-hidden">
      <DotGrid className="absolute left-10 top-10 opacity-40 z-0" />
      <DotGrid className="absolute right-10 bottom-10 opacity-40 z-0" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[80px] relative z-10">
        <div className="text-center mb-16 px-4">
          <h2 className="text-[#141414] font-serif font-bold text-[32px] lg:text-[48px] lg:leading-[54px] mb-4">Resource Augmentation & Engagement Models</h2>
          <p className="text-gray-500 font-sans font-normal text-[18px] leading-[24px]">We provide flexible engagement models for B2B clients</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {resourceData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[25px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#f0f0f0] flex flex-col md:flex-row p-6 items-center gap-8 hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 w-full lg:w-[576px] lg:h-[276px]"
            >
              <div className="w-full md:w-[240px] h-[200px] md:h-full rounded-[20px] overflow-hidden shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="w-full grow pr-4 text-center md:text-left">
                <h3 className="text-[#141414] font-serif font-bold text-[23px] leading-[30px] mb-5">{item.title}</h3>
                <ul className="space-y-3">
                  {item.list.map((li, i) => (
                    <li key={i} className="text-[#555] font-sans font-normal text-[15px] leading-[22px] flex items-start justify-center md:justify-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff7e06] mt-2 shrink-0" />
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

export default ResourceAugmentation;

