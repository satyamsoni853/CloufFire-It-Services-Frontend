import React from "react";
import DiscoverHero from "../components/DiscoverHero";
import { CheckCircle2 } from "lucide-react";

const DiscoverCloudfirePage = () => {
  return (
    <main className="overflow-x-hidden bg-white ">
      <DiscoverHero />

      {/* Contrary To Popular Belief Section */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-24">
        <h2 className="font-['Georgia'] font-bold text-[48px] leading-tight text-[#141414] mb-12">
          Contrary To <br /> Popular Belief
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border border-blue-100 flex items-center justify-center shadow-sm">
                <div className="w-10 h-10 rounded-full border-2 border-blue-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-red-500" />
                </div>
              </div>
              <div>
                <h3 className="font-['Georgia'] font-normal text-[27px] text-[#141414] mb-3">
                  Consulting
                </h3>
                <p className="font-['Segoe_UI'] font-normal text-[16px] leading-[24px] text-[#4a4a4a]">
                  Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Triple Image Section */}
      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-12">
          <div className="w-full md:w-auto flex justify-center">
            <img
              src="/discovercloudfire/contrayleft.png"
              alt="Team Work Left"
              className="rounded-[20px] shadow-lg object-cover w-full max-w-[389px] aspect-[389/513]"
            />
          </div>
          <div className="w-full md:w-auto z-10 flex justify-center">
            <img
              src="/discovercloudfire/contraymiddle.png"
              alt="Team Work Middle"
              className="rounded-[20px] shadow-2xl object-cover w-full max-w-[418px] aspect-[418/677]"
            />
          </div>
          <div className="w-full md:w-auto flex justify-center">
            <img
              src="/discovercloudfire/contrayright.png"
              alt="Team Work Right"
              className="rounded-[20px] shadow-lg object-cover w-full max-w-[389px] aspect-[389/513]"
            />
          </div>
        </div>
      </section>

      {/* Variations Section */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-24 text-center flex flex-col items-center">
        <h2 className="font-['Georgia'] font-bold text-[32px] md:text-[48px] leading-[1.2] md:leading-[54px] text-[#141414] mb-16 max-w-2xl">
          There Are Many <br className="hidden md:block" /> Variations Of Passages
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full justify-items-center">
          {[
            {
              title: "Skilled Developers",
              icon: "/discovercloudfire/skileeddeveloper.png",
            },
            {
              title: "Customer Satisfaction",
              icon: "/discovercloudfire/customersatisfaction.png",
            },
            {
              title: "Instant Response",
              icon: "/discovercloudfire/instancereposnse.png",
            },
            {
              title: "Quality Assurance",
              icon: "/discovercloudfire/quality.png",
            },
            {
              title: "Skilled Developers",
              icon: "/discovercloudfire/skileeddeveloper.png",
            },
            {
              title: "Customer Satisfaction",
              icon: "/discovercloudfire/customersatisfaction.png",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white p-8 md:p-10 rounded-[20px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center w-full max-w-[503px] min-h-[335px]"
            >
              <div className="w-16 h-16 bg-[#ffaf38] rounded-[10px] flex items-center justify-center mb-6">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-10 h-10 object-contain brightness-0 invert"
                />
              </div>
              <h3 className="font-['Georgia'] font-bold text-[20px] md:text-[22px] text-[#141414] mb-4">
                {card.title}
              </h3>
              <p className="font-['Segoe_UI'] font-normal text-[14px] md:text-[15px] leading-[1.5] md:leading-[22px] text-[#666] max-w-[400px]">
                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                Industry. Lorem Ipsum Has Been The Industry's Standard Dummy
                Text Ever Since.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DiscoverCloudfirePage;
