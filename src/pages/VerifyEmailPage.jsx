import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { apiRequest } from "../utils/api";
import GlobalLoader from "../components/GlobalLoader";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    message: "",
  });

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus({
          loading: false,
          success: false,
          message: "Missing verification token.",
        });
        return;
      }

      try {
        const data = await apiRequest(`/verify-email?token=${token}`);
        setStatus({ loading: false, success: true, message: data.message || "Email verified successfully!" });
      } catch (err) {
        setStatus({
          loading: false,
          success: false,
          message: err.message || "Verification failed.",
        });
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div
      className="min-h-screen flex flex-col items-center pt-24 pb-12 px-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/login/background.jpg")' }}
    >
      {/* Overlay for readability */}
      <div className="absolute "></div>
      {/* Logo */}
      <Link
        to="/"
        className="relative z-10 mb-8 transition-transform hover:scale-105"
      >
        <img
          src="/Assests/Cloudfire.png"
          alt="CloudFire"
          className="w-[145px] h-[116px] object-contain"
        />
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[450px] w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 text-center"
      >
        {status.loading ? (
          <GlobalLoader variant="compact" message="Verifying your Cloudfire account..." />
        ) : (
          <div>
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 ${
                status.success
                  ? "bg-green-50 text-green-500"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {status.success ? (
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
              {status.success ? "Success!" : "Oops!"}
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed font-sans">
              {status.message}
            </p>

            <Link
              to={status.success ? "/login" : "/signup"}
              className="inline-block w-full bg-[#ff7301] hover:bg-[#e66700] text-white font-bold py-3.5 rounded-full transition-all shadow-lg shadow-[#ff7301]/20 active:scale-[0.99] font-sans"
            >
              {status.success ? "Proceed to Login" : "Try Again"}
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmailPage;
