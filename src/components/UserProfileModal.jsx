import React from 'react';
import { 
  X, User, Mail, Phone, Briefcase, GraduationCap, 
  Wrench, FileText, MapPin, ExternalLink, Download
} from 'lucide-react';

const UserProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  const profileImage = user.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.full_name}`;

  const InfoRow = ({ icon: Icon, label, value, isLink, color = 'text-gray-900' }) => {
    if (!value || value === 'N/A') return (
      <div className="flex items-start gap-4 py-3">
        <div className="p-2 bg-gray-50 rounded-xl shrink-0">
          <Icon size={16} className="text-gray-300" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
          <p className="text-sm text-gray-300 italic">Not provided</p>
        </div>
      </div>
    );

    return (
      <div className="flex items-start gap-4 py-3">
        <div className="p-2 bg-gray-50 rounded-xl shrink-0">
          <Icon size={16} className="text-gray-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
          {isLink ? (
            <a href={value} target="_blank" rel="noreferrer" className="text-sm text-blue-600 font-semibold hover:underline break-all flex items-center gap-1.5">
              {value.length > 40 ? value.substring(0, 40) + '...' : value}
              <ExternalLink size={12} />
            </a>
          ) : (
            <p className={`text-sm font-semibold ${color} break-words`}>{value}</p>
          )}
        </div>
      </div>
    );
  };

  const getRoleBadge = (role) => {
    const styles = {
      jobseeker: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', label: 'Job Seeker' },
      employer: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', label: 'Employer' },
      admin: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', label: 'Admin' },
    };
    const s = styles[role] || styles.jobseeker;
    return (
      <span className={`px-3 py-1 ${s.bg} ${s.text} border ${s.border} rounded-full text-[10px] font-bold uppercase tracking-widest`}>
        {s.label}
      </span>
    );
  };

  const getStatusBadge = (isActive) => (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
      isActive 
        ? 'bg-green-50 text-green-600 border-green-100' 
        : 'bg-yellow-50 text-yellow-600 border-yellow-100'
    }`}>
      {isActive ? 'Active' : 'Pending'}
    </span>
  );

  // Parse skills
  const skills = user.skills ? user.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 pb-20">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all cursor-pointer"
          >
            <X size={20} className="text-white" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            {getRoleBadge(user.role)}
            {getStatusBadge(user.is_active)}
            {user.work_status && (
              <span className="px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {user.work_status}
              </span>
            )}
          </div>
        </div>

        {/* Profile image overlay */}
        <div className="relative -mt-14 px-8">
          <div className="flex items-end gap-5">
            <div className="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-xl border-4 border-white overflow-hidden shrink-0">
              <img 
                src={profileImage} 
                alt={user.full_name} 
                className="w-full h-full object-cover rounded-2xl" 
              />
            </div>
            <div className="pb-2">
              <h2 className="text-2xl font-bold text-gray-900 font-serif">{user.full_name}</h2>
              <p className="text-sm text-gray-500 font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          
          {/* Bio */}
          {user.bio && (
            <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed italic">"{user.bio}"</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Skills & Expertise</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl text-xs font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 divide-y md:divide-y-0 divide-gray-50">
            <div className="space-y-1">
              <InfoRow icon={Mail} label="Email Address" value={user.email} />
              <InfoRow icon={Phone} label="Mobile Number" value={user.mobile} />
              <InfoRow icon={GraduationCap} label="Education" value={user.education} />
              <InfoRow icon={Briefcase} label="Experience" value={user.experience} />
            </div>
            <div className="space-y-1">
              <InfoRow icon={User} label="Work Status" value={user.work_status} />
              <InfoRow icon={User} label="Role" value={user.role?.charAt(0).toUpperCase() + user.role?.slice(1)} />
              {user.resume_url && (
                <InfoRow icon={FileText} label="Resume" value={user.resume_url} isLink />
              )}
              {!user.resume_url && (
                <InfoRow icon={FileText} label="Resume" value={null} />
              )}
              {user.profile_image_url && (
                <InfoRow icon={User} label="Profile Image" value={user.profile_image_url} isLink />
              )}
            </div>
          </div>

          {/* Resume CTA */}
          {user.resume_url && (
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500 rounded-xl">
                  <FileText size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Resume Available</p>
                  <p className="text-xs text-gray-500">Download or view the candidate's resume</p>
                </div>
              </div>
              <a 
                href={user.resume_url} 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shrink-0"
              >
                <Download size={14} />
                View Resume
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default UserProfileModal;
