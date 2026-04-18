import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const JobsPage = () => {
  const jobs = [
    { title: 'Full Stack Developer', company: 'Google', location: 'Remote', salary: '$120k - $150k', type: 'Full-time', posted: '2 days ago' },
    { title: 'UI/UX Designer', company: 'Figma', location: 'San Francisco', salary: '$100k - $130k', type: 'Contract', posted: '5 days ago' },
    { title: 'Backend Engineer', company: 'Netflix', location: 'Remote', salary: '$140k - $180k', type: 'Full-time', posted: '1 week ago' },
    { title: 'Data Scientist', company: 'Meta', location: 'Menlo Park', salary: '$130k - $160k', type: 'Full-time', posted: '3 days ago' },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif font-bold text-[32px] text-secondary">Active Jobs</h1>
          <p className="text-gray-500">Manage and track all posted job opportunities.</p>
        </div>
        {(localStorage.getItem('role') === 'employer' || localStorage.getItem('role') === 'admin') && (
          <button className="bg-[#ff7301] text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-orange-600 transition-all flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Post a New Job
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {jobs.map((job, index) => (
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
                <p className="text-xs text-gray-400 mt-2">Posted {job.posted}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-secondary group transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default JobsPage;
