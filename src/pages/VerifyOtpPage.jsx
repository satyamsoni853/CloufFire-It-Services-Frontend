import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { apiRequest } from "../utils/api";
import toast from "react-hot-toast";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const pending_token = location.state?.pending_token;

  useEffect(() => {
    if (!email || !pending_token) {
      navigate("/signup");
    }
  }, [email, pending_token, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          token: pending_token,
          otp: otpString,
        }),
      });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      toast.success(data.message || "Account created!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center py-16 px-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/login/background.jpg")' }}
    >
      {/* Overlay for readability */}
      <div className="absolute "></div>
      <Link
        to="/"
        className="relative z-10 mb-8 transition-transform hover:scale-105 font-sans"
      >
        <img
          src="/Assests/Cloudfire.png"
          alt="CloudFire"
          className="w-[145px] h-[116px] object-contain"
        />
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[480px] w-full bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 p-10 md:p-14 relative z-10 text-center"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
            Verify Email
          </h2>
          <p className="text-gray-500 font-medium font-sans">
            We've sent a 6-digit code to
          </p>
          <p className="text-[#ff7301] font-bold mt-1">{email}</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm flex items-center justify-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full h-14 bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-xl text-center text-xl font-bold text-gray-900 transition-all outline-none font-sans"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#ff7301] to-[#ff9845] hover:from-[#e66700] hover:to-[#ff8524] text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-[#ff7301]/30 active:scale-[0.98] disabled:opacity-70 text-lg font-sans"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        <p className="mt-8 text-gray-500 text-sm font-sans">
          Didn't receive the code?{" "}
          <button className="text-[#ff7301] font-bold hover:underline font-sans">
            Resend OTP
          </button>
        </p>

        <div className="mt-8 pt-6 border-t border-gray-50">
          <Link
            to="/signup"
            className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium font-sans"
          >
            ← Change Email Address
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOtpPage;
