import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  DollarSign,
  FileText,
  MessageSquare,
  Calendar
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Commercial Building Structural Analysis',
    client: 'Acme Construction',
    expert: 'Dr. Sarah Chen',
    status: 'in-progress',
    progress: 65,
    budget: 5000,
    spent: 3250,
    deadline: '2025-12-15',
    milestones: [
      { name: 'Initial Assessment', completed: true },
      { name: 'Detailed Analysis', completed: true },
      { name: 'Report Draft', completed: false, current: true },
      { name: 'Final Review', completed: false },
    ],
  },
  {
    id: 2,
    title: 'Environmental Impact Study',
    client: 'GreenTech Corp',
    expert: 'Aisha Patel',
    status: 'in-progress',
    progress: 30,
    budget: 8000,
    spent: 2400,
    deadline: '2025-12-30',
    milestones: [
      { name: 'Site Survey', completed: true },
      { name: 'Data Collection', completed: false, current: true },
      { name: 'Analysis', completed: false },
      { name: 'Report', completed: false },
    ],
  },
  {
    id: 3,
    title: 'HVAC System Design',
    client: 'BuildSmart Inc',
    expert: 'James Wong',
    status: 'completed',
    progress: 100,
    budget: 3500,
    spent: 3500,
    deadline: '2025-11-10',
    milestones: [
      { name: 'Requirements', completed: true },
      { name: 'Design', completed: true },
      { name: 'Review', completed: true },
      { name: 'Delivery', completed: true },
    ],
  },
];

export function ProjectDashboard() {
  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl text-slate-900 mb-2">Project Dashboard</h1>
          <p className="text-xl text-slate-600">
            Track and manage all your projects in one place
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Active Projects</p>
                  <p className="text-3xl text-slate-900">{activeProjects}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Completed</p>
                  <p className="text-3xl text-slate-900">{completedProjects}</p>
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
                  <p className="text-sm text-slate-600 mb-1">Total Budget</p>
                  <p className="text-3xl text-slate-900">${totalBudget.toLocaleString()}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Spent</p>
                  <p className="text-3xl text-slate-900">${totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-slate-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Projects ({activeProjects})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedProjects})</TabsTrigger>
            <TabsTrigger value="all">All Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {projects.filter(p => p.status === 'in-progress').map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {projects.filter(p => p.status === 'completed').map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  const statusConfig = {
    'in-progress': { color: 'bg-blue-100 text-blue-700', label: 'In Progress', icon: Clock },
    'completed': { color: 'bg-green-100 text-green-700', label: 'Completed', icon: CheckCircle },
    'pending': { color: 'bg-yellow-100 text-yellow-700', label: 'Pending', icon: AlertCircle },
  };

  const config = statusConfig[project.status as keyof typeof statusConfig];
  const StatusIcon = config.icon;

  return (
    <Card className="border-green-100">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle>{project.title}</CardTitle>
              <Badge className={config.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {config.label}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-2">
              <span>Client: {project.client}</span>
              <span>•</span>
              <span>Expert: {project.expert}</span>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Files
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600">Overall Progress</span>
            <span className="text-green-600">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Milestones */}
        <div>
          <h4 className="text-sm text-slate-900 mb-3">Milestones</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {project.milestones.map((milestone: any, index: number) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-2 ${
                  milestone.completed
                    ? 'border-green-200 bg-green-50'
                    : milestone.current
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center mb-1">
                  {milestone.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  ) : milestone.current ? (
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-slate-300 mr-2" />
                  )}
                  <span className="text-sm text-slate-900">{milestone.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget & Deadline */}
        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-slate-400 mr-2" />
            <div>
              <p className="text-sm text-slate-600">Budget</p>
              <p className="text-slate-900">
                ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-slate-400 mr-2" />
            <div>
              <p className="text-sm text-slate-600">Deadline</p>
              <p className="text-slate-900">{new Date(project.deadline).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <Button className="bg-green-600 hover:bg-green-700">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
