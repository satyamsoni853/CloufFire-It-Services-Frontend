import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Briefcase, User, ArrowRight, Command } from 'lucide-react';
import { apiRequest } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlobalLoader from './GlobalLoader';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ jobs: [], talents: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 1) {
        handleSearch();
      } else {
        setResults({ jobs: [], talents: [] });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await apiRequest(`/search?q=${encodeURIComponent(query)}`);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative z-50" ref={searchRef}>
      {/* Search Trigger */}
      <div 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-6 py-2.5 bg-gray-50 border border-gray-100 rounded-[20px] cursor-pointer hover:border-gray-200 transition-all w-full md:w-64"
      >
        <Search size={16} className="text-gray-400" />
        <span className="text-gray-400 text-xs font-medium">Search anything...</span>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-0 right-0 w-full md:w-[600px] bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="p-8 border-b border-gray-50 flex items-center gap-4">
              <Search className="text-[#ff7301]" size={20} />
              <input 
                autoFocus
                type="text" 
                placeholder="Jobs, talent, or skills..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-base font-semibold text-gray-900"
              />
              <button onClick={closeSearch} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors"><X size={18}/></button>
            </div>

            <div className="max-h-[500px] overflow-y-auto p-6 custom-scrollbar">
              {loading && (
                <GlobalLoader variant="compact" message="Searching Cloudfire..." />
              )}
              
              {!loading && query.length > 1 && (
                <div className="space-y-8">
                  {results.jobs.length > 0 && (
                    <div>
                      <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-4 mb-4">Jobs</h3>
                      {results.jobs.map(job => (
                        <div key={job.id} onClick={() => { navigate(`/jobs`); closeSearch(); }} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-[24px] cursor-pointer group transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-300 border border-gray-100 group-hover:text-[#ff7301] transition-colors"><Briefcase size={18}/></div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#ff7301] transition-colors">{job.title}</p>
                              <p className="text-[10px] text-gray-400 font-semibold mt-0.5 uppercase tracking-wider">{job.company} • {job.location}</p>
                            </div>
                          </div>
                          <ArrowRight size={14} className="text-gray-200 group-hover:text-gray-900 transform group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  )}

                  {results.talents.length > 0 && (
                    <div>
                      <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-4 mb-4">Talent</h3>
                      {results.talents.map(t => (
                        <div key={t.id} onClick={() => { navigate(`/dashboard/marketplace`); closeSearch(); }} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-[24px] cursor-pointer group transition-all">
                          <div className="flex items-center gap-4">
                            <img src={t.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.full_name}`} className="w-10 h-10 rounded-xl bg-gray-50" />
                            <div>
                              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#ff7301] transition-colors">{t.full_name}</p>
                              <p className="text-[10px] text-gray-400 font-semibold mt-0.5 uppercase tracking-wider">{t.work_status || 'Job Seeker'} • {t.skills?.split(',')[0] || 'Professional'}</p>
                            </div>
                          </div>
                          <ArrowRight size={14} className="text-gray-200 group-hover:text-gray-900 transform group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  )}

                  {results.jobs.length === 0 && results.talents.length === 0 && (
                    <div className="p-12 text-center">
                      <p className="text-xs text-gray-400 font-medium italic">No matches found for "{query}"</p>
                    </div>
                  )}
                </div>
              )}

              {query.length <= 1 && (
                <div className="p-12 text-center">
                  <Command size={32} className="text-gray-100 mx-auto mb-4" />
                  <p className="text-gray-400 text-xs font-medium">Type at least 2 characters to start searching...</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearch;
