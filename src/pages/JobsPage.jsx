import React, { useState, useEffect, useMemo } from 'react';
import { apiRequest } from '../utils/api';
import toast from 'react-hot-toast';
import { Search, X, SlidersHorizontal, MapPin, Briefcase, DollarSign, Clock, Building2, Layers, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';

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
        matchesExp = filters.experience.some(f => {
          if (f === 'Fresher') return exp.includes('fresher') || exp.includes('0');
          if (f === '1-3 years') return exp.includes('1') || exp.includes('2') || exp.includes('3');
          if (f === '3-5 years') return exp.includes('3') || exp.includes('4') || exp.includes('5');
          if (f === '5+ years') return exp.includes('5') || exp.includes('6') || exp.includes('7') || exp.includes('8') || exp.includes('10');
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="font-serif font-bold text-[32px] text-gray-900">Active Jobs</h1>
          <p className="text-gray-500">{role === 'jobseeker' ? 'Browse and apply to job openings.' : 'Manage and track all posted job opportunities.'}</p>
        </div>
        {(role === 'employer' || role === 'admin') && (
          <a href="/dashboard/jobs/post" className="bg-[#ff7301] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all flex items-center cursor-pointer shrink-0">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Post a New Job
          </a>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, company, skills, location..."
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

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-bold">{filteredJobs.length}</span> of <span className="text-gray-900 font-bold">{jobs.length}</span> jobs
        </p>
      </div>

      <div className={`grid gap-6 ${showFilters ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        {/* Sidebar Filters */}
        {showFilters && (
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-8 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">All Filters</h3>
                {activeFilterCount > 0 && <span className="text-[10px] font-bold bg-[#ff7301] text-white px-2 py-0.5 rounded-full">{activeFilterCount}</span>}
              </div>

              <CheckboxGroup label="Employment Type" icon={Briefcase} options={['Full-time', 'Part-time', 'Contract', 'Internship']} filterKey="type" />
              <CheckboxGroup label="Work Mode" icon={MapPin} options={['Remote', 'Onsite', 'Hybrid']} filterKey="work_mode" />
              <CheckboxGroup label="Experience" icon={Clock} options={['Fresher', '1-3 years', '3-5 years', '5+ years']} filterKey="experience" />

              {uniqueLocations.length > 1 && (
                <div className="mb-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><MapPin size={14} /> Location</p>
                  <select value={filters.location} onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-[#ff7301] transition-all bg-white appearance-none">
                    <option value="">All Locations</option>
                    {uniqueLocations.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              )}
              {uniqueCompanies.length > 1 && (
                <div className="mb-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Building2 size={14} /> Company</p>
                  <select value={filters.company} onChange={(e) => setFilters(prev => ({...prev, company: e.target.value}))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-[#ff7301] transition-all bg-white appearance-none">
                    <option value="">All Companies</option>
                    {uniqueCompanies.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              )}
              {uniqueDepartments.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Layers size={14} /> Department</p>
                  <select value={filters.department} onChange={(e) => setFilters(prev => ({...prev, department: e.target.value}))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-[#ff7301] transition-all bg-white appearance-none">
                    <option value="">All Departments</option>
                    {uniqueDepartments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              )}
              {uniqueIndustries.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Building2 size={14} /> Industry</p>
                  <select value={filters.industry} onChange={(e) => setFilters(prev => ({...prev, industry: e.target.value}))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-[#ff7301] transition-all bg-white appearance-none">
                    <option value="">All Industries</option>
                    {uniqueIndustries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className={showFilters ? 'lg:col-span-9' : ''}>
          {loading ? (
            <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff7301]"></div></div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white p-16 rounded-2xl border border-dashed border-gray-300 text-center">
              <Search className="w-12 h-12 mx-auto text-gray-200 mb-4" />
              <p className="text-gray-500 font-bold text-lg mb-1">No jobs found</p>
              <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
              {activeFilterCount > 0 && <button onClick={clearAllFilters} className="mt-4 text-[#ff7301] font-bold text-sm hover:underline cursor-pointer">Clear all filters</button>}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className={`bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all overflow-hidden ${expandedJob === job.id ? 'border-[#ff7301]/30' : 'border-gray-100'}`}>
                  {/* Job Card Header */}
                  <div className="p-6 cursor-pointer" onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#ff7301] shrink-0 border border-orange-100">
                          {job.company_logo_url ? <img src={job.company_logo_url} alt="" className="w-full h-full object-cover rounded-xl"/> :
                            <Briefcase size={22} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-gray-900 hover:text-[#ff7301] transition-colors">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mt-1">
                            <span className="font-semibold">{job.company}</span>
                            {job.location && <span className="flex items-center gap-1"><MapPin size={12}/>{job.location}</span>}
                            {job.experience_required && <span className="flex items-center gap-1"><Clock size={12}/>{job.experience_required}</span>}
                            {job.salary && <span className="flex items-center gap-1 text-[#ff7301] font-semibold"><DollarSign size={12}/>{job.salary}</span>}
                          </div>
                          {job.description && <p className="text-sm text-gray-400 mt-2 line-clamp-2">{job.description}</p>}
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {job.type && <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-blue-100">{job.type}</span>}
                            {job.work_mode && <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-green-100">{job.work_mode}</span>}
                            {job.department && <span className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-purple-100">{job.department}</span>}
                            {job.skills_required?.split(',').slice(0, 4).map(s => (
                              <span key={s} className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-gray-100">{s.trim()}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {role === 'jobseeker' && (
                          <>
                            <button onClick={(e) => { e.stopPropagation(); handleSaveJob(job.id); }}
                              className="p-2.5 text-gray-400 hover:text-[#ff7301] hover:bg-orange-50 rounded-xl transition-all cursor-pointer border border-gray-200 hover:border-orange-200" title="Save Job">
                              <Bookmark size={18} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); handleApply(job); }}
                              className="px-5 py-2.5 bg-[#ff7301] text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 cursor-pointer">
                              Apply Now
                            </button>
                          </>
                        )}
                        {(role === 'admin' || (role === 'employer' && job.posted_by_id)) && (
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteJob(job.id); }}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Remove Job">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        )}
                        {expandedJob === job.id ? <ChevronUp size={18} className="text-gray-400"/> : <ChevronDown size={18} className="text-gray-400"/>}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedJob === job.id && (
                    <div className="border-t border-gray-100 p-6 bg-gray-50/50 animate-in" style={{ animation: 'fadeIn 0.2s ease-out' }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {job.education_qualification && <DetailItem label="Education" value={job.education_qualification}/>}
                        {job.openings && <DetailItem label="Openings" value={job.openings}/>}
                        {job.shift_timing && <DetailItem label="Shift Timing" value={job.shift_timing}/>}
                        {job.notice_period && <DetailItem label="Notice Period" value={job.notice_period}/>}
                        {job.industry_type && <DetailItem label="Industry" value={job.industry_type}/>}
                        {job.deadline && <DetailItem label="Deadline" value={job.deadline}/>}
                        {job.hr_name && <DetailItem label="Contact Person" value={job.hr_name}/>}
                        {job.hr_phone && <DetailItem label="Phone" value={job.hr_phone}/>}
                        {job.application_email && <DetailItem label="Email" value={job.application_email}/>}
                      </div>
                      {job.perks && <div className="mt-4"><p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Perks & Benefits</p><p className="text-sm text-gray-700">{job.perks}</p></div>}
                      {job.company_description && <div className="mt-4"><p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">About Company</p><p className="text-sm text-gray-700">{job.company_description}</p></div>}
                      {job.company_website && <div className="mt-3"><a href={job.company_website} target="_blank" rel="noreferrer" className="text-sm text-blue-600 font-semibold hover:underline">{job.company_website}</a></div>}
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
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#ff7301] to-[#ff9845] text-white">
              <h2 className="text-xl font-bold">Apply for {applyModal.job?.title}</h2>
              <p className="text-white/80 text-sm mt-1">{applyModal.job?.company} • {applyModal.job?.location}</p>
            </div>
            <div className="p-8">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-700 font-medium">💡 Your profile details and resume (if uploaded) will be automatically shared with the employer.</p>
              </div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Cover Letter (Optional)</label>
              <textarea rows="5" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7301] focus:ring-2 focus:ring-[#ff7301]/20 outline-none transition-all resize-none"
                placeholder="Tell the employer why you're a great fit for this role..."></textarea>
              <div className="mt-6 flex justify-end space-x-4">
                <button onClick={() => setApplyModal({ open: false, job: null })} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all cursor-pointer">Cancel</button>
                <button onClick={handleSubmitApplication} disabled={applying}
                  className="bg-[#ff7301] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all cursor-pointer disabled:opacity-50">
                  {applying ? 'Submitting...' : 'Submit Application'}
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
