import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';
import { FileText, MapPin, Building, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalLoader from '../components/GlobalLoader';

const ApplicationsPage = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await apiRequest('/applications');
        setApps(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  if (loading) return <GlobalLoader message="Loading your Cloudfire applications..." />;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Under Review': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Shortlisted': return 'bg-green-50 text-green-600 border-green-200';
      case 'Rejected': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Applied': return <Clock size={16} />;
      case 'Under Review': return <FileText size={16} />;
      case 'Shortlisted': return <CheckCircle size={16} />;
      case 'Rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="py-6 font-sans">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Applications</h1>
          <p className="text-sm text-gray-500 font-medium tracking-tight">Track the progress of your professional journey.</p>
        </div>
      </div>

      {apps.length === 0 ? (
        <div className="bg-white p-16 rounded-[48px] border border-gray-100 text-center shadow-sm">
          <FileText className="w-12 h-12 text-gray-200 mx-auto mb-6" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
          <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto">Your applied jobs will appear here. Start exploring roles that match your skills.</p>
          <Link to="/dashboard/jobs" className="bg-[#ff7301] text-white px-8 py-3.5 rounded-[20px] font-semibold text-sm inline-block shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {apps.map(app => (
            <div key={app.id} className="bg-white rounded-xl border border-gray-100 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:border-gray-200 transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{app.job_title}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1.5 border ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-5 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5"><Building size={14} className="text-gray-400"/> {app.company}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400"/> {app.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-400"/> {new Date(app.applied_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;
