import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  Menu, 
  X, 
  User, 
  MessageSquare, 
  FolderOpen,
  Bell,
  LogIn
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { CustomDropdown, CustomDropdownItem, CustomDropdownSeparator } from './CustomDropdown';
import { useAuth } from '../contexts/AuthContext';

const logoImage = '/logo.png';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logoImage} alt="SETReG Consultancy" className="h-12" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/services">
              <Button 
                variant={isActive('/services') ? 'secondary' : 'ghost'}
                className={isActive('/services') ? 'bg-green-50 text-green-700' : ''}
              >
                Browse Services
              </Button>
            </Link>
            <Link to="/browse-projects">
              <Button 
                variant={isActive('/browse-projects') ? 'secondary' : 'ghost'}
                className={isActive('/browse-projects') ? 'bg-green-50 text-green-700' : ''}
              >
                Browse Projects
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                variant={isActive('/dashboard') ? 'secondary' : 'ghost'}
                className={isActive('/dashboard') ? 'bg-green-50 text-green-700' : ''}
              >
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/messages">
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-green-600 hover:bg-green-700">
                  3
                </Badge>
              </Button>
            </Link>
            
            <Link to="/files">
              <Button variant="ghost" size="icon">
                <FolderOpen className="h-5 w-5" />
              </Button>
            </Link>

            {/* Notifications Dropdown */}
            <CustomDropdown
              trigger={
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-green-600 hover:bg-green-700">
                    5
                  </Badge>
                </Button>
              }
              align="right"
              className="w-80"
            >
              <div className="px-4 py-3 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <CustomDropdownItem>
                  <div>
                    <p className="text-sm text-slate-900">New bid received on "Structural Analysis"</p>
                    <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                  </div>
                </CustomDropdownItem>
                <CustomDropdownItem>
                  <div>
                    <p className="text-sm text-slate-900">Project milestone completed</p>
                    <p className="text-xs text-slate-500 mt-1">5 hours ago</p>
                  </div>
                </CustomDropdownItem>
                <CustomDropdownItem>
                  <div>
                    <p className="text-sm text-slate-900">Payment received for "Bridge Design"</p>
                    <p className="text-xs text-slate-500 mt-1">1 day ago</p>
                  </div>
                </CustomDropdownItem>
                <CustomDropdownItem>
                  <div>
                    <p className="text-sm text-slate-900">New message from Sarah Chen</p>
                    <p className="text-xs text-slate-500 mt-1">2 days ago</p>
                  </div>
                </CustomDropdownItem>
                <CustomDropdownItem>
                  <div>
                    <p className="text-sm text-slate-900">Your profile was viewed 12 times</p>
                    <p className="text-xs text-slate-500 mt-1">3 days ago</p>
                  </div>
                </CustomDropdownItem>
              </div>
              <div className="p-2 border-t border-slate-200">
                <Button variant="ghost" className="w-full justify-center text-green-600 hover:text-green-700 hover:bg-green-50">
                  View All Notifications
                </Button>
              </div>
            </CustomDropdown>

            {/* User Profile Dropdown */}
            <CustomDropdown
              trigger={
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              }
              align="right"
            >
              <CustomDropdownItem onClick={() => navigate('/profile')}>
                My Profile
              </CustomDropdownItem>
              <CustomDropdownItem onClick={() => navigate('/user-levels')}>
                User Levels
              </CustomDropdownItem>
              <CustomDropdownItem onClick={() => navigate('/verify-identity')}>
                Verify Identity
              </CustomDropdownItem>
              <CustomDropdownSeparator />
              <CustomDropdownItem onClick={() => navigate('/post-project')}>
                Post Project
              </CustomDropdownItem>
              <CustomDropdownItem onClick={() => navigate('/bids')}>
                My Bids
              </CustomDropdownItem>
              <CustomDropdownItem onClick={() => navigate('/payments')}>
                Payments
              </CustomDropdownItem>
              <CustomDropdownItem onClick={() => navigate('/contracts')}>
                Contracts
              </CustomDropdownItem>
              <CustomDropdownItem onClick={() => navigate('/analytics')}>
                Analytics
              </CustomDropdownItem>
              <CustomDropdownSeparator />
              <CustomDropdownItem onClick={() => navigate('/admin')}>
                Admin Panel
              </CustomDropdownItem>
              <CustomDropdownSeparator />
              <CustomDropdownItem onClick={handleSignOut}>
                Logout
              </CustomDropdownItem>
            </CustomDropdown>

            {!user && (
              <Link to="/login">
                <Button className="bg-green-600 hover:bg-green-700">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/services" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Browse Services
              </Button>
            </Link>
            <Link to="/browse-projects" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Browse Projects
              </Button>
            </Link>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
            <Link to="/messages" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Messages
              </Button>
            </Link>
            <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Profile
              </Button>
            </Link>
            <Link to="/user-levels" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                User Levels
              </Button>
            </Link>
            <Link to="/verify-identity" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Verify Identity
              </Button>
            </Link>
            <Link to="/post-project" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Post Project
              </Button>
            </Link>
            {!user && (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Sign In
                </Button>
              </Link>
            )}
            {user && (
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
              >
                Logout
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}