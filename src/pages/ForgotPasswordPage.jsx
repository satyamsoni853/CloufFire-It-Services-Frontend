import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { apiRequest } from "../utils/api";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await apiRequest(`/forgot-password?email=${encodeURIComponent(email)}`, {
        method: "POST",
      });
      toast.success(data.message || "Reset code sent!");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong",
      });
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
        className="max-w-[480px] w-full bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 p-10 md:p-14 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
            Forgot Password?
          </h2>
          <p className="text-gray-500 font-medium font-sans">
            Enter your email to receive a reset code
          </p>
        </div>

        {status.message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-8 p-4 rounded-2xl text-sm font-medium border text-center ${
              status.type === "error"
                ? "bg-red-50 border-red-100 text-red-600"
                : "bg-green-50 border-green-100 text-green-600"
            }`}
          >
            {status.message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-4 text-gray-900 transition-all outline-none placeholder:text-gray-400 font-medium font-sans"
              placeholder="Registered Email ID"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#ff7301] to-[#ff9845] hover:from-[#e66700] hover:to-[#ff8524] text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-[#ff7301]/30 active:scale-[0.98] disabled:opacity-70 text-lg font-sans"
          >
            {loading ? "Sending Code..." : "Send Reset Code"}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <Link
            to="/login"
            className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium font-sans"
          >
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
