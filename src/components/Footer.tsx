import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import logoImage from 'figma:asset/aaa55a9a310e7ff58eb80d1906c3cd7234f69a05.png';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={logoImage} alt="SETReG Consultancy" className="h-16" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className="text-sm">
              Connecting engineering talent with opportunities worldwide. Building sustainable solutions for tomorrow.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="hover:text-green-500 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <MapPin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="hover:text-green-500 transition-colors">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link to="/post-project" className="hover:text-green-500 transition-colors">
                  Post a Project
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-green-500 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-green-500 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="hover:text-green-500 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/trust-safety" className="hover:text-green-500 transition-colors">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link to="/contracts" className="hover:text-green-500 transition-colors">
                  Legal Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-green-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-green-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-green-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2025 SETReG. All rights reserved. Built for sustainable engineering excellence.</p>
        </div>
      </div>
    </footer>
  );
}