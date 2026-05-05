import React from "react";

const sizeStyles = {
  page: {
    wrapper: "min-h-[60vh]",
    logo: "h-16 w-16",
    title: "text-2xl",
    message: "text-sm",
  },
  compact: {
    wrapper: "py-12",
    logo: "h-12 w-12",
    title: "text-lg",
    message: "text-xs",
  },
};

const GlobalLoader = ({
  message = "Loading your Cloudfire workspace...",
  variant = "page",
  className = "",
}) => {
  const styles = sizeStyles[variant] || sizeStyles.page;

  return (
    <div className={`flex ${styles.wrapper} items-center justify-center ${className}`}>
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-5 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-orange-100"></div>
          <div className="absolute inset-2 rounded-full border-2 border-gray-100 border-t-[#ff7301] animate-spin"></div>
          <div className="absolute inset-0 rounded-full bg-[#ff7301]/5 animate-pulse"></div>
          <div className={`${styles.logo} relative flex items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100`}>
            <img
              src="/Assests/Cloudfire.png"
              alt="Cloudfire"
              className="h-10 w-10 object-contain"
            />
          </div>
        </div>

        <p className={`${styles.title} font-semibold tracking-tight text-gray-950`}>
          Cloud<span className="text-[#ff7301]">fire</span>
        </p>
        <p className={`${styles.message} mt-2 max-w-xs font-medium text-gray-500`}>
          {message}
        </p>

        <div className="mt-5 h-1 w-36 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-1/2 rounded-full bg-[#ff7301] animate-[loader-slide_1.15s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
