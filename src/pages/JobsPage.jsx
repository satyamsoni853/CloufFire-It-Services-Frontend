import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full-time',
    description: ''
  });

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/jobs`);
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setShowModal(false);
        fetchJobs();
        setFormData({ title: '', company: '', location: '', salary: '', type: 'Full-time', description: '' });
      }
    } catch (err) {
      console.error("Failed to post job", err);
    }
  };

  const role = localStorage.getItem('role');

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif font-bold text-[32px] text-secondary">Active Jobs</h1>
          <p className="text-gray-500">Manage and track all posted job opportunities.</p>
        </div>
        {(role === 'employer' || role === 'admin') && (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#ff7301] text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-orange-600 transition-all flex items-center cursor-pointer"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Post a New Job
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff7301]"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center">
              <p className="text-gray-500 font-medium">No jobs posted yet.</p>
            </div>
          ) : (
            jobs.map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-[#ff7301]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[18px] text-secondary">{job.title}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                      <span>{job.company}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span className="text-[#ff7301] font-semibold">{job.salary}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center space-x-6">
                  <div className="text-right hidden sm:block">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                      {job.type}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">Posted Recently</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-secondary group transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Post Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-secondary">Post a New Job</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handlePostJob} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7301] focus:ring-2 focus:ring-[#ff7301]/20 outline-none transition-all"
                    placeholder="e.g. Full Stack Developer"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7301] focus:ring-2 focus:ring-[#ff7301]/20 outline-none transition-all"
                    placeholder="e.g. CloudFire IT"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7301] focus:ring-2 focus:ring-[#ff7301]/20 outline-none transition-all"
                    placeholder="e.g. Remote or City, Country"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Salary Range</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7301] focus:ring-2 focus:ring-[#ff7301]/20 outline-none transition-all"
                    placeholder="e.g. $80k - $120k"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Job Type</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7301] focus:ring-2 focus:ring-[#ff7301]/20 outline-none transition-all"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Job Description</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7301] focus:ring-2 focus:ring-[#ff7301]/20 outline-none transition-all resize-none"
                  placeholder="Describe the role and requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#ff7301] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all cursor-pointer"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default JobsPage;
