import React, { useState } from "react";
import ParticleNetwork from "./ParticleNetwork";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[660px] md:min-h-[850px] md:h-screen flex flex-col justify-center bg-[#111] rounded-br-[100px] md:rounded-none"
    >
      {/* Background & Animations Layer (Handles Overflow) */}
      <div className="absolute inset-0 overflow-hidden rounded-br-[100px] md:rounded-none z-0">
        <ParticleNetwork className="z-0" />
        
        {/* Background Gradients for Depth */}
        <div className="absolute inset-0 bg-radial-at-t from-black/0 via-black/40 to-black pointer-events-none" />
        <div className="hidden md:block absolute inset-0 bg-[url('/Assests/banner-bg.png')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
      </div>

      {/* Mobile Top Bar (Integrated Hero) */}
      <div className="md:hidden absolute top-0 left-0 w-full px-5 py-6 flex justify-between items-center z-50">
        <Link to="/">
          <img 
            src="/Assests/Cloudfire-white.png" 
            alt="Cloudfire Logo" 
            className="w-28 h-auto object-contain" 
          />
        </Link>
        <div className="flex items-center gap-2">
          <Link 
            to="/contact" 
            className="bg-primary text-black px-4 py-2 rounded-full text-[12px] font-bold shadow-lg"
          >
            Get in Touch
          </Link>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('toggleMobileMenu'))}
            className="p-2 bg-white/10 rounded-lg flex flex-col gap-1 items-end"
          >
            <div className="w-5 h-[2px] bg-white rounded-full"></div>
            <div className="w-3 h-[2px] bg-white rounded-full"></div>
            <div className="w-5 h-[2px] bg-white rounded-full"></div>
          </button>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-24 relative z-10 w-full mt-10 md:mt-0">
        {/* Content Section */}
        <div className="flex flex-col items-start text-left md:max-w-[900px]">
          <h1 className="font-serif text-[40px] sm:text-6xl md:text-8xl lg:text-[96px] leading-[1.1] md:leading-[1.05] text-white font-bold mb-4 md:mb-10">
            Our Framework <br />
            <span className="text-white">Services</span> <span className="text-primary">Solutions</span>
          </h1>
          <p className="font-sans text-[15px] sm:text-2xl lg:text-[26px] text-white/80 max-w-[600px] leading-relaxed md:leading-snug font-normal md:font-medium mb-8 md:mb-14">
            We At Cloudfire Provide Framework Services Solutions To Clients
          </p>

          <div className="flex flex-row gap-3 sm:gap-6 w-full md:w-auto items-center justify-start">
            <button className="flex-1 sm:flex-none bg-primary text-black px-5 sm:px-10 py-3.5 lg:py-5 rounded-xl font-bold text-sm sm:text-lg hover:scale-105 transition-all shadow-lg">
              Framework
            </button>
            <button className="flex-1 sm:flex-none bg-white text-[#111] px-5 sm:px-10 py-3.5 lg:py-5 rounded-xl font-bold text-sm sm:text-lg hover:scale-105 transition-all shadow-xl">
              I Want Developer
            </button>
          </div>
        </div>
      </div>

      {/* Experience Badge (Mobile Hero Match) */}
      <div className="md:hidden absolute bottom-[-10px] right-6 w-32 h-32 bg-primary rounded-full border-[5px] border-white flex flex-col items-center justify-center text-white shadow-2xl z-30 transform translate-y-1/4">
        <div className="flex flex-col items-center justify-center leading-none">
          <span className="text-3xl font-extrabold flex items-center">10<span className="text-xl ml-0.5">+</span></span>
          <span className="text-[10px] font-black text-center uppercase tracking-tighter mt-1">
            Years of<br />Experience
          </span>
        </div>
      </div>

      {/* Decorative desktop-only element */}
      <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-[url('/Assests/arrow2.png')] bg-contain bg-no-repeat opacity-20 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
