import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  FileText,
  Mail,
  MapPin,
  Search,
  Users,
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
import { apiRequest } from "../utils/api";
import UserProfileModal from "../components/UserProfileModal";
import GlobalLoader from "../components/GlobalLoader";

const chartColors = ["#2563eb", "#16a34a", "#9333ea", "#ff7301", "#dc2626"];

const formatDate = (value) => {
  if (!value) return "N/A";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const EmployerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [jobseekers, setJobseekers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    Promise.all([
      apiRequest("/dashboard/stats").catch(() => null),
      apiRequest("/employer/jobseekers").catch(() => []),
      apiRequest("/profile").catch(() => null),
    ])
      .then(([dashboardStats, seekers, userProfile]) => {
        setStats(dashboardStats);
        setJobseekers(seekers);
        setProfile(userProfile);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredSeekers = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return jobseekers.filter(
      (seeker) =>
        !q ||
        seeker.full_name?.toLowerCase().includes(q) ||
        seeker.email?.toLowerCase().includes(q) ||
        seeker.skills?.toLowerCase().includes(q) ||
        seeker.location?.toLowerCase().includes(q),
    );
  }, [jobseekers, searchTerm]);

  const firstName = profile?.full_name?.split(" ")[0] || "Employer";
  const candidateStatus = (stats?.candidate_status || []).filter(
    (item) => item.value > 0,
  );
  const applicationStatus = (stats?.application_status || []).filter(
    (item) => item.value > 0,
  );

  const metrics = [
    {
      label: "Available talent",
      value: stats?.available_talent || 0,
      icon: Users,
      tone: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      label: "Posted jobs",
      value: stats?.posted_jobs || 0,
      icon: Briefcase,
      tone: "text-[#ff7301]",
      bg: "bg-orange-50",
    },
    {
      label: "Applications",
      value: stats?.total_applications || 0,
      icon: FileText,
      tone: "text-green-700",
      bg: "bg-green-50",
    },
    {
      label: "Interviews",
      value: stats?.upcoming_interviews_count || 0,
      icon: CalendarClock,
      tone: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];

  if (loading) {
    return (
      <GlobalLoader message="Loading your Cloudfire hiring dashboard..." />
    );
  }

  return (
    <div className="space-y-8">
      <section className="Welcome relative overflow-hidden rounded-xl bg-white p-6 sm:p-8 border border-gray-100 shadow-sm my-6">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
              Welcome, <br />
              <span className="text-blue-600">{firstName}</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg font-medium">
              Live hiring data from your jobs, applications, interviews,
              messages, and the candidate pool.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Link
              to="/dashboard/jobs/post"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-900/20"
            >
              <Briefcase size={18} />
              <span>Post Job</span>
            </Link>
            <Link
              to="/dashboard/jobseekers"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 text-sm font-bold text-gray-700 transition-all hover:bg-gray-100 hover:scale-105 active:scale-95"
            >
              <Users size={18} />
              <span>Browse Talent</span>
            </Link>
          </div>
        </div>
      </section>

      <section className=" Welcome grid grid-cols-2 gap-2 sm:gap-4 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="rounded-xl bg-white p-3 sm:p-5 shadow-sm ring-1 ring-gray-100"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {metric.label}
                  </p>
                  <p
                    className={`mt-1 sm:mt-3 text-lg sm:text-3xl font-bold ${metric.tone}`}
                  >
                    {metric.value}
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${metric.bg} ${metric.tone}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <div className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 xl:col-span-2">
          <h2 className="text-lg font-bold text-gray-950">Hiring Activity</h2>
          <p className="text-sm text-gray-500">
            Daily jobs posted and applications received.
          </p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.daily_activity || []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#edf2f7"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    border: "none",
                    borderRadius: 12,
                    boxShadow: "0 8px 30px rgba(15,23,42,0.12)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="jobs"
                  stroke="#ff7301"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-lg font-bold text-gray-950">Candidate Status</h2>
          <p className="text-sm text-gray-500">
            Talent pool work status split.
          </p>
          <div className="mt-4 h-56">
            {candidateStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={candidateStatus}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={82}
                    paddingAngle={3}
                  >
                    {candidateStatus.map((_, index) => (
                      <Cell
                        key={index}
                        fill={chartColors[index % chartColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      border: "none",
                      borderRadius: 12,
                      boxShadow: "0 8px 30px rgba(15,23,42,0.12)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyBox text="No candidate status data." />
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <div className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 xl:col-span-2">
          <h2 className="text-lg font-bold text-gray-950">
            Top Candidate Skills
          </h2>
          <p className="text-sm text-gray-500">
            Calculated from all active job seeker profiles.
          </p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.top_candidate_skills || []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#edf2f7"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    border: "none",
                    borderRadius: 12,
                    boxShadow: "0 8px 30px rgba(15,23,42,0.12)",
                  }}
                />
                <Bar dataKey="count" fill="#9333ea" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-lg font-bold text-gray-950">Hiring Signals</h2>
          <p className="text-sm text-gray-500">
            Live account and workflow status.
          </p>
          <div className="mt-5 space-y-3">
            <Signal
              icon={CheckCircle2}
              label="Approved jobs"
              value={stats?.approved_jobs || 0}
            />
            <Signal
              icon={Bell}
              label="Pending jobs"
              value={stats?.pending_jobs || 0}
            />
            <Signal
              icon={Mail}
              label="Unread messages"
              value={stats?.unread_messages || 0}
            />
            <Signal
              icon={FileText}
              label="Candidates with resumes"
              value={stats?.talent_with_resume || 0}
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <ListPanel
          title="Recent Applications"
          empty="No applications on your jobs yet."
        >
          {(stats?.recent_applications || []).map((item) => (
            <button
              key={item.id}
              onClick={() => item.candidate && setSelectedUser(item.candidate)}
              className="w-full rounded-xl border border-gray-100 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-bold text-gray-950">
                    {item.candidate?.full_name || "Candidate"}
                  </p>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {item.job_title}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-700">
                  {item.status}
                </span>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                Applied {formatDate(item.applied_at)}
              </p>
            </button>
          ))}
        </ListPanel>

        <ListPanel title="Your Jobs" empty="Post a job to see it here.">
          {(stats?.recent_jobs || []).map((job) => (
            <Link
              key={job.id}
              to="/dashboard/my-jobs"
              className="block rounded-xl border border-gray-100 p-4 transition hover:border-orange-200 hover:bg-orange-50/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-bold text-gray-950">
                    {job.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin size={13} />
                    {job.location}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-bold ${job.is_approved ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
                >
                  {job.is_approved ? "Approved" : "Pending"}
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold text-gray-500">
                {job.application_count || 0} applications
              </p>
            </Link>
          ))}
        </ListPanel>

        <div className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-lg font-bold text-gray-950">
            Application Status
          </h2>
          <div className="mt-4 space-y-3">
            {applicationStatus.length > 0 ? (
              applicationStatus.map((item, index) => (
                <div key={item.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">
                      {item.name}
                    </span>
                    <span className="font-bold text-gray-950">
                      {item.value}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(item.value * 20, 100)}%`,
                        backgroundColor:
                          chartColors[index % chartColors.length],
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyBox text="No application status data." />
            )}
          </div>
        </div>
      </section>

      <section className=" Welcome Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-950">Talent Pool</h2>
            <p className="text-sm text-gray-500">
              {filteredSeekers.length} candidates match your current search.
            </p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search name, skill, location"
              className="w-full rounded-xl border border-gray-100 bg-gray-50 py-3 pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-blue-300 focus:bg-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {filteredSeekers.slice(0, 6).map((seeker) => (
            <article
              key={seeker.id || seeker.email}
              className="rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={
                    seeker.profile_image_url ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${seeker.full_name}`
                  }
                  alt=""
                  className="h-12 w-12 rounded-xl bg-gray-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-gray-950">
                    {seeker.full_name}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {seeker.email}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(seeker.skills || "")
                      .split(",")
                      .filter(Boolean)
                      .slice(0, 4)
                      .map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-700"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setSelectedUser(seeker)}
                  className="flex-1 rounded-xl bg-gray-100 px-3 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-200"
                >
                  View Profile
                </button>
                <button
                  onClick={() =>
                    navigate("/dashboard/messages", {
                      state: { contact: seeker },
                    })
                  }
                  className="flex-1 rounded-xl bg-blue-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-800"
                >
                  Message
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

const Signal = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-100 p-3">
    <Icon size={18} className="text-blue-600" />
    <span className="min-w-0 flex-1 text-sm font-semibold text-gray-700">
      {label}
    </span>
    <span className="text-lg font-bold text-gray-950">{value}</span>
  </div>
);

const EmptyBox = ({ text }) => (
  <div className="flex h-full min-h-32 items-center justify-center rounded-xl bg-gray-50 p-5 text-center text-sm text-gray-500">
    {text}
  </div>
);

const ListPanel = ({ title, empty, children }) => {
  const items = React.Children.toArray(children);
  return (
    <div className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <h2 className="text-lg font-bold text-gray-950">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.length > 0 ? items : <EmptyBox text={empty} />}
      </div>
    </div>
  );
};

export default EmployerDashboard;
