import { Card, CardContent } from '../components/ui/card';
import { Shield } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl mb-4">Privacy Policy</h1>
          <p className="text-green-50">Last updated: January 15, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-green-100">
            <CardContent className="p-8 prose prose-slate max-w-none">
              <h2>1. Introduction</h2>
              <p>
                SETReG ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we 
                collect, use, disclose, and safeguard your information when you use our Platform.
              </p>

              <h2>2. Information We Collect</h2>
              
              <h3>2.1 Information You Provide</h3>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, password, phone number</li>
                <li><strong>Profile Information:</strong> Professional credentials, education, work history, skills, portfolio</li>
                <li><strong>Project Information:</strong> Project descriptions, proposals, bids, contracts</li>
                <li><strong>Payment Information:</strong> Processed securely through Stripe (we do not store credit card details)</li>
                <li><strong>Communications:</strong> Messages, support tickets, feedback</li>
                <li><strong>Verification Documents:</strong> Government-issued ID, professional certifications</li>
              </ul>

              <h3>2.2 Information Automatically Collected</h3>
              <ul>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on Platform</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li><strong>Cookies:</strong> Session data, preferences, analytics (see Cookie Policy)</li>
                <li><strong>Log Data:</strong> Access times, error logs, performance metrics</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul>
                <li>Provide and maintain Platform services</li>
                <li>Process transactions and payments</li>
                <li>Verify user identities and credentials</li>
                <li>Match Experts with relevant projects</li>
                <li>Facilitate communication between users</li>
                <li>Send service updates and notifications</li>
                <li>Improve Platform functionality and user experience</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
                <li>Provide customer support</li>
                <li>Send marketing communications (with consent)</li>
              </ul>

              <h2>4. Information Sharing</h2>
              
              <h3>4.1 With Other Users</h3>
              <p>
                Profile information is visible to other users as necessary for Platform functionality. You control what 
                information is displayed in your public profile.
              </p>

              <h3>4.2 With Service Providers</h3>
              <p>We share information with third-party service providers who assist with:</p>
              <ul>
                <li>Payment processing (Stripe)</li>
                <li>Email delivery</li>
                <li>Analytics and performance monitoring</li>
                <li>Customer support tools</li>
                <li>Identity verification services</li>
              </ul>

              <h3>4.3 For Legal Reasons</h3>
              <p>We may disclose information when required by law or to:</p>
              <ul>
                <li>Comply with legal process</li>
                <li>Protect rights, property, or safety</li>
                <li>Prevent fraud or abuse</li>
                <li>Respond to government requests</li>
              </ul>

              <h3>4.4 Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, user information may be transferred to the 
                acquiring entity.
              </p>

              <h2>5. Data Security</h2>
              <p>We implement security measures to protect your information:</p>
              <ul>
                <li>SSL/TLS encryption for data transmission</li>
                <li>Encrypted data storage</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
              <p>
                However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                We retain your information for as long as your account is active or as needed to provide services. 
                After account closure, we may retain certain information for:
              </p>
              <ul>
                <li>Legal compliance</li>
                <li>Fraud prevention</li>
                <li>Dispute resolution</li>
                <li>Enforcing agreements</li>
              </ul>

              <h2>7. Your Rights</h2>
              
              <h3>7.1 Access and Portability</h3>
              <p>You have the right to access and download your personal data.</p>

              <h3>7.2 Correction</h3>
              <p>You can update or correct your information through your account settings.</p>

              <h3>7.3 Deletion</h3>
              <p>
                You can request deletion of your account and data, subject to legal retention requirements and 
                completion of active projects.
              </p>

              <h3>7.4 Opt-Out</h3>
              <p>You can opt out of marketing communications while continuing to receive service-related messages.</p>

              <h3>7.5 Do Not Track</h3>
              <p>We do not currently respond to Do Not Track signals.</p>

              <h2>8. Cookies and Tracking</h2>
              <p>We use cookies and similar technologies for:</p>
              <ul>
                <li>Authentication and security</li>
                <li>Preferences and settings</li>
                <li>Analytics and performance</li>
                <li>Advertising and marketing</li>
              </ul>
              <p>You can control cookie preferences through your browser settings.</p>

              <h2>9. Third-Party Links</h2>
              <p>
                Our Platform may contain links to third-party websites. We are not responsible for the privacy practices 
                of these external sites.
              </p>

              <h2>10. Children's Privacy</h2>
              <p>
                SETReG is not intended for users under 18 years of age. We do not knowingly collect information from 
                children. If we become aware of such collection, we will delete the information immediately.
              </p>

              <h2>11. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure 
                appropriate safeguards are in place for such transfers.
              </p>

              <h2>12. California Privacy Rights</h2>
              <p>
                California residents have additional rights under CCPA, including the right to know what personal 
                information is collected and the right to opt-out of sale of personal information. We do not sell 
                personal information.
              </p>

              <h2>13. GDPR Compliance</h2>
              <p>
                For European users, we comply with GDPR requirements, including lawful basis for processing, data 
                minimization, and enhanced user rights.
              </p>

              <h2>14. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant changes via email or 
                Platform notification. Continued use after changes constitutes acceptance.
              </p>

              <h2>15. Contact Us</h2>
              <p>For privacy-related questions or to exercise your rights, contact:</p>
              <p>
                <strong>Privacy Team</strong><br />
                Email: privacy@setreg.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Innovation Drive, San Francisco, CA 94105<br />
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
