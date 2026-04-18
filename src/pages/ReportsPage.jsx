import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const ReportsPage = () => {
  const role = localStorage.getItem('role') || 'jobseeker';

  const stats = role === 'employer' || role === 'admin' ? [
    { label: 'Total Applicants', value: '1,284', change: '+12%', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Interviews Scheduled', value: '84', change: '+5%', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Open Positions', value: '12', change: '-2', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'Hired This Month', value: '7', change: '+2', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ] : [
    { label: 'Applications Sent', value: '14', change: '+3', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Profile Views', value: '45', change: '+15%', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { label: 'Shortlisted', value: '2', change: '+1', icon: 'M5 13l4 4L19 7' },
    { label: 'Interviews', value: '1', change: '0', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-serif font-bold text-[32px] text-secondary">Analytics Report</h1>
        <p className="text-gray-500">
          {role === 'employer' || role === 'admin' ? 'Overview of your recruitment performance and talent metrics.' : 'Track your job search progress and profile visibility.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-secondary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                </svg>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-secondary mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
          <h3 className="font-bold text-xl mb-6">Application Trends</h3>
          <div className="w-full h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
             <span className="text-gray-400 font-medium">Visualization Chart Placeholder</span>
          </div>
          <div className="mt-6 flex justify-between">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => (
              <span key={month} className="text-xs text-gray-400 font-bold">{month}</span>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-xl mb-6">Top Sources</h3>
          <div className="space-y-6">
            {[
              { label: 'LinkedIn', color: 'bg-blue-600', percent: '45%' },
              { label: 'Cloudfire Network', color: 'bg-orange-500', percent: '30%' },
              { label: 'Referrals', color: 'bg-indigo-500', percent: '15%' },
              { label: 'Other', color: 'bg-gray-400', percent: '10%' },
            ].map((source, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700">{source.label}</span>
                  <span className="text-gray-500">{source.percent}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${source.color}`} style={{ width: source.percent }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
