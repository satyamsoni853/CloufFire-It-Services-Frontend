import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

// Lazy-loaded pages for code-splitting
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const ExpertisePage = lazy(() => import('./pages/ExpertisePage'));
const TeamMemberPage = lazy(() => import('./pages/TeamMemberPage'));
const HireTalentDashboard = lazy(() => import('./pages/HireTalentDashboard'));
const JobsPage = lazy(() => import('./pages/JobsPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const VerifyOtpPage = lazy(() => import('./pages/VerifyOtpPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const EmployerDashboard = lazy(() => import('./pages/EmployerDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const JobSeekerDirectory = lazy(() => import('./pages/JobSeekerDirectory'));
const ClientSuccessPage = lazy(() => import('./pages/ClientSuccessPage'));
const DiscoverCloudfirePage = lazy(() => import('./pages/DiscoverCloudfirePage'));
const LegalPrivacy = lazy(() => import('./pages/LegalPrivacy'));
const LegalTerms = lazy(() => import('./pages/LegalTerms'));
const DashboardLayout = lazy(() => import('./components/DashboardLayout'));
const PostJobPage = lazy(() => import('./pages/PostJobPage'));
const SavedJobsPage = lazy(() => import('./pages/SavedJobsPage'));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage'));
const MyJobsPage = lazy(() => import('./pages/MyJobsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

// Loading spinner shown while lazy chunks load
const PageLoader = () => (
  <div className="flex items-center justify-center h-[60vh]">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#ff7301]"></div>
  </div>
);

const DashboardRouter = () => {
  const role = localStorage.getItem('role');
  if (role === 'admin') return <AdminDashboard />;
  if (role === 'employer') return <EmployerDashboard />;
  return <HireTalentDashboard />;
};

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
      <Toaster position="top-right" />
      {!isDashboard && !isAuthPage && <Header />}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/client-success" element={<ClientSuccessPage />} />
          <Route path="/discover" element={<DiscoverCloudfirePage />} />
          <Route path="/privacy-policy" element={<LegalPrivacy />} />
          <Route path="/terms-and-conditions" element={<LegalTerms />} />

          <Route path="/team/:slug" element={<TeamMemberPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardRouter />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="jobs/post" element={<PostJobPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="jobseekers" element={<JobSeekerDirectory />} />
            <Route path="saved-jobs" element={<SavedJobsPage />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="my-jobs" element={<MyJobsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Suspense>

      {!isDashboard && !isAuthPage && <Footer />}
    </div>
  );
}

export default App;
