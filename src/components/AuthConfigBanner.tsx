import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { ExternalLink, Settings, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AuthConfigBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if banner was previously dismissed
    const wasDismissed = localStorage.getItem('authConfigBannerDismissed');
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // Check if we should show the banner
    // In a real app, you'd check if auth is actually configured
    // For now, show it for first-time users
    const hasSeenSetup = localStorage.getItem('hasCompletedAuthSetup');
    if (!hasSeenSetup) {
      setShowBanner(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('authConfigBannerDismissed', 'true');
    setShowBanner(false);
    setDismissed(true);
  };

  const handleComplete = () => {
    localStorage.setItem('hasCompletedAuthSetup', 'true');
    setShowBanner(false);
    navigate('/setup-auth');
  };

  if (!showBanner || dismissed) return null;

  return (
    <div className="sticky top-16 z-40 animate-in slide-in-from-top">
      <Alert className="rounded-none border-l-0 border-r-0 border-t-0 border-b-4 border-b-green-600 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md">
        <Settings className="h-5 w-5 text-green-600" />
        <AlertDescription className="ml-2 flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <p className="font-semibold text-green-900">
              📧 Email authentication is ready to configure!
            </p>
            <p className="text-sm text-green-700 mt-1">
              Takes only 2 minutes to enable email verification. Your Supabase is already connected.
            </p>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleComplete}
            >
              <Settings className="h-4 w-4 mr-1" />
              Configure Now
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-slate-500 hover:text-slate-700"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
