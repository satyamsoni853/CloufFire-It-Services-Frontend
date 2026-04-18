import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { User, FileText, Building2, Users, CheckCircle, TrendingUp, BarChart as BarChartIcon, PieChart as PieChartIcon, Edit3, Settings } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const HireTalentDashboard = () => {
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; return; }
    Promise.all([
      fetch(`${API}/dashboard/stats`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null),
      fetch(`${API}/profile`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null),
    ]).then(([s, p]) => { setStats(s); setProfile(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7301]"></div>
      </div>
    </DashboardLayout>
  );

  const completeness = stats?.profile_completeness || 0;
  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const StatCard = ({ Icon, label, value, color, bg }) => (
    <div className={`${bg} rounded-3xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}>
      <div className="absolute top-0 right-0 opacity-10 translate-x-4 -translate-y-4">
        <Icon size={100} className={color} />
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 relative z-10">{label}</p>
      <p className={`text-4xl font-bold ${color} relative z-10`}>{value}</p>
    </div>
  );

  const tips = [
    { icon: <FileText size={32} className="text-blue-500" />, title: 'Upload Your Resume', desc: 'Employers are 3x more likely to contact candidates with resumes.', done: stats?.has_resume },
    { icon: <Settings size={32} className="text-purple-500" />, title: 'Add Your Skills', desc: 'Highlight your expertise to match with relevant job openings.', done: stats?.has_skills },
    { icon: <CheckCircle size={32} className="text-green-500" />, title: 'Complete Your Profile', desc: 'A 100% complete profile ranks higher in employer searches.', done: completeness === 100 },
  ];

  return (
    <DashboardLayout>
      {/* Hero Greeting */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-gray-400 font-semibold text-sm uppercase tracking-widest mb-1">{greeting()}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">
              Welcome back, <span className="text-[#ff7301]">{profile?.full_name?.split(' ')[0] || 'User'}</span>
            </h1>
            <p className="text-gray-500 mt-2 max-w-xl">
              Here's an overview of your career dashboard. Keep your profile updated for better visibility.
            </p>
          </div>
          <a href="/dashboard/profile" className="shrink-0 bg-black text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2 w-fit">
            <Edit3 size={20} />
            Edit Profile
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard Icon={User} label="Profile Score" value={`${completeness}%`} color="text-[#ff7301]" bg="bg-orange-50" />
        <StatCard Icon={FileText} label="Resume" value={stats?.has_resume ? '✓' : '—'} color={stats?.has_resume ? 'text-green-600' : 'text-gray-300'} bg="bg-green-50" />
        <StatCard Icon={Building2} label="Employers" value={stats?.total_employers || 0} color="text-blue-600" bg="bg-blue-50" />
        <StatCard Icon={Users} label="Peers" value={stats?.total_jobseekers || 0} color="text-purple-600" bg="bg-purple-50" />
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 font-serif mb-4 flex items-center gap-2"><PieChartIcon className="text-orange-500" size={20}/> Completeness</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[
                  { name: 'Completed', value: completeness, color: '#ff7301' },
                  { name: 'Missing', value: 100 - completeness, color: '#f3f4f6' }
                ]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  <Cell fill="#ff7301" />
                  <Cell fill="#f3f4f6" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center font-bold text-2xl text-[#ff7301] -mt-36 mb-28">{completeness}%</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 font-serif mb-4 flex items-center gap-2"><TrendingUp className="text-blue-500" size={20}/> Search Appearances</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: 'Week 1', searches: 12 }, { name: 'Week 2', searches: 19 }, { name: 'Week 3', searches: 15 },
                { name: 'Week 4', searches: 25 }, { name: 'This Week', searches: 32 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="searches" stroke="#3b82f6" strokeWidth={4} dot={{strokeWidth: 4, r: 4}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-3">
          <h3 className="text-lg font-bold text-gray-900 font-serif mb-4 flex items-center gap-2"><BarChartIcon className="text-purple-500" size={20}/> Profile Views</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Mon', views: 5 }, { name: 'Tue', views: 8 }, { name: 'Wed', views: 12 },
                { name: 'Thu', views: 7 }, { name: 'Fri', views: 15 }, { name: 'Sat', views: 20 }, { name: 'Sun', views: 18 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="views" fill="#8b5cf6" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Profile Completion Bar */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 font-serif">Profile Completeness</h3>
            <p className="text-sm text-gray-400 mt-1">Complete your profile to unlock all features</p>
          </div>
          <span className={`text-3xl font-bold ${completeness === 100 ? 'text-green-600' : 'text-[#ff7301]'}`}>{completeness}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${completeness === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-[#ff7301] to-[#ff9845]'}`}
            style={{ width: `${completeness}%` }}
          ></div>
        </div>
      </div>

      {/* Action Cards */}
      <h3 className="text-xl font-bold text-gray-900 font-serif mb-5">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {tips.map((tip, i) => (
          <div key={i} className={`rounded-3xl border p-6 transition-all ${tip.done ? 'bg-green-50/50 border-green-200' : 'bg-white border-gray-100 hover:border-[#ff7301]/30 hover:shadow-md'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{tip.icon}</span>
              {tip.done && (
                <span className="bg-green-100 text-green-600 text-[10px] font-bold uppercase px-3 py-1 rounded-full">Done</span>
              )}
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick Profile Summary */}
      {profile && (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
          <h3 className="text-xl font-bold mb-6 font-serif">Your Profile Snapshot</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Email', value: profile.email },
              { label: 'Mobile', value: profile.mobile || 'Not added' },
              { label: 'Status', value: profile.work_status || 'Not set' },
              { label: 'Education', value: profile.education || 'Not added' },
              { label: 'Skills', value: profile.skills || 'Not added' },
              { label: 'Experience', value: profile.experience || 'Not added' },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                <p className="font-medium text-white/90 truncate">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default HireTalentDashboard;
