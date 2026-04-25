import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { apiRequest } from '../utils/api';
import toast from 'react-hot-toast';
import UserProfileModal from '../components/UserProfileModal';
import { Search, X, SlidersHorizontal, GraduationCap, Briefcase, Wrench, FileText, Users } from 'lucide-react';

const JobSeekerDirectory = () => {
  const [jobseekers, setJobseekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactModal, setContactModal] = useState({ open: false, seeker: null });
  const [contactMessage, setContactMessage] = useState('');
  const [sendingContact, setSendingContact] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showFilters, setShowFilters] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    work_status: [],
    has_resume: '',
    has_skills: '',
    education: '',
  });

  useEffect(() => { fetchJobseekers(); }, []);

  const fetchJobseekers = async () => {
    try {
      const data = await apiRequest('/employer/jobseekers');
      setJobseekers(data);
    } catch (err) { console.error("Failed to fetch jobseekers", err); }
    finally { setLoading(false); }
  };

  const handleContact = (seeker) => {
    setContactModal({ open: true, seeker });
    setContactMessage(`Hi ${seeker.full_name},\n\nI came across your profile on Cloudfire and would love to discuss a potential opportunity with you.\n\nLooking forward to hearing from you.`);
  };

  const handleSendContact = async () => {
    if (!contactMessage.trim()) { toast.error('Please enter a message'); return; }
    setSendingContact(true);
    try {
      const data = await apiRequest('/contact-seeker', {
        method: 'POST',
        body: JSON.stringify({ seeker_email: contactModal.seeker.email, message: contactMessage }),
      });
      toast.success(data.message);
      setContactModal({ open: false, seeker: null });
      setContactMessage('');
    } catch (err) { console.error("Failed to contact seeker", err); }
    finally { setSendingContact(false); }
  };

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({ work_status: [], has_resume: '', has_skills: '', education: '' });
  };

  const activeFilterCount = filters.work_status.length + (filters.has_resume ? 1 : 0) + (filters.has_skills ? 1 : 0) + (filters.education ? 1 : 0);

  // Unique education values
  const uniqueEducations = useMemo(() => [...new Set(jobseekers.map(s => s.education).filter(Boolean))], [jobseekers]);

  // Filter seekers
  const filteredSeekers = useMemo(() => {
    return jobseekers.filter(s => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = !q ||
        s.full_name?.toLowerCase().includes(q) ||
        s.skills?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.education?.toLowerCase().includes(q) ||
        s.bio?.toLowerCase().includes(q);
      const matchesStatus = filters.work_status.length === 0 || filters.work_status.some(ws => s.work_status?.toLowerCase() === ws.toLowerCase());
      const matchesResume = !filters.has_resume || (filters.has_resume === 'yes' ? !!s.resume_url : !s.resume_url);
      const matchesSkills = !filters.has_skills || (filters.has_skills === 'yes' ? !!s.skills : !s.skills);
      const matchesEdu = !filters.education || s.education?.toLowerCase().includes(filters.education.toLowerCase());
      return matchesSearch && matchesStatus && matchesResume && matchesSkills && matchesEdu;
    });
  }, [jobseekers, searchTerm, filters]);

  const CheckboxGroup = ({ label, icon: Icon, options, filterKey }) => (
    <div className="mb-5">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Icon size={14} /> {label}</p>
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center transition-all ${
              filters[filterKey].includes(opt) ? 'bg-[#ff7301] border-[#ff7301]' : 'border-gray-300 group-hover:border-[#ff7301]'
            }`}>
              {filters[filterKey].includes(opt) && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 font-serif">Job Seeker Directory</h1>
        <p className="text-gray-500 mt-2 font-medium">Browse and connect with the best talent on CloudFire.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, skills, education..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#ff7301] focus:bg-white outline-none transition-all font-medium" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${showFilters ? 'bg-[#ff7301] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <SlidersHorizontal size={16} />
          Filters {activeFilterCount > 0 && <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">{activeFilterCount}</span>}
        </button>
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-bold text-sm transition-all cursor-pointer">
            <X size={14} /> Clear All
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-bold">{filteredSeekers.length}</span> of <span className="text-gray-900 font-bold">{jobseekers.length}</span> candidates
        </p>
      </div>

      <div className={`grid gap-6 ${showFilters ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        {/* Sidebar Filters */}
        {showFilters && (
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">All Filters</h3>
                {activeFilterCount > 0 && <span className="text-[10px] font-bold bg-[#ff7301] text-white px-2 py-0.5 rounded-full">{activeFilterCount}</span>}
              </div>

              <CheckboxGroup label="Work Status" icon={Briefcase} options={['Fresher', 'Experienced']} filterKey="work_status" />

              <div className="mb-5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><FileText size={14} /> Resume</p>
                <select value={filters.has_resume} onChange={(e) => setFilters(prev => ({...prev, has_resume: e.target.value}))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-[#ff7301] transition-all bg-white appearance-none">
                  <option value="">All</option>
                  <option value="yes">With Resume</option>
                  <option value="no">Without Resume</option>
                </select>
              </div>

              <div className="mb-5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Wrench size={14} /> Skills</p>
                <select value={filters.has_skills} onChange={(e) => setFilters(prev => ({...prev, has_skills: e.target.value}))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-[#ff7301] transition-all bg-white appearance-none">
                  <option value="">All</option>
                  <option value="yes">With Skills Listed</option>
                  <option value="no">Without Skills</option>
                </select>
              </div>

              {uniqueEducations.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><GraduationCap size={14} /> Education</p>
                  <select value={filters.education} onChange={(e) => setFilters(prev => ({...prev, education: e.target.value}))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-[#ff7301] transition-all bg-white appearance-none">
                    <option value="">All</option>
                    {uniqueEducations.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Candidate Cards */}
        <div className={showFilters ? 'lg:col-span-9' : ''}>
          {loading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#ff7301]"></div></div>
          ) : filteredSeekers.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
              <Users className="w-12 h-12 mx-auto text-gray-200 mb-4" />
              <p className="text-gray-500 font-bold text-lg mb-1">No candidates found</p>
              <p className="text-gray-400 text-sm">Try adjusting your filters.</p>
              {activeFilterCount > 0 && <button onClick={clearAllFilters} className="mt-4 text-[#ff7301] font-bold text-sm hover:underline cursor-pointer">Clear all filters</button>}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSeekers.map((seeker) => (
                <motion.div key={seeker.email} whileHover={{ y: -6 }}
                  className="bg-white p-7 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-[80px] -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>

                  <div className="flex items-center gap-4 mb-5 relative cursor-pointer" onClick={() => setSelectedUser(seeker)}>
                    <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-gray-50 overflow-hidden group-hover:ring-2 group-hover:ring-orange-300/50 transition-all">
                      <img src={seeker.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${seeker.full_name}`} alt={seeker.full_name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 text-base leading-tight group-hover:text-[#ff7301] transition-colors truncate">{seeker.full_name}</h4>
                      <p className="text-[10px] text-[#ff7301] font-bold uppercase tracking-widest mt-0.5">{seeker.work_status}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed italic">"{seeker.bio || 'Professional job seeker looking for opportunities.'}"</p>
                    {seeker.education && <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5"><GraduationCap size={12}/> {seeker.education}</p>}
                    <div className="flex flex-wrap gap-1.5">
                      {seeker.skills?.split(',').slice(0, 3).map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-tight border border-gray-100">{skill.trim()}</span>
                      ))}
                      {(seeker.skills?.split(',').length > 3) && <span className="text-[10px] font-bold text-gray-300">+{seeker.skills.split(',').length - 3}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setSelectedUser(seeker)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-2xl text-xs font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      View
                    </button>
                    {seeker.resume_url ? (
                      <a href={seeker.resume_url} target="_blank" rel="noreferrer"
                        className="flex-1 bg-black text-white py-3 rounded-2xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-1.5">
                        <FileText size={12}/> Resume
                      </a>
                    ) : (
                      <button className="flex-1 bg-gray-100 text-gray-400 py-3 rounded-2xl text-xs font-bold cursor-not-allowed">No Resume</button>
                    )}
                    <button onClick={() => handleContact(seeker)}
                      className="flex-1 bg-[#ff7301] text-white py-3 rounded-2xl text-xs font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 cursor-pointer">
                      Hire
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      {contactModal.open && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Contact {contactModal.seeker?.full_name}</h2>
                <p className="text-sm text-gray-400 mt-1">{contactModal.seeker?.email}</p>
              </div>
              <button onClick={() => setContactModal({ open: false, seeker: null })} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
              <textarea rows="6" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7301] focus:ring-2 focus:ring-[#ff7301]/20 outline-none transition-all resize-none"
                placeholder="Write a message to this candidate..."></textarea>
              <p className="text-xs text-gray-400 mt-2">This message will be sent to the candidate's email along with your contact details.</p>
              <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={() => setContactModal({ open: false, seeker: null })}
                  className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all cursor-pointer">Cancel</button>
                <button onClick={handleSendContact} disabled={sendingContact}
                  className="bg-[#ff7301] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all cursor-pointer disabled:opacity-50">
                  {sendingContact ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedUser && <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </>
  );
};

export default JobSeekerDirectory;
