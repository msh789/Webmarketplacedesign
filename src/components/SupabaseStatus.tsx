import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';

export function SupabaseStatus() {
  const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
  const isConfigured = supabaseUrl && !supabaseUrl.includes('placeholder');

  if (isConfigured) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-900">Supabase Connected</AlertTitle>
        <AlertDescription className="text-green-700">
          Your backend is configured and ready to use!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-yellow-200 bg-yellow-50">
      <AlertCircle className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="text-yellow-900">Backend Not Configured</AlertTitle>
      <AlertDescription className="text-yellow-700">
        <p className="mb-3">
          The app is running in <strong>demo mode</strong> with mock data. 
          To enable the backend and save real data:
        </p>
        <ol className="list-decimal list-inside space-y-1 mb-3 text-sm">
          <li>Create a free project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">supabase.com</a></li>
          <li>Run the database schema from <code className="bg-yellow-100 px-1 rounded">/supabase/schema.sql</code></li>
          <li>Update <code className="bg-yellow-100 px-1 rounded">.env</code> with your credentials</li>
          <li>Restart the dev server</li>
        </ol>
        <Button 
          variant="outline" 
          size="sm"
          className="border-yellow-300 text-yellow-900 hover:bg-yellow-100"
          asChild
        >
          <a 
            href="https://supabase.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Create Supabase Project
          </a>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
