import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import { 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Camera,
  Smartphone,
  Lock,
  Award,
  TrendingUp,
  Eye,
  Globe,
  Clock
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const verificationProviders = [
  {
    name: 'Onfido',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Onfido_logo.svg/320px-Onfido_logo.svg.png',
    description: 'AI-powered identity verification with document and biometric checks',
    processingTime: '5-10 minutes',
    supported: ['Passport', 'Driver\'s License', 'National ID'],
    rating: 4.8
  },
  {
    name: 'Veriff',
    logo: 'https://assets-global.website-files.com/6046c69a87c6e1285e27ec13/604d9e8e5f5b5b5e5e5e5e5e_veriff-logo.svg',
    description: 'Global identity verification with real-time video verification',
    processingTime: '3-5 minutes',
    supported: ['Passport', 'ID Card', 'Residence Permit'],
    rating: 4.9
  },
  {
    name: 'IDnow',
    logo: 'https://www.idnow.io/wp-content/themes/idnow/assets/img/logo.svg',
    description: 'European identity verification specialist with human-assisted review',
    processingTime: '10-15 minutes',
    supported: ['Passport', 'National ID', 'Driver\'s License'],
    rating: 4.7
  }
];

const benefits = [
  { icon: Award, title: 'Verified Badge', description: 'Display a verified badge on your profile' },
  { icon: TrendingUp, title: '+200 Points', description: 'Earn bonus points towards your next level' },
  { icon: Eye, title: 'Increased Visibility', description: 'Verified profiles get 3x more views' },
  { icon: ShieldCheck, title: 'Trust & Safety', description: 'Build trust with potential clients' }
];

export function VerifyIdentity() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  const handleStartVerification = () => {
    if (!acceptedTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    if (!selectedProvider) {
      toast.error('Please select a verification provider');
      return;
    }

    // Simulate redirect to verification provider
    toast.success(`Redirecting to ${selectedProvider} for identity verification...`);
    setTimeout(() => {
      window.open('https://onfido.com', '_blank');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <ShieldCheck className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl text-slate-900 mb-4">Verify Your Identity</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Increase trust and unlock premium features by verifying your identity
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-green-100 text-center">
              <CardContent className="p-6">
                <benefit.icon className="h-10 w-10 mx-auto mb-3 text-green-600" />
                <h3 className="text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Overview */}
        <Card className="border-green-100 mb-8">
          <CardHeader>
            <CardTitle>Verification Process</CardTitle>
            <CardDescription>
              Simple 3-step process to verify your identity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-slate-900 mb-2">1. Choose Document</h4>
                <p className="text-sm text-slate-600">
                  Select a government-issued ID (passport, driver's license, or national ID)
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <Camera className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-slate-900 mb-2">2. Take Photos</h4>
                <p className="text-sm text-slate-600">
                  Upload clear photos of your document and take a selfie for verification
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-slate-900 mb-2">3. Get Verified</h4>
                <p className="text-sm text-slate-600">
                  AI and human review process typically completes within minutes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Providers */}
        <Card className="border-green-100 mb-8">
          <CardHeader>
            <CardTitle>Select Verification Provider</CardTitle>
            <CardDescription>
              Choose your preferred identity verification service
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {verificationProviders.map((provider) => (
              <div
                key={provider.name}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedProvider === provider.name
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-green-200'
                }`}
                onClick={() => setSelectedProvider(provider.name)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Checkbox
                      checked={selectedProvider === provider.name}
                      onCheckedChange={() => setSelectedProvider(provider.name)}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-slate-900">{provider.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        ⭐ {provider.rating}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Globe className="h-3 w-3 mr-1" />
                        Global
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{provider.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-slate-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {provider.processingTime}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <FileText className="h-4 w-4 mr-1" />
                        {provider.supported.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <Card className="border-green-100 mb-8">
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
            <CardDescription>
              Please read and accept our verification terms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-6 rounded-lg mb-4 max-h-96 overflow-y-auto">
              <h3 className="text-slate-900 mb-3">Identity Verification Agreement</h3>
              
              <h4 className="text-slate-900 mb-2">1. Purpose</h4>
              <p className="text-sm text-slate-700 mb-4">
                This identity verification process is designed to enhance trust and security on the SETReG platform. 
                By verifying your identity, you help create a safer marketplace for all users.
              </p>

              <h4 className="text-slate-900 mb-2">2. Data Collection</h4>
              <p className="text-sm text-slate-700 mb-4">
                During verification, we will collect:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 mb-4 space-y-1">
                <li>Government-issued identification document (passport, driver's license, or national ID)</li>
                <li>Facial biometric data through selfie verification</li>
                <li>Personal information from your ID document (name, date of birth, nationality)</li>
              </ul>

              <h4 className="text-slate-900 mb-2">3. Data Usage</h4>
              <p className="text-sm text-slate-700 mb-4">
                Your verification data will be:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 mb-4 space-y-1">
                <li>Processed by our trusted third-party verification providers (Onfido, Veriff, or IDnow)</li>
                <li>Used solely for identity verification purposes</li>
                <li>Stored securely with 256-bit encryption</li>
                <li>Retained for compliance and legal requirements (typically 5-7 years)</li>
                <li>Never sold or shared with unauthorized third parties</li>
              </ul>

              <h4 className="text-slate-900 mb-2">4. Data Security</h4>
              <p className="text-sm text-slate-700 mb-4">
                We implement industry-leading security measures including:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 mb-4 space-y-1">
                <li>End-to-end encryption for all data transmission</li>
                <li>Secure cloud storage with SOC 2 Type II compliance</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and audit logs for all data access</li>
              </ul>

              <h4 className="text-slate-900 mb-2">5. Your Rights</h4>
              <p className="text-sm text-slate-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 mb-4 space-y-1">
                <li>Access your verification data at any time</li>
                <li>Request correction of inaccurate information</li>
                <li>Withdraw consent (note: this may limit platform access)</li>
                <li>Request deletion of data (subject to legal retention requirements)</li>
                <li>File a complaint with your local data protection authority</li>
              </ul>

              <h4 className="text-slate-900 mb-2">6. Verification Outcomes</h4>
              <p className="text-sm text-slate-700 mb-4">
                Possible verification outcomes include:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 mb-4 space-y-1">
                <li><strong>Approved:</strong> Identity verified successfully, verified badge displayed</li>
                <li><strong>Pending:</strong> Additional review required (typically resolved within 24 hours)</li>
                <li><strong>Rejected:</strong> Verification unsuccessful, may resubmit with different documents</li>
              </ul>

              <h4 className="text-slate-900 mb-2">7. Compliance</h4>
              <p className="text-sm text-slate-700 mb-4">
                Our verification process complies with:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 mb-4 space-y-1">
                <li>General Data Protection Regulation (GDPR)</li>
                <li>California Consumer Privacy Act (CCPA)</li>
                <li>Know Your Customer (KYC) requirements</li>
                <li>Anti-Money Laundering (AML) regulations</li>
              </ul>

              <h4 className="text-slate-900 mb-2">8. Consent</h4>
              <p className="text-sm text-slate-700 mb-2">
                By accepting these terms, you consent to:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                <li>The collection and processing of your identity verification data</li>
                <li>Sharing your data with our verification partners</li>
                <li>Storage of your data for compliance purposes</li>
                <li>Display of a verified badge on your profile upon successful verification</li>
              </ul>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-slate-700 cursor-pointer">
                I have read and agree to the Identity Verification Agreement and consent to the collection, 
                processing, and storage of my personal data for verification purposes. I understand that my 
                data will be processed by third-party verification providers and stored securely according 
                to applicable data protection laws.
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Lock className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-slate-900 mb-2">Your Security is Our Priority</h3>
                <p className="text-sm text-slate-700 mb-4">
                  All verification data is encrypted end-to-end and processed by industry-leading identity 
                  verification providers. We are fully compliant with GDPR, CCPA, and international data 
                  protection standards.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    256-bit Encryption
                  </Badge>
                  <Badge variant="secondary" className="bg-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    GDPR Compliant
                  </Badge>
                  <Badge variant="secondary" className="bg-white">
                    <Lock className="h-3 w-3 mr-1" />
                    SOC 2 Type II
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700"
            onClick={handleStartVerification}
            disabled={!acceptedTerms || !selectedProvider}
          >
            <ShieldCheck className="h-5 w-5 mr-2" />
            Start Verification
          </Button>
        </div>

        {!acceptedTerms && (
          <p className="text-center text-sm text-slate-500 mt-4">
            Please accept the terms and conditions to continue
          </p>
        )}
      </div>
    </div>
  );
}