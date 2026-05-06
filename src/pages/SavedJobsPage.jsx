import React, { useState, useEffect } from "react";
import { apiRequest } from "../utils/api";
import { Briefcase, MapPin, DollarSign, Trash2, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import GlobalLoader from "../components/GlobalLoader";

const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    try {
      const data = await apiRequest("/saved-jobs");
      setSavedJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleUnsave = async (id) => {
    try {
      await apiRequest(`/saved-jobs/${id}`, { method: "DELETE" });
      toast.success("Job removed from saved list");
      fetchSavedJobs();
    } catch (err) {
      toast.error("Failed to remove job");
    }
  };

  if (loading) {
    return <GlobalLoader message="Loading your Cloudfire saved jobs..." />;
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">
            Saved Jobs
          </h1>
          <p className="text-gray-500">Jobs you have bookmarked for later.</p>
        </div>
        <div className="bg-orange-50 text-[#ff7301] px-4 py-2 rounded-xl font-bold">
          {savedJobs.length} Saved
        </div>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-gray-100 text-center shadow-sm">
          <Briefcase className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No saved jobs yet
          </h3>
          <p className="text-gray-500 mb-6">
            Explore our active jobs and bookmark the ones you like.
          </p>
          <Link
            to="/dashboard/jobs"
            className="bg-[#ff7301] text-white px-6 py-3 rounded-xl font-bold inline-block hover:bg-orange-600 transition-colors"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-[#ff7301]/30 transition-all"
            >
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-[#ff7301] shrink-0 border border-orange-100">
                  {job.company_logo_url ? (
                    <img
                      src={job.company_logo_url}
                      alt=""
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <Briefcase size={24} />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#ff7301] transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                    <span className="text-gray-900">{job.company}</span>
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {job.location}
                      </span>
                    )}
                    {job.salary && (
                      <span className="flex items-center gap-1 text-green-600">
                        <DollarSign size={14} /> {job.salary}
                      </span>
                    )}
                    {job.type && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded-md text-xs">
                        {job.type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleUnsave(job.id)}
                  className="p-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
                  title="Remove Bookmark"
                >
                  <Trash2 size={20} />
                </button>
                <Link
                  to="/dashboard/jobs"
                  className="px-6 py-3 bg-[#ff7301] text-white font-bold rounded-xl hover:bg-orange-600 transition-colors cursor-pointer shadow-lg shadow-orange-200 text-center"
                >
                  View Job Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobsPage;
