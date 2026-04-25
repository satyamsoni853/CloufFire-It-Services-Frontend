import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiRequest } from '../utils/api';
import toast from 'react-hot-toast';

const SECTIONS = [
  { id: 'resume', label: 'Resume', icon: '📄' },
  { id: 'headline', label: 'Resume Headline', icon: '🏷️' },
  { id: 'skills', label: 'Key Skills', icon: '⚡' },
  { id: 'employment', label: 'Employment', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'summary', label: 'Profile Summary', icon: '📝' },
  { id: 'personal', label: 'Personal Details', icon: '👤' },
];

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
    work_status: '',
    location: 'Mumbai, India',
    salary: 'Not disclosed',
  });
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState({ type: '', status: false });
  const [editSection, setEditSection] = useState(null);
  const [activeSection, setActiveSection] = useState('resume');

  const sectionRefs = {
    resume: useRef(null),
    headline: useRef(null),
    skills: useRef(null),
    employment: useRef(null),
    education: useRef(null),
    projects: useRef(null),
    summary: useRef(null),
    personal: useRef(null),
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await apiRequest('/profile');
      setProfile(prev => ({ ...prev, ...data }));
    } catch (err) {
      console.error("Failed to fetch profile", err);
      toast.error("Could not load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    setUpdating(true);
    try {
      await apiRequest('/profile', {
        method: 'PUT',
        body: JSON.stringify({ ...profile, ...updatedData }),
      });
      setProfile(prev => ({ ...prev, ...updatedData }));
      toast.success('Profile updated successfully!');
      setEditSection(null);
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading({ type, status: true });
    const formData = new FormData();
    formData.append('file', file);

    const endpoint = type === 'image' ? 'upload-image' : 'upload-resume';

    try {
      const data = await apiRequest(`/${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      if (type === 'image') setProfile({ ...profile, profile_image_url: data.url });
      else setProfile({ ...profile, resume_url: data.url });
      toast.success(`${type === 'image' ? 'Profile Picture' : 'Resume'} uploaded successfully!`);
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading({ type: '', status: false });
    }
  };

  const calculateCompleteness = () => {
    const fields = ['full_name', 'mobile', 'education', 'experience', 'skills', 'bio', 'resume_url'];
    const filledFields = fields.filter(f => profile[f] && profile[f].length > 0);
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-[#ff7301] rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-400 font-medium animate-pulse">Building your professional profile...</p>
    </div>
  );

  const completeness = calculateCompleteness();

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-24">
      
      {/* --- HERO SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden relative"
      >
        <div className="h-40 bg-gradient-to-r from-[#1a1a1a] via-[#333333] to-[#1a1a1a] relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="absolute top-6 right-8 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">
            Member since April 2024
          </div>
        </div>
        
        <div className="px-10 pb-10 -mt-16 flex flex-col md:flex-row gap-8 items-end md:items-center">
          <div className="relative group shrink-0">
            <div className="w-40 h-40 rounded-[40px] bg-white p-2 shadow-2xl overflow-hidden border-4 border-white">
              <img 
                src={profile.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.full_name}`} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-[32px] bg-gray-50" 
              />
            </div>
            <label className="absolute inset-2 flex items-center justify-center bg-black/60 rounded-[32px] opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm">
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
              <div className="text-center scale-90 group-hover:scale-100 transition-transform">
                <svg className="w-8 h-8 text-white mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">Change Photo</span>
              </div>
            </label>
            {uploading.type === 'image' && (
              <div className="absolute inset-2 flex items-center justify-center bg-white/80 rounded-[32px] z-10">
                <div className="w-8 h-8 border-3 border-[#ff7301] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="flex-1 w-full text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900 font-serif leading-tight">{profile.full_name}</h1>
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-sm" title="Verified Profile">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </span>
                </div>
                <p className="text-gray-500 font-semibold text-lg mb-6">{profile.experience?.split('\n')[0] || 'Professional Job Seeker'}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-3 gap-x-8">
                  <HeroStat icon="📍" label={profile.location} />
                  <HeroStat icon="💼" label={profile.experience ? '1-3 Years' : 'Fresher'} />
                  <HeroStat icon="💰" label={profile.salary} />
                  <HeroStat icon="📞" label={profile.mobile || 'Add Phone'} />
                </div>
              </div>
              
              <div className="shrink-0 flex flex-col items-center md:items-end gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Profile Strength</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold uppercase ${completeness > 80 ? 'text-green-500' : 'text-orange-500'}`}>
                        {completeness > 80 ? 'Excellent' : 'Good'}
                      </span>
                      <span className="text-2xl font-bold text-gray-900">{completeness}%</span>
                    </div>
                  </div>
                  <div className="w-20 h-20 relative">
                    <svg className="w-20 h-20 -rotate-90">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                      <circle cx="40" cy="40" r="34" fill="none" stroke={completeness > 80 ? "#22c55e" : "#ff7301"} strokeWidth="8" strokeDasharray={213.6} strokeDashoffset={213.6 - (213.6 * completeness) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full shadow-inner flex items-center justify-center">
                        <svg className={`w-6 h-6 ${completeness > 80 ? 'text-green-500' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Last updated: Today</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* --- LEFT SIDEBAR --- */}
        <aside className="lg:w-1/4 w-full sticky top-28 space-y-6">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/20 p-6 overflow-hidden">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-8 px-4 text-center">Dashboard Navigation</h3>
            <nav className="space-y-2">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
                    activeSection === section.id 
                    ? 'bg-[#ff7301] text-white shadow-lg shadow-orange-200 translate-x-2' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-gradient-to-br from-[#ff7301] to-[#ff9845] rounded-[32px] p-8 text-white relative overflow-hidden group shadow-xl shadow-orange-100">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mb-6 backdrop-blur-md">✨</div>
              <h4 className="text-xl font-bold mb-3">Profile Booster</h4>
              <p className="text-orange-50 text-xs leading-relaxed mb-6 opacity-90">Adding a professional summary increases your profile visibility by 45% to recruiters.</p>
              <button className="w-full bg-white text-[#ff7301] text-[11px] font-bold uppercase tracking-widest py-3.5 rounded-xl hover:shadow-2xl transition-all active:scale-95">
                Optimize Summary
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <div className="lg:w-3/4 w-full space-y-8">
          
          <SectionCard id="resume" title="Resume" icon="📄" ref={sectionRefs.resume} isEditable={false}>
            <div className="flex flex-col sm:flex-row items-center gap-8 p-8 bg-gray-50/50 rounded-[32px] border border-dashed border-gray-200 hover:border-[#ff7301] transition-colors group/resume">
              <div className="w-20 h-20 rounded-3xl bg-white shadow-lg flex items-center justify-center shrink-0 group-hover/resume:scale-110 transition-transform duration-500">
                <svg className="w-10 h-10 text-[#ff7301]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">Resume document</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-1">Recruiters often search by keywords found in your resume.</p>
                <p className="text-[10px] text-[#ff7301] font-bold uppercase tracking-wider">Supported: PDF, DOCX (Max 2MB)</p>
              </div>
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <label className="bg-black text-white px-8 py-4 rounded-2xl text-xs font-bold text-center cursor-pointer hover:bg-gray-800 transition-all active:scale-95 shadow-xl hover:shadow-2xl whitespace-nowrap">
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, 'resume')} />
                  {uploading.type === 'resume' ? 'Uploading...' : 'Upload New Resume'}
                </label>
                {profile.resume_url && (
                  <a href={profile.resume_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-gray-500 hover:text-[#ff7301] text-[11px] font-bold uppercase tracking-widest transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    Preview
                  </a>
                )}
              </div>
            </div>
          </SectionCard>

          <SectionCard 
            id="headline" 
            title="Resume Headline" 
            icon="🏷️" 
            ref={sectionRefs.headline}
            onEdit={() => setEditSection('headline')}
            isEditing={editSection === 'headline'}
            value={profile.bio}
            onSave={(val) => handleUpdate({ bio: val })}
            onCancel={() => setEditSection(null)}
          >
            {profile.bio ? (
              <p className="text-gray-800 text-lg font-medium leading-relaxed italic border-l-4 border-orange-100 pl-6 py-2">"{profile.bio}"</p>
            ) : (
              <EmptyState message="Recruiters look for a clear professional identity. Add a headline that captures your core expertise." />
            )}
          </SectionCard>

          <SectionCard 
            id="skills" 
            title="Key Skills" 
            icon="⚡" 
            ref={sectionRefs.skills}
            onEdit={() => setEditSection('skills')}
            isEditing={editSection === 'skills'}
            value={profile.skills}
            onSave={(val) => handleUpdate({ skills: val })}
            onCancel={() => setEditSection(null)}
          >
            {profile.skills ? (
              <div className="flex flex-wrap gap-3">
                {profile.skills.split(',').map((skill, i) => (
                  <span key={i} className="px-6 py-3 bg-gray-50 text-gray-800 rounded-2xl text-[13px] font-bold border border-gray-100 hover:border-[#ff7301] hover:text-[#ff7301] hover:bg-white hover:shadow-lg hover:shadow-orange-50 transition-all cursor-default translate-y-0 hover:-translate-y-1">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            ) : (
              <EmptyState message="What are you good at? Add your technical and soft skills to get discovered." />
            )}
          </SectionCard>

          <SectionCard 
            id="employment" 
            title="Employment History" 
            icon="💼" 
            ref={sectionRefs.employment}
            onEdit={() => setEditSection('employment')}
            isEditing={editSection === 'employment'}
            value={profile.experience}
            onSave={(val) => handleUpdate({ experience: val })}
            onCancel={() => setEditSection(null)}
          >
            {profile.experience ? (
              <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                {profile.experience.split('\n').map((exp, i) => (
                  <div key={i} className="relative pl-10 group/item">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-orange-50 group-hover/item:border-[#ff7301] transition-colors z-10 flex items-center justify-center">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#ff7301]"></div>
                    </div>
                    <p className="text-gray-800 text-base font-semibold leading-relaxed">{exp}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Full Time Role</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="List your work history starting with your most recent role." />
            )}
          </SectionCard>

          <SectionCard 
            id="education" 
            title="Education" 
            icon="🎓" 
            ref={sectionRefs.education}
            onEdit={() => setEditSection('education')}
            isEditing={editSection === 'education'}
            value={profile.education}
            onSave={(val) => handleUpdate({ education: val })}
            onCancel={() => setEditSection(null)}
          >
            {profile.education ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.education.split('\n').map((edu, i) => (
                  <div key={i} className="flex gap-5 p-6 bg-gray-50/50 rounded-3xl border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all group/edu">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover/edu:scale-110 transition-transform">🎓</div>
                    <div>
                      <p className="text-gray-900 font-bold text-base">{edu}</p>
                      <p className="text-[10px] text-[#ff7301] font-bold uppercase tracking-widest mt-2">Full Time Education</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="Highlight your academic background and degrees." />
            )}
          </SectionCard>

          <SectionCard 
            id="personal" 
            title="Personal Details" 
            icon="👤" 
            ref={sectionRefs.personal}
            onEdit={() => setEditSection('personal')}
            isEditing={editSection === 'personal'}
            isPersonal={true}
            profile={profile}
            onSave={handleUpdate}
            onCancel={() => setEditSection(null)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16 p-2">
              <DetailItem label="Full Name" value={profile.full_name} />
              <DetailItem label="Gender" value="Not Specified" />
              <DetailItem label="Date of Birth" value="Not Specified" />
              <DetailItem label="Work Status" value={profile.work_status || 'Add Status'} />
              <DetailItem label="Languages" value="English, Hindi" />
              <DetailItem label="Primary Email" value={profile.email} />
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const SectionCard = React.forwardRef(({ id, title, icon, children, onEdit, isEditing, value, onSave, onCancel, isPersonal, profile }, ref) => {
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/20 p-10 group relative hover:shadow-2xl transition-all duration-700"
    >
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-3xl bg-gray-50 flex items-center justify-center text-2xl shadow-inner group-hover:bg-[#ff7301]/10 group-hover:scale-110 transition-all duration-500">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 font-serif tracking-tight">{title}</h3>
        </div>
        {onEdit && !isEditing && (
          <button 
            onClick={onEdit}
            className="flex items-center gap-2 text-[#ff7301] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-orange-50 px-6 py-3 rounded-2xl transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            Edit
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6"
          >
            {isPersonal ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Name" defaultValue={profile.full_name} onChange={(e) => setLocalValue(prev => ({ ...prev, full_name: e.target.value }))} />
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Work Status</label>
                  <select 
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-bold text-sm"
                    defaultValue={profile.work_status}
                    onChange={(e) => setLocalValue(prev => ({ ...prev, work_status: e.target.value }))}
                  >
                    <option value="Fresher">Fresher</option>
                    <option value="Experienced">Experienced</option>
                  </select>
                </div>
              </div>
            ) : (
              <textarea 
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-[32px] px-8 py-6 outline-none transition-all font-semibold text-gray-800 text-base leading-relaxed resize-none shadow-inner"
                rows={title === 'Key Skills' ? 3 : 5}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={`Tell us about your ${title.toLowerCase()}...`}
              />
            )}
            <div className="flex gap-3 justify-end pt-4">
              <button onClick={onCancel} className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest hover:bg-gray-100 rounded-2xl transition-all">Cancel</button>
              <button 
                onClick={() => onSave(localValue)}
                className="px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] bg-black text-white rounded-2xl hover:bg-gray-800 hover:shadow-2xl transition-all active:scale-95"
              >
                Save Profile
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-700">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const HeroStat = ({ icon, label }) => (
  <div className="flex items-center gap-3 bg-gray-50/80 px-5 py-3 rounded-2xl border border-gray-100 hover:border-orange-100 hover:bg-white transition-all shadow-sm group/stat">
    <span className="text-lg group-hover/stat:scale-125 transition-transform">{icon}</span>
    <span className="text-sm font-bold text-gray-600 group-hover/stat:text-gray-900 transition-colors">{label}</span>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="space-y-3 group/detail">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] group-hover/detail:text-[#ff7301] transition-colors">{label}</p>
    <p className="text-base font-bold text-gray-900 border-b border-gray-50 pb-2 group-hover/detail:border-orange-100 transition-colors">{value || 'Not added'}</p>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-10 px-6 bg-orange-50/30 rounded-[32px] border border-dashed border-orange-100">
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm mb-4">💡</div>
    <p className="text-gray-500 text-sm font-medium text-center leading-relaxed max-w-sm">{message}</p>
  </div>
);

const InputGroup = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-bold text-sm"
      {...props}
    />
  </div>
);

export default ProfilePage;
