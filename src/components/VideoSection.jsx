import React from 'react';

const VideoSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="relative w-full h-[250px] sm:h-[400px] md:h-[531px] overflow-hidden shadow-2xl bg-black rounded-[20px] md:rounded-[30px]">
          <video 
            className="w-full h-full object-cover"
            controls
            poster="/about_us/herosection.png"
            muted
            autoPlay
            loop
          >
            <source src="/about_us/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
