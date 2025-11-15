import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { 
  FileText, 
  DollarSign, 
  Clock,
  Star,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const bids = [
  {
    id: 1,
    project: 'Commercial Building Structural Analysis',
    expert: 'Dr. Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 4.9,
    reviews: 47,
    amount: 4800,
    duration: '3 weeks',
    status: 'pending',
    proposal: 'Experienced in large-scale commercial projects. Will deliver comprehensive structural analysis including seismic evaluation.',
    submittedDate: '2025-11-10',
  },
  {
    id: 2,
    project: 'Commercial Building Structural Analysis',
    expert: 'Michael Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    rating: 4.8,
    reviews: 32,
    amount: 5200,
    duration: '4 weeks',
    status: 'pending',
    proposal: 'Specialized in commercial structures with 12+ years of experience. Includes BIM model and detailed calculations.',
    submittedDate: '2025-11-11',
  },
  {
    id: 3,
    project: 'Environmental Impact Study',
    expert: 'Aisha Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
    rating: 5.0,
    reviews: 56,
    amount: 7500,
    duration: '6 weeks',
    status: 'accepted',
    proposal: 'Comprehensive environmental assessment following EPA guidelines. Includes site surveys and remediation recommendations.',
    submittedDate: '2025-11-08',
  },
  {
    id: 4,
    project: 'HVAC System Redesign',
    expert: 'James Wong',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    rating: 4.7,
    reviews: 23,
    amount: 3200,
    duration: '2 weeks',
    status: 'rejected',
    proposal: 'Energy-efficient HVAC design with focus on sustainability and cost savings.',
    submittedDate: '2025-11-05',
  },
];

export function BidManagement() {
  const [sortBy, setSortBy] = useState('date');

  const handleAcceptBid = (bidId: number) => {
    toast.success('Bid accepted! Contract generation in progress...');
  };

  const handleRejectBid = (bidId: number) => {
    toast.info('Bid rejected and expert has been notified.');
  };

  const pendingBids = bids.filter(b => b.status === 'pending');
  const acceptedBids = bids.filter(b => b.status === 'accepted');
  const rejectedBids = bids.filter(b => b.status === 'rejected');

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl text-slate-900 mb-2">Bid Management</h1>
          <p className="text-xl text-slate-600">
            Review and manage proposals from engineering experts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Bids</p>
                  <p className="text-3xl text-slate-900">{bids.length}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Pending Review</p>
                  <p className="text-3xl text-slate-900">{pendingBids.length}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Accepted</p>
                  <p className="text-3xl text-slate-900">{acceptedBids.length}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Avg Bid Amount</p>
                  <p className="text-3xl text-slate-900">
                    ${Math.round(bids.reduce((sum, b) => sum + b.amount, 0) / bids.length).toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-green-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Most Recent</SelectItem>
                  <SelectItem value="amount-low">Lowest Bid</SelectItem>
                  <SelectItem value="amount-high">Highest Bid</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="duration">Shortest Duration</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1 flex gap-2 justify-end">
                <Button variant="outline">
                  AI Recommendations
                </Button>
                <Button variant="outline">
                  Compare Bids
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bids List */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pendingBids.length})
            </TabsTrigger>
            <TabsTrigger value="accepted">
              Accepted ({acceptedBids.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedBids.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All Bids ({bids.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} onAccept={handleAcceptBid} onReject={handleRejectBid} />
            ))}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {acceptedBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} onAccept={handleAcceptBid} onReject={handleRejectBid} />
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} onAccept={handleAcceptBid} onReject={handleRejectBid} />
            ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {bids.map((bid) => (
              <BidCard key={bid.id} bid={bid} onAccept={handleAcceptBid} onReject={handleRejectBid} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function BidCard({ bid, onAccept, onReject }: { bid: any; onAccept: (id: number) => void; onReject: (id: number) => void }) {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-700', label: 'Pending Review', icon: AlertCircle },
    accepted: { color: 'bg-green-100 text-green-700', label: 'Accepted', icon: CheckCircle },
    rejected: { color: 'bg-red-100 text-red-700', label: 'Rejected', icon: XCircle },
  };

  const config = statusConfig[bid.status as keyof typeof statusConfig];
  const StatusIcon = config.icon;

  return (
    <Card className="border-green-100 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-xl">{bid.project}</CardTitle>
              <Badge className={config.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {config.label}
              </Badge>
            </div>
            <CardDescription>
              Submitted on {new Date(bid.submittedDate).toLocaleDateString()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Expert Info */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-green-100">
              <AvatarImage src={bid.avatar} />
              <AvatarFallback>{bid.expert.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-slate-900">{bid.expert}</p>
              <div className="flex items-center text-sm text-slate-600">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                <span>{bid.rating}</span>
                <span className="mx-1">·</span>
                <span>{bid.reviews} reviews</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            View Profile
          </Button>
        </div>

        {/* Proposal */}
        <div>
          <h4 className="text-sm text-slate-900 mb-2">Proposal</h4>
          <p className="text-slate-700 p-4 bg-white border border-slate-200 rounded-lg">
            {bid.proposal}
          </p>
        </div>

        {/* Bid Details */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
            <DollarSign className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-slate-600">Bid Amount</p>
              <p className="text-xl text-slate-900">${bid.amount.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <Clock className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-slate-600">Duration</p>
              <p className="text-xl text-slate-900">{bid.duration}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
            <TrendingUp className="h-5 w-5 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-slate-600">Success Rate</p>
              <p className="text-xl text-slate-900">98%</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {bid.status === 'pending' && (
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <Button
              onClick={() => onAccept(bid.id)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Accept Bid
            </Button>
            <Button
              onClick={() => onReject(bid.id)}
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject Bid
            </Button>
            <Button variant="outline">
              Message
            </Button>
          </div>
        )}

        {bid.status === 'accepted' && (
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              View Contract
            </Button>
            <Button variant="outline">
              Message Expert
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
