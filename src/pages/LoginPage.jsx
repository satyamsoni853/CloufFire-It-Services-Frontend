import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('role', data.role);
        navigate('/dashboard');
      } else {
        setError(data.detail || 'Invalid email or password');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col items-center py-16 px-4 relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#ff7301]/5 to-transparent"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ff7301]/5 rounded-full blur-3xl"></div>

      {/* Logo */}
      <Link to="/" className="relative z-10 mb-10 transition-transform hover:scale-105">
        <img src="/Assests/Cloudfire.png" alt="CloudFire" className="h-12 w-auto" />
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[480px] w-full bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 p-10 md:p-14 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Welcome back</h2>
          <p className="text-gray-500 font-medium">Log in to your account</p>
        </div>

        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-green-50 border border-green-100 text-green-600 rounded-2xl text-sm flex items-center justify-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
            {successMessage}
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-4 text-gray-900 transition-all outline-none placeholder:text-gray-400 font-medium"
              placeholder="Email ID / Username"
            />
          </div>

          <div className="space-y-2">
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-4 text-gray-900 transition-all outline-none placeholder:text-gray-400 font-medium"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ff7301] transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                )}
              </button>
            </div>
            <div className="text-right">
              <Link to="/forgot-password" size="xs" className="text-xs font-bold text-[#ff7301] hover:underline">Forgot Password?</Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#ff7301] to-[#ff9845] hover:from-[#e66700] hover:to-[#ff8524] text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-[#ff7301]/30 active:scale-[0.98] disabled:opacity-70 mt-2 text-lg"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#ff7301] font-bold hover:underline">Register for free</Link>
          </p>
        </div>
      </motion.div>

      <Link to="/" className="mt-10 text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium relative z-10">
        ← Return to Homepage
      </Link>
    </div>
  );
};

export default LoginPage;
