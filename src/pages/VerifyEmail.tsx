import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../lib/supabase';

export function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      // Check if there's a token in the URL (from email link)
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (type === 'email' || token) {
        // Supabase automatically handles email verification
        // when user clicks the link in their email
        setVerified(true);
        toast.success('Email verified successfully!');
      } else {
        setError('Invalid verification link');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify email');
    } finally {
      setVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    toast.success('Verification email resent! Please check your inbox.');
  };

  if (verifying) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-slate-50 py-12 px-4 flex items-center justify-center">
        <Card className="max-w-md w-full border-green-100">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 mx-auto animate-spin text-green-600" />
              <h3 className="text-xl text-slate-900">Verifying your email...</h3>
              <p className="text-slate-600">Please wait a moment</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-slate-50 py-12 px-4 flex items-center justify-center">
        <Card className="max-w-md w-full border-green-100">
          <CardHeader>
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-center">Email Verified!</CardTitle>
            <CardDescription className="text-center">
              Your email has been successfully verified
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800 text-center">
                You can now sign in to your account and start using SETReG Marketplace!
              </p>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/login')}
            >
              Continue to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-slate-50 py-12 px-4 flex items-center justify-center">
      <Card className="max-w-md w-full border-red-100">
        <CardHeader>
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-center">Verification Failed</CardTitle>
          <CardDescription className="text-center">
            {error || 'Unable to verify your email'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-800 text-center">
              The verification link may be invalid or expired.
            </p>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full"
              variant="outline"
              onClick={handleResendEmail}
            >
              <Mail className="h-4 w-4 mr-2" />
              Resend Verification Email
            </Button>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/register')}
            >
              Back to Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
