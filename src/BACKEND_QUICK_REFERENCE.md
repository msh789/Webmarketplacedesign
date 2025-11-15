# SETReG Backend - Quick Reference Card

## 🔑 Environment Variables

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🎯 Common API Calls

### Authentication
```typescript
import { useAuth } from '../contexts/AuthContext';
const { user, profile, signIn, signUp, signOut } = useAuth();

// Sign up
await signUp('email@example.com', 'password', 'John Doe', 'expert');

// Sign in
await signIn('email@example.com', 'password');

// OAuth
await signInWithOAuth('google');

// Sign out
await signOut();
```

### Projects
```typescript
import { projects } from '../lib/api';

// Get all
const { data } = await projects.getAll({ status: 'open' });

// Get one
const { data } = await projects.getById(id);

// Create
const { data } = await projects.create({
  client_id: user.id,
  title: 'Project Title',
  description: 'Description',
  category: 'Structural Engineering',
  budget_min: 5000,
  budget_max: 10000,
  is_remote: true,
  status: 'open'
});

// Update
const { data } = await projects.update(id, { status: 'completed' });

// Delete
const { error } = await projects.delete(id);
```

### Bids
```typescript
import { bids } from '../lib/api';

// Create bid
const { data } = await bids.create({
  project_id: projectId,
  expert_id: user.id,
  proposed_budget: 7500,
  estimated_duration: '2 months',
  cover_letter: 'Cover letter...',
  availability: 'Immediately',
  terms_accepted: true,
  nda_accepted: true
});

// Get bids for project
const { data } = await bids.getByProject(projectId);

// Get my bids
const { data } = await bids.getByExpert(user.id);

// Update bid status
const { data } = await bids.updateStatus(bidId, 'accepted');
```

### Messaging
```typescript
import { messages } from '../lib/api';

// Get or create conversation
const { data: conv } = await messages.getOrCreateConversation(
  projectId,
  userId1,
  userId2
);

// Send message
await messages.send(conversationId, user.id, 'Hello!');

// Get messages
const { data } = await messages.getMessages(conversationId);

// Mark as read
await messages.markAsRead(conversationId, user.id);

// Subscribe to real-time
const sub = messages.subscribeToMessages(conversationId, (msg) => {
  console.log('New message:', msg);
});
// Later: sub.unsubscribe();
```

### Notifications
```typescript
import { notifications } from '../lib/api';

// Create
await notifications.create({
  user_id: userId,
  type: 'bid_received',
  title: 'New Bid',
  message: 'Someone bid on your project',
  action_url: '/projects/123'
});

// Get notifications
const { data } = await notifications.getByUser(user.id, 10);

// Mark as read
await notifications.markAsRead(notificationId);

// Get unread count
const { count } = await notifications.getUnreadCount(user.id);

// Subscribe to real-time
const sub = notifications.subscribe(user.id, (notif) => {
  toast.info(notif.title);
});
```

### Profiles
```typescript
import { profiles } from '../lib/api';

// Get profile
const { data } = await profiles.getById(userId);

// Get current user profile
const { data } = await profiles.getCurrent();

// Update profile
const { data } = await profiles.update(user.id, {
  full_name: 'John Doe',
  bio: 'Expert engineer...',
  hourly_rate: 150,
  location: 'San Francisco, CA'
});

// Search profiles
const { data } = await profiles.search({
  userType: 'expert',
  minRating: 4.5,
  location: 'San Francisco'
});
```

### Reviews
```typescript
import { reviews } from '../lib/api';

// Create review
await reviews.create({
  contract_id: contractId,
  reviewer_id: user.id,
  reviewee_id: expertId,
  rating: 5,
  title: 'Excellent!',
  comment: 'Great work...',
  communication_rating: 5,
  quality_rating: 5,
  professionalism_rating: 5
});

// Get reviews for user
const { data } = await reviews.getByUser(expertId);
```

### Files
```typescript
import { files } from '../lib/api';

// Upload file
const { data } = await files.upload(fileObject, projectId, user.id);

// Get project files
const { data } = await files.getByProject(projectId);

// Get download URL
const url = await files.getDownloadUrl(storagePath);
```

### Skills
```typescript
import { skills } from '../lib/api';

// Get all skills
const { data } = await skills.getAll();

// Add skill to user
await skills.addToUser(user.id, skillId, 'expert', 5);

// Get user skills
const { data } = await skills.getUserSkills(user.id);
```

---

## 🗄️ Database Tables

| Table | Description |
|-------|-------------|
| **profiles** | User profiles, verification, levels |
| **projects** | Engineering projects |
| **bids** | Applications to projects |
| **contracts** | Legal agreements |
| **payments** | Payment tracking |
| **reviews** | Ratings and reviews |
| **conversations** | Chat conversations |
| **messages** | Chat messages |
| **notifications** | User notifications |
| **files** | File metadata |
| **skills** | Available skills |
| **user_skills** | User's skills |
| **user_experience** | Work experience |
| **user_education** | Education history |
| **project_milestones** | Project milestones |
| **analytics_events** | Analytics tracking |

---

## 🔐 User Levels

| Level | Platform Fee | Monthly Bids | Features |
|-------|--------------|--------------|----------|
| **Bronze** | 15% | 10 | Basic |
| **Silver** | 10% | 25 | Priority Support, Verified Badge |
| **Gold** | 5% | 50 | Advanced Analytics, Custom Portfolio |
| **Platinum** | 3% | Unlimited | Dedicated Manager, API Access |

---

## 🎨 Using in React Components

### Basic Example
```typescript
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { projects } from '../lib/api';

function MyComponent() {
  const { user, profile } = useAuth();
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await projects.getAll({ status: 'open' });
    if (data) setProjectsList(data);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {projectsList.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

### With Real-time
```typescript
useEffect(() => {
  const subscription = messages.subscribeToMessages(
    conversationId,
    (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    }
  );

  return () => subscription.unsubscribe();
}, [conversationId]);
```

---

## 📱 Row Level Security

All tables are protected with RLS policies:

✅ Users can read their own data  
✅ Users can update their own data  
✅ Public data (open projects, profiles) is readable by everyone  
✅ Private data (bids, messages) only accessible by participants  

---

## 🚨 Error Handling

```typescript
const { data, error } = await projects.create(projectData);

if (error) {
  // Handle specific errors
  if (error.code === '23505') {
    toast.error('Duplicate entry');
  } else if (error.code === '42501') {
    toast.error('Permission denied');
  } else {
    toast.error('Something went wrong');
    console.error(error);
  }
} else {
  toast.success('Project created!');
}
```

---

## 🔄 Real-time Subscriptions

```typescript
// Messages
const msgSub = messages.subscribeToMessages(convId, callback);

// Notifications  
const notifSub = notifications.subscribe(userId, callback);

// Clean up
useEffect(() => {
  return () => {
    msgSub.unsubscribe();
    notifSub.unsubscribe();
  };
}, []);
```

---

## 📊 Analytics

```typescript
import { analytics } from '../lib/api';

// Track event
await analytics.trackEvent(user.id, 'project_viewed', {
  project_id: projectId,
  category: 'Structural Engineering'
});

// Get user stats
const stats = await analytics.getUserStats(user.id);
```

---

## 🎯 Common Patterns

### Protected Route
```typescript
function ProtectedPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) return <Loader />;
  if (!user) return null;

  return <div>Protected content</div>;
}
```

### Pagination
```typescript
const [page, setPage] = useState(0);
const limit = 10;

const { data } = await supabase
  .from('projects')
  .select('*')
  .range(page * limit, (page + 1) * limit - 1);
```

### Search with Debounce
```typescript
const [search, setSearch] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    if (search) {
      fetchProjects({ search });
    }
  }, 500);

  return () => clearTimeout(timer);
}, [search]);
```

---

## 📦 Files to Reference

| File | Purpose |
|------|---------|
| `/lib/supabase.ts` | Types & client |
| `/lib/api.ts` | API functions |
| `/contexts/AuthContext.tsx` | Auth state |
| `/supabase/schema.sql` | Database schema |
| `/.env` | Configuration |

---

**Quick Start:**
1. Set up `.env` with Supabase credentials
2. Run schema.sql in Supabase
3. Import `{ useAuth }` for authentication
4. Import functions from `../lib/api`
5. Use API functions to interact with database
