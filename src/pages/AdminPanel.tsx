import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  Users, 
  BriefcaseBusiness, 
  DollarSign, 
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle,
  Ban,
  Eye,
  Settings
} from 'lucide-react';

const stats = {
  totalUsers: 10234,
  activeProjects: 156,
  totalRevenue: 485600,
  platformFees: 48560,
};

const users = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@example.com',
    type: 'Expert',
    level: 'Platinum',
    status: 'active',
    joinedDate: '2024-03-15',
    projects: 47,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    email: 'michael.r@example.com',
    type: 'Expert',
    level: 'Gold',
    status: 'active',
    joinedDate: '2024-05-20',
    projects: 32,
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'john.smith@acme.com',
    type: 'Client',
    level: 'Silver',
    status: 'pending-verification',
    joinedDate: '2025-11-01',
    projects: 3,
  },
];

const projects = [
  {
    id: 1,
    title: 'Commercial Building Analysis',
    client: 'Acme Construction',
    expert: 'Dr. Sarah Chen',
    status: 'in-progress',
    value: 5000,
    startDate: '2025-11-01',
  },
  {
    id: 2,
    title: 'Environmental Impact Study',
    client: 'GreenTech Corp',
    expert: 'Aisha Patel',
    status: 'in-progress',
    value: 8000,
    startDate: '2025-11-05',
  },
  {
    id: 3,
    title: 'HVAC System Design',
    client: 'BuildSmart Inc',
    expert: 'James Wong',
    status: 'completed',
    value: 3500,
    startDate: '2025-10-15',
  },
];

const flaggedContent = [
  {
    id: 1,
    type: 'User Report',
    description: 'Suspicious activity on account',
    reportedBy: 'System',
    date: '2025-11-14',
    severity: 'medium',
  },
  {
    id: 2,
    type: 'Payment Dispute',
    description: 'Client requested refund',
    reportedBy: 'John Smith',
    date: '2025-11-13',
    severity: 'high',
  },
];

export function AdminPanel() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl text-slate-900 mb-2">Admin Panel</h1>
            <p className="text-xl text-slate-600">
              Platform management and oversight
            </p>
          </div>
          <Badge className="bg-red-600 hover:bg-red-700">
            <Shield className="h-3 w-3 mr-1" />
            Admin Access
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Total Users</p>
                <div className="bg-green-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-3xl text-slate-900">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12% this month</p>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Active Projects</p>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl text-slate-900">{stats.activeProjects}</p>
              <p className="text-sm text-green-600 mt-1">+8% this month</p>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Total Revenue</p>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl text-slate-900">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+15% this month</p>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Platform Fees</p>
                <div className="bg-orange-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <p className="text-3xl text-slate-900">${stats.platformFees.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+15% this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="projects">Project Oversight</TabsTrigger>
            <TabsTrigger value="payments">Payment Monitoring</TabsTrigger>
            <TabsTrigger value="reports">Flagged Content</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="border-green-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Monitor and manage platform users</CardDescription>
                  </div>
                  <Input placeholder="Search users..." className="w-64" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-slate-900">{user.name}</h3>
                            <Badge variant="outline">{user.type}</Badge>
                            <Badge className={
                              user.level === 'Platinum' ? 'bg-yellow-500' :
                              user.level === 'Gold' ? 'bg-amber-600' :
                              'bg-slate-400'
                            }>
                              {user.level}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">{user.email}</p>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span>Joined: {new Date(user.joinedDate).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{user.projects} projects</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            user.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }
                        >
                          {user.status === 'active' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertCircle className="h-3 w-3 mr-1" />
                          )}
                          {user.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Project Oversight</CardTitle>
                <CardDescription>Monitor all platform projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-slate-900">{project.title}</h3>
                          <Badge
                            className={
                              project.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <span>Client: {project.client}</span>
                          <span>•</span>
                          <span>Expert: {project.expert}</span>
                          <span>•</span>
                          <span>Value: ${project.value.toLocaleString()}</span>
                          <span>•</span>
                          <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Payment Monitoring</CardTitle>
                <CardDescription>Track all platform transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  Payment monitoring dashboard with transaction logs and analytics
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Flagged Content</CardTitle>
                <CardDescription>Review reported issues and disputes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {flaggedContent.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          item.severity === 'high' ? 'bg-red-100' :
                          item.severity === 'medium' ? 'bg-yellow-100' :
                          'bg-slate-100'
                        }`}>
                          <AlertCircle className={`h-6 w-6 ${
                            item.severity === 'high' ? 'text-red-600' :
                            item.severity === 'medium' ? 'text-yellow-600' :
                            'text-slate-600'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-slate-900">{item.type}</h3>
                            <Badge className={
                              item.severity === 'high' ? 'bg-red-100 text-red-700' :
                              item.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-slate-100 text-slate-700'
                            }>
                              {item.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">{item.description}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            Reported by {item.reportedBy} • {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
