import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Search, Book, MessageSquare, Video, FileText, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    { icon: Book, title: 'Getting Started', articles: 12 },
    { icon: MessageSquare, title: 'Using the Platform', articles: 24 },
    { icon: Video, title: 'Video Tutorials', articles: 8 },
    { icon: FileText, title: 'Billing & Payments', articles: 15 }
  ];

  const faqs = [
    {
      q: 'How do I create an account?',
      a: 'Click "Sign Up" in the top right corner, choose whether you\'re an expert or client, and fill out the registration form. You\'ll receive a verification email to activate your account.'
    },
    {
      q: 'How does the payment system work?',
      a: 'Payments are processed through Stripe and held in escrow. Clients pay upfront, and funds are released to experts upon milestone completion and approval.'
    },
    {
      q: 'How do I get verified?',
      a: 'Go to your profile and click "Verify Identity". Upload a government-issued ID and any relevant professional credentials. Verification typically takes 24-48 hours.'
    },
    {
      q: 'What are user levels?',
      a: 'User levels (Bronze, Silver, Gold, Platinum) reflect your experience and reputation on the platform. Higher levels unlock premium features and increase your visibility.'
    },
    {
      q: 'How do I report a problem?',
      a: 'You can report issues through the "Report" button on any profile or project, or contact our support team at support@setreg.com.'
    },
    {
      q: 'Can I work with international clients/experts?',
      a: 'Yes! SETReG is a global platform. Our payment system supports multiple currencies and international transactions.'
    },
    {
      q: 'How do I submit a proposal?',
      a: 'Browse projects, click on one that interests you, and click "Submit Proposal". Detail your approach, timeline, and pricing.'
    },
    {
      q: 'What fees does SETReG charge?',
      a: 'We charge a 10% platform fee on all transactions for experts. Clients pay no fees to post projects or hire experts.'
    },
    {
      q: 'How do I contact support?',
      a: 'Email support@setreg.com, call +1 (555) 123-4567, or use the contact form on our Contact Us page.'
    },
    {
      q: 'Can I cancel a project?',
      a: 'Yes, but cancellation terms depend on the project stage. Review our cancellation policy in your contract or contact support for assistance.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-6">Help Center</h1>
          <p className="text-xl text-green-50 mb-8">
            Find answers, guides, and support to help you succeed on SETReG
          </p>
          
          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-white"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-slate-900 mb-4">Browse by Category</h2>
            <p className="text-slate-600">Find helpful resources organized by topic</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <category.icon className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-slate-900 mb-2">{category.title}</h3>
                  <p className="text-sm text-slate-600">{category.articles} articles</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <Card key={index} className="border-green-100">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <div className="flex items-start flex-1">
                      <HelpCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-900">{faq.q}</span>
                    </div>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-slate-400 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 ml-4" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-slate-600 pl-8">{faq.a}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600">No results found. Try a different search term.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8">
              <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl text-slate-900 mb-4">Still Need Help?</h2>
              <p className="text-slate-600 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Contact Support
                  </Button>
                </Link>
                <a href="mailto:support@setreg.com">
                  <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
                    Email Us
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
