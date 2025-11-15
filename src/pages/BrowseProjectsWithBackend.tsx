import { useState, useEffect } from 'react';
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
  FileText,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { backendAPI } from '../lib/backend-api';
import { useAuth } from '../contexts/AuthContext';

export function BrowseProjectsWithBackend() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  
  // Bid dialog state
  const [bidDialogOpen, setBidDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidDuration, setBidDuration] = useState('');
  const [bidCoverLetter, setBidCoverLetter] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [submittingBid, setSubmittingBid] = useState(false);

  // Fetch projects from backend
  useEffect(() => {
    fetchProjects();
  }, [categoryFilter, searchTerm]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const result = await backendAPI.projects.getAll({
        status: 'open',
        category: categoryFilter !== 'all' ? categoryFilter : undefined,
        search: searchTerm || undefined,
      });

      setProjects(result.data || []);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleBidClick = (project: any) => {
    if (!user) {
      toast.error('Please sign in to submit a bid');
      navigate('/login');
      return;
    }

    setSelectedProject(project);
    setBidDialogOpen(true);
    setBidAmount('');
    setBidDuration('');
    setBidCoverLetter('');
    setTermsAccepted(false);
    setNdaAccepted(false);
  };

  const handleSubmitBid = async () => {
    if (!selectedProject || !user) return;

    // Validation
    if (!bidAmount || !bidDuration || !bidCoverLetter) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    try {
      setSubmittingBid(true);

      await backendAPI.bids.create({
        project_id: selectedProject.id,
        proposed_budget: parseFloat(bidAmount),
        estimated_duration: bidDuration,
        cover_letter: bidCoverLetter,
        terms_accepted: termsAccepted,
        nda_accepted: ndaAccepted,
        availability: 'Available to start immediately',
      });

      toast.success('Bid submitted successfully!');
      setBidDialogOpen(false);
      
      // Track analytics
      await backendAPI.analytics.trackEvent('bid_submitted', {
        project_id: selectedProject.id,
        amount: parseFloat(bidAmount),
      });

    } catch (error: any) {
      console.error('Error submitting bid:', error);
      toast.error(error.message || 'Failed to submit bid');
    } finally {
      setSubmittingBid(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-slate-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl mb-4">Browse Projects</h1>
          <p className="text-green-100 max-w-2xl">
            Discover exciting engineering projects from verified clients. Submit proposals and grow your career.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search projects by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchProjects()}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="structural">Structural Engineering</SelectItem>
                  <SelectItem value="bridge">Bridge Engineering</SelectItem>
                  <SelectItem value="geotechnical">Geotechnical</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                </SelectContent>
              </Select>

              {/* Budget Filter */}
              <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="0-10000">Under $10K</SelectItem>
                  <SelectItem value="10000-25000">$10K - $25K</SelectItem>
                  <SelectItem value="25000-50000">$25K - $50K</SelectItem>
                  <SelectItem value="50000+">$50K+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Additional Filters Row */}
            <div className="mt-4 flex items-center gap-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={fetchProjects} className="bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-slate-600">
              <span className="font-semibold text-slate-900">{projects.length}</span> projects found
            </p>
          </div>
          <Select defaultValue="recent">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="budget-high">Highest Budget</SelectItem>
              <SelectItem value="budget-low">Lowest Budget</SelectItem>
              <SelectItem value="bids">Most Bids</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Project Cards */}
        {projects.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects found</h3>
            <p className="text-slate-600">Try adjusting your filters or search terms</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Project Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={project.client?.avatar_url} />
                          <AvatarFallback className="bg-green-100 text-green-700">
                            {getInitials(project.client?.full_name || 'Unknown')}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-slate-900 mb-1">
                                {project.title}
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-slate-600">
                                <span className="flex items-center gap-1">
                                  <Users className="h-3.5 w-3.5" />
                                  {project.client?.full_name || 'Unknown Client'}
                                </span>
                                {project.client?.is_verified && (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                                <span className="flex items-center gap-1">
                                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                  {project.client?.rating?.toFixed(1) || '0.0'}
                                </span>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Project Description */}
                      <p className="text-slate-700 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Project Details */}
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-slate-900">
                            ${project.budget_min?.toLocaleString()} - ${project.budget_max?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Clock className="h-4 w-4" />
                          {project.estimated_duration || 'Not specified'}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin className="h-4 w-4" />
                          {project.location || 'Remote'}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Calendar className="h-4 w-4" />
                          {new Date(project.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Skills/Category */}
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="h-4 w-4 text-slate-400" />
                        <Badge variant="outline">{project.category}</Badge>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-slate-600">
                          <TrendingUp className="inline h-4 w-4 mr-1" />
                          {project.views_count || 0} views
                        </div>
                        <Button 
                          onClick={() => handleBidClick(project)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Submit Proposal
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bid Submission Dialog */}
      <Dialog open={bidDialogOpen} onOpenChange={setBidDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Your Proposal</DialogTitle>
            <DialogDescription>
              Submit a competitive proposal for: <strong>{selectedProject?.title}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Budget Range Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <p className="text-blue-900">
                <strong>Client's Budget:</strong> ${selectedProject?.budget_min?.toLocaleString()} - ${selectedProject?.budget_max?.toLocaleString()}
              </p>
            </div>

            {/* Bid Amount */}
            <div>
              <Label htmlFor="bidAmount">Your Proposed Budget *</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="bidAmount"
                  type="number"
                  placeholder="Enter your budget"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <Label htmlFor="bidDuration">Estimated Duration *</Label>
              <Input
                id="bidDuration"
                placeholder="e.g., 2 weeks, 1 month"
                value={bidDuration}
                onChange={(e) => setBidDuration(e.target.value)}
                className="mt-1.5"
              />
            </div>

            {/* Cover Letter */}
            <div>
              <Label htmlFor="coverLetter">Cover Letter *</Label>
              <Textarea
                id="coverLetter"
                placeholder="Describe your experience, approach, and why you're the best fit for this project..."
                value={bidCoverLetter}
                onChange={(e) => setBidCoverLetter(e.target.value)}
                rows={6}
                className="mt-1.5"
              />
              <p className="text-xs text-slate-500 mt-1">
                {bidCoverLetter.length} / 2000 characters
              </p>
            </div>

            {/* Terms */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I accept the <a href="/terms" className="text-green-600 hover:underline">Terms & Conditions</a> and understand the platform fee structure
                </Label>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="nda"
                  checked={ndaAccepted}
                  onCheckedChange={(checked) => setNdaAccepted(checked as boolean)}
                />
                <Label htmlFor="nda" className="text-sm leading-relaxed cursor-pointer">
                  I agree to sign an NDA if required by the client
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBidDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitBid} 
              disabled={submittingBid}
              className="bg-green-600 hover:bg-green-700"
            >
              {submittingBid ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Proposal'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
