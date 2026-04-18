import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    mobile: '',
    work_status: 'Fresher', 
    role: 'jobseeker',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelection = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.debug_otp) {
          alert(`Email service failed, but here is your code for testing: ${data.debug_otp}`);
        }
        navigate('/verify-otp', { 
          state: { 
            email: formData.email,
            pending_token: data.pending_token 
          } 
        });
      } else {
        setStatus({ type: 'error', message: data.detail || 'Something went wrong' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Connection error. Is the backend running?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col items-center py-12 px-4 relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#ff7301]/5 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ff7301]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Logo */}
      <Link to="/" className="relative z-10 mb-8 transition-transform hover:scale-105">
        <img src="/Assests/Cloudfire.png" alt="CloudFire" className="h-10 w-auto" />
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[550px] w-full bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 font-serif">Join CloudFire</h2>
          <p className="text-gray-500 font-medium">Create your profile and land your dream job</p>
        </div>

        {status.message && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-8 p-4 rounded-2xl text-sm font-medium border text-center ${
              status.type === 'error' 
                ? 'bg-red-50 border-red-100 text-red-600' 
                : 'bg-green-50 border-green-100 text-green-600'
            }`}
          >
            {status.message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700 ml-1">Choose your role *</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'jobseeker', label: 'Job Seeker', icon: '🎓' },
                { id: 'employer', label: 'Employee', icon: '💼' }
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleSelection(role.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all group ${
                    formData.role === role.id 
                      ? 'border-[#ff7301] bg-[#ff7301]/5' 
                      : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'
                  }`}
                >
                  <span className="text-xl mb-1 group-hover:scale-110 transition-transform">{role.icon}</span>
                  <span className={`font-bold text-[10px] uppercase tracking-tight ${formData.role === role.id ? 'text-[#ff7301]' : 'text-gray-700'}`}>{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <input
                type="text"
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-4 text-gray-900 transition-all outline-none placeholder:text-gray-400 font-medium"
                placeholder="Full Name"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#ff7301] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
            </div>

            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-4 text-gray-900 transition-all outline-none placeholder:text-gray-400 font-medium"
                placeholder="Email Address"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#ff7301] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
            </div>

            <div className="relative group">
              <input
                type="tel"
                name="mobile"
                required
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-4 text-gray-900 transition-all outline-none placeholder:text-gray-400 font-medium"
                placeholder="Mobile Number"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#ff7301] transition-colors text-sm font-bold pr-1">+91</span>
            </div>

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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#ff7301] to-[#ff9845] hover:from-[#e66700] hover:to-[#ff8524] text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-[#ff7301]/30 active:scale-[0.98] disabled:opacity-70 mt-4 text-lg"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-[#ff7301] font-bold hover:underline">Log in</Link>
        </p>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-4">Trusted by professionals at</p>
          <div className="flex justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="font-bold text-gray-800">GOOGLE</span>
            <span className="font-bold text-gray-800">META</span>
            <span className="font-bold text-gray-800">AMAZON</span>
          </div>
        </div>
      </motion.div>

      <Link to="/" className="mt-8 text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium relative z-10">
        ← Return to Homepage
      </Link>
    </div>
  );
};

export default SignupPage;
