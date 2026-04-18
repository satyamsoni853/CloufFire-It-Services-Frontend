import React from "react";
import DotGrid from "./DotGrid";

const WebTechnologies = () => {
  const techData = [
    {
      title: "Frontend",
      icon: (
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#ff7e06]"
        >
          <path
            d="M7 8L3 12L7 16M17 8L21 12L17 16M14 4L10 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="2"
            y="3"
            width="20"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      list: [
        "HTML5, CSS3, JavaScript (ES6+), TypeScript",
        "React.Js, Angular, Vue.Js",
        "Next.Js, Nuxt.Js",
        "Tailwind CSS, Bootstrap, Material UI",
      ],
    },
    {
      title: "Backend",
      icon: (
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#ff7e06]"
        >
          <path
            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M21 10V4C21 3.46957 20.7893 2.96086 20.4142 2.58579C20.0391 2.21071 19.5304 2 19 2H5C4.46957 2 3.96086 2.21071 3.58579 2.58579C3.21071 2.96086 3 3.46957 3 4V10M3 10H21M3 7H3.01M3 18H3.01M12 10V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      list: [
        "Node.Js, Express.Js",
        "PHP Core",
        "Python (Django, Flask)",
        "Java (Spring Boot)",
      ],
    },
    {
      title: "PHP Frameworks",
      icon: (
        <div className="text-[40px] font-bold text-[#ff7e06] italic font-serif">
          php
        </div>
      ),
      list: ["Laravel", "CodeIgniter", "Symfony", "Yii"],
    },
    {
      title: "Databases",
      icon: (
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#ff7e06]"
        >
          <ellipse
            cx="12"
            cy="5"
            rx="9"
            ry="3"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      list: ["MySQL, PostgreSQL, MongoDB", "Redis, Firebase"],
    },
  ];

  return (
    <section className="py-20  relative overflow-hidden">
      <DotGrid className="absolute right-10 top-10 opacity-40 z-0" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[80px] relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[#141414] font-serif font-bold text-[48px] leading-[54px] mb-4">
            Web Technologies
          </h2>
          <p className="text-gray-500 text-[18px] font-sans">
            Your Satisfaction, Our Mission
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-x-12 lg:gap-y-10">
          {techData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 lg:p-6 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#f0f0f0] flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-6 lg:gap-8 hover:shadow-lg transition-all w-full lg:w-[533px] lg:h-[199px]"
            >
              <div className="shrink-0 w-[72.97px] h-[72.97px] flex items-center justify-center bg-gray-50 rounded-[15px]">
                <div className="w-full h-full flex items-center justify-center scale-[0.8]">
                  {item.icon}
                </div>
              </div>
              <div className="grow text-center sm:text-left">
                <h3 className="text-[#141414] font-serif font-bold text-[23px] leading-[30px] mb-3">
                  {item.title}
                </h3>
                <ul className="space-y-1">
                  {item.list.map((li, i) => (
                    <li
                      key={i}
                      className="text-[#555] font-sans font-normal text-[15px] leading-[22px] flex items-start justify-center sm:justify-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 shrink-0" />
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

export default WebTechnologies;

