import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  FileText
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const mockProjects = [
  {
    id: 1,
    title: 'Commercial Building Structural Analysis',
    description: 'Need comprehensive structural analysis for a 12-story commercial building in downtown. Must include seismic analysis and code compliance review. Project requires PE license.',
    budget: { min: 15000, max: 25000 },
    timeframe: '2-3 months',
    client: {
      name: 'John Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      rating: 4.8,
      projects: 12,
      verified: true
    },
    location: 'San Francisco, CA',
    category: 'Structural Engineering',
    skills: ['Structural Analysis', 'Seismic Design', 'AutoCAD', 'ETABS'],
    postedDate: '2 days ago',
    bids: 8,
    status: 'Open'
  },
  {
    id: 2,
    title: 'Bridge Design and Inspection',
    description: 'Looking for experienced bridge engineer to design and inspect a 200-meter pedestrian bridge. Project includes 3D modeling and construction documentation.',
    budget: { min: 30000, max: 45000 },
    timeframe: '4-6 months',
    client: {
      name: 'Emily Thompson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      rating: 4.9,
      projects: 23,
      verified: true
    },
    location: 'Austin, TX',
    category: 'Bridge Engineering',
    skills: ['Bridge Design', 'SAP2000', 'Civil 3D', 'Structural Health Monitoring'],
    postedDate: '5 hours ago',
    bids: 3,
    status: 'Open'
  },
  {
    id: 3,
    title: 'Residential Complex Foundation Design',
    description: 'Foundation design for 50-unit residential complex on challenging soil conditions. Soil reports available. Need geotechnical analysis included.',
    budget: { min: 8000, max: 12000 },
    timeframe: '1-2 months',
    client: {
      name: 'Michael Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      rating: 4.6,
      projects: 8,
      verified: true
    },
    location: 'Seattle, WA',
    category: 'Geotechnical Engineering',
    skills: ['Foundation Design', 'Geotechnical Analysis', 'Soil Mechanics'],
    postedDate: '1 day ago',
    bids: 12,
    status: 'Open'
  },
  {
    id: 4,
    title: 'Industrial Facility Structural Retrofit',
    description: 'Structural assessment and retrofit design for 40-year-old industrial facility. Must comply with current building codes and include sustainability recommendations.',
    budget: { min: 20000, max: 35000 },
    timeframe: '3-4 months',
    client: {
      name: 'Sarah Williams',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      rating: 4.7,
      projects: 15,
      verified: true
    },
    location: 'Chicago, IL',
    category: 'Structural Engineering',
    skills: ['Structural Assessment', 'Retrofit Design', 'LEED', 'Building Codes'],
    postedDate: '3 days ago',
    bids: 6,
    status: 'Open'
  },
  {
    id: 5,
    title: 'Highway Overpass Structural Design',
    description: 'Complete structural design for highway overpass including traffic analysis, drainage design, and construction phasing plan.',
    budget: { min: 50000, max: 75000 },
    timeframe: '6-8 months',
    client: {
      name: 'David Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      rating: 5.0,
      projects: 31,
      verified: true
    },
    location: 'Los Angeles, CA',
    category: 'Infrastructure',
    skills: ['Bridge Design', 'Highway Engineering', 'Traffic Engineering', 'Construction Management'],
    postedDate: '1 week ago',
    bids: 15,
    status: 'Open'
  },
  {
    id: 6,
    title: 'University Campus Building Renovation',
    description: 'Structural engineering services for historic building renovation on university campus. Must preserve architectural features while meeting modern codes.',
    budget: { min: 18000, max: 28000 },
    timeframe: '3-5 months',
    client: {
      name: 'Lisa Anderson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      rating: 4.8,
      projects: 19,
      verified: true
    },
    location: 'Boston, MA',
    category: 'Historic Preservation',
    skills: ['Historic Preservation', 'Structural Engineering', 'Building Codes', 'Revit'],
    postedDate: '4 days ago',
    bids: 9,
    status: 'Open'
  }
];

export function BrowseProjects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [budgetRange, setBudgetRange] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [appliedProjects, setAppliedProjects] = useState<number[]>([]);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    proposedBudget: '',
    estimatedDuration: '',
    availability: '',
    termsAccepted: false,
    nda: false
  });

  const handleBidClick = (projectId: number) => {
    toast.success('Opening bid submission form...');
    // In real app, this would open a modal or navigate to bid form
  };

  const handleApplyClick = (projectId: number) => {
    setSelectedProject(projectId);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = () => {
    if (!applicationData.termsAccepted || !applicationData.nda) {
      toast.error('Please accept all terms and conditions');
      return;
    }

    if (!applicationData.coverLetter || !applicationData.proposedBudget || !applicationData.estimatedDuration) {
      toast.error('Please fill in all required fields');
      return;
    }

    setAppliedProjects([...appliedProjects, selectedProject!]);
    setShowApplicationModal(false);
    toast.success('Application submitted successfully!');
    
    // Reset form
    setApplicationData({
      coverLetter: '',
      proposedBudget: '',
      estimatedDuration: '',
      availability: '',
      termsAccepted: false,
      nda: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-slate-900 mb-2">Browse Projects</h1>
          <p className="text-xl text-slate-600">
            Find and bid on engineering projects that match your expertise
          </p>
        </div>

        {/* Filters */}
        <Card className="border-green-100 mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="structural">Structural Engineering</SelectItem>
                  <SelectItem value="bridge">Bridge Engineering</SelectItem>
                  <SelectItem value="geotechnical">Geotechnical</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="historic">Historic Preservation</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="budget-high">Highest Budget</SelectItem>
                  <SelectItem value="budget-low">Lowest Budget</SelectItem>
                  <SelectItem value="bids">Least Bids</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-green-100">
            <CardContent className="p-6 text-center">
              <Briefcase className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl text-slate-900 mb-1">{mockProjects.length}</div>
              <div className="text-sm text-slate-600">Open Projects</div>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl text-slate-900 mb-1">$1.2M+</div>
              <div className="text-sm text-slate-600">Total Value</div>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl text-slate-900 mb-1">53</div>
              <div className="text-sm text-slate-600">Total Bids</div>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl text-slate-900 mb-1">4</div>
              <div className="text-sm text-slate-600">New Today</div>
            </CardContent>
          </Card>
        </div>

        {/* Project Listings */}
        <div className="space-y-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <Badge className="bg-green-600 hover:bg-green-700">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.postedDate}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {project.bids} bids
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {project.location}
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-green-600 mb-1">
                      ${project.budget.min.toLocaleString()} - ${project.budget.max.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-500">Budget</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">{project.description}</p>

                {/* Required Skills */}
                <div className="mb-4">
                  <h4 className="text-sm text-slate-900 mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-green-200 text-green-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Client Info & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={project.client.avatar} />
                      <AvatarFallback>{project.client.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-slate-900">{project.client.name}</h4>
                        {project.client.verified && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                          {project.client.rating}
                        </div>
                        <div>{project.client.projects} projects</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right mr-3">
                      <div className="flex items-center text-sm text-slate-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {project.timeframe}
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => handleBidClick(project.id)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Submit Bid
                    </Button>
                    {appliedProjects.includes(project.id) ? (
                      <Button 
                        className="bg-slate-500 hover:bg-slate-600"
                        disabled
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Applied
                      </Button>
                    ) : (
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApplyClick(project.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Projects
          </Button>
        </div>
      </div>

      {/* Application Modal */}
      <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Apply for Project</DialogTitle>
            <DialogDescription>
              Fill out the form below to apply for the project.
            </DialogDescription>
          </DialogHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              value={applicationData.coverLetter}
              onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
              placeholder="Write a cover letter explaining why you are a good fit for this project..."
              className="resize-none"
            />

            <Label htmlFor="proposedBudget">Proposed Budget</Label>
            <Input
              id="proposedBudget"
              value={applicationData.proposedBudget}
              onChange={(e) => setApplicationData({ ...applicationData, proposedBudget: e.target.value })}
              placeholder="Enter your proposed budget..."
            />

            <Label htmlFor="estimatedDuration">Estimated Duration</Label>
            <Input
              id="estimatedDuration"
              value={applicationData.estimatedDuration}
              onChange={(e) => setApplicationData({ ...applicationData, estimatedDuration: e.target.value })}
              placeholder="Enter your estimated duration..."
            />

            <Label htmlFor="availability">Availability</Label>
            <Input
              id="availability"
              value={applicationData.availability}
              onChange={(e) => setApplicationData({ ...applicationData, availability: e.target.value })}
              placeholder="Enter your availability..."
            />

            <div className="flex items-center gap-2">
              <Checkbox
                id="termsAccepted"
                checked={applicationData.termsAccepted}
                onCheckedChange={(checked) => setApplicationData({ ...applicationData, termsAccepted: checked })}
              />
              <Label htmlFor="termsAccepted">I accept the terms and conditions</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="nda"
                checked={applicationData.nda}
                onCheckedChange={(checked) => setApplicationData({ ...applicationData, nda: checked })}
              />
              <Label htmlFor="nda">I agree to the NDA</Label>
            </div>
          </CardContent>
          <DialogFooter>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSubmitApplication}
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}