import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import ContactPage from './pages/ContactPage';
import IndustriesPage from './pages/IndustriesPage';
import ExpertisePage from './pages/ExpertisePage';
import TeamMemberPage from './pages/TeamMemberPage';
import HireTalentDashboard from './pages/HireTalentDashboard';
import JobsPage from './pages/JobsPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import EmployerDashboard from './pages/EmployerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import JobSeekerDirectory from './pages/JobSeekerDirectory';
import ClientSuccessPage from './pages/ClientSuccessPage';
import DiscoverCloudfirePage from './pages/DiscoverCloudfirePage';

const DashboardRouter = () => {
  const role = localStorage.getItem('role');
  if (role === 'admin') return <AdminDashboard />;
  if (role === 'employer') return <EmployerDashboard />;
  return <HireTalentDashboard />;
};


import { useEffect } from 'react';

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAuthPage = ['/login', '/signup', '/verify-otp', '/forgot-password', '/reset-password'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      {!isDashboard && !isAuthPage && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/expertise" element={<ExpertisePage />} />
        <Route path="/client-success" element={<ClientSuccessPage />} />
        <Route path="/discover" element={<DiscoverCloudfirePage />} />
        <Route path="/team/:slug" element={<TeamMemberPage />} />
        <Route path="/dashboard" element={<DashboardRouter />} />
        <Route path="/dashboard/jobs" element={<JobsPage />} />
        <Route path="/dashboard/reports" element={<ReportsPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/jobseekers" element={<JobSeekerDirectory />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>

      {!isDashboard && !isAuthPage && <Footer />}
    </div>
  );
}

export default App;

