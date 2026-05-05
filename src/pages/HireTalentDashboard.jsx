import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Bell,
  Bookmark,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  FileText,
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  History,
  Code2,
  FileUser,
  Sparkles,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GlobalLoader from "../components/GlobalLoader";
import { apiRequest } from "../utils/api";

const currencyOrText = (value) => value || "Not disclosed";

const formatDate = (value) => {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const statusStyles = {
  Applied: "bg-blue-50/50 text-blue-700 border-blue-100",
  "Under Review": "bg-amber-50/50 text-amber-700 border-amber-100",
  Shortlisted: "bg-emerald-50/50 text-emerald-700 border-emerald-100",
  Rejected: "bg-rose-50/50 text-rose-700 border-rose-100",
  Hired: "bg-violet-50/50 text-violet-700 border-violet-100",
};

const chartColors = ["#ff7301", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444"];

const HireTalentDashboard = () => {
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    Promise.all([
      apiRequest("/dashboard/stats").catch(() => null),
      apiRequest("/profile").catch(() => null),
    ])
      .then(([dashboardStats, userProfile]) => {
        setStats(dashboardStats);
        setProfile(userProfile);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const completeness = stats?.profile_completeness || 0;
  const firstName = profile?.full_name?.split(" ")[0] || "User";

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  const profileItems = [
    {
      label: "Mobile",
      value: profile?.mobile,
      icon: Phone,
    },
    {
      label: "Work status",
      value: profile?.work_status,
      icon: Briefcase,
    },
    {
      label: "Education",
      value: profile?.education,
      icon: GraduationCap,
    },
    {
      label: "Experience",
      value: profile?.experience,
      icon: History,
    },
    {
      label: "Skills",
      value: profile?.skills,
      icon: Code2,
    },
    {
      label: "Bio",
      value: profile?.bio,
      icon: FileUser,
    },
  ];

  const completionTasks = [
    {
      title: "Upload resume",
      description: "Required for stronger applications.",
      done: stats?.has_resume,
      href: "/dashboard/profile",
      icon: FileText,
    },
    {
      title: "Add skills",
      description: "Used for backend job matching.",
      done: stats?.has_skills,
      href: "/dashboard/profile",
      icon: Sparkles,
    },
    {
      title: "Complete profile",
      description: `${stats?.profile_missing_fields?.length || 0} fields left.`,
      done: completeness === 100,
      href: "/dashboard/profile",
      icon: CheckCircle2,
    },
  ];

  const metrics = [
    {
      label: "Profile score",
      value: `${completeness}%`,
      icon: User,
    },
    {
      label: "Applications",
      value: stats?.total_applications || 0,
      icon: FileText,
    },
    {
      label: "Saved jobs",
      value: stats?.total_saved_jobs || 0,
      icon: Bookmark,
    },
    {
      label: "Interviews",
      value: stats?.upcoming_interviews_count || 0,
      icon: CalendarClock,
    },
  ];

  if (loading) {
    return <GlobalLoader message="Loading your Cloudfire dashboard..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-10 font-sans"
    >
      {/* Welcome Section - Light & Minimal */}
      <section className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white ">
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-3xl"
            >
              {greeting}, <span className="text-[#ff7301]">{firstName}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 max-w-xl text-sm font-medium leading-6 text-gray-500"
            >
              Your career progress is looking great. Check your latest updates and recommendations below.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/dashboard/jobs"
              className="group flex items-center justify-center gap-2 rounded-2xl bg-[#ff7301] px-5 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-200 active:scale-95"
            >
              <Briefcase size={16} />
              <span>Explore Jobs</span>
            </Link>
            <Link
              to="/dashboard/profile"
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 active:scale-95"
            >
              <Edit3 size={16} />
              <span>Update Profile</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Metrics Grid - Minimalist */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
                    {metric.value}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-3 text-gray-400 group-hover:text-[#ff7301] transition-colors">
                  <Icon size={20} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Main Chart Section - Simplified */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-[40px] bg-white p-8 border border-gray-100 shadow-sm xl:col-span-2"
        >
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                Activity Snapshot
              </h2>
              <p className="text-xs font-medium text-gray-500">
                Your job seeking trends over the past few weeks.
              </p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-semibold">
              <span className="flex items-center gap-1.5 text-gray-400">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>Apps
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>Saved
              </span>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.weekly_activity || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                />
                <Tooltip
                  contentStyle={{
                    border: "none",
                    borderRadius: 16,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    padding: "12px",
                    fontSize: "11px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="saved"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Profile Strength - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-[40px] bg-gray-50 p-8 border border-gray-100"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">Profile</h2>
              <p className="mt-1 text-xs font-medium text-gray-500">Account completion status.</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-[#ff7301] shadow-sm">
              {completeness}%
            </div>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completeness}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-[#ff7301]"
            ></motion.div>
          </div>

          <div className="mt-8 space-y-3">
            {completionTasks.map((task) => (
              <Link
                key={task.title}
                to={task.href}
                className="group flex items-center gap-4 rounded-2xl bg-white p-4 transition-all hover:shadow-md border border-transparent hover:border-gray-100"
              >
                <div className={`rounded-xl p-2 ${task.done ? "text-emerald-500 bg-emerald-50" : "text-gray-400 bg-gray-50"}`}>
                  {task.done ? <CheckCircle2 size={16} /> : <task.icon size={16} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-gray-900">{task.title}</p>
                  <p className="truncate text-[10px] font-medium text-gray-400">
                    {task.description}
                  </p>
                </div>
                {!task.done && <ChevronRight size={14} className="text-gray-300" />}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Recommended Jobs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-[40px] bg-white p-8 border border-gray-100 shadow-sm xl:col-span-2"
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">Recommendations</h2>
              <p className="text-xs font-medium text-gray-500">Top roles matching your expertise.</p>
            </div>
            <Link
              to="/dashboard/jobs"
              className="text-xs font-semibold text-[#ff7301] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {(stats?.recommended_jobs || []).length > 0 ? (
              stats.recommended_jobs.map((job) => (
                <Link
                  key={job.id}
                  to="/dashboard/jobs"
                  className="group block rounded-3xl border border-gray-50 bg-gray-50/50 p-6 transition-all hover:bg-white hover:shadow-md hover:border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="truncate text-sm font-semibold text-gray-900 group-hover:text-[#ff7301]">
                      {job.title}
                    </h3>
                    <span className="text-[9px] font-semibold text-[#ff7301] bg-orange-50 px-2 py-0.5 rounded-full">
                      {job.match_score || 0}% Match
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-gray-500">{job.company}</p>
                  <div className="mt-4 flex items-center gap-3 text-[10px] text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} /> {job.location}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-gray-200"></span>
                    <span>{job.type}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex h-32 flex-col items-center justify-center rounded-3xl bg-gray-50/50 border border-dashed border-gray-200 lg:col-span-2">
                <p className="text-[11px] font-medium text-gray-400">Complete your profile for job matches.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="space-y-4">
          <QuickTile
            icon={Bell}
            label="Notifications"
            value={stats?.unread_notifications || 0}
            href="/dashboard"
          />
          <QuickTile
            icon={Mail}
            label="Messages"
            value={stats?.unread_messages || 0}
            href="/dashboard/messages"
          />
          <QuickTile
            icon={Briefcase}
            label="Applied Jobs"
            value={stats?.total_applications || 0}
            href="/dashboard/applications"
          />
          <QuickTile
            icon={Bookmark}
            label="Saved Roles"
            value={stats?.total_saved_jobs || 0}
            href="/dashboard/saved-jobs"
          />
        </div>
      </div>

      {/* Profile Snapshot - Minimalist Grid */}
      <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm sm:px-7 sm:py-8 lg:px-9">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">Profile Record</h2>
            <p className="text-xs font-medium text-gray-500">Your information at a glance.</p>
          </div>
          <Link
            to="/dashboard/profile"
            className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-black active:scale-95"
          >
            Update Profile
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profileItems.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-transparent bg-gray-50 p-5 transition-all hover:border-gray-100 hover:bg-white hover:shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-xl bg-white p-2 text-gray-400 shadow-sm">
                  <item.icon size={16} />
                </div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-400">
                  {item.label}
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                {item.value || <span className="text-gray-300 font-normal italic">Not set</span>}
              </p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

const QuickTile = ({ icon: Icon, label, value, href }) => (
  <Link
    to={href}
    className="flex items-center gap-4 rounded-3xl bg-white p-5 border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-gray-200"
  >
    <div className="rounded-2xl bg-gray-50 p-3 text-gray-400">
      <Icon size={18} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </p>
      <p className="mt-0.5 text-xl font-semibold tracking-tight text-gray-900">
        {value}
      </p>
    </div>
    <ChevronRight className="text-gray-300" size={16} />
  </Link>
);

const PremiumListPanel = ({ title, icon: Icon, color, children }) => (
  <div className="flex flex-col rounded-[32px] bg-white p-10 shadow-xl ring-1 ring-gray-100">
    <div className="mb-8 flex items-center gap-3">
      <div className={`rounded-xl p-2 ${color} bg-current/10`}>
        <Icon size={20} className={color} />
      </div>
      <h2 className="text-lg font-bold tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] no-scrollbar">
      {children}
    </div>
  </div>
);

const EmptyState = ({ text }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50/50 border border-dashed border-gray-200 py-12 text-center">
    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
      {text}
    </p>
  </div>
);

export default HireTalentDashboard;
