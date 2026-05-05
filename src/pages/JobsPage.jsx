import React, { useState, useEffect, useMemo } from 'react';
import { apiRequest } from '../utils/api';
import toast from 'react-hot-toast';
import { Search, X, SlidersHorizontal, MapPin, Briefcase, DollarSign, Clock, Building2, Layers, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import GlobalLoader from '../components/GlobalLoader';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyModal, setApplyModal] = useState({ open: false, job: null });
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [expandedJob, setExpandedJob] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: [],
    work_mode: [],
    experience: [],
    location: '',
    company: '',
    department: '',
    industry: '',
  });

  const fetchJobs = async () => {
    try {
      const data = await apiRequest('/jobs');
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const role = localStorage.getItem('role');

  // Extract unique values for filter options
  const uniqueLocations = useMemo(() => [...new Set(jobs.map(j => j.location).filter(Boolean))], [jobs]);
  const uniqueCompanies = useMemo(() => [...new Set(jobs.map(j => j.company).filter(Boolean))], [jobs]);
  const uniqueDepartments = useMemo(() => [...new Set(jobs.map(j => j.department).filter(Boolean))], [jobs]);
  const uniqueIndustries = useMemo(() => [...new Set(jobs.map(j => j.industry_type).filter(Boolean))], [jobs]);

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({ type: [], work_mode: [], experience: [], location: '', company: '', department: '', industry: '' });
  };

  const activeFilterCount = filters.type.length + filters.work_mode.length + filters.experience.length +
    (filters.location ? 1 : 0) + (filters.company ? 1 : 0) + (filters.department ? 1 : 0) + (filters.industry ? 1 : 0);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        job.title?.toLowerCase().includes(q) || 
        job.company?.toLowerCase().includes(q) || 
        job.location?.toLowerCase().includes(q) ||
        job.skills_required?.toLowerCase().includes(q) ||
        job.description?.toLowerCase().includes(q);
      const matchesType = filters.type.length === 0 || filters.type.includes(job.type);
      const matchesMode = filters.work_mode.length === 0 || filters.work_mode.includes(job.work_mode);
      const matchesLocation = !filters.location || job.location?.toLowerCase().includes(filters.location.toLowerCase());
      const matchesCompany = !filters.company || job.company?.toLowerCase().includes(filters.company.toLowerCase());
      const matchesDept = !filters.department || job.department === filters.department;
      const matchesIndustry = !filters.industry || job.industry_type === filters.industry;
      // Experience filter
      let matchesExp = true;
      if (filters.experience.length > 0) {
        const exp = job.experience_required?.toLowerCase() || '';
        const expNumbers = exp.match(/\d+/g)?.map(Number) || [];
        
        matchesExp = filters.experience.some(f => {
          if (f === 'Fresher') return exp.includes('fresher') || expNumbers.includes(0);
          if (f === '1-3 years') return expNumbers.some(n => n >= 1 && n <= 3);
          if (f === '3-5 years') return expNumbers.some(n => n >= 3 && n <= 5);
          if (f === '5+ years') return expNumbers.some(n => n >= 5);
          return false;
        });
      }
      return matchesSearch && matchesType && matchesMode && matchesLocation && matchesCompany && matchesDept && matchesIndustry && matchesExp;
    });
  }, [jobs, searchQuery, filters]);

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to remove this job?")) return;
    try {
      await apiRequest(`/jobs/${jobId}`, { method: 'DELETE' });
      toast.success("Job removed successfully");
      fetchJobs();
    } catch (err) { console.error("Failed to delete job", err); }
  };

  const handleApply = (job) => { setApplyModal({ open: true, job }); setCoverLetter(''); };

  const handleSubmitApplication = async () => {
    setApplying(true);
    try {
      const data = await apiRequest('/apply-job', {
        method: 'POST',
        body: JSON.stringify({ job_id: applyModal.job.id, cover_letter: coverLetter || null }),
      });
      toast.success(data.message);
      setApplyModal({ open: false, job: null });
    } catch (err) { console.error("Apply failed", err); }
    finally { setApplying(false); }
  };

  const handleSaveJob = async (jobId) => {
    try {
      const data = await apiRequest('/saved-jobs', {
        method: 'POST',
        body: JSON.stringify({ job_id: jobId })
      });
      toast.success(data.message);
    } catch (err) {
      toast.error("Failed to save job");
    }
  };

  const CheckboxGroup = ({ label, icon: Icon, options, filterKey }) => (
    <div className="mb-5">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
        <Icon size={14} /> {label}
      </p>
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleArrayFilter(filterKey, opt)}>
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="font-sans font-semibold text-2xl text-gray-900">Active Jobs</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">{role === 'jobseeker' ? 'Browse and apply to job openings.' : 'Manage and track all posted job opportunities.'}</p>
        </div>
        {(role === 'employer' || role === 'admin') && (
          <a href="/dashboard/jobs/post" className="bg-[#ff7301] text-white px-6 py-3.5 rounded-[20px] font-semibold shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all flex items-center cursor-pointer shrink-0 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            Post a New Job
          </a>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-4 mb-8 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, company, skills, location..."
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-[20px] border-2 border-transparent focus:border-[#ff7301] focus:bg-white outline-none transition-all font-medium text-sm" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-[20px] font-semibold text-xs transition-all cursor-pointer ${showFilters ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <SlidersHorizontal size={14} />
          Filters {activeFilterCount > 0 && <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[9px] font-bold">{activeFilterCount}</span>}
        </button>
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} className="flex items-center gap-1.5 px-5 py-3.5 rounded-[20px] text-rose-500 hover:bg-rose-50 font-semibold text-xs transition-all cursor-pointer">
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6 px-2">
        <p className="text-xs text-gray-500 font-medium tracking-wide">
          Showing <span className="text-gray-900 font-semibold">{filteredJobs.length}</span> of <span className="text-gray-900 font-semibold">{jobs.length}</span> results
        </p>
      </div>

      <div className={`grid gap-10 ${showFilters ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        {/* Sidebar Filters */}
        {showFilters && (
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 sticky top-32 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Advanced Filters</h3>
              </div>

              <CheckboxGroup label="Employment" icon={Briefcase} options={['Full-time', 'Part-time', 'Contract', 'Internship']} filterKey="type" />
              <CheckboxGroup label="Work Mode" icon={MapPin} options={['Remote', 'Onsite', 'Hybrid']} filterKey="work_mode" />
              <CheckboxGroup label="Experience" icon={Clock} options={['Fresher', '1-3 years', '3-5 years', '5+ years']} filterKey="experience" />

              {uniqueLocations.length > 1 && (
                <div className="mb-6">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2"><MapPin size={12} /> Location</p>
                  <select value={filters.location} onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 text-xs font-medium outline-none focus:border-[#ff7301] transition-all bg-gray-50 appearance-none">
                    <option value="">All Locations</option>
                    {uniqueLocations.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className={showFilters ? 'lg:col-span-9' : ''}>
          {loading ? (
            <GlobalLoader variant="compact" message="Loading Cloudfire jobs..." />
          ) : filteredJobs.length === 0 ? (
            <div className="bg-gray-50/50 p-16 rounded-[40px] border border-dashed border-gray-200 text-center">
              <Search className="w-10 h-10 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-semibold text-base mb-1">No matches found</p>
              <p className="text-gray-400 text-xs">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className={`bg-white rounded-[40px] border shadow-sm transition-all overflow-hidden ${expandedJob === job.id ? 'border-[#ff7301]/20 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                  {/* Job Card Header */}
                  <div className="p-8 cursor-pointer" onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex items-start gap-6 flex-1">
                        <div className="w-14 h-14 bg-gray-50 rounded-[20px] flex items-center justify-center text-gray-400 shrink-0 border border-gray-100">
                          {job.company_logo_url ? <img src={job.company_logo_url} alt="" className="w-full h-full object-cover rounded-[20px]"/> :
                            <Briefcase size={24} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#ff7301] transition-colors">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-2 font-medium">
                            <span className="text-gray-900 font-semibold">{job.company}</span>
                            {job.location && <span className="flex items-center gap-1.5"><MapPin size={12} className="text-gray-400"/>{job.location}</span>}
                            {job.experience_required && <span className="flex items-center gap-1.5"><Clock size={12} className="text-gray-400"/>{job.experience_required}</span>}
                            {job.salary && <span className="flex items-center gap-1.5 text-[#ff7301] font-semibold"><DollarSign size={12}/>{job.salary}</span>}
                          </div>
                          {job.description && <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">{job.description}</p>}
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-5">
                            {job.type && <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-xl text-[9px] font-semibold uppercase tracking-widest border border-gray-100">{job.type}</span>}
                            {job.work_mode && <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-xl text-[9px] font-semibold uppercase tracking-widest border border-gray-100">{job.work_mode}</span>}
                            {job.skills_required?.split(',').slice(0, 3).map(s => (
                              <span key={s} className="px-3 py-1.5 bg-gray-50 text-[#ff7301] rounded-xl text-[9px] font-semibold uppercase tracking-widest border border-orange-50">{s.trim()}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {role === 'jobseeker' && (
                          <>
                            <button onClick={(e) => { e.stopPropagation(); handleSaveJob(job.id); }}
                              className="p-3 text-gray-400 hover:text-[#ff7301] hover:bg-gray-50 rounded-[18px] transition-all cursor-pointer border border-gray-100" title="Save Job">
                              <Bookmark size={18} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); handleApply(job); }}
                              className="px-6 py-3 bg-gray-900 text-white rounded-[20px] text-xs font-semibold hover:bg-black transition-all cursor-pointer">
                              Apply Now
                            </button>
                          </>
                        )}
                        {(role === 'admin' || (role === 'employer' && job.posted_by_id)) && (
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteJob(job.id); }}
                            className="p-3 text-rose-500 hover:bg-rose-50 rounded-[18px] transition-colors cursor-pointer border border-transparent hover:border-rose-100" title="Remove Job">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        )}
                        <div className="ml-2 text-gray-300">
                          {expandedJob === job.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedJob === job.id && (
                    <div className="border-t border-gray-50 p-10 bg-gray-50/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {job.education_qualification && <DetailItem label="Education" value={job.education_qualification}/>}
                        {job.openings && <DetailItem label="Openings" value={job.openings}/>}
                        {job.shift_timing && <DetailItem label="Shift Timing" value={job.shift_timing}/>}
                        {job.notice_period && <DetailItem label="Notice Period" value={job.notice_period}/>}
                        {job.industry_type && <DetailItem label="Industry" value={job.industry_type}/>}
                        {job.deadline && <DetailItem label="Deadline" value={job.deadline}/>}
                      </div>
                      {job.perks && <div className="mt-8"><p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Perks & Benefits</p><p className="text-sm text-gray-600 leading-relaxed font-medium">{job.perks}</p></div>}
                      {job.company_description && <div className="mt-6"><p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">About Company</p><p className="text-sm text-gray-600 leading-relaxed font-medium">{job.company_description}</p></div>}
                      {job.company_website && <div className="mt-6 flex justify-end"><a href={job.company_website} target="_blank" rel="noreferrer" className="text-xs text-[#ff7301] font-semibold hover:underline">Visit Website →</a></div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {applyModal.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100">
            <div className="p-8 border-b border-gray-50 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-900">Apply for {applyModal.job?.title}</h2>
              <p className="text-gray-500 text-sm mt-1 font-medium">{applyModal.job?.company} • {applyModal.job?.location}</p>
            </div>
            <div className="p-10">
              <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-5 mb-8">
                <p className="text-xs text-orange-700 font-medium leading-relaxed">Your professional profile and resume will be shared with the hiring team automatically.</p>
              </div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Cover Letter (Optional)</label>
              <textarea rows="5" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full px-5 py-4 rounded-3xl border border-gray-100 focus:border-[#ff7301] outline-none transition-all resize-none bg-gray-50 text-sm font-medium"
                placeholder="Briefly explain your interest in this role..."></textarea>
              <div className="mt-10 flex justify-end gap-3">
                <button onClick={() => setApplyModal({ open: false, job: null })} className="px-6 py-3.5 rounded-[20px] font-semibold text-gray-500 hover:bg-gray-50 transition-all cursor-pointer text-sm">Discard</button>
                <button onClick={handleSubmitApplication} disabled={applying}
                  className="bg-[#ff7301] text-white px-8 py-3.5 rounded-[20px] font-semibold shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all cursor-pointer disabled:opacity-50 text-sm">
                  {applying ? 'Sending...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="bg-white rounded-xl p-3 border border-gray-100">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value}</p>
  </div>
);

export default JobsPage;
