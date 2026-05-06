import React, { useState, useEffect } from "react";
import { apiRequest } from "../utils/api";
import toast from "react-hot-toast";
import { Briefcase, Users, Trash2, Edit3, MapPin, Clock } from "lucide-react";
import GlobalLoader from "../components/GlobalLoader";

const MyJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const data = await apiRequest("/employer/jobs");
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?"))
      return;
    try {
      await apiRequest(`/jobs/${id}`, { method: "DELETE" });
      toast.success("Job deleted successfully");
      fetchJobs();
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  if (loading)
    return <GlobalLoader message="Loading your Cloudfire job posts..." />;

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">
            My Posted Jobs
          </h1>
          <p className="text-gray-500">
            Manage your job listings and track applications.
          </p>
        </div>
        <a
          href="/dashboard/jobs/post"
          className="bg-[#ff7301] text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg"
        >
          Post New Job
        </a>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-gray-100 text-center shadow-sm">
          <Briefcase className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No jobs posted
          </h3>
          <p className="text-gray-500 mb-6">
            You haven't posted any jobs yet. Create one to start receiving
            applications.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium mb-3">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} /> {job.type}
                  </span>
                  {job.openings && (
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">
                      {job.openings} Openings
                    </span>
                  )}
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-blue-100">
                  <Users size={16} />
                  {job.application_count || 0} Applications
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleDelete(job.id)}
                  className="p-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors font-bold flex items-center gap-2"
                  title="Delete"
                >
                  <Trash2 size={18} />{" "}
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobsPage;
