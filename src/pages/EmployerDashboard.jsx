import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Users, FileText, Wrench, Building2, Search, PieChart as PieChartIcon, TrendingUp, BarChart as BarChartIcon } from 'lucide-react';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const EmployerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [jobseekers, setJobseekers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; return; }
    Promise.all([
      fetch(`${API}/dashboard/stats`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null),
      fetch(`${API}/employer/jobseekers`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : []),
      fetch(`${API}/profile`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null),
    ]).then(([s, j, p]) => { setStats(s); setJobseekers(j); setProfile(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredSeekers = jobseekers.filter(s =>
    s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.skills?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7301]"></div>
      </div>
    </DashboardLayout>
  );

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <DashboardLayout>
      {/* Hero */}
      <div className="mb-10">
        <p className="text-gray-400 font-semibold text-sm uppercase tracking-widest mb-1">{greeting()}</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">
          Welcome, <span className="text-blue-600">{profile?.full_name?.split(' ')[0] || 'Employer'}</span>
        </h1>
        <p className="text-gray-500 mt-2">Find and hire pre-vetted talent for your organization.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          { label: 'Available Talent', value: stats?.available_talent || 0, color: 'text-blue-600', bg: 'bg-blue-50', Icon: Users },
          { label: 'With Resume', value: stats?.talent_with_resume || 0, color: 'text-green-600', bg: 'bg-green-50', Icon: FileText },
          { label: 'With Skills', value: stats?.talent_with_skills || 0, color: 'text-purple-600', bg: 'bg-purple-50', Icon: Wrench },
          { label: 'Employers Active', value: stats?.total_employers || 0, color: 'text-orange-600', bg: 'bg-orange-50', Icon: Building2 },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{s.label}</p>
              <div className={`p-2 rounded-xl bg-white/50 ${s.color}`}><s.Icon size={20} /></div>
            </div>
            <p className={`text-4xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 font-serif mb-4 flex items-center gap-2"><PieChartIcon className="text-blue-500" size={20}/> Candidate Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[
                  { name: 'Fresher', value: 40, color: '#3b82f6' },
                  { name: 'Experienced', value: 60, color: '#10b981' }
                ]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Fresher</div>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium"><span className="w-3 h-3 rounded-full bg-green-500"></span> Experienced</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 font-serif mb-4 flex items-center gap-2"><TrendingUp className="text-[#ff7301]" size={20}/> Job Views Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: 'Mon', views: 120 }, { name: 'Tue', views: 200 }, { name: 'Wed', views: 150 },
                { name: 'Thu', views: 300 }, { name: 'Fri', views: 250 }, { name: 'Sat', views: 100 }, { name: 'Sun', views: 80 }
              ]}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="views" stroke="#3b82f6" fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-3">
          <h3 className="text-lg font-bold text-gray-900 font-serif mb-4 flex items-center gap-2"><BarChartIcon className="text-purple-500" size={20}/> Top Skills in Demand</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'React', count: 45 }, { name: 'Node.js', count: 38 }, { name: 'Python', count: 52 },
                { name: 'AWS', count: 30 }, { name: 'Docker', count: 25 }, { name: 'UI/UX', count: 20 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Talent Pool */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="p-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 font-serif">Talent Pool</h3>
              <p className="text-gray-400 text-sm mt-1">{filteredSeekers.length} candidates available</p>
            </div>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all w-full sm:w-72 font-medium"
              />
            </div>
          </div>
        </div>

        {filteredSeekers.length === 0 ? (
          <div className="p-16 text-center">
            <Search className="w-16 h-16 mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">No candidates found matching your search.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredSeekers.map((seeker) => (
              <div key={seeker.email} className="p-6 sm:px-8 hover:bg-gray-50/50 transition-colors group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                      <img src={seeker.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${seeker.full_name}`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{seeker.full_name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400 font-medium">{seeker.email}</span>
                        {seeker.work_status && (
                          <span className="px-2 py-0.5 bg-orange-50 text-[#ff7301] rounded-full text-[10px] font-bold uppercase">{seeker.work_status}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    {seeker.resume_url && (
                      <a href={seeker.resume_url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Resume
                      </a>
                    )}
                    <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">
                      Contact
                    </button>
                  </div>
                </div>
                {/* Skills row */}
                {seeker.skills && (
                  <div className="mt-3 flex flex-wrap gap-1.5 ml-16">
                    {seeker.skills.split(',').slice(0, 6).map(skill => (
                      <span key={skill} className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">{skill.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold font-serif mb-1">Need specific talent?</h3>
          <p className="text-blue-200 text-sm">Post a job listing and let qualified candidates come to you.</p>
        </div>
        <a href="/dashboard/jobs" className="shrink-0 bg-white text-blue-700 px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-lg">
          Post a Job
        </a>
      </div>
    </DashboardLayout>
  );
};

export default EmployerDashboard;
