import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { VerifyEmail } from './pages/VerifyEmail';
import { SetupAuth } from './pages/SetupAuth';
import { Profile } from './pages/Profile';
import { ServiceBrowsing } from './pages/ServiceBrowsing';
import { ProjectPosting } from './pages/ProjectPosting';
import { BrowseProjects } from './pages/BrowseProjects';
import { BrowseProjectsWithBackend } from './pages/BrowseProjectsWithBackend';
import { BidManagement } from './pages/BidManagement';
import { ProjectDashboard } from './pages/ProjectDashboard';
import { Messaging } from './pages/Messaging';
import { Contract } from './pages/Contract';
import { Payment } from './pages/Payment';
import { Reviews } from './pages/Reviews';
import { FileSharing } from './pages/FileSharing';
import { AdminPanel } from './pages/AdminPanel';
import { Analytics } from './pages/Analytics';
import { Checkout } from './pages/Checkout';
import { ExpertProfile } from './pages/ExpertProfile';
import { UserLevels } from './pages/UserLevels';
import { VerifyIdentity } from './pages/VerifyIdentity';
import { HowItWorks } from './pages/HowItWorks';
import { ContactUs } from './pages/ContactUs';
import { TrustAndSafety } from './pages/TrustAndSafety';
import { HelpCenter } from './pages/HelpCenter';
import { AboutUs } from './pages/AboutUs';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/setup-auth" element={<SetupAuth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<ExpertProfile />} />
              <Route path="/services" element={<ServiceBrowsing />} />
              <Route path="/browse-projects" element={<BrowseProjects />} />
              <Route path="/browse-projects-backend" element={<BrowseProjectsWithBackend />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/post-project" element={<ProjectPosting />} />
              <Route path="/bids" element={<BidManagement />} />
              <Route path="/dashboard" element={<ProjectDashboard />} />
              <Route path="/messages" element={<Messaging />} />
              <Route path="/contracts" element={<Contract />} />
              <Route path="/payments" element={<Payment />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/files" element={<FileSharing />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/user-levels" element={<UserLevels />} />
              <Route path="/verify-identity" element={<VerifyIdentity />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/trust-safety" element={<TrustAndSafety />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}