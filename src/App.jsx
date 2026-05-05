import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalLoader from './components/GlobalLoader';
import { Toaster } from 'react-hot-toast';
import { initAnalytics, trackPageView } from './utils/analytics';

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
const MessagesPage = lazy(() => import('./pages/MessagesPage'));
const InterviewsPage = lazy(() => import('./pages/InterviewsPage'));
const JobAlertsPage = lazy(() => import('./pages/JobAlertsPage'));
const AssessmentsPage = lazy(() => import('./pages/AssessmentsPage'));
const ATSPage = lazy(() => import('./pages/ATSPage'));
const JobTemplatesPage = lazy(() => import('./pages/JobTemplatesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const TalentMarketplace = lazy(() => import('./pages/TalentMarketplace'));

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

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

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
      <AnalyticsTracker />
      <Toaster position="top-right" />
      {!isDashboard && !isAuthPage && <Header />}

      <Suspense fallback={<GlobalLoader message="Preparing Cloudfire..." />}>
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
            <Route path="messages" element={<MessagesPage />} />
            <Route path="interviews" element={<InterviewsPage />} />
            <Route path="job-alerts" element={<JobAlertsPage />} />
            <Route path="assessments" element={<AssessmentsPage />} />
            <Route path="ats" element={<ATSPage />} />
            <Route path="templates" element={<JobTemplatesPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="marketplace" element={<TalentMarketplace />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
            <h1 className="text-9xl font-black text-gray-100">404</h1>
            <p className="text-2xl font-bold text-gray-900 mt-4">Page Not Found</p>
            <p className="text-gray-500 mt-2">The page you are looking for does not exist or has been moved.</p>
            <Link to="/" className="mt-8 bg-[#ff7301] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-200">Go Home</Link>
          </div>} />
        </Routes>
      </Suspense>

      {!isDashboard && !isAuthPage && <Footer />}
    </div>
  );
}

export default App;
