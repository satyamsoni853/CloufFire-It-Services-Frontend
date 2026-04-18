import React from 'react';

const ContactMap = () => {
  return (
    <section className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-100 relative grayscale hover:grayscale-0 transition-all duration-700">
      <iframe
        src="https://maps.google.com/maps?q=Plot%20No.33,%20(225),%20Sohna,%20Gurugram,%20Haryana%20122103&t=&z=13&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Contact Office Map"
        className="w-full h-full opacity-80 border-0"
      ></iframe>

    </section>
  );
};

export default ContactMap;
