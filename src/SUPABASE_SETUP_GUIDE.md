# SETReG Marketplace - Supabase Backend Setup Guide

## 🎉 Complete Backend Implementation

Your SETReG Marketplace now has a **full Supabase backend** with:
- ✅ User authentication (email/password + OAuth)
- ✅ PostgreSQL database with 15+ tables
- ✅ Row Level Security (RLS) policies
- ✅ Real-time messaging
- ✅ File storage
- ✅ API helper functions
- ✅ React integration

---

## 📦 What Was Created

### **1. Database Schema** (`/supabase/schema.sql`)
Complete PostgreSQL schema with:
- **profiles** - User profiles with verification & levels
- **projects** - Engineering projects
- **bids** - Project applications
- **contracts** - Legal agreements
- **payments** - Payment tracking
- **reviews** - Ratings & reviews
- **conversations & messages** - Real-time messaging
- **files** - File metadata
- **notifications** - User notifications
- **analytics_events** - Analytics tracking
- **skills, user_skills** - Skills management
- **user_experience, user_education** - Profile data

### **2. Supabase Client** (`/lib/supabase.ts`)
- Configured Supabase client
- TypeScript interfaces for all tables
- Type-safe database queries

### **3. API Helper Functions** (`/lib/api.ts`)
Complete API with functions for:
- **auth** - Sign up, sign in, sign out, OAuth
- **profiles** - Get, update, search profiles
- **projects** - CRUD operations, filtering
- **bids** - Create, retrieve, update bids
- **messages** - Real-time messaging
- **notifications** - Create, read, subscribe
- **reviews** - Create and retrieve reviews
- **skills** - Manage user skills
- **files** - Upload and download
- **analytics** - Track events

### **4. Auth Context** (`/contexts/AuthContext.tsx`)
React context for authentication:
- User state management
- Profile data caching
- Auth methods (sign in/up/out)
- OAuth integration

### **5. Updated Browse Projects** (`/pages/BrowseProjectsWithBackend.tsx`)
Full backend integration:
- Fetches projects from Supabase
- Submits bids to database
- Shows applied projects
- Real-time updates

---

## 🚀 Setup Instructions

### **Step 1: Create Supabase Project**

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Project Name:** SETReG Marketplace
   - **Database Password:** (save this!)
   - **Region:** Choose closest to you
4. Click "Create new project"
5. Wait for setup to complete (~2 minutes)

---

### **Step 2: Run Database Schema**

1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy the entire content from `/supabase/schema.sql`
4. Paste into the SQL editor
5. Click **Run** (or press Ctrl+Enter)
6. Wait for completion message: "Success. No rows returned"

This creates all tables, indexes, RLS policies, and triggers!

---

### **Step 3: Get API Keys**

1. In Supabase dashboard, click **Project Settings** (gear icon)
2. Click **API** in left menu
3. Copy these values:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **anon public** key (the long JWT token)

---

### **Step 4: Configure Environment Variables**

1. In your project root, create `.env` file
2. Copy from `.env.example`:

```bash
# .env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_KEY_HERE
```

3. Replace with your actual values from Step 3

---

### **Step 5: Install Dependencies**

```bash
npm install @supabase/supabase-js
```

---

### **Step 6: Enable Storage (for file uploads)**

1. In Supabase dashboard, click **Storage** (left sidebar)
2. Click **Create a new bucket**
3. Name: `project-files`
4. Click **Public bucket** (or set policies later)
5. Click **Create bucket**

---

### **Step 7: Configure Authentication Providers**

#### **Email/Password (Already enabled)**
No action needed - works out of the box!

#### **OAuth Providers (Optional)**

**For Google:**
1. Go to **Authentication** > **Providers** in Supabase
2. Enable **Google**
3. Get credentials from [Google Cloud Console](https://console.cloud.google.com)
4. Add to Supabase

**For GitHub:**
1. Go to **Authentication** > **Providers**
2. Enable **GitHub**
3. Get credentials from [GitHub OAuth Apps](https://github.com/settings/developers)
4. Add to Supabase

**For LinkedIn:**
1. Enable **LinkedIn** provider
2. Get credentials from [LinkedIn Developers](https://www.linkedin.com/developers/)
3. Add to Supabase

---

### **Step 8: Test the Setup**

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `/browse-projects`
3. Try to apply to a project (it will prompt you to sign in)
4. Register a new account
5. Check Supabase **Authentication** tab to see the new user
6. Check **Table Editor** > **profiles** to see the profile created

---

## 🔧 Using the Backend

### **Authentication**

```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, profile, signIn, signUp, signOut } = useAuth();

  const handleSignIn = async () => {
    const { error } = await signIn('email@example.com', 'password');
    if (error) console.error(error);
  };

  return (
    <div>
      {user ? (
        <p>Welcome {profile?.full_name}</p>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
}
```

### **Fetching Data**

```typescript
import { projects } from '../lib/api';

// Get all projects
const { data, error } = await projects.getAll({
  status: 'open',
  category: 'Structural Engineering'
});

// Get single project
const { data: project } = await projects.getById(projectId);

// Create project
const { data: newProject } = await projects.create({
  client_id: user.id,
  title: 'My Project',
  description: 'Project description',
  category: 'Structural Engineering',
  budget_min: 5000,
  budget_max: 10000,
  is_remote: true,
  status: 'open'
});
```

### **Submitting Bids**

```typescript
import { bids } from '../lib/api';

const { data, error } = await bids.create({
  project_id: projectId,
  expert_id: user.id,
  proposed_budget: 7500,
  estimated_duration: '2 months',
  cover_letter: 'I am perfect for this job...',
  availability: 'Immediately',
  terms_accepted: true,
  nda_accepted: true
});
```

### **Real-time Messaging**

```typescript
import { messages } from '../lib/api';
import { useEffect } from 'react';

// Send message
await messages.send(conversationId, user.id, 'Hello!');

// Subscribe to new messages
useEffect(() => {
  const subscription = messages.subscribeToMessages(
    conversationId,
    (newMessage) => {
      console.log('New message:', newMessage);
      // Update UI
    }
  );

  return () => {
    subscription.unsubscribe();
  };
}, [conversationId]);
```

### **Notifications**

```typescript
import { notifications } from '../lib/api';

// Create notification
await notifications.create({
  user_id: userId,
  type: 'bid_received',
  title: 'New bid on your project',
  message: 'John Smith bid $7,500 on "Bridge Design"',
  action_url: '/projects/123'
});

// Get notifications
const { data } = await notifications.getByUser(user.id);

// Subscribe to real-time notifications
const subscription = notifications.subscribe(
  user.id,
  (notification) => {
    toast.info(notification.title);
  }
);
```

---

## 📊 Database Tables Reference

### **profiles**
User profiles with verification, levels, stats
- `id`, `email`, `full_name`, `avatar_url`
- `user_type`: 'expert' | 'client' | 'both'
- `user_level`: 'bronze' | 'silver' | 'gold' | 'platinum'
- `is_verified`, `rating`, `review_count`

### **projects**
Engineering projects posted by clients
- `id`, `client_id`, `title`, `description`
- `category`, `budget_min`, `budget_max`
- `status`: 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled'
- `location`, `is_remote`

### **bids**
Applications from experts to projects
- `id`, `project_id`, `expert_id`
- `proposed_budget`, `estimated_duration`, `cover_letter`
- `status`: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
- `terms_accepted`, `nda_accepted`

### **conversations & messages**
Real-time messaging system
- Conversations between two users
- Messages with read status
- Real-time subscriptions

### **notifications**
User notifications
- `type`, `title`, `message`
- `is_read`, `action_url`
- Real-time subscriptions

---

## 🔒 Security (Row Level Security)

All tables have RLS enabled with policies:

✅ **Profiles** - Public read, users can update own
✅ **Projects** - Public read open projects, clients CRUD own
✅ **Bids** - Visible to bidder and project owner only
✅ **Messages** - Users can only see own conversations
✅ **Notifications** - Users can only see own notifications

---

## 📈 Next Steps

### **1. Enable More Features**

**Payments with Stripe:**
```typescript
// Already has database structure
// Add Stripe integration:
npm install @stripe/stripe-js
```

**File Uploads:**
```typescript
import { files } from '../lib/api';

const { data } = await files.upload(
  fileObject,
  projectId,
  user.id
);
```

**Reviews:**
```typescript
import { reviews } from '../lib/api';

await reviews.create({
  contract_id: contractId,
  reviewer_id: user.id,
  reviewee_id: expertId,
  rating: 5,
  title: 'Excellent work!',
  comment: 'Very professional...'
});
```

### **2. Add Indexes for Performance**
Already included in schema! Indexes on:
- User level, rating
- Project status, category
- Messages by conversation
- Notifications by user

### **3. Set Up Backups**
In Supabase dashboard:
- **Database** > **Backups**
- Enable daily backups (free on paid plans)

### **4. Monitor Usage**
- **Dashboard** > **Usage**
- Track database size, storage, bandwidth

---

## 🐛 Troubleshooting

### **"Missing environment variables"**
- Check `.env` file exists in project root
- Restart dev server after creating `.env`
- Variables must start with `VITE_`

### **"relation does not exist"**
- Run the schema.sql file in Supabase SQL Editor
- Check for errors in SQL execution

### **"Row Level Security policy violation"**
- Check if user is authenticated
- Verify RLS policies in Supabase > Authentication > Policies

### **"Invalid API key"**
- Double-check VITE_SUPABASE_ANON_KEY in `.env`
- Make sure you copied the **anon public** key, not **service_role**

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

## ✅ Checklist

- [ ] Create Supabase project
- [ ] Run database schema
- [ ] Get API keys
- [ ] Add to `.env` file
- [ ] Install @supabase/supabase-js
- [ ] Create storage bucket
- [ ] Enable OAuth providers (optional)
- [ ] Test authentication
- [ ] Test project browsing
- [ ] Test bid submission

---

**Your backend is ready! 🎉**

The Browse Projects page now saves real bids to the database, and you have a complete API for all features. Replace other mock pages with real Supabase integration using the same patterns!
