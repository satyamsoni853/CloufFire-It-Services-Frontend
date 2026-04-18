import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f8f8f8] pt-16 lg:pt-24 pb-10 px-6 lg:px-[80px]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-x-16 xl:gap-x-24">
          
          {/* Column 1: Logo & Address */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center lg:items-start">
            <img src="/Assests/Cloudfire.png" className="w-[180px] lg:w-[174px] h-auto object-contain mb-8 ml-0 lg:ml-10 " alt="Cloudfire" />
            
            <div className="w-full max-w-[280px] bg-linear-to-b from-[#ffaf38] to-[#ff7e06] rounded-[20px] flex flex-col items-center justify-center p-6 shadow-md">
              <img src="/Assests/address.png" className="w-10 h-10 mb-3" alt="address" />
              <span className="font-sans font-bold text-[16px] leading-[22px] text-gray-900 text-center">
                Plot No.33, (225), Sohna, <br />
                Gurugram, Haryana 122103
              </span>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-[#141414] font-serif font-bold text-[22px] mb-8">Company</h3>
            <ul className="space-y-4">
              <li className="font-sans text-[16px] text-[#555] hover:text-[#ff7e06] cursor-pointer transition-colors">Home</li>
              <li className="font-sans text-[16px] text-[#555] hover:text-[#ff7e06] cursor-pointer transition-colors">About</li>
              <li className="font-sans text-[16px] text-[#ff7e06] font-semibold cursor-pointer">Services</li>
              <li className="font-sans text-[16px] text-[#555] hover:text-[#ff7e06] cursor-pointer transition-colors">Industries</li>
              <li className="font-sans text-[16px] text-[#555] hover:text-[#ff7e06] cursor-pointer transition-colors">Our Expertise</li>
              <li className="font-sans text-[16px] text-[#555] hover:text-[#ff7e06] cursor-pointer transition-colors">Client Success</li>
              <li className="font-sans text-[16px] text-[#555] hover:text-[#ff7e06] cursor-pointer transition-colors">Discover Cloudfire</li>
            </ul>
          </div>

          {/* Column 3: Follow Us On */}
          <div className="">
            <h3 className="text-[#141414] font-serif font-bold text-[22px] mb-8">Follow Us On</h3>
            <ul className="space-y-5">
              {[
                { name: 'Facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'Instagram', icon: 'rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/' },
                { name: 'Youtube', icon: 'path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/' },
                { name: 'linkedin', icon: 'path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/' },
                { name: 'Twitter', icon: 'path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M13.232 10.768l6.768 -6.768"/' },
                { name: 'Dashboard', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z', path: '/dashboard' }
              ].map((item) => {
                const Content = (
                  <li key={item.name} className="flex items-center gap-4 group cursor-pointer transition-all hover:translate-x-1">
                    <div className="w-[28px] h-[28px] text-[#ff7e06]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-full h-full"
                      >
                        {item.name === 'Instagram' ? (
                          <>
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                          </>
                        ) : item.name === 'Youtube' ? (
                          <>
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/>
                            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                          </>
                        ) : item.name === 'linkedin' ? (
                          <>
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                            <rect width="4" height="12" x="2" y="9"/>
                            <circle cx="4" cy="4" r="2"/>
                          </>
                        ) : item.name === 'Twitter' ? (
                          <path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M13.232 10.768l6.768 -6.768" />
                        ) : (
                          <path d={item.icon} />
                        )}
                      </svg>
                    </div>
                    <span className="font-sans text-[16px] text-[#555] group-hover:text-[#ff7e06] transition-colors">{item.name}</span>
                  </li>
                );

                return item.path ? (
                  <Link to={item.path} key={item.name}>{Content}</Link>
                ) : (
                  Content
                );
              })}
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-[#141414] font-serif font-bold text-[22px] mb-8">Get In Touch</h3>
            <form className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full h-[48px] px-5 bg-white border border-[#eee] rounded-[10px] text-[15px] focus:outline-none focus:border-[#ff7e06] transition-all"
              />
              <input 
                type="email" 
                placeholder="email@gmail.com" 
                className="w-full h-[48px] px-5 bg-white border border-[#eee] rounded-[10px] text-[15px] focus:outline-none focus:border-[#ff7e06] transition-all"
              />
              <input 
                type="tel" 
                placeholder="+0 123 456 789" 
                className="w-full h-[48px] px-5 bg-white border border-[#eee] rounded-[10px] text-[15px] focus:outline-none focus:border-[#ff7e06] transition-all"
              />
              <button 
                type="submit" 
                className="w-full h-[52px] mt-2 bg-black text-white rounded-[10px] flex items-center justify-center gap-3 font-semibold text-[16px] hover:bg-[#1a1a1a] transition-all shadow-lg"
              >
                Submit Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-sans text-[14px] text-gray-500">
            © 2026 CloudFire IT Services, All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 font-sans text-[14px] text-gray-600">
            <span className="hover:text-[#ff7e06] cursor-pointer transition-colors">Contact Us</span>
            <span className="hover:text-[#ff7e06] cursor-pointer transition-colors">Request a Demo</span>
            <span className="hover:text-[#ff7e06] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#ff7e06] cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


