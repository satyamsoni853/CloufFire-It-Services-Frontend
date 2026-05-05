import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest, clearAuthTokens } from "../utils/api";
import {
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Search,
  Command,
  ChevronDown,
} from "lucide-react";
import GlobalSearch from "./GlobalSearch";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const getMenuItems = (role) => {
    const items = [
      {
        label: "Overview",
        path: "/dashboard",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      },
      {
        label: "Jobs",
        path: "/dashboard/jobs",
        icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      },
    ];

    if (role === "jobseeker") {
      items.push({
        label: "Saved Jobs",
        path: "/dashboard/saved-jobs",
        icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
      });
      items.push({
        label: "Applications",
        path: "/dashboard/applications",
        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      });
      items.push({
        label: "Job Alerts",
        path: "/dashboard/job-alerts",
        icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
      });
      items.push({
        label: "Assessments",
        path: "/dashboard/assessments",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
      });
    }

    items.push({
      label: "Messages",
      path: "/dashboard/messages",
      icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    });
    items.push({
      label: "Interviews",
      path: "/dashboard/interviews",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    });

    if (role === "employer" || role === "admin") {
      items.push({
        label: "Job Seekers",
        path: "/dashboard/jobseekers",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      });
      if (role === "employer") {
        items.push({
          label: "Applicant Tracking",
          path: "/dashboard/ats",
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
        });
        items.push({
          label: "Job Templates",
          path: "/dashboard/templates",
          icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
        });
        items.push({
          label: "My Posted Jobs",
          path: "/dashboard/my-jobs",
          icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
        });
        items.push({
          label: "Plans & Billing",
          path: "/dashboard/pricing",
          icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
        });
      }
      items.push({
        label: "Talent Marketplace",
        path: "/dashboard/marketplace",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
      });
    }

    items.push({
      label: "My Profile",
      path: "/dashboard/profile",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    });
    items.push({
      label: "Reports",
      path: "/dashboard/reports",
      icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    });
    items.push({
      label: "Settings",
      path: "/dashboard/settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    });
    return items;
  };

  // Initialize menu items from localStorage role for immediate display
  const [menuItems, setMenuItems] = useState(() =>
    getMenuItems(localStorage.getItem("role")),
  );

  const currentTitle = useMemo(() => {
    const item = menuItems.find((i) => i.path === location.pathname);
    if (item) return item.label;
    if (location.pathname === "/dashboard") return "Overview";
    return "Dashboard";
  }, [location.pathname, menuItems]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const [user, notificationsData] = await Promise.all([
          apiRequest("/profile").catch(() => null),
          apiRequest("/notifications").catch(() => []),
        ]);

        if (user) {
          setUserData(user);
          // Update menu items if role changed or to ensure consistency
          setMenuItems(getMenuItems(user.role));
          localStorage.setItem("role", user.role);
        }

        if (Array.isArray(notificationsData)) {
          setNotifications(notificationsData);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    clearAuthTokens();
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans relative no-scrollbar">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[95] lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-[100] w-[280px] bg-black text-white flex flex-col transition-transform duration-500 lg:translate-x-0 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="py-12 flex justify-center relative">
          <Link to="/" className="cursor-pointer group">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="/Assests/Cloudfire-white.png"
              alt="Cloudfire"
              className="w-[140px] h-[100px] object-contain"
            />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-6 right-6 lg:hidden text-white cursor-pointer hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-2 flex-grow overflow-y-auto no-scrollbar pb-10">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.label} className="w-full px-4">
                  <Link
                    to={item.path}
                    className={`flex items-center px-6 transition-all group font-sans font-semibold text-[15px] leading-[52px] h-[52px] cursor-pointer w-full rounded-3xl ${isActive ? "bg-[#ff7301] text-white shadow-lg shadow-orange-900/10" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                  >
                    <svg
                      className={`w-5 h-5 mr-4 shrink-0 transition-transform group-hover:scale-105 ${isActive ? "text-white" : "text-gray-500 group-hover:text-[#ff7301]"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={item.icon}
                      />
                    </svg>
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 h-[52px] text-gray-500 hover:text-white hover:bg-red-500/5 transition-all font-sans font-semibold text-[15px] rounded-3xl group"
          >
            <LogOut
              size={18}
              className="mr-4 group-hover:text-red-500 transition-colors"
            />
            <span className="group-hover:text-red-500 transition-colors">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-[280px] min-h-screen bg-white transition-all duration-300">
        {/* Top Header */}
        <header className="flex justify-between items-center px-6 lg:px-12 py-5 border-b border-gray-50 sticky top-0 bg-white/80 backdrop-blur-xl z-[90] shadow-sm">
          <div className="flex items-center flex-1">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mr-6 p-2 rounded-xl hover:bg-gray-50 lg:hidden text-black transition-colors"
            >
              <Menu size={26} />
            </button>
            <h2 className="hidden sm:block text-gray-950 whitespace-nowrap font-semibold text-[18px] tracking-tight">
              {currentTitle}
            </h2>
          </div>

          <div className="max-w-xl mx-4 sm:mx-10">
            <GlobalSearch />
          </div>

          <div className="flex items-center space-x-3 sm:space-x-8 flex-1 justify-end">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotifyOpen(!isNotifyOpen)}
                className={`relative p-2.5 rounded-2xl transition-all ${isNotifyOpen ? "bg-gray-100 text-[#ff7301]" : "text-gray-400 hover:bg-gray-50"}`}
              >
                <Bell size={22} />
                {notifications.length > 0 && (
                  <span className="absolute top-2 right-2 bg-[#ff7301] text-[8px] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold ring-2 ring-white">
                    {notifications.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotifyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 bg-white rounded-[28px] shadow-2xl border border-gray-100 py-6 z-[100] origin-top-right overflow-hidden"
                  >
                    <div className="flex justify-between items-center px-8 pb-4 border-b border-gray-50">
                      <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-widest">
                        Activity
                      </h4>
                      <span className="text-[10px] bg-orange-100 text-[#ff7301] px-2 py-0.5 rounded-lg font-bold uppercase tracking-wider">
                        {userData?.role}
                      </span>
                    </div>
                    <div className="py-2 max-h-[400px] overflow-y-auto no-scrollbar">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="px-8 py-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 group"
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-xl bg-white p-2 rounded-xl shadow-sm ring-1 ring-gray-100 group-hover:ring-[#ff7301]/20 transition-all">
                              {notif.icon}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-gray-800 group-hover:text-[#ff7301] transition-colors">
                                {notif.title}
                              </p>
                              <p className="text-[10px] font-medium text-gray-400 mt-1">
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {notifications.length === 0 && (
                        <div className="px-8 py-12 text-center text-gray-400 text-sm font-bold italic">
                          No recent activity logs.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-4 p-2 pl-2 pr-4 rounded-2xl transition-all border ${isUserMenuOpen ? "bg-gray-100 border-gray-200" : "border-transparent hover:bg-gray-50 hover:border-gray-100"}`}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border-2 border-white shadow-md">
                  <img
                    src={
                      userData?.profile_image_url ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.full_name || "User"}`
                    }
                    alt="User"
                  />
                </div>
                <div className="text-left hidden md:block">
                  <div className="flex items-center gap-2">
                    <div className="text-[13px] font-semibold text-gray-900 leading-none">
                      {userData?.full_name || "Loading..."}
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium mt-1.5">
                    {userData?.role || "Identifying..."}
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-300 hidden md:block ${isUserMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-56 bg-white rounded-[28px] shadow-2xl border border-gray-100 py-3 z-[100] origin-top-right overflow-hidden"
                  >
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center px-6 py-4 text-[13px] font-semibold text-gray-700 hover:bg-[#ff7301]/5 hover:text-[#ff7301] transition-all"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={16} className="mr-3" />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-6 py-4 text-[13px] font-semibold text-rose-600 hover:bg-rose-50 transition-all border-t border-gray-50"
                    >
                      <LogOut size={16} className="mr-3" />
                      Logout Account
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
