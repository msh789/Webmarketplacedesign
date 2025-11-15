import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Star,
  CheckCircle,
  Shield,
  Upload,
  Briefcase,
  GraduationCap,
  FileText
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Profile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Sarah Chen',
    email: 'sarah.chen@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior Structural Engineer',
    bio: 'Experienced structural engineer specializing in sustainable infrastructure design and seismic resilience. 15+ years of experience in large-scale commercial and residential projects.',
    hourlyRate: '150',
    skills: ['Structural Analysis', 'AutoCAD', 'Revit', 'Seismic Design', 'Project Management'],
  });

  const verificationStatus = {
    email: true,
    phone: true,
    identity: true,
    professional: false,
  };

  const profileLevel = 'Platinum';
  const profileCompletion = 85;
  const rating = 4.9;
  const completedProjects = 47;

  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-6 border-green-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-green-100">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-green-600 hover:bg-green-700"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl text-slate-900">{profileData.fullName}</h1>
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    <Award className="h-3 w-3 mr-1" />
                    {profileLevel}
                  </Badge>
                  {verificationStatus.identity && (
                    <Badge variant="outline" className="border-green-600 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-slate-600 mb-3">{profileData.title}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                    {rating} ({completedProjects} projects)
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    ${profileData.hourlyRate}/hour
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button className="bg-green-600 hover:bg-green-700">
                  Edit Profile
                </Button>
                <Button variant="outline">
                  View Public Profile
                </Button>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Profile Completion</span>
                <span className="text-green-600">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Verification Status */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Email', status: verificationStatus.email },
                  { label: 'Phone Number', status: verificationStatus.phone },
                  { label: 'Identity (ID)', status: verificationStatus.identity },
                  { label: 'Professional Credentials', status: verificationStatus.professional },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{item.label}</span>
                    {item.status ? (
                      <Badge variant="outline" className="border-green-600 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Button variant="outline" size="sm">
                        Verify
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Level Benefits</CardTitle>
                <CardDescription>
                  {profileLevel} Member Perks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  'Priority support',
                  'Featured in search',
                  'Lower platform fees',
                  'Advanced analytics',
                  'Dedicated account manager',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/user-levels')}
                >
                  <Award className="h-4 w-4 mr-2" />
                  View All Levels
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 mx-auto mb-3 text-green-600" />
                <h3 className="text-slate-900 mb-2">Verify Your Identity</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Increase trust and unlock premium features
                </p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => navigate('/verify-identity')}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Start Verification
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your personal and professional details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="professional">Professional</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4 mt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="fullName"
                            value={profileData.fullName}
                            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                            className="pl-9"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="pl-9"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            className="pl-9"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                            className="pl-9"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      Save Changes
                    </Button>
                  </TabsContent>

                  <TabsContent value="professional" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="title"
                          value={profileData.title}
                          onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={profileData.hourlyRate}
                        onChange={(e) => setProfileData({ ...profileData, hourlyRate: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
                            {skill}
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm">
                          + Add Skill
                        </Button>
                      </div>
                    </div>

                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      Save Changes
                    </Button>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      {[
                        { name: 'Professional License', icon: GraduationCap, uploaded: true },
                        { name: 'Identity Document', icon: FileText, uploaded: true },
                        { name: 'Resume/CV', icon: FileText, uploaded: false },
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-50 p-2 rounded-lg">
                              <doc.icon className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <div className="text-slate-900">{doc.name}</div>
                              {doc.uploaded && (
                                <div className="text-sm text-green-600 flex items-center">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Uploaded & Verified
                                </div>
                              )}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            {doc.uploaded ? 'Replace' : 'Upload'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}