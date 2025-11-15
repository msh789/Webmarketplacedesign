import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Progress } from '../components/ui/progress';
import { 
  Star, 
  Award, 
  CheckCircle, 
  MapPin, 
  Briefcase,
  GraduationCap,
  Calendar,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Users,
  Clock,
  ThumbsUp
} from 'lucide-react';

// Mock expert data - in real app this would come from route params
const expertData = {
  id: 1,
  name: 'Dr. Sarah Chen',
  title: 'Senior Structural Engineer',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  level: 'Platinum',
  rating: 4.9,
  reviews: 47,
  hourlyRate: 150,
  completedProjects: 47,
  responseTime: '2 hours',
  location: 'San Francisco, CA',
  memberSince: '2020',
  totalEarnings: '$125,000+',
  description: 'Experienced structural engineer with 15+ years in large-scale infrastructure projects. Specialized in seismic design, bridge engineering, and sustainable building practices. Licensed PE in California and Nevada. Led multiple award-winning projects including the Green Valley Bridge and EcoTower residential complex.',
  specialties: [
    'Seismic Design & Analysis',
    'Bridge Engineering',
    'Sustainable Construction',
    'Infrastructure Planning',
    'Structural Health Monitoring',
    'BIM & 3D Modeling'
  ],
  skills: [
    { name: 'AutoCAD', level: 98 },
    { name: 'SAP2000', level: 95 },
    { name: 'ETABS', level: 92 },
    { name: 'Revit', level: 90 },
    { name: 'Python', level: 85 },
    { name: 'STAAD.Pro', level: 88 }
  ],
  education: [
    {
      degree: 'Ph.D. in Structural Engineering',
      school: 'Stanford University',
      year: '2008'
    },
    {
      degree: 'M.S. in Civil Engineering',
      school: 'UC Berkeley',
      year: '2004'
    }
  ],
  certifications: [
    'Professional Engineer (PE) - California',
    'LEED AP BD+C',
    'Structural Engineering Certification - NCEES'
  ],
  recentReviews: [
    {
      id: 1,
      client: 'John Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      rating: 5,
      date: '2 weeks ago',
      project: 'Bridge Structural Analysis',
      comment: 'Outstanding work! Sarah delivered comprehensive structural analysis ahead of schedule. Her expertise in seismic design was invaluable for our project. Highly recommended!'
    },
    {
      id: 2,
      client: 'Emily Thompson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      rating: 5,
      date: '1 month ago',
      project: 'Commercial Building Design',
      comment: 'Exceptional professional. Sarah\'s attention to detail and deep knowledge of building codes ensured our project met all requirements. Communication was excellent throughout.'
    },
    {
      id: 3,
      client: 'Michael Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      rating: 4.8,
      date: '2 months ago',
      project: 'Residential Complex Assessment',
      comment: 'Very knowledgeable and thorough. Provided detailed reports and was always available for questions. Would definitely work with her again.'
    }
  ],
  portfolio: [
    {
      title: 'Green Valley Bridge',
      description: 'Seismic-resistant bridge design for major highway',
      image: 'https://images.unsplash.com/photo-1545216865-3a8c1abb3828?w=400'
    },
    {
      title: 'EcoTower Complex',
      description: 'Sustainable high-rise residential building',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'
    },
    {
      title: 'City Transit Hub',
      description: 'Structural design for modern transit facility',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'
    }
  ]
};

export function ExpertProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <Card className="border-green-100 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex-shrink-0">
                <Avatar className="h-32 w-32 border-4 border-green-100">
                  <AvatarImage src={expertData.avatar} />
                  <AvatarFallback>
                    {expertData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl text-slate-900">{expertData.name}</h1>
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-xl text-slate-600 mb-3">{expertData.title}</p>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      <Award className="h-4 w-4 mr-1" />
                      {expertData.level} Level
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl text-green-600">${expertData.hourlyRate}</div>
                    <div className="text-sm text-slate-500">per hour</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-slate-700">
                    <Star className="h-5 w-5 mr-1 text-yellow-500 fill-yellow-500" />
                    <span className="text-slate-900">{expertData.rating}</span>
                    <span className="text-slate-500 ml-1">({expertData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="h-5 w-5 mr-1" />
                    {expertData.location}
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Calendar className="h-5 w-5 mr-1" />
                    Member since {expertData.memberSince}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    size="lg"
                    onClick={() => navigate('/checkout')}
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    Hire Now
                  </Button>
                  <Button variant="outline" size="lg">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-green-100">
            <CardContent className="p-6 text-center">
              <Briefcase className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl text-slate-900 mb-1">{expertData.completedProjects}</div>
              <div className="text-sm text-slate-600">Projects Completed</div>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl text-slate-900 mb-1">{expertData.responseTime}</div>
              <div className="text-sm text-slate-600">Avg Response Time</div>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl text-slate-900 mb-1">{expertData.totalEarnings}</div>
              <div className="text-sm text-slate-600">Total Earned</div>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardContent className="p-6 text-center">
              <ThumbsUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl text-slate-900 mb-1">98%</div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            className={activeTab === 'overview' ? 'bg-green-600 hover:bg-green-700' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'portfolio' ? 'default' : 'outline'}
            className={activeTab === 'portfolio' ? 'bg-green-600 hover:bg-green-700' : ''}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </Button>
          <Button
            variant={activeTab === 'reviews' ? 'default' : 'outline'}
            className={activeTab === 'reviews' ? 'bg-green-600 hover:bg-green-700' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({expertData.reviews})
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* About */}
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed">{expertData.description}</p>
                  </CardContent>
                </Card>

                {/* Specialties */}
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle>Specialties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {expertData.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle>Technical Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {expertData.skills.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="text-slate-700">{skill.name}</span>
                            <span className="text-slate-500">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'portfolio' && (
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Featured Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {expertData.portfolio.map((project, index) => (
                      <Card key={index} className="overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                        <CardContent className="p-4">
                          <h3 className="text-slate-900 mb-1">{project.title}</h3>
                          <p className="text-sm text-slate-600">{project.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {expertData.recentReviews.map((review) => (
                  <Card key={review.id} className="border-green-100">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.client[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="text-slate-900">{review.client}</h4>
                              <p className="text-sm text-slate-500">{review.date}</p>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="text-slate-900">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-green-600 mb-2">{review.project}</p>
                          <p className="text-slate-700">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expertData.education.map((edu, index) => (
                  <div key={index}>
                    <h4 className="text-slate-900">{edu.degree}</h4>
                    <p className="text-sm text-slate-600">{edu.school}</p>
                    <p className="text-sm text-slate-500">{edu.year}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-green-600" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {expertData.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 mx-auto mb-3 text-green-600" />
                <h3 className="text-slate-900 mb-2">Ready to get started?</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Hire {expertData.name.split(' ')[1]} for your next project
                </p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
