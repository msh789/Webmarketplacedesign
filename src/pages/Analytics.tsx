import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  BriefcaseBusiness,
  Download,
  Calendar
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const revenueData = [
  { month: 'Jun', revenue: 12400, projects: 18 },
  { month: 'Jul', revenue: 15800, projects: 22 },
  { month: 'Aug', revenue: 18200, projects: 25 },
  { month: 'Sep', revenue: 22100, projects: 30 },
  { month: 'Oct', revenue: 26500, projects: 34 },
  { month: 'Nov', revenue: 32400, projects: 42 },
];

const projectTypeData = [
  { name: 'Structural', value: 35, color: '#16a34a' },
  { name: 'Civil', value: 25, color: '#059669' },
  { name: 'Mechanical', value: 20, color: '#10b981' },
  { name: 'Electrical', value: 12, color: '#34d399' },
  { name: 'Environmental', value: 8, color: '#6ee7b7' },
];

const expertLevelData = [
  { level: 'Bronze', count: 3200 },
  { level: 'Silver', count: 4100 },
  { level: 'Gold', count: 2300 },
  { level: 'Platinum', count: 634 },
];

const performanceMetrics = [
  { metric: 'Avg. Project Value', value: '$5,247', change: '+12%', trend: 'up' },
  { metric: 'Completion Rate', value: '94%', change: '+3%', trend: 'up' },
  { metric: 'Avg. Response Time', value: '2.3h', change: '-18%', trend: 'up' },
  { metric: 'Client Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up' },
];

export function Analytics() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl text-slate-900 mb-2">Reports & Analytics</h1>
            <p className="text-xl text-slate-600">
              Track your performance and insights
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((item, index) => (
            <Card key={index} className="border-green-100">
              <CardContent className="p-6">
                <p className="text-sm text-slate-600 mb-2">{item.metric}</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl text-slate-900">{item.value}</p>
                  <div className={`flex items-center text-sm ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {item.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#16a34a" 
                        strokeWidth={3}
                        dot={{ fill: '#16a34a', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Project Volume */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Project Volume</CardTitle>
                  <CardDescription>Number of projects per month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="projects" fill="#16a34a" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Summary Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
                      <p className="text-3xl text-slate-900">$127.5K</p>
                      <p className="text-sm text-green-600 mt-1">+24% from last period</p>
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
                      <p className="text-sm text-slate-600 mb-1">Avg. Project Value</p>
                      <p className="text-3xl text-slate-900">$5,247</p>
                      <p className="text-sm text-green-600 mt-1">+12% from last period</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <BriefcaseBusiness className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Platform Fees</p>
                      <p className="text-3xl text-slate-900">$12.8K</p>
                      <p className="text-sm text-green-600 mt-1">10% of revenue</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Project Type Distribution */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Project Type Distribution</CardTitle>
                  <CardDescription>Breakdown by engineering discipline</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={projectTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {projectTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Project Status */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Project Status Overview</CardTitle>
                  <CardDescription>Current project distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { status: 'Completed', count: 234, percentage: 67, color: 'bg-green-500' },
                      { status: 'In Progress', count: 89, percentage: 25, color: 'bg-blue-500' },
                      { status: 'Pending', count: 28, percentage: 8, color: 'bg-yellow-500' },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-slate-700">{item.status}</span>
                          <span className="text-sm text-slate-600">{item.count} projects</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className={`${item.color} h-3 rounded-full transition-all`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Expert Level Distribution */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Expert Level Distribution</CardTitle>
                  <CardDescription>Breakdown of expert tiers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={expertLevelData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="level" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="count" fill="#16a34a" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* User Growth */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Platform user statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Total Users</p>
                          <p className="text-2xl text-slate-900">10,234</p>
                        </div>
                      </div>
                      <div className="text-green-600">+12%</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border border-slate-200 rounded-lg">
                        <p className="text-sm text-slate-600 mb-1">Experts</p>
                        <p className="text-2xl text-slate-900">6,832</p>
                        <p className="text-sm text-green-600 mt-1">67% of users</p>
                      </div>
                      <div className="p-4 border border-slate-200 rounded-lg">
                        <p className="text-sm text-slate-600 mb-1">Clients</p>
                        <p className="text-2xl text-slate-900">3,402</p>
                        <p className="text-sm text-green-600 mt-1">33% of users</p>
                      </div>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">Active This Month</p>
                      <p className="text-2xl text-slate-900">7,156</p>
                      <p className="text-sm text-slate-500 mt-1">70% engagement rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
