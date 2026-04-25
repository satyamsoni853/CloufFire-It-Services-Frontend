import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';
import { FileText, MapPin, Building, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  if (loading) return <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff7301]"></div></div>;

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
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-500">Track the status of jobs you've applied for.</p>
        </div>
      </div>

      {apps.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm">
          <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-500 mb-6">You haven't applied to any jobs yet.</p>
          <Link to="/dashboard/jobs" className="bg-[#ff7301] text-white px-6 py-3 rounded-xl font-bold inline-block hover:bg-orange-600 transition-colors">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {apps.map(app => (
            <div key={app.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{app.job_title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)} {app.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5"><Building size={16}/> {app.company}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={16}/> {app.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={16}/> Applied: {new Date(app.applied_at).toLocaleDateString()}</span>
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
