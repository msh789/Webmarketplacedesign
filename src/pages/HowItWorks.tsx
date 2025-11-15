import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  UserPlus, 
  Search, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  DollarSign,
  Shield,
  Star,
  ArrowRight
} from 'lucide-react';

export function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-6">How SETReG Works</h1>
          <p className="text-xl text-green-50 max-w-3xl mx-auto">
            A simple, secure platform connecting engineering talent with meaningful projects. 
            Whether you're an expert or a client, getting started is easy.
          </p>
        </div>
      </section>

      {/* For Experts */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-slate-900 mb-4">For Engineering Experts</h2>
            <p className="text-xl text-slate-600">
              Find projects that match your expertise and grow your career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: UserPlus,
                title: 'Create Your Profile',
                description: 'Sign up and build a comprehensive profile showcasing your engineering expertise, certifications, and past projects.',
                details: [
                  'Upload credentials and certifications',
                  'Add portfolio and case studies',
                  'Get verified identity badge',
                  'Choose your specializations'
                ]
              },
              {
                step: '02',
                icon: Search,
                title: 'Browse Projects',
                description: 'Explore opportunities matched to your skills using our AI-powered recommendation system.',
                details: [
                  'Filter by expertise area',
                  'View project details and budgets',
                  'See client ratings and history',
                  'Get personalized recommendations'
                ]
              },
              {
                step: '03',
                icon: FileText,
                title: 'Submit Proposals',
                description: 'Send detailed proposals outlining your approach, timeline, and pricing for projects that interest you.',
                details: [
                  'Craft compelling proposals',
                  'Set your own rates',
                  'Attach relevant samples',
                  'Communicate your value'
                ]
              }
            ].map((item, index) => (
              <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-green-600 text-white text-2xl w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    {item.step}
                  </div>
                  <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-7 w-7 text-green-700" />
                  </div>
                  <h3 className="text-slate-900 text-xl mb-3">{item.title}</h3>
                  <p className="text-slate-600 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[
              {
                step: '04',
                icon: MessageSquare,
                title: 'Communicate & Collaborate',
                description: 'Use our built-in messaging and file-sharing tools to work seamlessly with clients.',
                details: [
                  'Real-time messaging',
                  'Secure file sharing',
                  'Video call integration',
                  'Project milestone tracking'
                ]
              },
              {
                step: '05',
                icon: Shield,
                title: 'Work Securely',
                description: 'All projects are backed by secure contracts and our payment protection system.',
                details: [
                  'Legally binding contracts',
                  'Escrow payment protection',
                  'Milestone-based payments',
                  'Dispute resolution support'
                ]
              },
              {
                step: '06',
                icon: Star,
                title: 'Build Your Reputation',
                description: 'Receive reviews, level up your profile, and access premium opportunities.',
                details: [
                  'Earn client reviews',
                  'Advance through user levels',
                  'Unlock higher-paying projects',
                  'Become a Platinum expert'
                ]
              }
            ].map((item, index) => (
              <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-green-600 text-white text-2xl w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    {item.step}
                  </div>
                  <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-7 w-7 text-green-700" />
                  </div>
                  <h3 className="text-slate-900 text-xl mb-3">{item.title}</h3>
                  <p className="text-slate-600 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Join as Expert
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Clients */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-slate-900 mb-4">For Clients</h2>
            <p className="text-xl text-slate-600">
              Find the perfect engineering talent for your project
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: FileText,
                title: 'Post Your Project',
                description: 'Describe your engineering needs, requirements, budget, and timeline.'
              },
              {
                step: '02',
                icon: Search,
                title: 'Review Proposals',
                description: 'Receive bids from qualified experts. Review profiles, ratings, and portfolios.'
              },
              {
                step: '03',
                icon: CheckCircle,
                title: 'Hire & Collaborate',
                description: 'Select the best expert, finalize contracts, and work together using our tools.'
              },
              {
                step: '04',
                icon: DollarSign,
                title: 'Pay Securely',
                description: 'Make milestone-based payments through our secure escrow system.'
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <div className="bg-green-600 text-white text-xl w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/post-project">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Post a Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-50 mb-8">
            Join thousands of engineering professionals building sustainable solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                Create Free Account
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
