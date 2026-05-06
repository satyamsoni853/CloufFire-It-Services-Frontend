import React from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Wrench,
  FileText,
  MapPin,
  ExternalLink,
  Download,
} from "lucide-react";

const UserProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  const profileImage =
    user.profile_image_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.full_name}`;

  const InfoRow = ({
    icon: Icon,
    label,
    value,
    isLink,
    color = "text-gray-900",
  }) => {
    if (!value || value === "N/A")
      return (
        <div className="flex items-start gap-4 py-3">
          <div className="p-2 bg-gray-50 rounded-xl shrink-0">
            <Icon size={16} className="text-gray-300" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
              {label}
            </p>
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
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
            {label}
          </p>
          {isLink ? (
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600 font-semibold hover:underline break-all flex items-center gap-1.5"
            >
              {value.length > 40 ? value.substring(0, 40) + "..." : value}
              <ExternalLink size={12} />
            </a>
          ) : (
            <p className={`text-sm font-semibold ${color} break-words`}>
              {value}
            </p>
          )}
        </div>
      </div>
    );
  };

  const getRoleBadge = (role) => {
    const styles = {
      jobseeker: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-100",
        label: "Job Seeker",
      },
      employer: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-100",
        label: "Employer",
      },
      admin: {
        bg: "bg-red-50",
        text: "text-red-600",
        border: "border-red-100",
        label: "Admin",
      },
    };
    const s = styles[role] || styles.jobseeker;
    return (
      <span
        className={`px-3 py-1 ${s.bg} ${s.text} border ${s.border} rounded-full text-[10px] font-bold uppercase tracking-widest`}
      >
        {s.label}
      </span>
    );
  };

  const getStatusBadge = (isActive) => (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
        isActive
          ? "bg-green-50 text-green-600 border-green-100"
          : "bg-yellow-50 text-yellow-600 border-yellow-100"
      }`}
    >
      {isActive ? "Active" : "Pending"}
    </span>
  );

  // Parse skills
  const skills = user.skills
    ? user.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Header Section */}
        <div className="relative h-48 bg-gradient-to-br from-[#1a1c2e] via-[#2a2d42] to-[#1a1c2e] p-8 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] left-[-5%] w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer group z-10"
          >
            <X size={20} className="text-white/70 group-hover:text-white" />
          </button>

          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {user.role === 'jobseeker' ? 'Candidate' : user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${
              user.is_active 
                ? "bg-green-500/20 text-green-300 border-green-500/20" 
                : "bg-amber-500/20 text-amber-300 border-amber-500/20"
            }`}>
              {user.is_active ? "Active" : "Pending"}
            </span>
            {user.work_status && (
              <span className="px-3 py-1 bg-[#ff7301]/20 text-[#ff7301] border border-[#ff7301]/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {user.work_status}
              </span>
            )}
          </div>
        </div>

        {/* Profile Info Overlay */}
        <div className="relative -mt-20 px-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="w-32 h-32 rounded-[28px] bg-white p-2 shadow-2xl border-[6px] border-white overflow-hidden shrink-0">
              <img
                src={profileImage}
                alt={user.full_name}
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
            <div className="pb-4">
              <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight">
                {user.full_name}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-gray-500 font-medium">
                <Mail size={14} />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-8 py-8 overflow-y-auto max-h-[calc(90vh-320px)] custom-scrollbar">
          {/* Bio Quote */}
          {user.bio && (
            <div className="bg-gray-50/80 rounded-2xl p-6 mb-8 border border-gray-100 relative group transition-colors hover:bg-gray-50">
              <div className="absolute top-3 left-4 text-gray-200 text-4xl font-serif pointer-events-none group-hover:text-gray-300 transition-colors">"</div>
              <p className="text-base text-gray-600 leading-relaxed italic relative z-10 pl-4">
                {user.bio}
              </p>
            </div>
          )}

          {/* Skills Grid */}
          {skills.length > 0 && (
            <div className="mb-10">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Wrench size={12} /> Skills & Expertise
              </p>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-blue-50/50 text-blue-700 border border-blue-100/50 rounded-xl text-xs font-bold hover:bg-blue-100/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <InfoRow icon={Mail} label="Email Address" value={user.email} />
              <InfoRow icon={Phone} label="Mobile Number" value={user.mobile} />
              <InfoRow icon={MapPin} label="Current Location" value={user.location || "Not specified"} />
              <InfoRow
                icon={GraduationCap}
                label="Educational Background"
                value={user.education}
              />
            </div>
            <div className="space-y-2">
              <InfoRow
                icon={Briefcase}
                label="Professional Experience"
                value={user.experience}
              />
              <InfoRow
                icon={User}
                label="Employment Role"
                value={user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
              />
              {user.resume_url ? (
                <InfoRow
                  icon={FileText}
                  label="Resume / Portfolio"
                  value={user.resume_url}
                  isLink
                />
              ) : (
                <InfoRow icon={FileText} label="Resume" value={null} />
              )}
            </div>
          </div>

          {/* Resume Quick Action */}
          {user.resume_url && (
            <div className="mt-10 p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-white rounded-xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <FileText size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Professional Resume
                    </p>
                    <p className="text-xs text-gray-500">
                      Available for immediate review
                    </p>
                  </div>
                </div>
                <a
                  href={user.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95 shadow-md shadow-blue-200"
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
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
