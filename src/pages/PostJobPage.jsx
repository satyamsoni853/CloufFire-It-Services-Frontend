import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  UserCheck,
  Mail,
  Globe,
  Building2,
  PlusCircle,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  Users,
} from "lucide-react";
import { apiRequest } from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostJobPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  const [formData, setFormData] = useState({
    // Basic Details
    title: "",
    company: "",
    description: "",
    location: "",
    type: "Full-time",
    experience_required: "",
    skills_required: "",
    openings: 1,

    // Compensation
    salary: "",
    perks: "",

    // Candidate Requirements
    education_qualification: "",
    preferred_skills: "",
    certifications: "",

    // Application Details
    deadline: "",
    application_method: "Apply Button (in-app)",
    application_email: "",
    application_link: "",
    hr_name: "",
    hr_phone: "",

    // Company Details
    company_description: "",
    company_website: "",
    company_logo_url: "",

    // Advanced Fields
    work_mode: "Hybrid",
    shift_timing: "",
    notice_period: "",
    gender_preference: "",
    industry_type: "",
    department: "",
  });

  const sections = [
    {
      id: "basic",
      label: "Basic Details",
      icon: Briefcase,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      id: "compensation",
      label: "Compensation",
      icon: DollarSign,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      id: "requirements",
      label: "Requirements",
      icon: UserCheck,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      id: "application",
      label: "Application",
      icon: Mail,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      id: "company",
      label: "Company",
      icon: Building2,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      id: "advanced",
      label: "Advanced",
      icon: Layers,
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest("/jobs", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      toast.success("Job posted successfully!");
      navigate("/dashboard/jobs");
    } catch (err) {
      console.error("Failed to post job:", err);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 font-serif">
          Post a New Job
        </h1>
        <p className="text-gray-500 mt-2">
          Fill in the details below to create a comprehensive job listing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-8">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? `${section.bg} ${section.color} font-bold shadow-sm`
                      : "text-gray-500 hover:bg-gray-50 font-medium"
                  }`}
                >
                  <section.icon size={20} />
                  <span>{section.label}</span>
                  {activeSection === section.id && (
                    <ChevronRight className="ml-auto" size={16} />
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-50">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex gap-3 text-blue-600 mb-2">
                  <Info size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Pro Tip
                  </span>
                </div>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Detailed job descriptions attract 3x more qualified
                  candidates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-9">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 🔴 Basic Job Details */}
            <section
              id="basic"
              className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 ${activeSection !== "basic" && "opacity-50 grayscale-[0.5]"}`}
            >
              <div className="p-6 border-b border-gray-50 bg-red-50/30 flex items-center gap-3 text-red-600">
                <div className="p-2 bg-red-100 rounded-xl">
                  <Briefcase size={20} />
                </div>
                <h2 className="text-xl font-bold font-serif">
                  Basic Job Details
                </h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                    placeholder="e.g. Frontend Developer, Java Full Stack Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    required
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                    placeholder="e.g. CloudFire IT Services"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Job Location *
                  </label>
                  <input
                    required
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                    placeholder="City / Remote / Hybrid"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Employment Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all appearance-none bg-white"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Experience Required
                  </label>
                  <input
                    name="experience_required"
                    value={formData.experience_required}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                    placeholder="e.g. 1–3 years"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Skills Required (Comma separated)
                  </label>
                  <input
                    name="skills_required"
                    value={formData.skills_required}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                    placeholder="React, Java, Spring Boot, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Number of Openings
                  </label>
                  <input
                    name="openings"
                    value={formData.openings}
                    onChange={handleChange}
                    type="number"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                    placeholder="1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all resize-none"
                    placeholder="Roles, responsibilities, and requirements..."
                  ></textarea>
                </div>
              </div>
            </section>

            {/* 🟠 Compensation & Benefits */}
            <section
              id="compensation"
              className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 ${activeSection !== "compensation" && "opacity-50 grayscale-[0.5]"}`}
            >
              <div className="p-6 border-b border-gray-50 bg-orange-50/30 flex items-center gap-3 text-orange-600">
                <div className="p-2 bg-orange-100 rounded-xl">
                  <DollarSign size={20} />
                </div>
                <h2 className="text-xl font-bold font-serif">
                  Compensation & Benefits
                </h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Salary Range (CTC) *
                  </label>
                  <input
                    required
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                    placeholder="e.g. 5–8 LPA"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Perks / Benefits
                  </label>
                  <textarea
                    name="perks"
                    value={formData.perks}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none"
                    placeholder="Health Insurance, Work From Home, Bonuses, etc."
                  ></textarea>
                </div>
              </div>
            </section>

            {/* 🟡 Candidate Requirements */}
            <section
              id="requirements"
              className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 ${activeSection !== "requirements" && "opacity-50 grayscale-[0.5]"}`}
            >
              <div className="p-6 border-b border-gray-50 bg-yellow-50/30 flex items-center gap-3 text-yellow-600">
                <div className="p-2 bg-yellow-100 rounded-xl">
                  <UserCheck size={20} />
                </div>
                <h2 className="text-xl font-bold font-serif">
                  Candidate Requirements
                </h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Education Qualification
                  </label>
                  <input
                    name="education_qualification"
                    value={formData.education_qualification}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all"
                    placeholder="B.Tech, MCA, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Preferred Skills (Optional)
                  </label>
                  <input
                    name="preferred_skills"
                    value={formData.preferred_skills}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all"
                    placeholder="AWS, Docker, etc."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Certifications (Optional)
                  </label>
                  <input
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all"
                    placeholder="Any specific certifications required"
                  />
                </div>
              </div>
            </section>

            {/* 🔵 Application Details */}
            <section
              id="application"
              className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 ${activeSection !== "application" && "opacity-50 grayscale-[0.5]"}`}
            >
              <div className="p-6 border-b border-gray-50 bg-blue-50/30 flex items-center gap-3 text-blue-600">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Mail size={20} />
                </div>
                <h2 className="text-xl font-bold font-serif">
                  Application Details
                </h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Application Deadline
                  </label>
                  <input
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    type="date"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Application Method
                  </label>
                  <select
                    name="application_method"
                    value={formData.application_method}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none bg-white"
                  >
                    <option>Apply Button (in-app)</option>
                    <option>Email</option>
                    <option>External Link</option>
                  </select>
                </div>
                {formData.application_method === "Email" && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Application Email
                    </label>
                    <input
                      name="application_email"
                      value={formData.application_email}
                      onChange={handleChange}
                      type="email"
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      placeholder="hr@company.com"
                    />
                  </div>
                )}
                {formData.application_method === "External Link" && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      External Link
                    </label>
                    <input
                      name="application_link"
                      value={formData.application_link}
                      onChange={handleChange}
                      type="url"
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      placeholder="https://company.com/careers/job"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Contact Person / HR Name
                  </label>
                  <input
                    name="hr_name"
                    value={formData.hr_name}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    placeholder="Name of the HR"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    name="hr_phone"
                    value={formData.hr_phone}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            </section>

            {/* 🟣 Company Details */}
            <section
              id="company"
              className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 ${activeSection !== "company" && "opacity-50 grayscale-[0.5]"}`}
            >
              <div className="p-6 border-b border-gray-50 bg-purple-50/30 flex items-center gap-3 text-purple-600">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Building2 size={20} />
                </div>
                <h2 className="text-xl font-bold font-serif">
                  Company Details
                </h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    name="company_description"
                    value={formData.company_description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all resize-none"
                    placeholder="Tell candidates about your company..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Company Website
                  </label>
                  <input
                    name="company_website"
                    value={formData.company_website}
                    onChange={handleChange}
                    type="url"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                    placeholder="https://www.company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Company Logo URL
                  </label>
                  <input
                    name="company_logo_url"
                    value={formData.company_logo_url}
                    onChange={handleChange}
                    type="url"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                    placeholder="https://link-to-logo.png"
                  />
                </div>
              </div>
            </section>

            {/* 🟢 Advanced / Optional Fields */}
            <section
              id="advanced"
              className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 ${activeSection !== "advanced" && "opacity-50 grayscale-[0.5]"}`}
            >
              <div className="p-6 border-b border-gray-50 bg-green-50/30 flex items-center gap-3 text-green-600">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Layers size={20} />
                </div>
                <h2 className="text-xl font-bold font-serif">
                  Advanced / Optional Fields
                </h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Work Mode
                  </label>
                  <select
                    name="work_mode"
                    value={formData.work_mode}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all appearance-none bg-white"
                  >
                    <option>Remote</option>
                    <option>Onsite</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Shift Timing
                  </label>
                  <input
                    name="shift_timing"
                    value={formData.shift_timing}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                    placeholder="e.g. 9 AM - 6 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Notice Period Preference
                  </label>
                  <input
                    name="notice_period"
                    value={formData.notice_period}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                    placeholder="e.g. Immediate, 1 month"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Gender Preference
                  </label>
                  <select
                    name="gender_preference"
                    value={formData.gender_preference}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all appearance-none bg-white"
                  >
                    <option value="">No Preference</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Industry Type
                  </label>
                  <input
                    name="industry_type"
                    value={formData.industry_type}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                    placeholder="e.g. IT Services, Healthcare"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                    placeholder="e.g. Engineering, Sales"
                  />
                </div>
              </div>
            </section>

            {/* Sticky Action Bar */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl border border-gray-100 shadow-xl p-6 sticky bottom-8 flex items-center justify-between gap-4 z-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Ready to publish?
                  </p>
                  <p className="text-xs text-gray-500">
                    All required fields must be filled.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/jobs")}
                  className="px-8 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#ff7301] text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  {loading ? (
                    "Publishing..."
                  ) : (
                    <>
                      <PlusCircle size={20} />
                      Publish Job
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;
