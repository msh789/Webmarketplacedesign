# SETReG Marketplace - Dependencies Guide

## 📦 Required Dependencies

### Install All at Once

```bash
npm install @supabase/supabase-js react react-dom react-router-dom lucide-react recharts sonner@2.0.3 date-fns

npm install -D @types/node
```

---

## 📚 Complete Package List

### **Core Dependencies**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@supabase/supabase-js": "^2.39.0",
    "lucide-react": "^0.294.0",
    "recharts": "^2.10.0",
    "sonner": "2.0.3",
    "date-fns": "^3.0.0"
  }
}
```

### **Development Dependencies**

```json
{
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

---

## 🔧 Purpose of Each Dependency

### **@supabase/supabase-js**
Backend integration - authentication, database, real-time, storage

```typescript
import { createClient } from '@supabase/supabase-js';
```

### **react-router-dom**
Page routing and navigation

```typescript
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
```

### **lucide-react**
Icon library (400+ icons)

```typescript
import { CheckCircle, Bell, User } from 'lucide-react';
```

### **recharts**
Charts and graphs for analytics

```typescript
import { LineChart, BarChart, PieChart } from 'recharts';
```

### **sonner**
Toast notifications (must use version 2.0.3)

```typescript
import { toast } from 'sonner@2.0.3';
```

### **date-fns**
Date formatting and manipulation

```typescript
import { format, formatDistanceToNow } from 'date-fns';
```

---

## 🎨 ShadCN UI Components (Already Included)

These are already in `/components/ui/` - no installation needed:

- accordion
- alert-dialog
- alert
- avatar
- badge
- button
- card
- checkbox
- dialog
- dropdown-menu
- input
- label
- select
- textarea
- tabs
- tooltip
- And 30+ more!

---

## ⚙️ Configuration Files

### **package.json** (Complete Example)

```json
{
  "name": "setreg-marketplace",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@supabase/supabase-js": "^2.39.0",
    "lucide-react": "^0.294.0",
    "recharts": "^2.10.0",
    "sonner": "2.0.3",
    "date-fns": "^3.0.0",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-switch": "^1.0.3"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

### **tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### **vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## 🚀 Installation Steps

### **1. Initialize Project (if starting fresh)**

```bash
npm create vite@latest setreg-marketplace -- --template react-ts
cd setreg-marketplace
```

### **2. Install Core Dependencies**

```bash
npm install @supabase/supabase-js react-router-dom
```

### **3. Install UI Dependencies**

```bash
npm install lucide-react recharts sonner@2.0.3 date-fns
```

### **4. Install Radix UI (for ShadCN)**

```bash
npm install @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip @radix-ui/react-progress @radix-ui/react-slider @radix-ui/react-switch
```

### **5. Install Tailwind CSS**

```bash
npm install -D tailwindcss@4.0.0 autoprefixer postcss
```

---

## 🔍 Verify Installation

```bash
npm list @supabase/supabase-js
npm list react-router-dom
npm list lucide-react
```

Should show installed versions without errors.

---

## 📝 Import Examples

### **Supabase**
```typescript
import { supabase } from './lib/supabase';
import { projects, bids, messages } from './lib/api';
import { useAuth } from './contexts/AuthContext';
```

### **React Router**
```typescript
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
```

### **Icons**
```typescript
import { 
  Bell, User, CheckCircle, Star, MapPin, Clock, 
  DollarSign, Briefcase, FileText, MessageSquare 
} from 'lucide-react';
```

### **Charts**
```typescript
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
```

### **Toast**
```typescript
import { toast } from 'sonner@2.0.3';

toast.success('Success!');
toast.error('Error!');
toast.info('Info!');
```

### **Date Formatting**
```typescript
import { format, formatDistanceToNow } from 'date-fns';

format(new Date(), 'MMM dd, yyyy');
formatDistanceToNow(new Date(), { addSuffix: true });
```

---

## 🐛 Troubleshooting

### **"Cannot find module '@supabase/supabase-js'"**
```bash
npm install @supabase/supabase-js
```

### **"Cannot find module 'sonner'"**
```bash
npm install sonner@2.0.3
```
Note: Must use version 2.0.3 specifically

### **"Module not found: Can't resolve 'lucide-react'"**
```bash
npm install lucide-react
```

### **TypeScript errors with imports**
```bash
npm install -D @types/node @types/react @types/react-dom
```

### **Clear cache and reinstall**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Bundle Size

Approximate sizes after build:

| Package | Size |
|---------|------|
| React | ~150 KB |
| React Router | ~25 KB |
| Supabase | ~50 KB |
| Lucide Icons | ~15 KB (tree-shaken) |
| Recharts | ~130 KB |
| Tailwind CSS | ~10 KB (purged) |
| **Total** | **~380 KB** |

All sizes are gzipped production builds.

---

## ✅ Installation Checklist

- [ ] Initialize project with Vite
- [ ] Install React & React DOM
- [ ] Install @supabase/supabase-js
- [ ] Install react-router-dom
- [ ] Install lucide-react
- [ ] Install recharts
- [ ] Install sonner@2.0.3
- [ ] Install date-fns
- [ ] Install Radix UI components
- [ ] Install Tailwind CSS
- [ ] Configure TypeScript
- [ ] Set up environment variables
- [ ] Test imports

---

## 🔄 Update Dependencies

```bash
# Check for updates
npm outdated

# Update all to latest
npm update

# Update specific package
npm update @supabase/supabase-js

# Update to specific version
npm install @supabase/supabase-js@2.40.0
```

---

**All dependencies ready!** 🎉

Your project is configured with all necessary packages for the SETReG Marketplace platform.
