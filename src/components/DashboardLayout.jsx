import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const getMenuItems = (role) => {
    const items = [
      { label: 'Overview', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { label: 'Jobs', path: '/dashboard/jobs', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    ];
    
    if (role === 'jobseeker') {
      items.push({ label: 'Saved Jobs', path: '/dashboard/saved-jobs', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' });
      items.push({ label: 'Applications', path: '/dashboard/applications', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' });
    }

    if (role === 'employer' || role === 'admin') {
      items.push({ label: 'Job Seekers', path: '/dashboard/jobseekers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' });
      if (role === 'employer') {
        items.push({ label: 'My Posted Jobs', path: '/dashboard/my-jobs', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' });
      }
    }
    
    items.push({ label: 'My Profile', path: '/dashboard/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' });
    items.push({ label: 'Reports', path: '/dashboard/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' });
    items.push({ label: 'Settings', path: '/dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' });
    return items;
  };

  // Initialize menu items from localStorage role for immediate display
  const [menuItems, setMenuItems] = useState(() => getMenuItems(localStorage.getItem('role')));

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      try {
        const [user, notificationsData] = await Promise.all([
          apiRequest('/profile').catch(() => null),
          apiRequest('/notifications').catch(() => [])
        ]);

        if (user) {
          setUserData(user);
          // Update menu items if role changed or to ensure consistency
          setMenuItems(getMenuItems(user.role));
          localStorage.setItem('role', user.role);
        }

        if (Array.isArray(notificationsData)) {
          setNotifications(notificationsData);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchDashboardData();
    // Run only once on mount to prevent sidebar flicker on navigation
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-[280px] bg-black text-white flex flex-col transition-transform duration-300 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="py-10 flex justify-center relative">
          <Link to="/" className="cursor-pointer">
            <img 
              src="/Assests/Cloudfire-white.png" 
              alt="Cloudfire" 
              className="w-[130px] h-[100px] object-contain" 
            />
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 lg:hidden text-white cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="mt-2 flex-grow overflow-y-auto">
          <ul className="space-y-0">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.label} className="w-full">
                  <Link 
                    to={item.path}
                    className={`flex items-center px-8 transition-all group font-sans font-semibold text-[17px] leading-[55px] h-[55px] cursor-pointer w-full ${isActive ? 'bg-[#ff7301] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <svg className="w-5 h-5 mr-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                    </svg>
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-8 h-[55px] text-gray-400 hover:text-white hover:bg-red-500/10 transition-all font-sans font-semibold text-[17px] rounded-xl group"
          >
            <svg className="w-5 h-5 mr-4 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="group-hover:text-red-500 transition-colors">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-[280px] min-h-screen bg-white transition-all duration-300">
        {/* Top Header */}
        <header className="flex justify-between items-center px-4 sm:px-6 lg:px-10 py-4 border-b border-gray-100 sticky top-0 bg-white z-[90] shadow-sm">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 lg:hidden text-black transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <h2 className="text-secondary whitespace-nowrap font-serif font-bold text-[18px]">
              My Account
            </h2>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifyOpen(!isNotifyOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#ff7301] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {notifications.length}
                  </span>
                )}
              </button>

              {isNotifyOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 z-[100]">
                  <div className="flex justify-between items-center px-6 pb-2 border-b border-gray-50">
                    <h4 className="text-sm font-bold text-gray-900">Notifications</h4>
                    <span className="text-[10px] text-[#ff7301] font-bold uppercase tracking-wider">{userData?.role}</span>
                  </div>
                  <div className="py-2 max-h-[300px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 group">
                        <div className="flex items-start gap-3">
                          <span className="text-lg">{notif.icon}</span>
                          <div>
                            <p className="text-xs font-bold text-gray-800 group-hover:text-[#ff7301] transition-colors">{notif.title}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <div className="px-6 py-8 text-center text-gray-400 text-xs italic">
                        No new notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 sm:space-x-3 p-1 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                  <img 
                    src={userData?.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.full_name || 'User'}`} 
                    alt="User" 
                  />
                </div>
                <div className="text-left block">
                  <div className="flex items-center gap-2">
                    <div className="text-[13px] font-bold text-gray-900 leading-none">{userData?.full_name || 'Loading...'}</div>
                    {userData?.role && (
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                        userData.role === 'admin' ? 'bg-purple-100 text-purple-600' : 
                        userData.role === 'employer' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-[#ff7301]'
                      }`}>
                        {userData.role}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium mt-1">{userData?.email || 'Please wait...'}</div>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[100] overflow-hidden">
                  <Link 
                    to="/dashboard/profile" 
                    className="flex items-center px-5 py-3 text-sm font-bold text-gray-700 hover:bg-[#ff7301]/5 hover:text-[#ff7301] transition-all"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-all border-t border-gray-50"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
