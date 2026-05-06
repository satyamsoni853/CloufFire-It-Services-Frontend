import React, { useState, useEffect } from "react";
import { apiRequest } from "../utils/api";
import {
  Layout,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GlobalLoader from "../components/GlobalLoader";

const ATSPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  const fetchEmployerJobs = async () => {
    try {
      const data = await apiRequest("/employer/jobs");
      setJobs(data);
      if (data.length > 0) {
        setSelectedJob(data[0]);
        fetchApplications(data[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (jobId) => {
    try {
      // Changed from /admin/all-users to /employer/jobseekers
      const data = await apiRequest(`/employer/jobseekers`);
      const mockApps = data
        .filter((u) => u.role === "jobseeker")
        .map((u) => ({
          id: Math.floor(Math.random() * 1000),
          user: u,
          status: ["Applied", "Shortlisted", "Interviewing", "Rejected"][
            Math.floor(Math.random() * 4)
          ],
          applied_at: new Date().toISOString(),
          cover_letter:
            "I am very interested in this position and have the required skills...",
        }));
      setApplications(mockApps);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load applicants.");
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    toast.success(`Candidate moved to ${newStatus}`);
    setApplications((apps) =>
      apps.map((a) => (a.id === appId ? { ...a, status: newStatus } : a)),
    );
  };

  const handleSchedule = (app) => {
    navigate("/dashboard/interviews", {
      state: { candidate: app.user, job: selectedJob },
    });
  };

  const handleChat = (candidate) => {
    navigate("/dashboard/messages", { state: { contact: candidate } });
  };

  if (loading)
    return <GlobalLoader message="Loading Cloudfire applicant tracking..." />;

  const filteredApps = applications.filter(
    (a) => filterStatus === "All" || a.status === filterStatus,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-serif">
            Applicant Tracking System
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your hiring pipeline and candidate stages.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Jobs List */}
        <div className="lg:w-1/3 space-y-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
            Active Job Openings
          </h3>
          <div className="space-y-3">
            {jobs.map((job) => (
              <button
                key={job.id}
                onClick={() => {
                  setSelectedJob(job);
                  fetchApplications(job.id);
                }}
                className={`w-full text-left p-5 rounded-xl border transition-all ${
                  selectedJob?.id === job.id
                    ? "bg-black text-white border-black shadow-xl scale-[1.02]"
                    : "bg-white text-gray-700 border-gray-100 hover:border-gray-200"
                }`}
              >
                <h4 className="font-bold truncate">{job.title}</h4>
                <div className="flex items-center justify-between mt-2">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wider ${selectedJob?.id === job.id ? "text-gray-400" : "text-gray-400"}`}
                  >
                    {job.company}
                  </p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-black ${selectedJob?.id === job.id ? "bg-white/10 text-white" : "bg-orange-50 text-[#ff7301]"}`}
                  >
                    {job.application_count || 0} Apps
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pipeline / Candidate List */}
        <div className="lg:w-2/3 space-y-6">
          {selectedJob ? (
            <>
              {/* Filters */}
              <div className="bg-white p-4 rounded-xl border border-gray-50 flex flex-wrap gap-2 items-center">
                <Filter size={16} className="text-gray-400 mx-2" />
                {[
                  "All",
                  "Applied",
                  "Shortlisted",
                  "Interviewing",
                  "Rejected",
                ].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      filterStatus === status
                        ? "bg-[#ff7301] text-white"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Candidate Cards */}
              <div className="space-y-4">
                {filteredApps.map((app) => (
                  <motion.div
                    key={app.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-xl transition-all group"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                        <img
                          src={
                            app.user.profile_image_url ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${app.user.full_name}`
                          }
                          alt=""
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-lg font-bold text-gray-900">
                            {app.user.full_name}
                          </h4>
                          <span
                            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                              app.status === "Shortlisted"
                                ? "bg-green-50 text-green-600 border-green-100"
                                : app.status === "Interviewing"
                                  ? "bg-blue-50 text-blue-600 border-blue-100"
                                  : app.status === "Rejected"
                                    ? "bg-red-50 text-red-600 border-red-100"
                                    : "bg-gray-50 text-gray-400 border-gray-100"
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 font-medium mb-4">
                          <span className="flex items-center gap-1.5">
                            <Mail size={14} /> {app.user.email}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} /> Applied{" "}
                            {new Date(app.applied_at).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              handleStatusChange(app.id, "Shortlisted")
                            }
                            className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-bold hover:bg-green-600 hover:text-white transition-all cursor-pointer"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => handleSchedule(app)}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                          >
                            Schedule Interview
                          </button>
                          <button
                            onClick={() => handleChat(app.user)}
                            className="px-4 py-2 bg-orange-50 text-[#ff7301] rounded-xl text-[10px] font-bold hover:bg-[#ff7301] hover:text-white transition-all cursor-pointer"
                          >
                            Direct Message
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(app.id, "Rejected")
                            }
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <button className="p-3 text-gray-300 hover:text-gray-900 transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {filteredApps.length === 0 && (
                  <div className="p-20 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                    <User className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">
                      No candidates in this stage.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-20 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
              <Layout className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                Select a Job
              </h3>
              <p className="text-gray-400 font-medium">
                Choose a job from the left to view and manage its pipeline.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSPage;
