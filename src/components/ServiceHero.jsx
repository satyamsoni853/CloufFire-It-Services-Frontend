import React from "react";
import { Link } from "react-router-dom";

const ServiceHero = () => {
  return (
    <section className="relative w-full h-[500px] overflow-hidden bg-[#f6f5f3] md:h-auto md:min-h-[360px]">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/about/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 z-0 bg-white/60" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-24 bg-white md:h-28" />

      <div className="relative z-10 mx-auto flex h-full w-full items-center justify-center px-6 pb-12 pt-28 sm:px-8 md:px-24 md:pb-16 md:pt-32 lg:px-24">
        <div className="grid w-full max-w-[1400px] items-center gap-10 md:grid-cols-[minmax(260px,1fr)_minmax(340px,560px)]">
          <div className="mx-auto max-w-[420px] self-center text-center md:mx-0 md:pb-10 md:text-left">
            <nav className="mb-4 flex items-center gap-2 text-sm font-medium text-[#6b6b6b] md:mb-5">
              <Link
                to="/"
                className="transition-colors hover:text-primary"
              >
                Home
              </Link>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[#141414]">Services</span>
            </nav>

            <h1 className="font-serif font-bold text-[40px] leading-[65px] text-[#141414] md:text-[32px] md:leading-[1.2]">
              Our services
            </h1>
          </div>

          <div className="relative flex min-h-[220px] items-end justify-center md:min-h-[360px] md:justify-end">
            <img
              src="/services/undraw_progressive-web-app_c4uq(1) 1.svg"
              alt="Services Illustration"
              className="w-[613px] h-[415px] object-contain block md:w-full md:h-auto md:max-w-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
