import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { 
  FileText, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Upload,
  Sparkles,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { format } from 'date-fns';

export function ProjectPosting() {
  const [projectData, setProjectData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    budgetType: 'fixed',
    duration: '',
    experienceLevel: '',
    skills: [] as string[],
  });
  
  const [deadline, setDeadline] = useState<Date>();
  const [attachments, setAttachments] = useState<string[]>([]);

  const availableSkills = [
    'Structural Analysis', 'AutoCAD', 'Revit', 'Civil Engineering',
    'Project Management', 'BIM', 'Seismic Design', 'HVAC',
    'Sustainability', 'Environmental Impact', 'MEP Design',
  ];

  const handleSkillToggle = (skill: string) => {
    if (projectData.skills.includes(skill)) {
      setProjectData({
        ...projectData,
        skills: projectData.skills.filter(s => s !== skill),
      });
    } else {
      setProjectData({
        ...projectData,
        skills: [...projectData.skills, skill],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Project posted successfully! Matching with experts...');
  };

  const handleAIEnhance = () => {
    toast.info('AI is enhancing your project description...');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl text-slate-900 mb-2">Post a Project</h1>
          <p className="text-xl text-slate-600">
            Describe your engineering needs and connect with qualified experts
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Provide clear information about your project requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Structural Analysis for Commercial Building"
                    value={projectData.title}
                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Project Category</Label>
                    <Select
                      value={projectData.category}
                      onValueChange={(value) => setProjectData({ ...projectData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="structural">Structural Engineering</SelectItem>
                        <SelectItem value="civil">Civil Engineering</SelectItem>
                        <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                        <SelectItem value="electrical">Electrical Engineering</SelectItem>
                        <SelectItem value="environmental">Environmental Engineering</SelectItem>
                        <SelectItem value="geotechnical">Geotechnical Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Expected Duration</Label>
                    <Select
                      value={projectData.duration}
                      onValueChange={(value) => setProjectData({ ...projectData, duration: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-week">Less than 1 week</SelectItem>
                        <SelectItem value="1-4-weeks">1-4 weeks</SelectItem>
                        <SelectItem value="1-3-months">1-3 months</SelectItem>
                        <SelectItem value="3-6-months">3-6 months</SelectItem>
                        <SelectItem value="6-months-plus">6+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">Project Description</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAIEnhance}
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Enhance
                    </Button>
                  </div>
                  <Textarea
                    id="description"
                    placeholder="Describe your project requirements, deliverables, and any specific technical requirements..."
                    value={projectData.description}
                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                    rows={6}
                    required
                  />
                  <p className="text-sm text-slate-500">
                    Be specific about scope, deliverables, and technical requirements
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Budget & Timeline */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Budget & Timeline</CardTitle>
                <CardDescription>
                  Set your budget and project deadline
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Budget Type</Label>
                  <RadioGroup
                    value={projectData.budgetType}
                    onValueChange={(value) => setProjectData({ ...projectData, budgetType: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed" className="cursor-pointer">
                        Fixed Price - One-time payment for the entire project
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hourly" id="hourly" />
                      <Label htmlFor="hourly" className="cursor-pointer">
                        Hourly Rate - Pay for hours worked
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">
                      {projectData.budgetType === 'fixed' ? 'Project Budget' : 'Hourly Rate'}
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="budget"
                        type="number"
                        placeholder={projectData.budgetType === 'fixed' ? '5000' : '75'}
                        value={projectData.budget}
                        onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Project Deadline</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {deadline ? format(deadline, 'PPP') : 'Select deadline'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={deadline}
                          onSelect={setDeadline}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Required Skills & Experience */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Skills & Experience</CardTitle>
                <CardDescription>
                  Specify the expertise you're looking for
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Experience Level Required</Label>
                  <Select
                    value={projectData.experienceLevel}
                    onValueChange={(value) => setProjectData({ ...projectData, experienceLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (Bronze)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (Silver)</SelectItem>
                      <SelectItem value="expert">Expert (Gold)</SelectItem>
                      <SelectItem value="top-tier">Top Tier (Platinum)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Required Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={projectData.skills.includes(skill) ? 'default' : 'outline'}
                        className={`cursor-pointer ${
                          projectData.skills.includes(skill)
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'hover:bg-green-50 hover:border-green-300'
                        }`}
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                        {projectData.skills.includes(skill) && (
                          <X className="ml-1 h-3 w-3" />
                        )}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">
                    Click to select/deselect skills. Selected: {projectData.skills.length}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
                <CardDescription>
                  Upload any relevant files, drawings, or documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-sm text-slate-500">
                    Supported: PDF, DWG, DXF, Images (Max 50MB per file)
                  </p>
                  <Button type="button" variant="outline" className="mt-4">
                    <FileText className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>

                {attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-green-600 mr-3" />
                          <span className="text-sm text-slate-700">{file}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Options */}
            <Card className="border-green-100">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="nda" />
                    <label htmlFor="nda" className="text-sm text-slate-600 cursor-pointer">
                      Require experts to sign an NDA
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="featured" />
                    <label htmlFor="featured" className="text-sm text-slate-600 cursor-pointer">
                      Make this a featured project (+$50 for better visibility)
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="ai-matching" defaultChecked />
                    <label htmlFor="ai-matching" className="text-sm text-slate-600 cursor-pointer">
                      Enable AI-powered expert matching
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" size="lg">
                Post Project
              </Button>
              <Button type="button" variant="outline" size="lg">
                Save Draft
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
