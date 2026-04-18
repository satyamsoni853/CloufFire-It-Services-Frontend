import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';

const JobSeekerDirectory = () => {
  const [jobseekers, setJobseekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobseekers();
  }, []);

  const fetchJobseekers = async () => {
    const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    try {
      const response = await fetch(`${API}/employer/jobseekers`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setJobseekers(data);
      }
    } catch (err) {
      console.error("Failed to fetch jobseekers", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSeekers = jobseekers.filter(s => 
    s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.skills?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 font-serif">Job Seeker Directory</h1>
        <p className="text-gray-500 mt-2 font-medium">Browse and connect with the best talent on CloudFire.</p>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md">
          <input 
            type="text" 
            placeholder="Search by name or skills (e.g. React)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl px-12 py-4 outline-none focus:border-[#ff7301] transition-all shadow-sm"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#ff7301]"></div>
        </div>
      ) : filteredSeekers.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">No job seekers found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSeekers.map((seeker) => (
            <motion.div 
              key={seeker.email}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              
              <div className="flex items-center gap-5 mb-6 relative">
                <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-md border border-gray-50 overflow-hidden">
                  <img 
                    src={seeker.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${seeker.full_name}`} 
                    alt={seeker.full_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg leading-tight">{seeker.full_name}</h4>
                  <p className="text-xs text-[#ff7301] font-bold uppercase tracking-widest mt-1">{seeker.work_status}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed italic">
                  "{seeker.bio || 'Professional job seeker looking for opportunities.'}"
                </p>
                <div className="flex flex-wrap gap-2">
                  {seeker.skills?.split(',').slice(0, 3).map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-tight border border-gray-100">
                      {skill.trim()}
                    </span>
                  ))}
                  {(seeker.skills?.split(',').length > 3) && (
                    <span className="text-[10px] font-bold text-gray-300">+{seeker.skills.split(',').length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                {seeker.resume_url ? (
                  <a 
                    href={seeker.resume_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 bg-black text-white py-3.5 rounded-2xl text-xs font-bold hover:bg-gray-800 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Resume
                  </a>
                ) : (
                  <button className="flex-1 bg-gray-100 text-gray-400 py-3.5 rounded-2xl text-xs font-bold cursor-not-allowed">No Resume</button>
                )}
                <button className="flex-1 bg-[#ff7301] text-white py-3.5 rounded-2xl text-xs font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">
                  Hire Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default JobSeekerDirectory;
