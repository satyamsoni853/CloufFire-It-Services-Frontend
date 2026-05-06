import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';
import { Calendar, Clock, MapPin, Video, User, CheckCircle, XCircle, ExternalLink, ChevronRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import GlobalLoader from '../components/GlobalLoader';

const InterviewsPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const data = await apiRequest('/interviews');
      setInterviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Completed': return 'bg-green-50 text-green-600 border-green-100';
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  if (loading) return <GlobalLoader message="Loading your Cloudfire interviews..." />;

  const upcomingInterviews = interviews.filter(i => new Date(i.scheduled_at) > new Date() && i.status !== 'Cancelled');
  const pastInterviews = interviews.filter(i => new Date(i.scheduled_at) <= new Date() || i.status === 'Cancelled');

  return (
    <div className="space-y-12 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Interviews</h1>
          <p className="text-gray-500 font-medium text-sm">Manage and join your upcoming professional evaluations.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-[11px] font-semibold uppercase tracking-wider border border-gray-100">
            Total: {interviews.length}
          </div>
          <div className="px-6 py-2.5 bg-[#ff7301]/5 text-[#ff7301] rounded-xl text-[11px] font-semibold uppercase tracking-wider border border-[#ff7301]/10">
            Upcoming: {upcomingInterviews.length}
          </div>
        </div>
      </div>

      {/* Upcoming Section */}
      <section className='Welcome' >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-[14px] bg-gray-900 text-white flex items-center justify-center">
            <Clock size={18} />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
        </div>

        <div className="grid gap-8">
          {upcomingInterviews.length > 0 ? upcomingInterviews.map((interview) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
            >
              <div className="p-10 flex flex-col lg:flex-row gap-10">
                <div className="w-20 h-20 bg-gray-50 rounded-[24px] flex flex-col items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#ff7301]/5 group-hover:border-[#ff7301]/10 transition-all">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{new Date(interview.scheduled_at).toLocaleDateString([], { month: 'short' })}</span>
                  <span className="text-2xl font-semibold text-gray-900 leading-none mt-1">{new Date(interview.scheduled_at).getDate()}</span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{interview.title}</h3>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest border ${getStatusStyle(interview.status)}`}>
                      {interview.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                    <InfoItem icon={<Calendar size={14} />} label="Date" value={new Date(interview.scheduled_at).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })} />
                    <InfoItem icon={<Clock size={14} />} label="Time" value={new Date(interview.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
                    <InfoItem icon={<User size={14} />} label={role === 'jobseeker' ? 'Recruiter' : 'Candidate'} value={interview.other_user_name} />
                  </div>

                  {interview.description && (
                    <div className="mt-8 p-6 bg-gray-50/50 rounded-[24px] text-[13px] text-gray-500 leading-relaxed border-l-2 border-orange-100">
                      "{interview.description}"
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
                  {interview.meeting_link && (
                    <a 
                      href={interview.meeting_link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2.5 bg-[#ff7301] text-white px-10 py-4 rounded-[20px] font-semibold text-[11px] uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95"
                    >
                      <Video size={16} /> Join
                    </a>
                  )}
                  <button className="flex items-center justify-center gap-2.5 bg-gray-900 text-white px-10 py-4 rounded-[20px] font-semibold text-[11px] uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-100">
                    Reschedule
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="bg-gray-50/50 p-20 rounded-[48px] border border-dashed border-gray-200 text-center">
              <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                <Calendar className="w-8 h-8 text-gray-200" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">No upcoming interviews</h3>
              <p className="text-gray-400 text-xs font-medium max-w-xs mx-auto leading-relaxed">Your scheduled evaluations will appear here. Keep your profile updated for more invites.</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Section */}
      {pastInterviews.length > 0 && (
        <section className="pt-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-[14px] bg-gray-50 text-gray-400 flex items-center justify-center border border-gray-100">
              <AlertCircle size={18} />
            </div>
            <h2 className="text-lg font-semibold text-gray-400">History</h2>
          </div>
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
            {pastInterviews.map((interview) => (
              <div key={interview.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-gray-50/30 transition-colors">
                <div className="flex items-center gap-8 flex-1">
                  <div className="text-center shrink-0 opacity-40">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{new Date(interview.scheduled_at).toLocaleDateString([], { month: 'short' })}</p>
                    <p className="text-xl font-semibold text-gray-900">{new Date(interview.scheduled_at).getDate()}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 tracking-tight">{interview.title}</h4>
                    <p className="text-[11px] text-gray-400 font-medium mt-1">with {interview.other_user_name} • {interview.job_title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest border ${getStatusStyle(interview.status)}`}>
                    {interview.status}
                  </span>
                  <ChevronRight size={18} className="text-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="text-gray-300 mt-0.5 shrink-0">{icon}</div>
    <div>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <p className="text-[13px] font-semibold text-gray-800 leading-tight">{value}</p>
    </div>
  </div>
);

export default InterviewsPage;
