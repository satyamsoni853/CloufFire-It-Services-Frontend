import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Users, Briefcase, Building, CheckCircle, PieChart as PieChartIcon, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; return; }
    
    Promise.all([
      fetch(`${API}/dashboard/stats`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null),
      fetch(`${API}/admin/all-users`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : []),
    ]).then(([s, u]) => { 
      setStats(s); 
      setUsers(u); 
      setLoading(false); 
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    </DashboardLayout>
  );

  const jobseekers = users.filter(u => u.role === 'jobseeker');
  const employers = users.filter(u => u.role === 'employer');

  const StatCard = ({ label, value, Icon, bg, color }) => (
    <div className={`${bg} rounded-3xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 border border-${color.split('-')[1]}-100`}>
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</p>
        <div className={`p-2 rounded-xl bg-white/50 ${color}`}><Icon size={20} /></div>
      </div>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
  );

  const UserTable = ({ title, data, type }) => (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-serif">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{data.length} registered {type}s</p>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">User Details</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((u) => (
              <tr key={u.email} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                      <img src={u.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.full_name}`} alt="" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{u.full_name}</div>
                      <div className="text-xs text-gray-400 font-medium">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-700">{u.mobile || 'N/A'}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${u.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-xs font-bold text-gray-600 uppercase">{u.is_active ? 'Active' : 'Pending'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-400 italic">No {type}s found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Mock data for graphs
  const roleDistribution = [
    { name: 'Job Seekers', value: stats?.total_jobseekers || 0, color: '#ff7301' },
    { name: 'Employers', value: stats?.total_employers || 0, color: '#3b82f6' }
  ];

  const growthData = [
    { name: 'Jan', users: 10 }, { name: 'Feb', users: 15 }, { name: 'Mar', users: 20 },
    { name: 'Apr', users: 28 }, { name: 'May', users: (stats?.total_users || 30) }
  ];

  const activityData = [
    { name: 'Active', count: stats?.active_users || 0 },
    { name: 'Inactive', count: (stats?.total_users || 0) - (stats?.active_users || 0) }
  ];

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">
          Admin <span className="text-purple-600">Control Center</span>
        </h1>
        <p className="text-gray-500 mt-2">Platform-wide analytics and user management.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard label="Total Users" value={stats?.total_users || 0} Icon={Users} bg="bg-purple-50" color="text-purple-600" />
        <StatCard label="Job Seekers" value={stats?.total_jobseekers || 0} Icon={Briefcase} bg="bg-orange-50" color="text-[#ff7301]" />
        <StatCard label="Employers" value={stats?.total_employers || 0} Icon={Building} bg="bg-blue-50" color="text-blue-600" />
        <StatCard label="Active Status" value={stats?.active_users || 0} Icon={CheckCircle} bg="bg-green-50" color="text-green-600" />
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 font-serif mb-4 flex items-center gap-2"><PieChartIcon className="text-purple-500" size={20}/> User Roles</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={roleDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {roleDistribution.map(r => (
              <div key={r.name} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span className="w-3 h-3 rounded-full" style={{backgroundColor: r.color}}></span> {r.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 font-serif mb-4 flex items-center gap-2"><TrendingUp className="text-[#ff7301]" size={20}/> Platform Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="users" stroke="#ff7301" strokeWidth={4} dot={{strokeWidth: 4, r: 4}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-3">
          <h3 className="text-lg font-bold text-gray-900 font-serif mb-4 flex items-center gap-2"><Activity className="text-blue-500" size={20}/> User Activity Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 14, fontWeight: 'bold'}} width={80} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 10, 10, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <UserTable title="Job Seekers" data={jobseekers} type="job seeker" />
        <UserTable title="Employers" data={employers} type="employer" />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
