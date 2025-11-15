import { Card, CardContent } from '../components/ui/card';
import { FileText } from 'lucide-react';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl mb-4">Terms of Service</h1>
          <p className="text-green-50">Last updated: January 15, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-green-100">
            <CardContent className="p-8 prose prose-slate max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using SETReG ("the Platform"), you accept and agree to be bound by the terms and 
                provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Platform.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                SETReG provides an online marketplace platform that connects engineering professionals ("Experts") with 
                clients seeking engineering services ("Clients"). The Platform facilitates:
              </p>
              <ul>
                <li>Project posting and discovery</li>
                <li>Proposal submission and bidding</li>
                <li>Secure payment processing</li>
                <li>Communication and collaboration tools</li>
                <li>File sharing and project management</li>
              </ul>

              <h2>3. User Accounts</h2>
              <h3>3.1 Account Creation</h3>
              <p>
                Users must create an account to access Platform services. You agree to provide accurate, current, and 
                complete information during registration and to update such information to keep it accurate and current.
              </p>
              
              <h3>3.2 Account Security</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities 
                that occur under your account. You must notify SETReG immediately of any unauthorized use of your account.
              </p>

              <h3>3.3 Account Types</h3>
              <p>
                Users may register as Experts (service providers) or Clients (service seekers). Each account type has 
                different features and responsibilities as outlined in these Terms.
              </p>

              <h2>4. User Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Post false, misleading, or fraudulent content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Attempt to circumvent Platform fees</li>
                <li>Use automated systems to access the Platform</li>
                <li>Share your account with others</li>
              </ul>

              <h2>5. Expert Obligations</h2>
              <h3>5.1 Qualifications</h3>
              <p>
                Experts represent that they possess the necessary qualifications, licenses, and expertise to perform 
                the services they offer.
              </p>

              <h3>5.2 Service Delivery</h3>
              <p>
                Experts agree to deliver services according to agreed timelines and specifications, maintaining professional 
                standards of quality.
              </p>

              <h3>5.3 Fees</h3>
              <p>
                Experts agree to pay a 10% platform fee on all transactions processed through SETReG.
              </p>

              <h2>6. Client Obligations</h2>
              <h3>6.1 Project Descriptions</h3>
              <p>
                Clients must provide accurate, complete project descriptions and requirements.
              </p>

              <h3>6.2 Payment</h3>
              <p>
                Clients agree to pay for services as outlined in project agreements and to release funds upon 
                satisfactory milestone completion.
              </p>

              <h2>7. Payment Terms</h2>
              <h3>7.1 Payment Processing</h3>
              <p>
                All payments are processed through Stripe. By using the Platform, you agree to Stripe's terms of service.
              </p>

              <h3>7.2 Escrow System</h3>
              <p>
                Funds are held in escrow until project milestones are completed and approved. SETReG is not liable for 
                funds held in escrow.
              </p>

              <h3>7.3 Refunds</h3>
              <p>
                Refund requests are handled on a case-by-case basis according to our Refund Policy. Disputes may be 
                subject to mediation.
              </p>

              <h2>8. Intellectual Property</h2>
              <h3>8.1 Platform Content</h3>
              <p>
                All content on the Platform, including text, graphics, logos, and software, is the property of SETReG 
                and protected by copyright and trademark laws.
              </p>

              <h3>8.2 User Content</h3>
              <p>
                Users retain ownership of content they submit but grant SETReG a license to use, display, and distribute 
                such content for Platform operations.
              </p>

              <h3>8.3 Project Deliverables</h3>
              <p>
                Intellectual property rights for project deliverables are determined by individual project agreements 
                between Experts and Clients.
              </p>

              <h2>9. Privacy</h2>
              <p>
                Your use of the Platform is also governed by our Privacy Policy, which is incorporated into these Terms 
                by reference.
              </p>

              <h2>10. Dispute Resolution</h2>
              <h3>10.1 Mediation</h3>
              <p>
                SETReG offers mediation services for disputes between users. Participation in mediation is voluntary.
              </p>

              <h3>10.2 Arbitration</h3>
              <p>
                Any disputes not resolved through mediation shall be resolved through binding arbitration in accordance 
                with the rules of the American Arbitration Association.
              </p>

              <h2>11. Limitation of Liability</h2>
              <p>
                SETReG is a marketplace platform and is not party to agreements between Experts and Clients. We are not 
                liable for:
              </p>
              <ul>
                <li>Quality of services provided by Experts</li>
                <li>Actions or omissions of users</li>
                <li>Loss of data or business interruption</li>
                <li>Indirect, incidental, or consequential damages</li>
              </ul>

              <h2>12. Termination</h2>
              <p>
                SETReG reserves the right to suspend or terminate accounts that violate these Terms of Service. Users may 
                also terminate their accounts at any time, subject to completion of ongoing projects.
              </p>

              <h2>13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Users will be notified of significant changes, and 
                continued use of the Platform constitutes acceptance of modified Terms.
              </p>

              <h2>14. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of California, United States, without regard to conflict 
                of law provisions.
              </p>

              <h2>15. Contact Information</h2>
              <p>
                For questions about these Terms, contact us at:
              </p>
              <p>
                Email: legal@setreg.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Innovation Drive, San Francisco, CA 94105
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
