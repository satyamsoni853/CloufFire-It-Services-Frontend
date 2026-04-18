import React from 'react';

const Clients = () => {
  const clientLogos = [
    { name: 'NSU', src: '/Assests/NSU 1.png' },
    { name: 'Current', src: '/Assests/NSU 1-1.png' },
    { name: 'NEFFEX', src: '/Assests/image 1.png' },
    { name: '101 blockchains', src: '/Assests/pikwly59 1.png' },
    { name: 'Sunspots', src: '/Assests/image 2.png' },
  ];

  return (
    <section id="clients" className="bg-white py-16 text-center md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] overflow-hidden px-6 sm:px-8 md:px-14 lg:px-16">
        <h2 className="mb-10 font-serif text-[32px] font-bold leading-tight text-gray-900 md:mb-16 md:text-[48px] lg:mb-20">
          A Few OF Our Clients
        </h2>

        <div className="relative overflow-hidden pt-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-[ticker_30s_linear_infinite] flex w-max gap-6 hover:pause-hover md:gap-10">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
              <div
                key={idx}
                className="flex h-[112px] w-[180px] shrink-0 items-center justify-center rounded-[20px] border border-gray-50 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-[124px] sm:w-[200px] sm:p-6 md:h-[136px] md:w-[223px] md:p-8"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Clients;
