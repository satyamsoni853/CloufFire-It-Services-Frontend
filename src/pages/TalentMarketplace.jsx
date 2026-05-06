import React, { useState, useEffect } from "react";
import { apiRequest } from "../utils/api";
import {
  Search,
  Filter,
  Zap,
  ShieldCheck,
  MessageSquare,
  Phone,
  Calendar,
  ArrowRight,
  Star,
  TrendingUp,
  Briefcase,
  MapPin,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserProfileModal from "../components/UserProfileModal";
import GlobalLoader from "../components/GlobalLoader";

const TalentMarketplace = () => {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTalent();
  }, []);

  const fetchTalent = async () => {
    try {
      // Changed from /admin/all-users to /employer/jobseekers to avoid 403 Forbidden
      const data = await apiRequest("/employer/jobseekers");
      setTalents(data.filter((u) => u.role === "jobseeker"));
    } catch (err) {
      console.error(err);
      toast.error(
        "Failed to load talent marketplace. Please check your permissions.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChat = (talent) => {
    navigate("/dashboard/messages", { state: { contact: talent } });
  };

  const handleSchedule = (talent) => {
    navigate("/dashboard/interviews", { state: { candidate: talent } });
  };

  if (loading)
    return <GlobalLoader message="Loading Cloudfire talent marketplace..." />;

  const filteredTalents = talents.filter((t) => {
    const nameMatch = t.full_name?.toLowerCase().includes(search.toLowerCase());
    const skillsMatch = t.skills?.toLowerCase().includes(search.toLowerCase());
    const matchesSearch = !search || nameMatch || skillsMatch;
    const matchesAvailability =
      availabilityFilter === "All" || t.availability === availabilityFilter;
    return matchesSearch && matchesAvailability;
  });

  // Sort featured first
  const sortedTalents = [...filteredTalents].sort(
    (a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0),
  );

  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden bg-white rounded-[40px] p-8 md:p-12 text-gray-900 border border-gray-100 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff7301]/10 rounded-full text-[#ff7301] text-xs font-black uppercase tracking-widest mb-6">
            <Zap size={14} className="fill-[#ff7301]" /> Talent Marketplace
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
            Hire Elite Talent{" "}
            <span className="text-[#ff7301]">Without Notice Period</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg mb-8 leading-relaxed">
            Direct access to immediate joiners and pre-vetted professionals.
            Skip the wait and build your team today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff7301] transition-colors" />
              <input
                type="text"
                placeholder="Search skills, names, or roles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-[#ff7301]/20 transition-all font-medium text-gray-900"
              />
            </div>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="px-6 py-4 bg-gray-50 rounded-xl border border-gray-100 outline-none font-bold text-sm cursor-pointer hover:bg-gray-100 transition-all text-gray-900 appearance-none"
            >
              <option value="All">All Availability</option>
              <option value="Immediate">Immediate Joiners</option>
              <option value="15 Days">Within 15 Days</option>
              <option value="30 Days">Within 30 Days</option>
            </select>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#ff7301]/5 to-transparent pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {sortedTalents.map((talent, idx) => (
            <motion.div
              key={talent.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-white rounded-[40px] border p-8 hover:shadow-2xl transition-all relative group flex flex-col ${
                talent.is_featured
                  ? "border-[#ff7301] shadow-xl"
                  : "border-gray-100"
              }`}
            >
              {talent.is_featured && (
                <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-[#ff7301] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                  <Star size={10} className="fill-white" /> Featured
                </div>
              )}

              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div
                    className={`w-20 h-20 rounded-[28px] overflow-hidden border-2 p-1 ${talent.is_featured ? "border-[#ff7301]" : "border-gray-100"}`}
                  >
                    <img
                      src={
                        talent.profile_image_url ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${talent.full_name}`
                      }
                      alt=""
                      className="w-full h-full object-cover rounded-[20px]"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-xl border-4 border-white flex items-center justify-center shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </div>
                </div>
                <div>
                  <h3
                    className="text-xl font-bold text-gray-900 group-hover:text-[#ff7301] transition-colors cursor-pointer"
                    onClick={() => setSelectedUser(talent)}
                  >
                    {talent.full_name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                      <ShieldCheck size={10} /> Verified
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-md">
                      <Zap size={10} className="fill-green-600" />{" "}
                      {talent.availability || "Immediate"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                  <MapPin size={16} className="text-gray-300" />{" "}
                  {talent.location || "Remote"}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                  <Award size={16} className="text-gray-300" />{" "}
                  {talent.experience || "3+ Years Exp"}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {(talent.skills || "React, Python, Node")
                    .split(",")
                    .slice(0, 3)
                    .map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-bold uppercase tracking-wider"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-50">
                <button
                  onClick={() => handleChat(talent)}
                  className="flex items-center justify-center gap-2 py-4 bg-gray-50 text-gray-700 rounded-xl font-bold text-xs hover:bg-black hover:text-white transition-all cursor-pointer"
                >
                  <MessageSquare size={14} /> Message
                </button>
                <button
                  onClick={() => handleSchedule(talent)}
                  className="flex items-center justify-center gap-2 py-4 bg-[#ff7301] text-white rounded-xl font-bold text-xs shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all cursor-pointer"
                >
                  <Calendar size={14} /> Fast-Hire
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Matching Section */}
      <div className="bg-gray-50 rounded-[40px] p-12 flex flex-col lg:flex-row items-center gap-12 border border-gray-100">
        <div className="lg:w-1/2 space-y-6">
          <div className="w-16 h-16 bg-white rounded-xl shadow-xl flex items-center justify-center text-3xl">
            🤖
          </div>
          <h2 className="text-3xl font-bold font-serif text-gray-900">
            AI-Powered Talent Matching
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed">
            Our advanced neural engine analyzes over 50 data points including
            skills, soft-skills, and past projects to match the right talent
            with your specific cultural and technical requirements.
          </p>
          <button className="flex items-center gap-2 text-[#ff7301] font-black uppercase tracking-widest text-xs hover:underline">
            Learn more about our AI <ArrowRight size={16} />
          </button>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          <MetricBox label="Match Accuracy" value="98%" />
          <MetricBox label="Avg. Time to Hire" value="72h" />
          <MetricBox label="Candidate Retention" value="94%" />
          <MetricBox label="Verified Talent" value="10k+" />
        </div>
      </div>

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

const MetricBox = ({ label, value }) => (
  <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-center">
    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
      {label}
    </p>
  </div>
);

export default TalentMarketplace;
