# 🏗️ SETReG Backend Architecture

## Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                          │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + TypeScript)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📄 PAGES (30+)                                                 │
│  ├── Home                    ├── BrowseProjects                │
│  ├── Login/Register          ├── ProjectPosting                │
│  ├── Profile                 ├── BidManagement                 │
│  ├── Expert Profile          ├── Messaging                     │
│  ├── User Levels             ├── Contracts                     │
│  ├── Verify Identity         ├── Payments                      │
│  ├── Admin Panel             ├── Reviews                       │
│  └── ... 20 more pages       └── Analytics                     │
│                                                                 │
│  🎨 COMPONENTS                                                  │
│  ├── Navbar                  ├── shadcn/ui components          │
│  ├── Footer                  └── Custom components             │
│                                                                 │
│  🔐 CONTEXTS                                                    │
│  └── AuthContext (User authentication state)                   │
│                                                                 │
│  📚 LIBRARIES                                                   │
│  ├── /lib/supabase.ts       (Supabase client config)          │
│  ├── /lib/api.ts            (OLD: Direct DB calls)            │
│  └── /lib/backend-api.ts    (NEW: Backend API client) ← USE!  │
│                                                                 │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              │ REST API Calls
                              │ Authorization: Bearer {token}
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              SUPABASE EDGE FUNCTIONS (Backend)                  │
│              https://{project}.supabase.co/functions/v1/        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📡 API ENDPOINTS (50+)                                         │
│                                                                 │
│  🔐 AUTHENTICATION (2 endpoints)                                │
│  ├── POST /api/auth/signup      (Create account)               │
│  └── POST /api/auth/signin      (Login)                        │
│                                                                 │
│  👤 PROFILES (3 endpoints)                                      │
│  ├── GET  /api/profiles/:id     (Get profile)                  │
│  ├── PUT  /api/profiles/:id     (Update profile)               │
│  └── GET  /api/profiles         (Search experts)               │
│                                                                 │
│  📁 PROJECTS (5 endpoints)                                      │
│  ├── GET    /api/projects       (List all with filters)        │
│  ├── GET    /api/projects/:id   (Get one + track view)         │
│  ├── POST   /api/projects       (Create)                       │
│  ├── PUT    /api/projects/:id   (Update)                       │
│  └── DELETE /api/projects/:id   (Delete)                       │
│                                                                 │
│  💼 BIDS (4 endpoints)                                          │
│  ├── POST  /api/bids                     (Submit bid)          │
│  ├── GET   /api/projects/:id/bids       (List bids)           │
│  ├── GET   /api/experts/:id/bids        (My bids)             │
│  └── PATCH /api/bids/:id/status         (Accept/Reject)       │
│                                                                 │
│  💬 MESSAGING (4 endpoints)                                     │
│  ├── GET  /api/conversations             (My conversations)    │
│  ├── GET  /api/conversations/:id/messages (Get messages)      │
│  ├── POST /api/messages                  (Send message)       │
│  └── POST /api/conversations/:id/read    (Mark as read)       │
│                                                                 │
│  🔔 NOTIFICATIONS (4 endpoints)                                 │
│  ├── GET   /api/notifications            (Get all)            │
│  ├── GET   /api/notifications/unread/count (Count unread)     │
│  ├── PATCH /api/notifications/:id/read  (Mark one read)       │
│  └── POST  /api/notifications/read-all  (Mark all read)       │
│                                                                 │
│  ⭐ REVIEWS (2 endpoints)                                       │
│  ├── GET  /api/users/:id/reviews        (Get reviews)         │
│  └── POST /api/reviews                   (Submit review)      │
│                                                                 │
│  📎 FILES (3 endpoints)                                         │
│  ├── POST /api/files/upload              (Upload file)        │
│  ├── GET  /api/projects/:id/files       (List files)          │
│  └── GET  /api/files/:id/download       (Get URL)             │
│                                                                 │
│  📄 CONTRACTS (2 endpoints)                                     │
│  ├── POST /api/contracts                 (Create)             │
│  └── POST /api/contracts/:id/sign       (Sign)                │
│                                                                 │
│  💳 PAYMENTS (1 endpoint)                                       │
│  └── POST /api/payments/create-intent   (Create Stripe)       │
│                                                                 │
│  📊 ANALYTICS (2 endpoints)                                     │
│  ├── POST /api/analytics/events         (Track event)         │
│  └── GET  /api/analytics/dashboard      (Get stats)           │
│                                                                 │
│  🛡️ ADMIN (1 endpoint)                                         │
│  └── GET  /api/admin/dashboard          (Admin stats)         │
│                                                                 │
│  ✅ VERIFICATION (1 endpoint)                                   │
│  └── POST /api/verification/submit      (Submit ID)           │
│                                                                 │
│  🏆 USER LEVELS (2 endpoints)                                   │
│  ├── GET  /api/user-levels              (Level info)          │
│  └── POST /api/users/:id/points         (Update points)       │
│                                                                 │
│  💡 BUSINESS LOGIC                                              │
│  ├── Auto-create notifications                                 │
│  ├── Calculate platform fees (10%)                             │
│  ├── Track analytics events                                    │
│  ├── Verify ownership & permissions                            │
│  ├── Validate inputs                                           │
│  └── Handle file uploads                                       │
│                                                                 │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              │ SQL Queries
                              │ Supabase Client
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│            SUPABASE POSTGRESQL DATABASE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📊 TABLES                                                      │
│                                                                 │
│  👥 profiles                                                    │
│     ├── id, email, full_name, avatar_url                       │
│     ├── user_type, user_level, points                          │
│     ├── rating, review_count                                   │
│     ├── is_verified, verification_date                         │
│     └── total_earnings, total_projects_completed               │
│                                                                 │
│  📁 projects                                                    │
│     ├── id, client_id, title, description                      │
│     ├── category, budget_min, budget_max                       │
│     ├── location, is_remote, status                            │
│     └── views_count, created_at                                │
│                                                                 │
│  💼 bids                                                        │
│     ├── id, project_id, expert_id                              │
│     ├── proposed_budget, estimated_duration                    │
│     ├── cover_letter, status                                   │
│     └── terms_accepted, nda_accepted                           │
│                                                                 │
│  💬 conversations & messages                                    │
│     ├── conversation: id, project_id, participants             │
│     └── message: id, sender_id, content, is_read               │
│                                                                 │
│  🔔 notifications                                               │
│     ├── id, user_id, type, title, message                      │
│     └── is_read, read_at, action_url                           │
│                                                                 │
│  ⭐ reviews                                                     │
│     ├── id, contract_id, reviewer_id, reviewee_id              │
│     ├── rating, title, comment                                 │
│     └── communication_rating, quality_rating                   │
│                                                                 │
│  📄 contracts                                                   │
│     ├── id, project_id, client_id, expert_id                   │
│     ├── total_amount, terms_and_conditions                     │
│     ├── client_signed, expert_signed, status                   │
│     └── start_date, end_date                                   │
│                                                                 │
│  💳 payments                                                    │
│     ├── id, contract_id, payer_id, payee_id                    │
│     ├── amount, platform_fee, net_amount                       │
│     ├── stripe_payment_intent_id, status                       │
│     └── payment_method, completed_at                           │
│                                                                 │
│  📎 files                                                       │
│     ├── id, uploader_id, project_id                            │
│     ├── file_name, file_size, file_type                        │
│     └── storage_path, is_public                                │
│                                                                 │
│  🎓 skills & user_skills                                        │
│     ├── skills: id, name, category                             │
│     └── user_skills: user_id, skill_id, proficiency            │
│                                                                 │
│  📊 analytics_events                                            │
│     ├── id, user_id, event_type                                │
│     └── event_data (JSONB), created_at                         │
│                                                                 │
│  🔒 ROW LEVEL SECURITY (RLS)                                    │
│     ├── Users can only edit their own data                     │
│     ├── Projects visible based on status                       │
│     ├── Bids visible to owner & bidder                         │
│     └── Messages visible to participants                       │
│                                                                 │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  SUPABASE STORAGE                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📦 Buckets                                                     │
│  └── project-files/                                            │
│      ├── {project-id}/                                         │
│      │   ├── file1.pdf                                         │
│      │   ├── file2.docx                                        │
│      │   └── image.png                                         │
│      └── ... more projects                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Examples

### Example 1: Submit a Bid

```
┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  USER    │         │ FRONTEND │         │ BACKEND  │         │ DATABASE │
│ (Expert) │         │  React   │         │   API    │         │Supabase  │
└────┬─────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │                    │
     │ 1. Click "Submit"  │                    │                    │
     ├───────────────────>│                    │                    │
     │                    │                    │                    │
     │                    │ 2. POST /api/bids  │                    │
     │                    │    with token      │                    │
     │                    ├───────────────────>│                    │
     │                    │                    │                    │
     │                    │                    │ 3. Verify token    │
     │                    │                    ├───────────────────>│
     │                    │                    │<───────────────────┤
     │                    │                    │                    │
     │                    │                    │ 4. Check duplicate │
     │                    │                    ├───────────────────>│
     │                    │                    │<───────────────────┤
     │                    │                    │                    │
     │                    │                    │ 5. Insert bid      │
     │                    │                    ├───────────────────>│
     │                    │                    │<───────────────────┤
     │                    │                    │                    │
     │                    │                    │ 6. Create notify   │
     │                    │                    ├───────────────────>│
     │                    │                    │<───────────────────┤
     │                    │                    │                    │
     │                    │ 7. Return success  │                    │
     │                    │<───────────────────┤                    │
     │                    │                    │                    │
     │ 8. Show toast ✅   │                    │                    │
     │<───────────────────┤                    │                    │
     │                    │                    │                    │
```

### Example 2: Browse Projects

```
┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  USER    │         │ FRONTEND │         │ BACKEND  │         │ DATABASE │
│ (Expert) │         │  React   │         │   API    │         │Supabase  │
└────┬─────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │                    │
     │ 1. Visit page      │                    │                    │
     ├───────────────────>│                    │                    │
     │                    │                    │                    │
     │                    │ 2. GET /api/projects│                   │
     │                    │    ?status=open    │                    │
     │                    ├───────────────────>│                    │
     │                    │                    │                    │
     │                    │                    │ 3. Query projects  │
     │                    │                    ├───────────────────>│
     │                    │                    │ WHERE status='open'│
     │                    │                    │<───────────────────┤
     │                    │                    │                    │
     │                    │ 4. Return projects │                    │
     │                    │<───────────────────┤                    │
     │                    │                    │                    │
     │ 5. Display cards 📋│                    │                    │
     │<───────────────────┤                    │                    │
     │                    │                    │                    │
```

---

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY ARCHITECTURE                    │
└─────────────────────────────────────────────────────────────┘

Layer 1: FRONTEND VALIDATION
├── Input validation
├── Type checking (TypeScript)
└── UI constraints

        ↓

Layer 2: AUTHENTICATION
├── Supabase Auth
├── JWT tokens
├── Token in localStorage
└── Authorization header

        ↓

Layer 3: BACKEND AUTHORIZATION
├── Verify token
├── Check user permissions
├── Verify ownership
└── Validate business rules

        ↓

Layer 4: DATABASE RLS (Row Level Security)
├── SQL-level permissions
├── User can only see their data
├── Automatic enforcement
└── Even if backend bypassed!

        ↓

Layer 5: AUDIT & LOGGING
├── All actions logged
├── Analytics tracked
├── Errors recorded
└── Monitoring enabled
```

---

## Request/Response Flow

### Typical API Call

```javascript
// 1. FRONTEND: User action
const handleSubmitBid = async () => {
  
  // 2. FRONTEND: Call backend API
  const result = await backendAPI.bids.create({
    project_id: '123',
    proposed_budget: 5000,
    estimated_duration: '2 weeks',
    cover_letter: 'I am interested...'
  });
  
  // This sends:
  // POST https://{project}.supabase.co/functions/v1/make-server-94ff05b6/api/bids
  // Headers: {
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Bearer {token_from_localStorage}'
  // }
  // Body: { project_id: '123', ... }
  
  // 3. BACKEND: Receives request
  // - Verifies token
  // - Checks if user already bid
  // - Inserts bid into database
  // - Creates notification for project owner
  // - Returns response
  
  // 4. FRONTEND: Handle response
  if (result.success) {
    toast.success('Bid submitted!');
    // { 
    //   success: true, 
    //   data: { id: 'bid-456', status: 'pending', ... },
    //   message: 'Bid submitted successfully'
    // }
  } else {
    toast.error(result.error);
    // {
    //   success: false,
    //   error: 'You have already submitted a bid'
    // }
  }
};
```

---

## Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                      TECHNOLOGY STACK                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FRONTEND                                                   │
│  ├── React 18                  (UI framework)               │
│  ├── TypeScript                (Type safety)                │
│  ├── React Router              (Navigation)                 │
│  ├── Tailwind CSS              (Styling)                    │
│  ├── shadcn/ui                 (Components)                 │
│  ├── Lucide React              (Icons)                      │
│  └── Sonner                    (Toasts)                     │
│                                                             │
│  BACKEND                                                    │
│  ├── Deno                      (Runtime)                    │
│  ├── Hono                      (Web framework)              │
│  ├── Supabase JS Client        (Database)                  │
│  └── TypeScript                (Type safety)                │
│                                                             │
│  DATABASE                                                   │
│  ├── PostgreSQL 15             (Database)                   │
│  ├── Row Level Security        (Security)                   │
│  ├── Triggers & Functions      (Automation)                 │
│  └── Indexes                   (Performance)                │
│                                                             │
│  STORAGE                                                    │
│  └── Supabase Storage          (Files)                      │
│                                                             │
│  AUTHENTICATION                                             │
│  ├── Supabase Auth             (User management)            │
│  ├── JWT Tokens                (Sessions)                   │
│  └── OAuth Support             (Social login)               │
│                                                             │
│  DEPLOYMENT                                                 │
│  ├── Figma Make                (Frontend hosting)           │
│  ├── Supabase Edge Functions   (Backend hosting)            │
│  └── Supabase Cloud            (Database hosting)           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## API Response Format

```json
// SUCCESS RESPONSE
{
  "success": true,
  "data": {
    "id": "123",
    "title": "Bridge Design",
    "status": "open",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "message": "Project created successfully"
}

// ERROR RESPONSE
{
  "success": false,
  "error": "Validation error: budget_min is required"
}
```

---

## File Structure

```
your-project/
├── App.tsx                          ← Main app component
├── /pages/                          ← 30+ pages
│   ├── Home.tsx
│   ├── BrowseProjects.tsx
│   ├── BrowseProjectsWithBackend.tsx ← Example backend usage
│   ├── ProjectPosting.tsx
│   ├── BidManagement.tsx
│   └── ... 25 more pages
├── /components/                     ← UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── /ui/                         ← shadcn components
├── /contexts/
│   └── AuthContext.tsx              ← Auth state management
├── /lib/
│   ├── supabase.ts                  ← Supabase client
│   ├── api.ts                       ← OLD: Direct DB calls
│   └── backend-api.ts               ← NEW: Backend API client ⭐
├── /supabase/
│   ├── /functions/
│   │   └── /server/
│   │       ├── index.tsx            ← Backend server ⭐
│   │       └── kv_store.tsx         ← Protected
│   └── schema.sql                   ← Database schema
├── /utils/
│   └── /supabase/
│       └── info.tsx                 ← Project config
└── /styles/
    └── globals.css                  ← Global styles
```

---

**🎯 This architecture is production-ready and scalable!**

All components work together seamlessly to provide a complete, secure, and performant marketplace platform.
