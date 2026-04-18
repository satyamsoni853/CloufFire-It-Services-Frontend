import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    const handleToggle = () => setIsMenuOpen(prev => !prev);
    window.addEventListener('toggleMobileMenu', handleToggle);
    return () => window.removeEventListener('toggleMobileMenu', handleToggle);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Our Expertise', path: '/expertise' },
    { name: 'Client Success', path: '/client-success' },
    { name: 'Discover Cloudfire', path: '/discover' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <>
      <header className={`fixed rounded-xl md:absolute top-0 md:top-5 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[calc(100%-40px)] md:max-w-[1340px] h-20 flex items-center justify-between px-6 md:px-10 z-[1000] transition-all duration-300 ${
        pathname === '/' 
          ? 'hidden md:flex bg-white shadow-xl' 
          : 'flex bg-[#292929] md:bg-white shadow-xl'
      }`}>
        
        {/* Logo Section */}
        <Link to="/" className="flex flex-col items-start translate-z-0">
          <img 
            src="/Assests/Cloudfire-white.png" 
            alt="Cloudfire Logo" 
            className="md:hidden w-[100px] h-auto object-contain" 
          />
          <img 
            src="/Assests/Cloudfire.png" 
            alt="Cloudfire Logo" 
            className="hidden md:block w-[90px] h-auto object-contain" 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-7 h-full">
          {navItems.map((item) => {
            const isExternal = item.path.startsWith('/#');
            const isActive = pathname === item.path || (item.path === '/' && pathname === '/');
            
            if (isExternal) {
              return (
                <a 
                  key={item.name}
                  href={item.path} 
                  className="text-[#333] text-sm lg:text-[15px] font-medium hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.name}
                </a>
              );
            }
            
            return (
              <Link 
                key={item.name}
                to={item.path} 
                className={`relative flex items-center h-full text-sm lg:text-[15px] font-medium transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#111111]' : 'text-[#333] hover:text-primary'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-4 inset-x-0 mx-auto h-0.5 w-full max-w-[20px] rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button / Hamburger */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden md:block text-[#333] font-semibold text-sm lg:text-[15px] px-4 py-2.5 hover:text-primary transition-all">
            Login
          </Link>
          <Link to="/contact" className="hidden md:block bg-primary text-white font-semibold text-sm lg:text-[15px] px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all">
            Get in Touch
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-8 h-1 bg-white mb-1.5 rounded-full transition-all ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
            <div className={`w-8 h-1 bg-white mb-1.5 rounded-full transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-8 h-1 bg-white rounded-full transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#292929] z-1001 flex flex-col items-center justify-center gap-6 text-xl font-bold text-white transition-all">
           <button 
            className="absolute top-8 right-8 text-4xl"
            onClick={() => setIsMenuOpen(false)}
          >
            &times;
          </button>
          
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={() => setIsMenuOpen(false)}
              className={pathname === item.path ? 'text-primary' : ''}
            >
              {item.name}
            </Link>
          ))}
          
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-primary mt-4">Login</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="bg-primary px-10 py-4 rounded-full mt-2 text-white hover:bg-opacity-90">Get in Touch</Link>
        </div>
      )}
    </>
  );
};

export default Header;
