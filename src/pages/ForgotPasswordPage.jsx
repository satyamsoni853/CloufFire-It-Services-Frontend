import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API}/forgot-password?email=${email}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        if (data.debug_otp) {
          alert(`Debug Code: ${data.debug_otp}`);
        }
        navigate('/reset-password', { state: { email } });
      } else {
        setStatus({ type: 'error', message: data.detail || 'Something went wrong' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Connection error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col items-center py-16 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#ff7301]/5 to-transparent"></div>
      
      <Link to="/" className="relative z-10 mb-10 transition-transform hover:scale-105">
        <img src="/Assests/Cloudfire.png" alt="CloudFire" className="h-12 w-auto" />
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[480px] w-full bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 p-10 md:p-14 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Forgot Password?</h2>
          <p className="text-gray-500 font-medium">Enter your email to receive a reset code</p>
        </div>

        {status.message && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-8 p-4 rounded-2xl text-sm font-medium border text-center ${
              status.type === 'error' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-green-50 border-green-100 text-green-600'
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
              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-4 text-gray-900 transition-all outline-none placeholder:text-gray-400 font-medium"
              placeholder="Registered Email ID"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#ff7301] to-[#ff9845] hover:from-[#e66700] hover:to-[#ff8524] text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-[#ff7301]/30 active:scale-[0.98] disabled:opacity-70 text-lg"
          >
            {loading ? 'Sending Code...' : 'Send Reset Code'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <Link to="/login" className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium">
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
