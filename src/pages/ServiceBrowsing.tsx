import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { 
  Search, 
  Filter, 
  Grid3x3, 
  List, 
  Star,
  MapPin,
  Award,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

const experts = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    title: 'Senior Structural Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    level: 'Platinum',
    rating: 4.9,
    reviews: 47,
    hourlyRate: 150,
    location: 'San Francisco, CA',
    verified: true,
    skills: ['Structural Analysis', 'AutoCAD', 'Seismic Design'],
    completedProjects: 47,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    title: 'Civil Engineering Expert',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    level: 'Gold',
    rating: 4.8,
    reviews: 32,
    hourlyRate: 120,
    location: 'Austin, TX',
    verified: true,
    skills: ['Project Management', 'Infrastructure', 'BIM'],
    completedProjects: 32,
  },
  {
    id: 3,
    name: 'Aisha Patel',
    title: 'Environmental Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
    level: 'Platinum',
    rating: 5.0,
    reviews: 56,
    hourlyRate: 160,
    location: 'Boston, MA',
    verified: true,
    skills: ['Sustainability', 'Water Systems', 'Environmental Impact'],
    completedProjects: 56,
  },
  {
    id: 4,
    name: 'James Wong',
    title: 'Mechanical Engineering Specialist',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    level: 'Silver',
    rating: 4.7,
    reviews: 23,
    hourlyRate: 95,
    location: 'Seattle, WA',
    verified: true,
    skills: ['HVAC Design', 'Energy Efficiency', 'CAD'],
    completedProjects: 23,
  },
  {
    id: 5,
    name: 'Elena Volkov',
    title: 'Electrical Systems Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    level: 'Gold',
    rating: 4.9,
    reviews: 41,
    hourlyRate: 140,
    location: 'New York, NY',
    verified: true,
    skills: ['Power Systems', 'Automation', 'Control Systems'],
    completedProjects: 41,
  },
  {
    id: 6,
    name: 'David Kim',
    title: 'Geotechnical Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    level: 'Platinum',
    rating: 4.8,
    reviews: 38,
    hourlyRate: 155,
    location: 'Denver, CO',
    verified: true,
    skills: ['Soil Analysis', 'Foundation Design', 'Site Investigation'],
    completedProjects: 38,
  },
];

export function ServiceBrowsing() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl mb-4">Browse Engineering Services</h1>
          <p className="text-xl text-green-50 mb-6">
            Find verified experts for your next project
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search by skills, expertise, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white text-slate-900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="lg:w-80 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-slate-900">Filters</h2>
                    <Button variant="ghost" size="sm">Clear All</Button>
                  </div>

                  {/* Level Filter */}
                  <div className="space-y-3">
                    <h3 className="text-sm text-slate-900">Expert Level</h3>
                    {['Platinum', 'Gold', 'Silver', 'Bronze'].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox id={level} />
                        <label htmlFor={level} className="text-sm text-slate-600 cursor-pointer">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <h3 className="text-sm text-slate-900">Hourly Rate</h3>
                    <div className="pt-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={200}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-sm text-slate-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Verification */}
                  <div className="space-y-3">
                    <h3 className="text-sm text-slate-900">Verification</h3>
                    {['Identity Verified', 'Professional License', 'Background Check'].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox id={item} />
                        <label htmlFor={item} className="text-sm text-slate-600 cursor-pointer">
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Specialization */}
                  <div className="space-y-3">
                    <h3 className="text-sm text-slate-900">Specialization</h3>
                    {['Structural', 'Civil', 'Mechanical', 'Electrical', 'Environmental'].map((spec) => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox id={spec} />
                        <label htmlFor={spec} className="text-sm text-slate-600 cursor-pointer">
                          {spec}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <p className="text-slate-600">
                  <span className="text-slate-900">{experts.length}</span> experts found
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-slate-200 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-green-50 text-green-700' : ''}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-green-50 text-green-700' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Expert Cards */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}>
              {experts.map((expert) => (
                <Card key={expert.id} className="hover:shadow-lg transition-shadow border-green-100">
                  <CardContent className="p-6">
                    <div className={viewMode === 'list' ? 'flex gap-6' : ''}>
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-16 w-16 border-2 border-green-100">
                          <AvatarImage src={expert.avatar} />
                          <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-slate-900">{expert.name}</h3>
                            {expert.verified && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{expert.title}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              expert.level === 'Platinum' ? 'bg-yellow-500 hover:bg-yellow-600' :
                              expert.level === 'Gold' ? 'bg-amber-600 hover:bg-amber-700' :
                              'bg-slate-400 hover:bg-slate-500'
                            }>
                              <Award className="h-3 w-3 mr-1" />
                              {expert.level}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-slate-600">
                            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                            <span className="text-slate-900">{expert.rating}</span>
                            <span className="mx-1">·</span>
                            <span>{expert.reviews} reviews</span>
                          </div>
                          <div className="flex items-center text-slate-600">
                            <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                            {expert.completedProjects} projects
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-slate-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {expert.location}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {expert.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div>
                            <div className="text-2xl text-slate-900">${expert.hourlyRate}</div>
                            <div className="text-sm text-slate-500">per hour</div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => navigate(`/profile/${expert.id}`)}>
                              View Profile
                            </Button>
                            <Button className="bg-green-600 hover:bg-green-700" onClick={() => navigate(`/profile/${expert.id}`)}>
                              Hire Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}