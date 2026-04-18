import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    mobile: '',
    education: '',
    experience: '',
    skills: '',
    bio: '',
    resume_url: '',
    profile_image_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState({ type: '', status: false });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API}/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading({ type, status: true });
    const formData = new FormData();
    formData.append('file', file);

    const endpoint = type === 'image' ? 'upload-image' : 'upload-resume';

    try {
      const response = await fetch(`${API}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (type === 'image') setProfile({ ...profile, profile_image_url: data.url });
        else setProfile({ ...profile, resume_url: data.url });
        setMessage({ type: 'success', text: `${type === 'image' ? 'Image' : 'Resume'} uploaded successfully!` });
      } else {
        setMessage({ type: 'error', text: 'Upload failed.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error during upload.' });
    } finally {
      setUploading({ type: '', status: false });
    }
  };

  const calculateCompleteness = () => {
    const fields = ['full_name', 'mobile', 'education', 'experience', 'skills', 'bio', 'resume_url'];
    const filledFields = fields.filter(f => profile[f] && profile[f].length > 0);
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Changes saved successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error.' });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7301]"></div>
      </div>
    </DashboardLayout>
  );

  const completeness = calculateCompleteness();

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-8 pb-20">
        
        {/* Left Side: Profile Overview Card */}
        <div className="lg:w-1/3 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden"
          >
            <div className="h-24 bg-gradient-to-r from-[#ff7301] to-[#ff9845]"></div>
            <div className="px-8 pb-8 -mt-12 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4 group cursor-pointer">
                <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-lg overflow-hidden border-4 border-white">
                  <img 
                    src={profile.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.full_name}`} 
                    alt="Avatar" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
                  <span className="text-white text-[10px] font-bold uppercase">Change</span>
                </label>
                {uploading.type === 'image' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-3xl">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-orange-500"></div>
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 font-serif">{profile.full_name || 'Your Name'}</h2>
              <p className="text-[#ff7301] font-bold text-sm uppercase tracking-wider mb-2">{localStorage.getItem('role')}</p>
              <p className="text-gray-400 text-sm font-medium mb-6">{profile.email}</p>
              
              <div className="space-y-4">
                <div className="text-left">
                  <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
                    <span>PROFILE COMPLETENESS</span>
                    <span>{completeness}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${completeness}%` }}
                      className="h-full bg-green-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div className="pt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-2xl text-center">
                    <p className="text-xs font-bold text-gray-400">EXP</p>
                    <p className="text-sm font-bold text-gray-900">{profile.experience ? 'Added' : '-'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-2xl text-center">
                    <p className="text-xs font-bold text-gray-400">CV</p>
                    <p className="text-sm font-bold text-gray-900">{profile.resume_url ? 'Uploaded' : '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="bg-orange-50/50 p-6 rounded-[24px] border border-orange-100">
            <h4 className="text-orange-600 font-bold text-sm mb-2 flex items-center gap-2">
              <span>💡</span> Pro Tip
            </h4>
            <p className="text-orange-800 text-xs leading-relaxed font-medium">
              Users with a complete profile and resume link are 70% more likely to be contacted by employers.
            </p>
          </div>
        </div>

        {/* Right Side: Edit Form */}
        <div className="lg:w-2/3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 md:p-10"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 font-serif">Edit Profile</h3>
              {message.text && (
                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${message.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {message.text}
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Full Name</label>
                  <input 
                    name="full_name"
                    value={profile.full_name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all font-medium"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Mobile Number</label>
                  <input 
                    name="mobile"
                    value={profile.mobile || ''}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all font-medium"
                    placeholder="10 digit number"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">About You</label>
                  <textarea 
                    name="bio"
                    rows="3"
                    value={profile.bio || ''}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all font-medium resize-none"
                    placeholder="Tell employers what makes you special..."
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50">
                <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-widest">Education & Experience</h4>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Education</label>
                    <textarea 
                      name="education"
                      rows="2"
                      value={profile.education || ''}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all font-medium"
                      placeholder="Degrees, certifications, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Experience</label>
                    <textarea 
                      name="experience"
                      rows="3"
                      value={profile.experience || ''}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all font-medium"
                      placeholder="Roles, companies, and achievements"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Skills</label>
                    <input 
                      name="skills"
                      value={profile.skills || ''}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all font-medium"
                      placeholder="React, Node.js, Python..."
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50">
                <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-widest">Resume</h4>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Upload Resume (PDF/DOCX)</label>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <label className="w-full sm:w-auto px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold cursor-pointer transition-all flex items-center justify-center gap-2">
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, 'resume')} />
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      {uploading.type === 'resume' ? 'Uploading...' : 'Upload File'}
                    </label>
                    {profile.resume_url && (
                      <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <a href={profile.resume_url} target="_blank" rel="noreferrer" className="hover:underline">View Uploaded Resume</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={updating}
                  className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl active:scale-[0.98] disabled:opacity-70"
                >
                  {updating ? 'Saving Changes...' : 'Save All Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
