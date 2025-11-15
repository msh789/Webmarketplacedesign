import { Card, CardContent } from '../components/ui/card';
import { Shield, CheckCircle, Lock, Users, FileCheck, AlertTriangle, Eye, Award } from 'lucide-react';

export function TrustAndSafety() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10" />
          </div>
          <h1 className="text-5xl mb-6">Trust & Safety</h1>
          <p className="text-xl text-green-50 max-w-3xl mx-auto">
            Your security is our priority. Learn about the measures we take to ensure a safe, 
            trustworthy platform for all users.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-slate-900 mb-4">Our Security Principles</h2>
            <p className="text-xl text-slate-600">
              Built on a foundation of trust, transparency, and protection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Verified Identities',
                description: 'All users undergo identity verification to ensure authenticity and build trust.'
              },
              {
                icon: Lock,
                title: 'Secure Payments',
                description: 'Escrow-based payment system protects both clients and experts throughout projects.'
              },
              {
                icon: FileCheck,
                title: 'Legal Protection',
                description: 'Binding contracts and terms of service protect all parties in every transaction.'
              },
              {
                icon: Eye,
                title: 'Active Monitoring',
                description: '24/7 platform monitoring to detect and prevent fraudulent activity.'
              }
            ].map((item, index) => (
              <Card key={index} className="text-center border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Identity Verification */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-slate-900 mb-6">Identity Verification</h2>
              <p className="text-slate-600 mb-6">
                Every user on SETReG goes through our comprehensive identity verification process
                to ensure authenticity and build a trusted community.
              </p>
              <div className="space-y-4">
                {[
                  'Government-issued ID verification',
                  'Professional credential validation',
                  'Email and phone verification',
                  'Background checks for high-level users',
                  'Continuous monitoring for suspicious activity',
                  'Verified badge displayed on profiles'
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8">
                <div className="bg-white rounded-lg p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900">Verification Levels</h3>
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <span className="text-sm">Email Verified</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <span className="text-sm">Identity Verified</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <span className="text-sm">Professional Credentials</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-100 rounded border-2 border-green-600">
                      <span className="text-sm font-medium">Platinum Verified</span>
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Higher verification levels unlock premium features and increase trust
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Security */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-slate-900 mb-4">Payment Security</h2>
            <p className="text-xl text-slate-600">
              Industry-leading payment protection for every transaction
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Escrow Protection',
                description: 'Funds are held securely until project milestones are completed and approved.',
                features: [
                  'Client pays upfront into escrow',
                  'Funds released on milestone completion',
                  'Protection for both parties',
                  'Transparent payment tracking'
                ]
              },
              {
                title: 'Stripe Integration',
                description: 'All payments processed through Stripe, the industry standard for secure transactions.',
                features: [
                  'PCI-DSS Level 1 certified',
                  'Bank-level encryption',
                  'Fraud detection built-in',
                  'Multiple payment methods'
                ]
              },
              {
                title: 'Dispute Resolution',
                description: 'Fair, transparent process for resolving payment disputes.',
                features: [
                  'Dedicated support team',
                  'Evidence-based decisions',
                  'Mediation services',
                  'Refund protection'
                ]
              }
            ].map((item, index) => (
              <Card key={index} className="border-green-100">
                <CardContent className="p-6">
                  <h3 className="text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-slate-900 mb-4">Community Guidelines</h2>
            <p className="text-slate-600">
              Standards we expect all members to uphold
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Professional Conduct',
                description: 'Treat all users with respect and professionalism in all communications.'
              },
              {
                title: 'Accurate Information',
                description: 'Provide truthful information about your skills, credentials, and project details.'
              },
              {
                title: 'Timely Communication',
                description: 'Respond to messages promptly and keep all parties informed of project progress.'
              },
              {
                title: 'Quality Work',
                description: 'Deliver work that meets agreed-upon specifications and professional standards.'
              },
              {
                title: 'Confidentiality',
                description: 'Respect confidential information and intellectual property of clients and experts.'
              },
              {
                title: 'No Discrimination',
                description: 'Zero tolerance for discrimination based on race, gender, religion, or any protected class.'
              }
            ].map((item, index) => (
              <Card key={index} className="border-green-100">
                <CardContent className="p-4 flex items-start">
                  <Users className="h-5 w-5 text-green-600 mr-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Report Issues */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-8">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl text-slate-900 mb-4">Report Safety Concerns</h2>
              <p className="text-slate-600 mb-6">
                If you encounter suspicious activity, fraud, or any safety concerns, please report it immediately. 
                Our team investigates all reports within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:safety@setreg.com" className="text-green-600 hover:underline">
                  safety@setreg.com
                </a>
                <span className="hidden sm:inline text-slate-400">|</span>
                <a href="tel:+15551234567" className="text-green-600 hover:underline">
                  +1 (555) 123-4567
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
