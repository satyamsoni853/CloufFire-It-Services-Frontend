import React from 'react';
import DotGrid from './DotGrid';

const ContactFormSection = () => {
  const [result, setResult] = React.useState("");
  const [status, setStatus] = React.useState(""); // "success", "error", "loading"

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    setStatus("loading");
    
    const formData = new FormData(event.target);

    // Add access key from memories
    formData.append("access_key", "f5e9b95b-ceb0-42ce-a6ce-b9511c7f96e6");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        setStatus("success");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
        setStatus("error");
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="bg-white py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative dots background */}
      <DotGrid className="absolute top-20 left-10 opacity-30 pointer-events-none hidden lg:grid" />
      <DotGrid className="absolute bottom-20 right-10 opacity-30 pointer-events-none hidden lg:grid" />

      <div className="mx-auto px-6 max-w-[1440px]">
        <div className="text-center mb-16">
          <h2 
            className="text-[#141414] max-w-[900px] mx-auto text-[32px] md:text-[48px] font-bold font-serif leading-tight"
          >
            Ready To Start New Project? <br /> Send Us An Enquiry
          </h2>
        </div>

        <div 
          className="mx-auto bg-white rounded-[15px] p-8 md:p-12 lg:p-16 shadow-[0_10px_50px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-center max-w-[750px]"
        >
          {status === "success" ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                ✓
              </div>
              <h3 className="text-3xl font-bold text-[#141414] font-serif">Thank You!</h3>
              <p className="text-gray-500 font-medium">Your message has been sent. We will get back to you shortly.</p>
              <button 
                onClick={() => setStatus("")}
                className="mt-8 text-[#ff7301] font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form 
              onSubmit={onSubmit}
              className="w-full space-y-6"
            >
              <input type="hidden" name="subject" value="New Project Enquiry" />
              <input type="hidden" name="from_name" value="Cloudfire Website" />
              <input type="checkbox" name="botcheck" className="hidden" />

              <div className="w-full space-y-2">
                <label htmlFor="name" className="text-[#333] block font-sans text-[15px]">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  placeholder="Name" 
                  autoComplete='name'
                  className="w-full bg-white border border-gray-200 rounded-[8px] px-4 py-3 text-[#141414] placeholder-gray-300 focus:outline-none focus:border-[#ff7301] transition-all"
                />
              </div>

              <div className="w-full space-y-2">
                <label htmlFor="email" className="text-[#333] block font-sans text-[15px]">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  placeholder="email@gmail.com" 
                  autoComplete='email'
                  className="w-full bg-white border border-gray-200 rounded-[8px] px-4 py-3 text-[#141414] placeholder-gray-300 focus:outline-none focus:border-[#ff7301] transition-all"
                />
              </div>

              <div className="w-full space-y-2">
                <label htmlFor="phone" className="text-[#333] block font-sans text-[15px]">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required
                  placeholder="+0 123 456 789" 
                  autoComplete='tel'
                  className="w-full bg-white border border-gray-200 rounded-[8px] px-4 py-3 text-[#141414] placeholder-gray-300 focus:outline-none focus:border-[#ff7301] transition-all"
                />
              </div>

              <div className="w-full space-y-2">
                <label htmlFor="service" className="text-[#333] block font-sans text-[15px]">General Queries</label>
                <input 
                  type="text" 
                  id="service" 
                  name="service" 
                  required
                  placeholder="Select Service" 
                  className="w-full bg-white border border-gray-200 rounded-[8px] px-4 py-3 text-[#141414] placeholder-gray-300 focus:outline-none focus:border-[#ff7301] transition-all"
                />
              </div>

              <div className="w-full space-y-2">
                <label htmlFor="message" className="text-[#333] block font-sans text-[15px]">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  required
                  placeholder="Write your message here..." 
                  className="w-full bg-white border border-gray-200 rounded-[8px] px-4 py-4 text-[#141414] placeholder-gray-300 focus:outline-none focus:border-[#ff7301] transition-all resize-none"
                ></textarea>
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm font-bold text-center">{result}</p>
              )}

              <div className="w-full flex flex-col items-center gap-8 pt-6">
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="bg-[#111] text-white font-semibold rounded-[8px] flex items-center justify-center gap-4 hover:bg-black transition-all w-full h-[56px] shadow-lg disabled:opacity-50"
                >
                  <span className="text-[16px]">{status === "loading" ? "Sending..." : "Submit Now"}</span>
                  {status !== "loading" && <span className="text-[12px]">▶</span>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;

