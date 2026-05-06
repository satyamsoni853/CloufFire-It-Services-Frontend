import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  Briefcase,
  Building2,
  CheckCircle2,
  History,
  Layout,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
  Phone,
  MessageSquare,
  GraduationCap,
  Edit3,
  X,
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
import toast from "react-hot-toast";
import { apiRequest } from "../utils/api";
import UserProfileModal from "../components/UserProfileModal";
import GlobalLoader from "../components/GlobalLoader";

const chartColors = ["#9333ea", "#ff7301", "#2563eb", "#16a34a", "#dc2626"];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [siteSettings, setSiteSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "overview",
  );
  const [search, setSearch] = useState("");
  const [contactModal, setContactModal] = useState({ open: false, user: null });
  const [editModal, setEditModal] = useState({ open: false, user: null });
  const [contactMessage, setContactMessage] = useState("");
  const [sendingContact, setSendingContact] = useState(false);
  const [savingUser, setSavingUser] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const loadData = async () => {
    const [dashboardStats, allUsers, allJobs, logs, settings] =
      await Promise.all([
        apiRequest("/dashboard/stats").catch(() => null),
        apiRequest("/admin/all-users").catch(() => []),
        apiRequest("/jobs").catch(() => []),
        apiRequest("/admin/audit-logs").catch(() => []),
        apiRequest("/admin/settings").catch(() => []),
      ]);
    setStats(dashboardStats);
    setUsers(allUsers);
    setJobs(allJobs);
    setAuditLogs(logs);
    setSiteSettings(settings);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    loadData().finally(() => setLoading(false));
  }, []);

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (user) =>
        !q ||
        user.full_name?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q) ||
        user.role?.toLowerCase().includes(q) ||
        user.skills?.toLowerCase().includes(q),
    );
  }, [users, search]);

  const filteredJobs = useMemo(() => {
    const q = search.toLowerCase();
    return jobs.filter(
      (job) =>
        !q ||
        job.title?.toLowerCase().includes(q) ||
        job.company?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q),
    );
  }, [jobs, search]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    await apiRequest(`/admin/users/${userId}`, { method: "DELETE" });
    toast.success("User removed successfully");
    setUsers((items) => items.filter((item) => item.id !== userId));
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to remove this job?")) return;
    await apiRequest(`/jobs/${jobId}`, { method: "DELETE" });
    toast.success("Job removed successfully");
    setJobs((items) => items.filter((item) => item.id !== jobId));
    loadData();
  };

  const handleVerifyEmployer = async (userId) => {
    await apiRequest(`/admin/verify-employer/${userId}`, { method: "POST" });
    toast.success("Employer verified");
    setUsers((items) =>
      items.map((item) =>
        item.id === userId ? { ...item, is_verified: true } : item,
      ),
    );
    loadData();
  };

  const handleApproveJob = async (jobId) => {
    await apiRequest(`/admin/approve-job/${jobId}`, { method: "POST" });
    toast.success("Job approved");
    setJobs((items) =>
      items.map((item) =>
        item.id === jobId ? { ...item, is_approved: true } : item,
      ),
    );
    loadData();
  };

  const handleUpdateSetting = async (key, value) => {
    await apiRequest("/admin/settings", {
      method: "POST",
      body: JSON.stringify({ key, value }),
    });
    toast.success("Setting updated");
    loadData();
  };

  const handleEditUser = (user) => {
    setEditModal({ open: true, user: { ...user } });
  };

  const handleSaveUser = async (updatedUser) => {
    setSavingUser(true);
    try {
      await apiRequest(`/admin/users/${updatedUser.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedUser),
      });
      toast.success("User profile updated successfully");
      setUsers((items) =>
        items.map((item) => (item.id === updatedUser.id ? updatedUser : item)),
      );
      setEditModal({ open: false, user: null });
      loadData();
    } catch (err) {
      console.error("Failed to update user", err);
      toast.error("Failed to update user profile");
    } finally {
      setSavingUser(false);
    }
  };

  const handleContact = (user) => {
    setContactModal({ open: true, user });
    setContactMessage(
      `Hi ${user.full_name},\n\nThis is the Cloudfire Admin team. We would like to connect with you regarding your account.\n\nBest regards.`,
    );
  };

  const handleSendContact = async () => {
    if (!contactMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }
    setSendingContact(true);
    try {
      const data = await apiRequest("/contact-seeker", {
        method: "POST",
        body: JSON.stringify({
          seeker_email: contactModal.user.email,
          message: contactMessage,
        }),
      });
      toast.success(data.message);
      setContactModal({ open: false, user: null });
      setContactMessage("");
    } catch (err) {
      console.error("Failed to contact user", err);
    } finally {
      setSendingContact(false);
    }
  };

  const metrics = [
    {
      label: "Total users",
      value: stats?.total_users || 0,
      icon: Users,
      tone: "text-purple-700",
      bg: "bg-purple-50",
    },
    {
      label: "Total jobs",
      value: stats?.total_jobs || 0,
      icon: Briefcase,
      tone: "text-[#ff7301]",
      bg: "bg-orange-50",
    },
    {
      label: "Applications",
      value: stats?.total_applications || 0,
      icon: Activity,
      tone: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      label: "Pending review",
      value: (stats?.pending_jobs || 0) + (stats?.pending_employers || 0),
      icon: AlertCircle,
      tone: "text-amber-700",
      bg: "bg-amber-50",
    },
  ];

  if (loading) {
    return <GlobalLoader message="Loading Cloudfire admin controls..." />;
  }

  return (
    <div className="space-y-6">
      <section className="Welcome Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Platform control center
            </p>
            <h1 className="mt-2 text-2xl font-bold text-gray-950 sm:text-3xl lg:text-4xl">
              Admin <span className="text-purple-700">Dashboard</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Live platform metrics, user management, job moderation, audit
              logs, and site settings.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <MiniMetric label="Active" value={stats?.active_users || 0} />
            <MiniMetric label="Employers" value={stats?.total_employers || 0} />
            <MiniMetric label="Seekers" value={stats?.total_jobseekers || 0} />
          </div>
        </div>
      </section>

      <section className="Welcome grid grid-cols-2 gap-2 sm:gap-4 xl:grid-cols-4">
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

      <div className="Welcome overflow-x-auto border-b border-gray-100">
        <div className="flex min-w-max gap-2">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "seekers", label: "Job Seekers", icon: GraduationCap },
            { id: "employers", label: "Employers", icon: Building2 },
            { id: "jobs", label: "Jobs", icon: Briefcase },
            { id: "logs", label: "Audit Logs", icon: History },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition ${activeTab === tab.id ? "border-purple-700 text-purple-700" : "border-transparent text-gray-400 hover:text-gray-700"}`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "overview" && <Overview stats={stats} />}

      {activeTab === "seekers" && (
        <UsersTab
          title="Manage Job Seekers"
          search={search}
          setSearch={setSearch}
          users={filteredUsers.filter((u) => u.role === "jobseeker")}
          onView={setSelectedUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onVerify={handleVerifyEmployer}
          onContact={handleContact}
        />
      )}

      {activeTab === "employers" && (
        <UsersTab
          title="Manage Employers"
          search={search}
          setSearch={setSearch}
          users={filteredUsers.filter((u) => u.role === "employer")}
          onView={setSelectedUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onVerify={handleVerifyEmployer}
          onContact={handleContact}
        />
      )}

      {activeTab === "jobs" && (
        <JobsTab
          search={search}
          setSearch={setSearch}
          jobs={filteredJobs}
          onApprove={handleApproveJob}
          onDelete={handleDeleteJob}
        />
      )}

      {activeTab === "logs" && <LogsTab logs={auditLogs} />}

      {activeTab === "settings" && (
        <SettingsTab settings={siteSettings} onSave={handleUpdateSetting} />
      )}

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* Contact Modal */}
      {contactModal.open && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900 font-serif">
                  Contact {contactModal.user?.full_name}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {contactModal.user?.email}
                </p>
              </div>
              <button
                onClick={() => setContactModal({ open: false, user: null })}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                rows="6"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20 outline-none transition-all resize-none"
                placeholder="Write a message to this user..."
              ></textarea>
              <p className="text-xs text-gray-400 mt-2">
                This message will be sent to the user's email along with your
                contact details.
              </p>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setContactModal({ open: false, user: null })}
                  className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendContact}
                  disabled={sendingContact}
                  className="bg-purple-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-800 transition-all cursor-pointer disabled:opacity-50"
                >
                  {sendingContact ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900 font-serif">
                Edit Profile: {editModal.user?.full_name}
              </h2>
              <button
                onClick={() => setEditModal({ open: false, user: null })}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editModal.user?.full_name || ""}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        user: { ...editModal.user, full_name: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editModal.user?.email || ""}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        user: { ...editModal.user, email: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Mobile
                  </label>
                  <input
                    type="text"
                    value={editModal.user?.mobile || ""}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        user: { ...editModal.user, mobile: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editModal.user?.location || ""}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        user: { ...editModal.user, location: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    User Role
                  </label>
                  <select
                    value={editModal.user?.role || ""}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        user: { ...editModal.user, role: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-700 outline-none bg-white"
                  >
                    <option value="jobseeker">Job Seeker</option>
                    <option value="employer">Employer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Bio / Headline
                  </label>
                  <textarea
                    rows="3"
                    value={editModal.user?.bio || ""}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        user: { ...editModal.user, bio: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-700 outline-none resize-none"
                  ></textarea>
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditModal({ open: false, user: null })}
                  className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveUser(editModal.user)}
                  disabled={savingUser}
                  className="bg-purple-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-800 transition-all cursor-pointer disabled:opacity-50"
                >
                  {savingUser ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Overview = ({ stats }) => {
  const roleDistribution = (stats?.role_distribution || []).filter(
    (item) => item.value > 0,
  );
  const activityDistribution = stats?.activity_distribution || [];

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <div className="Welcome Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 xl:col-span-2">
          <h2 className="text-lg font-bold text-gray-950">Platform Activity</h2>
          <p className="text-sm text-gray-500">
            Jobs, applications, and interviews from backend records.
          </p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.platform_activity || []}>
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
                  dataKey="jobs"
                  stroke="#ff7301"
                  strokeWidth={3}
                  dot={{ r: 4 }}
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
                  dataKey="interviews"
                  stroke="#9333ea"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-lg font-bold text-gray-950">Role Split</h2>
          <p className="text-sm text-gray-500">Current user distribution.</p>
          <div className="mt-4 h-56">
            {roleDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={82}
                    paddingAngle={3}
                  >
                    {roleDistribution.map((_, index) => (
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
              <EmptyBox text="No user data." />
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <div className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 xl:col-span-2">
          <h2 className="text-lg font-bold text-gray-950">Top Job Skills</h2>
          <p className="text-sm text-gray-500">
            Calculated from job skill requirements.
          </p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.top_job_skills || []}>
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
                <Bar dataKey="count" fill="#9333ea" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-lg font-bold text-gray-950">Moderation Queue</h2>
          <div className="mt-5 space-y-3">
            <DarkSignal
              icon={Briefcase}
              label="Pending jobs"
              value={stats?.pending_jobs || 0}
            />
            <DarkSignal
              icon={Building2}
              label="Pending employers"
              value={stats?.pending_employers || 0}
            />
            <DarkSignal
              icon={CheckCircle2}
              label="Approved jobs"
              value={stats?.approved_jobs || 0}
            />
            <DarkSignal
              icon={Users}
              label="Inactive users"
              value={stats?.inactive_users || 0}
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <ListPanel title="Recent Users" empty="No users found.">
          {(stats?.recent_users || []).map((user) => (
            <div
              key={user.id || user.email}
              className="rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-bold text-gray-950">
                    {user.full_name}
                  </p>
                  <p className="truncate text-sm text-gray-500">{user.email}</p>
                </div>
                <span className="rounded-xl bg-purple-50 px-2 py-1 text-[11px] font-bold capitalize text-purple-700">
                  {user.role}
                </span>
              </div>
            </div>
          ))}
        </ListPanel>

        <ListPanel title="Recent Jobs" empty="No jobs found.">
          {(stats?.recent_jobs || []).map((job) => (
            <div key={job.id} className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-bold text-gray-950">
                    {job.title}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {job.company} - {job.location}
                  </p>
                </div>
                <span
                  className={`rounded-xl px-2 py-1 text-[11px] font-bold ${job.is_approved ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
                >
                  {job.is_approved ? "Approved" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </ListPanel>
      </section>
    </div>
  );
};

const UsersTab = ({
  title,
  search,
  setSearch,
  users,
  onView,
  onEdit,
  onDelete,
  onVerify,
  onContact,
}) => (
  <section className="Welcome Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-lg font-bold text-gray-950">{title}</h2>
      <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-xl text-xs font-bold">
        {users.length} Total
      </span>
    </div>
    <SearchBox
      value={search}
      onChange={setSearch}
      placeholder="Search by name, email, skills..."
    />
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[760px] text-left">
        <thead>
          <tr className="border-b border-gray-100 text-xs font-bold uppercase tracking-widest text-gray-400">
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {users.map((user) => (
            <tr key={user.id || user.email} className="hover:bg-gray-50">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user.profile_image_url ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.full_name}`
                    }
                    alt=""
                    className="h-10 w-10 rounded-xl bg-gray-100 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-bold text-gray-950">
                      {user.full_name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="rounded-xl bg-purple-50 px-2 py-1 text-xs font-bold capitalize text-purple-700">
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-xl px-2 py-1 text-xs font-bold ${user.is_active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                  {user.role === "employer" && (
                    <span
                      className={`rounded-xl px-2 py-1 text-xs font-bold ${user.is_verified ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {user.is_verified ? "Verified" : "Unverified"}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex justify-end gap-2">
                  <IconButton
                    label="View"
                    onClick={() => onView(user)}
                    icon={UserCheck}
                  />
                  <IconButton
                    label="Edit"
                    onClick={() => onEdit(user)}
                    icon={Edit3}
                    tone="blue"
                  />
                  {(user.role === "jobseeker" ||
                    user.role === "employer") && (
                    <>
                      {user.mobile && (
                        <a
                          href={`tel:${user.mobile}`}
                          className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold transition bg-green-50 text-green-700 hover:bg-green-100"
                        >
                          <Phone size={14} /> Call
                        </a>
                      )}
                      <IconButton
                        label="Message"
                        onClick={() => onContact(user)}
                        icon={MessageSquare}
                        tone="blue"
                      />
                    </>
                  )}
                  {user.role === "employer" && !user.is_verified && (
                    <IconButton
                      label="Verify"
                      onClick={() => onVerify(user.id)}
                      icon={ShieldCheck}
                      tone="blue"
                    />
                  )}
                  <IconButton
                    label="Remove"
                    onClick={() => onDelete(user.id)}
                    icon={Trash2}
                    tone="red"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <EmptyBox text="No users match your search." />}
    </div>
  </section>
);

const JobsTab = ({ search, setSearch, jobs, onApprove, onDelete }) => (
  <section className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
    <SearchBox
      value={search}
      onChange={setSearch}
      placeholder="Search jobs by title, company, location"
    />
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="border-b border-gray-100 text-xs font-bold uppercase tracking-widest text-gray-400">
            <th className="px-4 py-3">Job</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-50">
              <td className="px-4 py-4">
                <p className="font-bold text-gray-950">{job.title}</p>
                <p className="text-xs text-gray-500">{job.company}</p>
              </td>
              <td className="px-4 py-4 text-sm font-semibold text-gray-600">
                {job.location}
              </td>
              <td className="px-4 py-4">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-bold ${job.is_approved ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
                >
                  {job.is_approved ? "Approved" : "Pending"}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex justify-end gap-2">
                  {!job.is_approved && (
                    <IconButton
                      label="Approve"
                      onClick={() => onApprove(job.id)}
                      icon={CheckCircle2}
                      tone="green"
                    />
                  )}
                  <IconButton
                    label="Remove"
                    onClick={() => onDelete(job.id)}
                    icon={Trash2}
                    tone="red"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {jobs.length === 0 && <EmptyBox text="No jobs match your search." />}
    </div>
  </section>
);

const LogsTab = ({ logs }) => (
  <section className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
    <h2 className="text-lg font-bold text-gray-950">Audit Logs</h2>
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="border-b border-gray-100 text-xs font-bold uppercase tracking-widest text-gray-400">
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Action</th>
            <th className="px-4 py-3">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="px-4 py-4 text-sm text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="px-4 py-4 text-sm font-bold text-purple-700">
                {log.action}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {log.details || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {logs.length === 0 && <EmptyBox text="No audit logs yet." />}
    </div>
  </section>
);

const SettingsTab = ({ settings, onSave }) => {
  const values = Object.fromEntries(
    (settings || []).map((item) => [item.key, item.value]),
  );
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-950">
          <Layout size={20} /> Platform Content
        </h2>
        <div className="mt-5 space-y-4">
          <SettingInput
            label="Landing headline"
            settingKey="headline"
            value={
              values.headline || "Cloudfire: Direct Access to Elite Talent"
            }
            onSave={onSave}
          />
          <SettingInput
            label="Support email"
            settingKey="support_email"
            value={values.support_email || "support@cloudfire.com"}
            onSave={onSave}
          />
          <SettingInput
            label="Maintenance mode"
            settingKey="maintenance"
            value={values.maintenance || "OFF"}
            onSave={onSave}
          />
        </div>
      </div>
      <div className="Welcome rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <h2 className="text-lg font-bold text-gray-950">Saved Settings</h2>
        <div className="mt-5 space-y-3">
          {(settings || []).length > 0 ? (
            settings.map((item) => (
              <div
                key={item.key}
                className="rounded-xl bg-gray-50 border border-gray-100 p-3"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {item.key}
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-gray-950">
                  {item.value}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No settings saved yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

const SettingInput = ({ label, settingKey, value, onSave }) => {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => setLocalValue(value), [value]);

  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
        {label}
      </label>
      <div className="mt-2 flex gap-2">
        <input
          value={localValue}
          onChange={(event) => setLocalValue(event.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold outline-none focus:border-purple-300 focus:bg-white"
        />
        <button
          onClick={() => onSave(settingKey, localValue)}
          className="rounded-xl bg-purple-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-purple-800"
        >
          Save
        </button>
      </div>
    </div>
  );
};

const SearchBox = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-100 bg-gray-50 py-3 pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-purple-300 focus:bg-white"
    />
  </div>
);

const MiniMetric = ({ label, value }) => (
  <div className="rounded-xl bg-gray-50 px-4 py-3 text-center">
    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
      {label}
    </p>
    <p className="mt-1 text-xl font-bold text-gray-950">{value}</p>
  </div>
);

const IconButton = ({ label, onClick, icon: Icon, tone = "gray" }) => {
  const styles = {
    gray: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    blue: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    green: "bg-green-50 text-green-700 hover:bg-green-100",
    red: "bg-red-50 text-red-700 hover:bg-red-100",
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold transition ${styles[tone]}`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
};

const DarkSignal = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-100 p-3">
    <Icon size={18} className="text-purple-600" />
    <span className="min-w-0 flex-1 text-sm font-semibold text-gray-700">
      {label}
    </span>
    <span className="text-lg font-bold text-gray-950">{value}</span>
  </div>
);

const EmptyBox = ({ text }) => (
  <div className="flex min-h-32 items-center justify-center rounded-xl bg-gray-50 p-5 text-center text-sm text-gray-500">
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

export default AdminDashboard;
