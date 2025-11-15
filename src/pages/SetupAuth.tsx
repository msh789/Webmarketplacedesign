import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ExternalLink, CheckCircle, AlertCircle, Settings, Mail, Link as LinkIcon } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';

export function SetupAuth() {
  const [copied, setCopied] = useState<string | null>(null);

  const projectId = 'lestthjgmdwivoozrmtr';
  const projectUrl = `https://${projectId}.supabase.co`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const dashboardLinks = {
    main: `https://app.supabase.com/project/${projectId}`,
    auth: `https://app.supabase.com/project/${projectId}/settings/auth`,
    api: `https://app.supabase.com/project/${projectId}/settings/api`,
    templates: `https://app.supabase.com/project/${projectId}/auth/templates`,
    users: `https://app.supabase.com/project/${projectId}/auth/users`,
  };

  const configSteps = [
    {
      number: 1,
      title: 'Enable Email Confirmation',
      description: 'Users must verify their email before signing in',
      link: dashboardLinks.auth,
      linkText: 'Open Auth Settings',
      instructions: [
        'Click "Open Auth Settings" button below',
        'Scroll to "Email Auth" section',
        'Check the "Enable email confirmations" checkbox',
        'Click "Save" at the bottom',
      ],
    },
    {
      number: 2,
      title: 'Configure Site URL',
      description: 'Set where users will be redirected after verification',
      link: dashboardLinks.api,
      linkText: 'Open API Settings',
      copyValue: 'http://localhost:5173',
      instructions: [
        'Click "Open API Settings" button below',
        'Find "URL Configuration" section',
        'Set Site URL to: http://localhost:5173',
        'Click "Save"',
      ],
    },
    {
      number: 3,
      title: 'Add Redirect URLs',
      description: 'Allow redirects to these paths',
      link: dashboardLinks.api,
      linkText: 'Same Page (API Settings)',
      copyValues: [
        'http://localhost:5173/verify-email',
        'http://localhost:5173/login',
        'http://localhost:5173/*',
      ],
      instructions: [
        'On same page (API Settings)',
        'Find "Redirect URLs" section',
        'Click "Add URL" button',
        'Paste each URL from the list above',
        'Click "Save"',
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-green-600 to-green-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl text-slate-900 mb-2">Email Authentication Setup</h1>
          <p className="text-slate-600">Configure Supabase settings to enable email verification</p>
        </div>

        {/* Quick Info */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900">
            <strong>Can't configure from code:</strong> These are administrative settings that must be changed in the Supabase Dashboard.
            Don't worry - it only takes 2 minutes! ⏱️
          </AlertDescription>
        </Alert>

        {/* Connection Status */}
        <Card className="mb-6 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Supabase Connected
            </CardTitle>
            <CardDescription>Your app is already connected to Supabase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Project ID:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-white px-2 py-1 rounded border">{projectId}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(projectId, 'projectId')}
                >
                  {copied === 'projectId' ? '✓' : 'Copy'}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Project URL:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-white px-2 py-1 rounded border">{projectUrl}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(projectUrl, 'projectUrl')}
                >
                  {copied === 'projectUrl' ? '✓' : 'Copy'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Steps */}
        <div className="space-y-6">
          {configSteps.map((step) => (
            <Card key={step.number} className="border-slate-200">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Instructions */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                    {step.instructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                {/* Copy Values */}
                {step.copyValue && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Value to enter:</label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm bg-white p-3 rounded border border-slate-300">
                        {step.copyValue}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(step.copyValue!, 'step' + step.number)}
                      >
                        {copied === 'step' + step.number ? '✓ Copied' : 'Copy'}
                      </Button>
                    </div>
                  </div>
                )}

                {step.copyValues && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">URLs to add:</label>
                    <div className="space-y-2">
                      {step.copyValues.map((value, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <code className="flex-1 text-sm bg-white p-2 rounded border border-slate-300">
                            {value}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(value, 'url' + idx)}
                          >
                            {copied === 'url' + idx ? '✓' : 'Copy'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => window.open(step.link, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {step.linkText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <Card className="mt-6 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Quick Access Links
            </CardTitle>
            <CardDescription>Useful Supabase dashboard pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(dashboardLinks.main, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Main Dashboard
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(dashboardLinks.templates, '_blank')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Templates (Customize later)
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(dashboardLinks.users, '_blank')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              View Users (After testing)
            </Button>
          </CardContent>
        </Card>

        {/* After Configuration */}
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">After Configuration</CardTitle>
            <CardDescription className="text-green-700">Test your email authentication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-900">Testing Steps:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-green-800">
                <li>Go to <a href="/register" className="underline font-medium">/register</a> page</li>
                <li>Create an account with YOUR real email</li>
                <li>Check your email inbox</li>
                <li>Click the verification link</li>
                <li>Sign in to your account</li>
                <li>Verify "Sign In" button disappears from navbar ✅</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => window.location.href = '/register'}
              >
                Test Registration →
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-green-600 text-green-700 hover:bg-green-100"
                onClick={() => window.location.href = '/login'}
              >
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Time Estimate */}
        <div className="text-center mt-8">
          <Badge variant="secondary" className="bg-slate-200 text-slate-700 px-4 py-2">
            ⏱️ Total time: 2 minutes
          </Badge>
        </div>
      </div>
    </div>
  );
}
