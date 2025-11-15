import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Briefcase, Chrome, Github, Loader2, UserPlus, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import logoImage from '../public/logo.png';

export function Register() {
  const navigate = useNavigate();
  const { signUp, signInWithOAuth } = useAuth();
  
  const [accountType, setAccountType] = useState<'expert' | 'client'>('expert');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(
        formData.email,
        formData.password,
        formData.fullName,
        accountType
      );

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('This email is already registered. Please sign in.');
        } else {
          toast.error(error.message || 'Failed to create account');
        }
      } else {
        setEmailSent(true);
        toast.success('Account created! Please check your email to verify.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'github') => {
    try {
      const { error } = await signInWithOAuth(provider);
      if (error) {
        toast.error(`Failed to sign up with ${provider}`);
      }
    } catch (error) {
      toast.error('Social signup failed');
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-slate-50 py-12 px-4 flex items-center justify-center">
        <Card className="max-w-md w-full border-green-100">
          <CardHeader>
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-center">Verify Your Email</CardTitle>
            <CardDescription className="text-center">
              We've sent a verification link to <strong>{formData.email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg space-y-2">
              <h4 className="text-sm font-medium text-slate-900">What's next?</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                <li>Check your email inbox</li>
                <li>Click the verification link</li>
                <li>Sign in to your account</li>
              </ol>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-slate-600">
                Didn't receive the email?
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.info('Verification email resent!')}
              >
                Resend Email
              </Button>
            </div>

            <Separator />

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/login')}
            >
              Go to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <img src={logoImage} alt="SETReG Consultancy" className="h-24 mx-auto mb-6" />
          <h1 className="text-3xl text-slate-900 mb-2">Join SETReG</h1>
          <p className="text-slate-600">Create your account and start connecting</p>
        </div>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Join our global engineering talent network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Type */}
              <div className="space-y-3">
                <Label>I want to:</Label>
                <RadioGroup value={accountType} onValueChange={(value) => setAccountType(value as 'expert' | 'client')}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`flex items-center space-x-2 border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        accountType === 'expert'
                          ? 'border-green-600 bg-green-50'
                          : 'border-slate-200 hover:border-green-300'
                      }`}
                      onClick={() => setAccountType('expert')}
                    >
                      <RadioGroupItem value="expert" id="expert" />
                      <Label htmlFor="expert" className="cursor-pointer flex-1">
                        <div>
                          <div className="text-slate-900">Work as an Expert</div>
                          <div className="text-sm text-slate-500">
                            Offer your engineering services
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div
                      className={`flex items-center space-x-2 border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        accountType === 'client'
                          ? 'border-green-600 bg-green-50'
                          : 'border-slate-200 hover:border-green-300'
                      }`}
                      onClick={() => setAccountType('client')}
                    >
                      <RadioGroupItem value="client" id="client" />
                      <Label htmlFor="client" className="cursor-pointer flex-1">
                        <div>
                          <div className="text-slate-900">Hire as a Client</div>
                          <div className="text-sm text-slate-500">
                            Find engineering talent
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  I agree to the{' '}
                  <Link to="/terms" className="text-green-600 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-green-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-6" />
              
              <div className="space-y-3">
                <p className="text-sm text-center text-slate-600">Or continue with</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialSignup('google')}
                    className="w-full"
                  >
                    <Chrome className="h-4 w-4 mr-2" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialSignup('github')}
                    className="w-full"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-sm text-center mt-6 text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}