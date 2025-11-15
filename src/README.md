# 🚀 SETReG Marketplace - Engineering Talent Platform

A modern, full-stack marketplace connecting engineering talent with opportunities worldwide.

![Status](https://img.shields.io/badge/status-ready-green)
![React](https://img.shields.io/badge/react-18.2-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.0-blue)
![Supabase](https://img.shields.io/badge/supabase-ready-green)

---

## ✨ Features

✅ **23 Fully Designed Pages** - Complete UI/UX  
✅ **Full Backend** - Supabase + PostgreSQL  
✅ **Authentication** - Email/Password + OAuth  
✅ **Real-time** - Live messaging & notifications  
✅ **User Levels** - Bronze/Silver/Gold/Platinum tiers  
✅ **Bidding System** - Apply to projects  
✅ **Reviews** - 5-star rating system  
✅ **File Uploads** - Secure storage  
✅ **Mobile Responsive** - Works on all devices  

---

## 🚀 Quick Start

### **1. Install Dependencies**

```bash
npm install
```

### **2. Install Backend (Optional)**

**Option A - Automatic:**
```bash
# Mac/Linux
chmod +x install-backend.sh
./install-backend.sh

# Windows
install-backend.bat
```

**Option B - Manual:**
```bash
npm install @supabase/supabase-js
```

### **3. Run the App**

```bash
npm run dev
```

**That's it!** Open http://localhost:5173

The app works in **demo mode** with mock data. No configuration needed!

---

## 🔌 Connect Backend (Optional - 5 Minutes)

Want to save real data? Follow these steps:

### **Step 1: Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Set name, password, region
4. Wait 2 minutes for setup

### **Step 2: Get Credentials**
1. Go to **Settings** → **API**
2. Copy **Project URL**
3. Copy **anon public** key

### **Step 3: Update .env**
```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### **Step 4: Run Database Schema**
1. In Supabase, go to **SQL Editor**
2. Copy `/supabase/schema.sql`
3. Paste and click **Run**

### **Step 5: Restart**
```bash
npm run dev
```

**Done!** Your backend is now live! 🎉

Detailed guide: [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)

---

## 📁 Project Structure

```
/
├── pages/              # 23 application pages
│   ├── Home.tsx
│   ├── BrowseProjects.tsx
│   ├── Login.tsx
│   └── ...
├── components/         # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ui/            # 40+ ShadCN components
├── lib/               # Backend integration
│   ├── supabase.ts    # Database client
│   └── api.ts         # API functions
├── contexts/          # React contexts
│   └── AuthContext.tsx
├── supabase/          # Database
│   └── schema.sql     # PostgreSQL schema
└── styles/
    └── globals.css    # Global styles
```

---

## 🎨 Pages

### **Public Pages**
- `/` - Homepage with hero section
- `/login` - Sign in
- `/register` - Sign up
- `/services` - Browse services
- `/browse-projects` - Browse & apply to projects

### **User Pages**
- `/profile` - User profile
- `/dashboard` - Project dashboard
- `/messages` - Real-time chat
- `/bids` - Manage applications
- `/payments` - Payment history
- `/files` - File sharing
- `/contracts` - Legal contracts
- `/reviews` - Ratings & reviews

### **Special Pages**
- `/user-levels` - Tier system
- `/verify-identity` - ID verification
- `/admin` - Admin panel
- `/analytics` - Analytics dashboard

---

## 🗄️ Database Schema

**15+ Tables:**
- **profiles** - User accounts with verification
- **projects** - Engineering projects
- **bids** - Applications to projects
- **contracts** - Legal agreements
- **payments** - Transactions
- **reviews** - Ratings & feedback
- **messages** - Real-time chat
- **notifications** - User alerts
- **files** - File uploads
- And more...

Full schema: [/supabase/schema.sql](./supabase/schema.sql)

---

## 🎯 Tech Stack

### **Frontend**
- React 18 + TypeScript
- Tailwind CSS v4
- React Router v6
- ShadCN UI (Radix)
- Lucide Icons
- Recharts
- Sonner (Toasts)

### **Backend**
- Supabase
- PostgreSQL
- Row Level Security
- Real-time Subscriptions
- Storage Buckets

---

## 📚 Documentation

| File | Description |
|------|-------------|
| **QUICK_START.md** | Get started in 5 minutes |
| **ERROR_FIX_SUMMARY.md** | Recent error fixes |
| **SUPABASE_SETUP_GUIDE.md** | Backend setup (detailed) |
| **BACKEND_QUICK_REFERENCE.md** | API cheat sheet |
| **BACKEND_README.md** | Backend overview |
| **COMPLETE_PROJECT_SUMMARY.md** | Full project details |
| **FIGMA_DESIGN_SPECS.md** | Design system |
| **DEPENDENCIES.md** | Package guide |

---

## 🔧 Development

### **Run Development Server**
```bash
npm run dev
```

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

### **Lint Code**
```bash
npm run lint
```

---

## 🎨 Design System

**Colors:**
- Primary: Green-600 (#16A34A)
- Background: Slate-50, Green-50
- Text: Slate-900, Slate-700

**Components:**
- 40+ ShadCN UI components
- Custom dropdowns
- Toast notifications
- Modal dialogs
- Forms with validation

Full specs: [FIGMA_DESIGN_SPECS.md](./FIGMA_DESIGN_SPECS.md)

---

## 🔐 Security

✅ Row Level Security (RLS) enabled  
✅ JWT authentication  
✅ Password hashing  
✅ SQL injection protection  
✅ XSS prevention  
✅ HTTPS enforced  

---

## 📊 Features by Page

### **Browse Projects** ⭐
- Search & filter projects
- Category filtering
- Budget ranges
- **Apply Now** button
- Application modal with:
  - Cover letter
  - Proposed budget
  - Duration estimate
  - Terms & NDA acceptance
- Button changes to "Applied" after submission
- Toast notifications

### **User Levels**
Four tier system:
- **Bronze** - 15% fee, 10 bids/month
- **Silver** - 10% fee, 25 bids/month, verified badge
- **Gold** - 5% fee, 50 bids/month, advanced analytics
- **Platinum** - 3% fee, unlimited bids, dedicated manager

### **Admin Panel**
- User management
- Project oversight
- Analytics dashboard
- Payment tracking

---

## 🧪 Testing

### **Demo Mode (Current)**
```bash
npm run dev
# All pages work with mock data
# No backend needed
# Perfect for testing UI
```

### **Production Mode (After Supabase)**
```bash
# Set up Supabase
# Update .env
npm run dev
# Real data persistence
# User authentication
# Real-time features
```

---

## 🚢 Deployment

### **Frontend (Vercel/Netlify)**
```bash
npm run build
# Deploy /dist folder
```

### **Backend (Supabase)**
Already hosted! Just configure your project.

### **Environment Variables**
Add to your deployment platform:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

---

## 🐛 Troubleshooting

### **Error: Cannot read properties of undefined**
✅ **Fixed!** The .env file is now created with defaults.

### **App shows "demo mode" warning**
✅ Normal! This means Supabase isn't configured yet. App still works perfectly.

### **Data doesn't persist after refresh**
✅ Expected in demo mode. Connect Supabase to persist data.

### **Need more help?**
See [ERROR_FIX_SUMMARY.md](./ERROR_FIX_SUMMARY.md)

---

## 📈 Roadmap

- [x] Complete UI/UX design
- [x] All 23 pages
- [x] Backend schema
- [x] Authentication
- [x] Real-time features
- [x] File storage
- [ ] Stripe payments (schema ready)
- [ ] Email notifications
- [ ] Mobile apps
- [ ] API for integrations

---

## 🙏 Credits

- **ShadCN UI** - Component library
- **Lucide** - Icons
- **Supabase** - Backend
- **Tailwind CSS** - Styling

---

## 📄 License

MIT License - feel free to use for your projects!

---

## 🎯 Quick Links

- **Start Now:** `npm run dev`
- **Setup Backend:** [QUICK_START.md](./QUICK_START.md)
- **API Docs:** [BACKEND_QUICK_REFERENCE.md](./BACKEND_QUICK_REFERENCE.md)
- **Full Guide:** [COMPLETE_PROJECT_SUMMARY.md](./COMPLETE_PROJECT_SUMMARY.md)

---

## 💡 Need Help?

1. Check [QUICK_START.md](./QUICK_START.md) for setup
2. See [ERROR_FIX_SUMMARY.md](./ERROR_FIX_SUMMARY.md) for common issues
3. Read [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) for backend

---

## ✅ Status

✅ **Ready to use!**

Run `npm run dev` and start building! 🚀

---

**Built with ❤️ for sustainable engineering excellence**
