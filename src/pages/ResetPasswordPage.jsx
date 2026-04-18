import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [formData, setFormData] = useState({
    otp: '',
    new_password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  if (!email) {
    navigate('/forgot-password');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      setStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API}/reset-password?email=${email}&otp=${formData.otp}&new_password=${formData.new_password}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login', { state: { message: 'Password reset successful! Please login with your new password.' } });
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Reset Password</h2>
          <p className="text-gray-500 font-medium">Verify code and set new password</p>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 ml-1">6-DIGIT CODE</label>
            <input
              type="text"
              name="otp"
              required
              maxLength="6"
              value={formData.otp}
              onChange={handleChange}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-4 text-gray-900 transition-all outline-none placeholder:text-gray-400 font-bold tracking-[0.5em] text-center"
              placeholder="000000"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 ml-1">NEW PASSWORD</label>
            <input
              type="password"
              name="new_password"
              required
              value={formData.new_password}
              onChange={handleChange}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-4 text-gray-900 transition-all outline-none placeholder:text-gray-400 font-medium"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 ml-1">CONFIRM PASSWORD</label>
            <input
              type="password"
              name="confirm_password"
              required
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-4 text-gray-900 transition-all outline-none placeholder:text-gray-400 font-medium"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#ff7301] to-[#ff9845] hover:from-[#e66700] hover:to-[#ff8524] text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-[#ff7301]/30 active:scale-[0.98] disabled:opacity-70 mt-4 text-lg"
          >
            {loading ? 'Resetting...' : 'Update Password'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <Link to="/login" className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium">
            ← Cancel and Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
