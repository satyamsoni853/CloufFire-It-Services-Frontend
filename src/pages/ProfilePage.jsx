import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiRequest } from '../utils/api';
import toast from 'react-hot-toast';
import { 
  Star, 
  ShieldCheck, 
  Zap, 
  Edit3, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Phone, 
  Calendar, 
  Award,
  CheckCircle2,
  FileText,
  User,
  ArrowRight
} from 'lucide-react';
import GlobalLoader from '../components/GlobalLoader';

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
    location: '',
    salary: '',
    projects: '',
    summary: '',
    gender: '',
    dob: '',
    languages: '',
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

  const handleMagicParse = async () => {
    if (!profile.resume_url) {
      toast.error("Please upload a resume first!");
      return;
    }
    
    setLoading(true);
    try {
      const data = await apiRequest('/parse-resume', { method: 'POST' });
      toast.success(data.message);
      fetchProfile(); // Refresh profile with extracted data
    } catch (err) {
      console.error("Parse failed", err);
      toast.error("AI Parsing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAvailability = async (availability) => {
    setLoading(true);
    try {
      await apiRequest('/profile', {
        method: 'PUT',
        body: JSON.stringify({ ...profile, availability })
      });
      setProfile({ ...profile, availability });
      toast.success(`Availability updated to ${availability}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBoostProfile = async () => {
    setLoading(true);
    try {
      await apiRequest('/profile', {
        method: 'PUT',
        body: JSON.stringify({ ...profile, is_featured: true })
      });
      setProfile({ ...profile, is_featured: true });
      toast.success("Profile Boost Activated! You are now at the top of the Marketplace.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

  if (loading) return <GlobalLoader message="Building your Cloudfire profile..." />;

  const completeness = calculateCompleteness();

  return (
    <div className="max-w-[1000px] mx-auto space-y-12 pb-24 font-sans">
      
      {/* --- HERO SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[48px] border border-gray-100 shadow-sm overflow-hidden relative"
      >
        <div className="h-32 bg-gray-50 relative">
          <div className="absolute top-6 right-8 text-gray-400 text-[10px] font-semibold uppercase tracking-widest">
            ID: {profile.id || '2024-USR'}
          </div>
        </div>
        
        <div className="px-12 pb-12 -mt-12 flex flex-col md:flex-row gap-10 items-end md:items-center">
          <div className="relative group shrink-0">
            <div className="w-32 h-32 rounded-[40px] bg-white p-1.5 shadow-xl overflow-hidden border border-gray-100">
              <img 
                src={profile.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.full_name}`} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-[36px] bg-gray-50" 
              />
            </div>
            <label className="absolute inset-1.5 flex items-center justify-center bg-black/40 rounded-[36px] opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-[2px]">
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
              <div className="text-center">
                <svg className="w-6 h-6 text-white mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
            </label>
            {uploading.type === 'image' && (
              <div className="absolute inset-1.5 flex items-center justify-center bg-white/80 rounded-[36px] z-10">
                <div className="w-6 h-6 border-2 border-[#ff7301] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="flex-1 w-full text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{profile.full_name}</h1>
                  <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white" title="Verified Profile">
                    <CheckCircle2 size={12} strokeWidth={3} />
                  </span>
                </div>
                <p className="text-gray-500 font-medium text-sm mb-6">{profile.experience?.split('\n')[0] || 'Professional Talent'}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-3 gap-x-6">
                  <HeroStat icon="📍" label={profile.location || 'Location'} onClick={() => scrollToSection('personal')} />
                  <HeroStat icon="💼" label={profile.experience ? 'Experienced' : 'Fresher'} onClick={() => scrollToSection('employment')} />
                  <HeroStat icon="💰" label={profile.salary || 'Salary'} onClick={() => scrollToSection('personal')} />
                </div>
              </div>
              
              <div className="shrink-0 flex items-center gap-6 bg-gray-50/50 p-6 rounded-[32px] border border-gray-100">
                <div className="text-right">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Strength</p>
                  <p className="text-xl font-semibold text-gray-900">{completeness}%</p>
                </div>
                <div className="w-12 h-12 relative">
                  <svg className="w-12 h-12 -rotate-90">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                    <circle cx="24" cy="24" r="20" fill="none" stroke={completeness > 80 ? "#22c55e" : "#ff7301"} strokeWidth="4" strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * completeness) / 100} strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap size={14} className={completeness > 80 ? 'text-green-500' : 'text-[#ff7301]'} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* --- LEFT SIDEBAR --- */}
        <aside className="lg:w-1/4 w-full sticky top-32 space-y-6">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-6">
            <nav className="space-y-1">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-[20px] text-xs font-semibold transition-all ${
                    activeSection === section.id 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-base">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-gray-50 rounded-[40px] p-8 border border-gray-100 text-center">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-lg mx-auto mb-4 shadow-sm">✨</div>
            <h4 className="text-sm font-semibold mb-2">Visibility Tip</h4>
            <p className="text-gray-500 text-[11px] leading-relaxed mb-6">Profiles with a summary are 45% more likely to be viewed by top employers.</p>
            <button onClick={() => scrollToSection('summary')} className="w-full bg-white border border-gray-100 text-gray-900 text-[10px] font-semibold uppercase tracking-widest py-3 rounded-2xl hover:bg-gray-900 hover:text-white transition-all">
              Update Summary
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <div className="lg:w-3/4 w-full space-y-10">
          
          <SectionCard id="resume" title="Resume" icon="📄" ref={sectionRefs.resume} isEditable={false}>
            <div className="flex flex-col sm:flex-row items-center gap-8 p-10 bg-gray-50/30 rounded-[40px] border border-dashed border-gray-200 hover:border-[#ff7301] transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                <FileText className="w-8 h-8 text-gray-300" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Resume document</h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed mb-3">Ensure your resume contains relevant keywords for better search discovery.</p>
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  {profile.resume_url && (
                    <a href={profile.resume_url} target="_blank" rel="noreferrer" className="text-[10px] font-semibold text-[#ff7301] uppercase tracking-widest hover:underline">
                      View current
                    </a>
                  )}
                  <span className="text-[10px] text-gray-300 font-semibold uppercase tracking-widest">PDF, DOCX (2MB)</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <label className="bg-gray-900 text-white px-8 py-3.5 rounded-[20px] text-[11px] font-semibold text-center cursor-pointer hover:bg-black transition-all shadow-md whitespace-nowrap">
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, 'resume')} />
                  {uploading.type === 'resume' ? 'Uploading...' : 'Upload Resume'}
                </label>
                {profile.resume_url && (
                  <button 
                    onClick={handleMagicParse}
                    className="bg-white border border-gray-100 text-gray-900 px-8 py-3.5 rounded-[20px] text-[11px] font-semibold hover:bg-gray-50 transition-all shadow-sm"
                  >
                    ✨ AI Parse
                  </button>
                )}
              </div>
            </div>
          </SectionCard>

          {/* Marketplace Settings */}
          {profile.role === 'jobseeker' && (
            <SectionCard title="Talent Marketplace" icon="⚡">
              <div className="space-y-10">
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-4">Availability</label>
                  <div className="flex flex-wrap gap-3">
                    {['Immediate', '15 Days', '30 Days'].map(status => (
                      <button
                        key={status}
                        onClick={() => handleUpdateAvailability(status)}
                        className={`px-6 py-2.5 rounded-2xl text-[11px] font-semibold transition-all border ${profile.availability === status ? 'border-[#ff7301] bg-[#ff7301]/5 text-[#ff7301]' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-10 bg-gray-900 rounded-[40px] text-white relative overflow-hidden group shadow-lg shadow-gray-200">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Star size={18} className="text-[#ff7301] fill-[#ff7301]" />
                      <h4 className="text-lg font-semibold">Featured Candidate</h4>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed mb-8 max-w-sm">Elevate your profile to the top of search results and attract 10x more attention from premium hiring managers.</p>
                    <button 
                      onClick={handleBoostProfile}
                      disabled={profile.is_featured}
                      className={`px-8 py-3.5 rounded-[20px] font-semibold text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 ${profile.is_featured ? 'bg-green-500 text-white cursor-default' : 'bg-[#ff7301] hover:bg-orange-600 text-white'}`}
                    >
                      {profile.is_featured ? (
                        <><ShieldCheck size={14}/> Featured Active</>
                      ) : (
                        <><Zap size={14}/> Boost Profile</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          <SectionCard 
            id="headline" 
            title="Headline" 
            icon="🏷️" 
            ref={sectionRefs.headline}
            onEdit={() => setEditSection('headline')}
            isEditing={editSection === 'headline'}
            value={profile.bio}
            onSave={(val) => handleUpdate({ bio: val })}
            onCancel={() => setEditSection(null)}
          >
            {profile.bio ? (
              <p className="text-gray-800 text-base font-medium leading-relaxed pl-6 border-l-2 border-orange-100">"{profile.bio}"</p>
            ) : (
              <EmptyState message="Define your professional mission. Let recruiters know exactly what you bring to the table." />
            )}
          </SectionCard>

          <SectionCard 
            id="skills" 
            title="Competencies" 
            icon="⚡" 
            ref={sectionRefs.skills}
            onEdit={() => setEditSection('skills')}
            isEditing={editSection === 'skills'}
            value={profile.skills}
            onSave={(val) => handleUpdate({ skills: val })}
            onCancel={() => setEditSection(null)}
          >
            {profile.skills ? (
              <div className="flex flex-wrap gap-2.5">
                {profile.skills.split(',').map((skill, i) => (
                  <span key={i} className="px-5 py-2.5 bg-gray-50 text-gray-600 rounded-2xl text-[11px] font-semibold uppercase tracking-wider border border-gray-100 transition-all hover:bg-white hover:border-[#ff7301] hover:text-[#ff7301] cursor-default">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            ) : (
              <EmptyState message="List your core expertise and technical stack to match with relevant opportunities." />
            )}
          </SectionCard>

          <SectionCard 
            id="employment" 
            title="Experience" 
            icon="💼" 
            ref={sectionRefs.employment}
            onEdit={() => setEditSection('employment')}
            isEditing={editSection === 'employment'}
            value={profile.experience}
            onSave={(val) => handleUpdate({ experience: val })}
            onCancel={() => setEditSection(null)}
          >
            {profile.experience ? (
              <div className="space-y-10">
                {profile.experience.split('\n').map((exp, i) => (
                  <div key={i} className="flex gap-6 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff7301] mt-2.5 shrink-0 opacity-40 group-hover/item:opacity-100 transition-opacity"></div>
                    <div>
                      <p className="text-gray-900 text-base font-semibold leading-relaxed tracking-tight">{exp}</p>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-1.5">Professional Record</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="Record your career journey. Detailed experience helps you stand out." />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {profile.education.split('\n').map((edu, i) => (
                  <div key={i} className="p-6 bg-gray-50/50 rounded-[32px] border border-gray-100 hover:bg-white transition-all">
                    <p className="text-gray-900 font-semibold text-sm leading-tight">{edu}</p>
                    <p className="text-[9px] text-[#ff7301] font-semibold uppercase tracking-widest mt-2">Academic Qualification</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="Highlight your academic accomplishments and degrees." />
            )}
          </SectionCard>

          <SectionCard 
            id="personal" 
            title="Personal Profile" 
            icon="👤" 
            ref={sectionRefs.personal}
            onEdit={() => setEditSection('personal')}
            isEditing={editSection === 'personal'}
            isPersonal={true}
            profile={profile}
            onSave={handleUpdate}
            onCancel={() => setEditSection(null)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 px-2">
              <DetailItem label="Full Name" value={profile.full_name} />
              <DetailItem label="Contact" value={profile.mobile} />
              <DetailItem label="Status" value={profile.work_status} />
              <DetailItem label="Email" value={profile.email} />
              <DetailItem label="Location" value={profile.location} />
              <DetailItem label="Salary Expectations" value={profile.salary} />
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white rounded-[48px] border border-gray-100 shadow-sm p-12 group transition-all duration-500 hover:shadow-md"
    >
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-[20px] bg-gray-50 flex items-center justify-center text-xl border border-gray-100 group-hover:bg-[#ff7301]/5 transition-colors">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight">{title}</h3>
        </div>
        {onEdit && !isEditing && (
          <button 
            onClick={onEdit}
            className="flex items-center gap-2 text-[#ff7301] text-[10px] font-semibold uppercase tracking-widest hover:bg-gray-50 px-5 py-2.5 rounded-2xl transition-all"
          >
            <Edit3 size={14} />
            Update
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-8"
          >
            {isPersonal ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Name" defaultValue={profile.full_name} onChange={(e) => setLocalValue(prev => ({ ...prev, full_name: e.target.value }))} />
                <InputGroup label="Mobile Number" defaultValue={profile.mobile} onChange={(e) => setLocalValue(prev => ({ ...prev, mobile: e.target.value }))} />
                <InputGroup label="Location" defaultValue={profile.location} onChange={(e) => setLocalValue(prev => ({ ...prev, location: e.target.value }))} />
                <InputGroup label="Salary" defaultValue={profile.salary} onChange={(e) => setLocalValue(prev => ({ ...prev, salary: e.target.value }))} />
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-1">Status</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-100 focus:border-[#ff7301] rounded-2xl px-6 py-4 outline-none transition-all font-semibold text-sm"
                    defaultValue={profile.work_status}
                    onChange={(e) => setLocalValue(prev => ({ ...prev, work_status: e.target.value }))}
                  >
                    <option value="">Select Status</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Experienced">Experienced</option>
                  </select>
                </div>
              </div>
            ) : (
              <textarea 
                className="w-full bg-gray-50 border border-gray-100 focus:border-[#ff7301] rounded-[32px] px-8 py-6 outline-none transition-all font-medium text-gray-800 text-sm leading-relaxed resize-none"
                rows={title === 'Key Skills' ? 3 : 5}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={`Describe your ${title.toLowerCase()}...`}
              />
            )}
            <div className="flex gap-3 justify-end">
              <button onClick={onCancel} className="px-6 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest hover:bg-gray-50 rounded-[20px] transition-all">Cancel</button>
              <button 
                onClick={() => onSave(localValue)}
                className="px-10 py-3.5 text-[11px] font-semibold uppercase tracking-widest bg-gray-900 text-white rounded-[20px] hover:bg-black transition-all"
              >
                Save Changes
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

const HeroStat = ({ icon, label, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-2.5 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 hover:border-orange-100 transition-all ${onClick ? 'cursor-pointer' : ''}`}
  >
    <span className="text-base">{icon}</span>
    <span className="text-xs font-semibold text-gray-500">{label}</span>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="space-y-2">
    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-semibold text-gray-900">{value || 'Add detail'}</p>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-12 px-8 bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
    <p className="text-gray-400 text-xs font-medium text-center leading-relaxed max-w-sm">{message}</p>
  </div>
);

const InputGroup = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      className="w-full bg-gray-50 border border-gray-100 focus:border-[#ff7301] rounded-2xl px-6 py-4 outline-none transition-all font-semibold text-sm"
      {...props}
    />
  </div>
);

export default ProfilePage;
