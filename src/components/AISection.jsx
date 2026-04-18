import React from 'react';

const AISection = () => {
  const sections = [
    {
      title: "AI Development",
      list: ["Custom AI Model", "Development And Training", "Machine Learning Pipelines", "Deep Learning Models"],
      image: "/services/ai1.svg",
      reverse: false
    },
    {
      title: "AI Agents & Automation",
      list: ["AI Agents For Business Workflows", "Chatbots And Conversational AI", "Process Automation Using AI"],
      image: "/services/ai2.svg",
      reverse: true
    },
    {
      title: "AI Tech Stack",
      list: ["Python, TensorFlow, PyTorch", "OpenAI APIs, LLM Integrations", "LangChain, Vector Databases", "NLP & Computer Vision"],
      image: "/services/ai3.svg",
      reverse: false
    }
  ];

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[80px]">
        <div className="text-center mb-20 max-w-[900px] mx-auto">
          <h2 className="text-[#141414] font-serif font-bold text-[48px] mb-4">Artificial Intelligence & Automation</h2>
          <p className="text-gray-500 font-sans font-normal text-[18px] leading-[24px]">
            We build intelligent systems and AI-powered automation solutions
          </p>
        </div>

        <div className="flex flex-col items-center gap-32">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center w-full lg:w-[1034px] lg:h-[392px]`}
            >
              {/* Orange Content Box */}
              <div className={`w-full lg:w-[871px] lg:h-[381px] flex items-center shadow-2xl rounded-[30px] bg-[#fbb03b] hover:bg-[#ff9900] transition-colors duration-300 p-8 lg:p-12 z-10 ${section.reverse ? 'justify-end lg:pr-8' : 'justify-start lg:pl-16'}`}>
                <div className="w-full lg:w-[400px]">
                  <h3 className="text-[#141414] font-serif font-bold text-[26px] leading-[28px] mb-6">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.list.map((li, i) => (
                      <li key={i} className="text-[#141414] font-sans font-normal text-[18px] leading-[28px] flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#141414] mt-3 shrink-0" />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image Box (Desktop Monitor view) */}
              <div 
                className={`w-full lg:w-[506px] lg:h-[392px] flex items-center justify-center relative mt-10 lg:mt-0 z-20 ${section.reverse ? 'lg:-mr-[343px]' : 'lg:-ml-[343px]'}`}
              >
                <div className="relative w-full h-full bg-white p-2 lg:p-4 rounded-[15px] lg:rounded-[20px] shadow-2xl border-[6px] lg:border-8 border-[#222] overflow-hidden z-[4]">
                   <img 
                     src={section.image} 
                     alt={section.title} 
                     className="w-full h-full object-cover rounded-[8px] lg:rounded-[10px]" 
                   />
                </div>
                {/* Stand detail */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-12 bg-[#ddd] rounded-t-lg hidden lg:block" />
                <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-48 h-2 bg-[#bbb] rounded-full hidden lg:block" />
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISection;

