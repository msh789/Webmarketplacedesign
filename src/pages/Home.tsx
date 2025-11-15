import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  Star,
  TrendingUp,
  Award,
  Globe
} from 'lucide-react';
import { AuthConfigBanner } from '../components/AuthConfigBanner';

export function Home() {
  return (
    <div className="bg-white">
      <AuthConfigBanner />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl mb-6">
                Connect with Top Engineering Talent
              </h1>
              <p className="text-xl text-green-50 mb-8">
                SETReG bridges the gap between innovative engineering projects and world-class experts. 
                Build sustainable solutions with verified professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 w-full sm:w-auto">
                    Join as Expert
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/browse-projects">
                  <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto">
                    Browse Projects
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl">10K+</div>
                  <div className="text-green-100 text-sm">Experts</div>
                </div>
                <div>
                  <div className="text-3xl">5K+</div>
                  <div className="text-green-100 text-sm">Projects</div>
                </div>
                <div>
                  <div className="text-3xl">98%</div>
                  <div className="text-green-100 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  {[
                    'Verified Engineering Professionals',
                    'AI-Powered Project Matching',
                    'Secure Payment Processing',
                    'Real-time Collaboration Tools',
                    'Legal Contract Support'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to connect with the perfect engineering talent or find your next project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Create Your Profile',
                description: 'Sign up and build your professional profile with verification badges and credentials',
                step: '01'
              },
              {
                icon: Zap,
                title: 'Post or Browse',
                description: 'Post projects or browse opportunities matched to your expertise with AI-powered recommendations',
                step: '02'
              },
              {
                icon: Shield,
                title: 'Collaborate Securely',
                description: 'Work together with secure contracts, payments, and real-time communication tools',
                step: '03'
              }
            ].map((item, index) => (
              <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <item.icon className="h-8 w-8 text-green-700" />
                  </div>
                  <div className="text-green-600 mb-2">Step {item.step}</div>
                  <h3 className="text-slate-900 text-xl mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-slate-900 mb-4">Why Choose SETReG</h2>
            <p className="text-xl text-slate-600">
              Built for engineers, by engineers. Trust, transparency, and innovation at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Verified Experts',
                description: 'All professionals undergo thorough verification and identity vetting'
              },
              {
                icon: Shield,
                title: 'Secure Payments',
                description: 'Stripe-powered escrow system protects both clients and experts'
              },
              {
                icon: TrendingUp,
                title: 'Growth Focused',
                description: 'Level-based system rewards excellence and builds reputation'
              },
              {
                icon: Globe,
                title: 'Global Network',
                description: 'Connect with engineering talent from around the world'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-slate-900 mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-slate-600">
              See what our community has to say about SETReG
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Chen',
                role: 'Structural Engineer',
                badge: 'Platinum',
                rating: 5,
                comment: 'SETReG has transformed how I find projects. The verification system builds trust, and the platform makes collaboration seamless.'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Project Manager',
                badge: 'Gold',
                rating: 5,
                comment: 'Found the perfect civil engineering expert for our sustainable infrastructure project. The quality of talent here is outstanding.'
              },
              {
                name: 'Aisha Patel',
                role: 'Environmental Engineer',
                badge: 'Platinum',
                rating: 5,
                comment: 'The green theme reflects what we all care about - sustainable solutions. Great platform for meaningful engineering work.'
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-500">{testimonial.role}</div>
                    </div>
                    <div className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      {testimonial.badge}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-50 mb-8">
            Join thousands of engineering professionals building sustainable solutions worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}