import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCTA = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/about/company.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 flex h-[450px] w-full flex-col items-center justify-center px-6 text-center">
        <h2 className="font-sans font-normal text-[32px] md:text-[50px] text-white mb-[30px] md:mb-[40px] text-center leading-tight">
          Want to start a Project With us?
        </h2>

        <Link
          to="/portfolio"
          className="flex items-center justify-center gap-2 rounded-[8px] bg-primary text-black font-semibold transition-all hover:bg-primary/90 w-[142px] h-[40px]"
        >
          <span className="text-[14px]">Our Portfolio</span>
          <span className="text-[10px]">▶</span>
        </Link>

      </div>
    </section>
  );
};

export default ProjectCTA;
