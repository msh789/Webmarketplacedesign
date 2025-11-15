import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
  console.warn(
    '⚠️ Supabase not configured!\n\n' +
    'To use the backend:\n' +
    '1. Create a Supabase project at https://supabase.com\n' +
    '2. Copy your Project URL and anon key from Settings > API\n' +
    '3. Update the .env file with your credentials\n' +
    '4. Restart the dev server\n\n' +
    'The app will work in demo mode until configured.'
  );
}

// Create Supabase client (will work in demo mode if not configured)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);

// Types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  user_type: 'expert' | 'client' | 'both';
  title?: string;
  bio?: string;
  location?: string;
  hourly_rate?: number;
  is_verified: boolean;
  user_level: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
  total_projects_completed: number;
  total_earnings: number;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  title: string;
  description: string;
  category: string;
  budget_min: number;
  budget_max: number;
  estimated_duration?: string;
  deadline?: string;
  location?: string;
  is_remote: boolean;
  status: 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';
  views_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
  // Relations
  client?: Profile;
  skills?: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface Bid {
  id: string;
  project_id: string;
  expert_id: string;
  proposed_budget: number;
  estimated_duration: string;
  cover_letter: string;
  availability?: string;
  terms_accepted: boolean;
  nda_accepted: boolean;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
  // Relations
  expert?: Profile;
  project?: Project;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
  // Relations
  sender?: Profile;
}

export interface Conversation {
  id: string;
  project_id: string;
  participant_1_id: string;
  participant_2_id: string;
  last_message_at: string;
  created_at: string;
  // Relations
  participant_1?: Profile;
  participant_2?: Profile;
  messages?: Message[];
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message?: string;
  action_url?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

export interface Review {
  id: string;
  contract_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  title?: string;
  comment?: string;
  communication_rating?: number;
  quality_rating?: number;
  professionalism_rating?: number;
  is_public: boolean;
  created_at: string;
  // Relations
  reviewer?: Profile;
  reviewee?: Profile;
}

export interface Contract {
  id: string;
  project_id: string;
  client_id: string;
  expert_id: string;
  bid_id?: string;
  title: string;
  description?: string;
  total_amount: number;
  start_date: string;
  end_date?: string;
  terms_and_conditions?: string;
  payment_terms?: string;
  client_signed: boolean;
  client_signed_at?: string;
  expert_signed: boolean;
  expert_signed_at?: string;
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  contract_id: string;
  milestone_id?: string;
  payer_id: string;
  payee_id: string;
  amount: number;
  platform_fee: number;
  net_amount: number;
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  payment_method?: string;
  description?: string;
  created_at: string;
  completed_at?: string;
}