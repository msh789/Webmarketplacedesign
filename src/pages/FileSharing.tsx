import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  File,
  Download,
  Trash2,
  Search,
  FolderOpen,
  Eye
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const files = [
  {
    id: 1,
    name: 'Structural_Analysis_Report.pdf',
    type: 'pdf',
    size: '2.4 MB',
    project: 'Commercial Building Analysis',
    uploadedBy: 'Dr. Sarah Chen',
    uploadedAt: '2025-11-14',
    version: 2,
  },
  {
    id: 2,
    name: 'Building_Plans.dwg',
    type: 'dwg',
    size: '15.8 MB',
    project: 'Commercial Building Analysis',
    uploadedBy: 'John Smith',
    uploadedAt: '2025-11-10',
    version: 1,
  },
  {
    id: 3,
    name: 'Site_Photos.zip',
    type: 'zip',
    size: '45.2 MB',
    project: 'Environmental Impact Study',
    uploadedBy: 'Aisha Patel',
    uploadedAt: '2025-11-12',
    version: 1,
  },
  {
    id: 4,
    name: 'HVAC_Design.pdf',
    type: 'pdf',
    size: '3.1 MB',
    project: 'HVAC System Design',
    uploadedBy: 'James Wong',
    uploadedAt: '2025-11-08',
    version: 3,
  },
  {
    id: 5,
    name: 'Environmental_Data.xlsx',
    type: 'excel',
    size: '890 KB',
    project: 'Environmental Impact Study',
    uploadedBy: 'Aisha Patel',
    uploadedAt: '2025-11-13',
    version: 1,
  },
];

export function FileSharing() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpload = () => {
    toast.success('Files uploaded successfully!');
  };

  const handleDownload = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`);
  };

  const handleDelete = (fileName: string) => {
    toast.success(`${fileName} deleted`);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'dwg':
      case 'dxf':
        return <File className="h-6 w-6 text-blue-500" />;
      case 'zip':
        return <FolderOpen className="h-6 w-6 text-yellow-500" />;
      case 'excel':
        return <FileText className="h-6 w-6 text-green-500" />;
      case 'image':
        return <ImageIcon className="h-6 w-6 text-purple-500" />;
      default:
        return <File className="h-6 w-6 text-slate-500" />;
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl text-slate-900 mb-2">File Sharing</h1>
          <p className="text-xl text-slate-600">
            Securely share and manage project documents
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Files</p>
                  <p className="text-3xl text-slate-900">{files.length}</p>
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
                  <p className="text-sm text-slate-600 mb-1">Storage Used</p>
                  <p className="text-3xl text-slate-900">67 MB</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Active Projects</p>
                  <p className="text-3xl text-slate-900">3</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FolderOpen className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Shared Files</p>
                  <p className="text-3xl text-slate-900">{files.length}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Upload className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Area */}
        <Card className="mb-8 border-green-100">
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Share documents, drawings, and images with your project team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-green-400 transition-colors cursor-pointer">
              <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-sm text-slate-500 mb-4">
                Supported: PDF, DWG, DXF, Images, ZIP (Max 100MB per file)
              </p>
              <Button onClick={handleUpload} className="bg-green-600 hover:bg-green-700">
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Files List */}
        <Card className="border-green-100">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>All Files</CardTitle>
                <CardDescription>
                  Browse and manage your project files
                </CardDescription>
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredFiles.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  No files found
                </div>
              ) : (
                filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="bg-slate-100 p-3 rounded-lg">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-slate-900 truncate">{file.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mt-1">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.project}</span>
                          <span>•</span>
                          <span>by {file.uploadedBy}</span>
                          <span>•</span>
                          <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {file.version > 1 && (
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          v{file.version}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toast.info('Preview feature coming soon')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(file.name)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(file.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
