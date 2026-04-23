import React from "react";
import SuccessHero from "../components/SuccessHero";

const ClientSuccessPage = () => {
  const clients = [
    {
      name: "5paisa",
      logo: "/Cleint Succes/5paisha.png",
      description:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries,\n\nBut Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged. It Was Popularised In The 1960s With The Release Of Letraset Sheets Containing Lorem Ipsum Passages, And More Recently With Desktop Publishing Software Like Aldus PageMaker Including Versions Of Lorem Ipsum.",
      layout: "left",
    },
    {
      name: "Current",
      logo: "/Cleint Succes/current.png",
      description:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries.\n\nBut Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged. It Was Popularised In The 1960s With The Release Of Letraset Sheets Containing Lorem Ipsum Passages, And More Recently With Desktop Publishing Software Like Aldus PageMaker Including Versions Of Lorem Ipsum.",
      layout: "right",
    },
    {
      name: "101 Blockchains",
      logo: "/Cleint Succes/blockchain.png",
      description:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries,\n\nBut Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged. It Was Popularised In The 1960s With The Release Of Letraset Sheets Containing Lorem Ipsum Passages, And More Recently With Desktop Publishing Software Like Aldus PageMaker Including Versions Of Lorem Ipsum.",
      layout: "left",
    },
    {
      name: "Neffex",
      logo: "/Cleint Succes/neffex.png",
      description:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries.\n\nBut Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged. It Was Popularised In The 1960s With The Release Of Letraset Sheets Containing Lorem Ipsum Passages, And More Recently With Desktop Publishing Software Like Aldus PageMaker Including Versions Of Lorem Ipsum.",
      layout: "right",
    },
    {
      name: "Sunspots Holidays",
      logo: "/Cleint Succes/sunspots.png",
      description:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries,\n\nBut Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged. It Was Popularised In The 1960s With The Release Of Letraset Sheets Containing Lorem Ipsum Passages, And More Recently With Desktop Publishing Software Like Aldus PageMaker Including Versions Of Lorem Ipsum.",
      layout: "left",
    },
  ];

  return (
    <main className="overflow-x-hidden bg-white">
      <SuccessHero />

      <div className="mx-auto max-w-[1400px] px-6 pb-16 md:px-24 space-y-24">
        {clients.map((client, index) => (
          <section
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 ${client.layout === "right" ? "md:flex-row-reverse" : ""}`}
          >
            {/* Logo Container */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div 
                className="bg-white border border-gray-100 rounded-[30px] shadow-sm flex items-center justify-center p-8 w-full max-w-[481px] aspect-[481/298]"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  className="max-w-[70%] max-h-[70%] object-contain"
                />
              </div>
            </div>

            {/* Content Container */}
            <div className="w-full md:w-1/2">
              <h2 className="font-['Georgia'] font-bold text-[32px] md:text-[48px] leading-[1.2] md:leading-[54px] text-[#141414] mb-6">
                {client.name}
              </h2>
              <div className="font-['Segoe_UI'] font-normal text-[16px] md:text-[18px] leading-[1.5] md:leading-[24px] text-[#4a4a4a] whitespace-pre-line">
                {client.description}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default ClientSuccessPage;
