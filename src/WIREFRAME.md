# SETReG Marketplace - UI/UX Wireframe Documentation

## Design System Overview

### Color Palette
- **Primary Green**: #16a34a (green-600) - Growth, Sustainability, Innovation
- **Light Green**: #f0fdf4 (green-50) - Backgrounds, Highlights
- **Dark Green**: #15803d (green-700) - Hover States
- **Slate**: Various shades for text and borders
- **White**: #ffffff - Card backgrounds
- **Yellow**: #eab308 (yellow-500) - Star ratings

### Typography
- Default system fonts with Tailwind CSS
- Headings: Various sizes with slate-900 color
- Body text: slate-600 and slate-700
- No custom font sizes/weights unless specified by user

---

## Page Wireframes

### 1. **Home Page** (`/`)

#### Layout Structure
```
┌──────────────────────────────────────────┐
│  [Navbar]                                │
├──────────────────────────────────────────┤
│  Hero Section (Green Gradient BG)        │
│  ┌────────────────────┐ ┌──────────────┐ │
│  │ Headline           │ │  Feature     │ │
│  │ Subheadline        │ │  Badges      │ │
│  │ [Browse Services]  │ │              │ │
│  │ [Browse Projects]  │ │              │ │
│  └────────────────────┘ └──────────────┘ │
├──────────────────────────────────────────┤
│  How It Works (3 Step Cards)             │
│  [01] [02] [03]                          │
├──────────────────────────────────────────┤
│  Top Categories (Grid)                   │
│  [ Category ] [ Category ] [ Category ]  │
├──────────────────────────────────────────┤
│  Featured Experts (Cards with Avatars)   │
├──────────────────────────────────────────┤
│  Stats Section (4 Metrics)               │
├──────────────────────────────────────────┤
│  CTA Section                              │
│  [Get Started]                           │
├──────────────────────────────────────────┤
│  [Footer]                                │
└──────────────────────────────────────────┘
```

**Key Components:**
- Hero with gradient background (green-50 to slate-50)
- CTA buttons (green primary, white outline)
- Feature badges with checkmarks
- Step cards with numbered badges
- Expert cards with avatar, rating, skills
- Stats counter with icons

---

### 2. **Browse Projects Page** (`/browse-projects`)

#### Layout Structure
```
┌──────────────────────────────────────────┐
│  [Navbar]                                │
├──────────────────────────────────────────┤
│  Page Header                             │
│  Title: "Browse Projects"                │
│  Subtitle: Description                   │
├──────────────────────────────────────────┤
│  Filters Card                            │
│  [Search] [Category] [Sort]              │
├──────────────────────────────────────────┤
│  Stats Cards (4 columns)                 │
│  [Open] [Total Value] [Bids] [New]      │
├──────────────────────────────────────────┤
│  Project Card 1                          │
│  ┌────────────────────────────────────┐  │
│  │ Title              [Status Badge]  │  │
│  │ Date | Bids | Location             │  │
│  │ Category Badge                     │  │
│  │ Budget: $XX,XXX - $XX,XXX         │  │
│  │                                    │  │
│  │ Description text...                │  │
│  │                                    │  │
│  │ Required Skills:                   │  │
│  │ [Skill] [Skill] [Skill]           │  │
│  │                                    │  │
│  │ ┌─────┐  Client Name ✓            │  │
│  │ │Avatar│  ⭐ 4.8 | 12 projects     │  │
│  │ └─────┘  [Submit Bid] [Apply Now] │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [More Project Cards...]                 │
│                                          │
│  [Load More]                             │
└──────────────────────────────────────────┘

Application Modal (When "Apply Now" clicked):
┌──────────────────────────────────────────┐
│  Apply for Project                    [X]│
├──────────────────────────────────────────┤
│  Cover Letter:                           │
│  ┌────────────────────────────────────┐  │
│  │ [Textarea]                         │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Proposed Budget:                        │
│  [Input Field]                           │
│                                          │
│  Estimated Duration:                     │
│  [Input Field]                           │
│                                          │
│  Availability:                           │
│  [Input Field]                           │
│                                          │
│  ☐ I accept the terms and conditions    │
│  ☐ I agree to the NDA                   │
│                                          │
│  [Submit Application]                    │
└──────────────────────────────────────────┘
```

**Key Features:**
- Search and filter system
- Project cards with full details
- Client information with verification badge
- Conditional button states (Apply Now → Applied)
- Modal form with validation
- Terms acceptance checkboxes

---

### 3. **Browse Services Page** (`/services`)

#### Layout Structure
```
┌──────────────────────────────────────────┐
│  [Navbar]                                │
├──────────────────────────────────────────┤
│  Page Header + Search/Filter             │
├──────────────────────────────────────────┤
│  Service Cards (Grid Layout)             │
│  ┌────────────┐ ┌────────────┐          │
│  │ Service 1  │ │ Service 2  │          │
│  │ [Image]    │ │ [Image]    │          │
│  │ Category   │ │ Category   │          │
│  │ $XXX       │ │ $XXX       │          │
│  │ Provider   │ │ Provider   │          │
│  │ ⭐ Rating  │ │ ⭐ Rating  │          │
│  └────────────┘ └────────────┘          │
└──────────────────────────────────────────┘
```

---

### 4. **User Profile Page** (`/profile`)

#### Layout Structure
```
┌──────────────────────────────────────────┐
│  [Navbar]                                │
├──────────────────────────────────────────┤
│  Profile Header                          │
│  ┌────┐                                  │
│  │Img │  Name + Verification Badge       │
│  │    │  Title/Role                      │
│  │    │  Location                        │
│  └────┘  [User Levels] [Verify Identity] │
│          ⭐⭐⭐⭐⭐ 4.9 (X reviews)        │
├──────────────────────────────────────────┤
│  Stats Row                               │
│  [Projects] [Earnings] [Rating] [Hours]  │
├──────────────────────────────────────────┤
│  About Section                           │
│  Bio text...                             │
├──────────────────────────────────────────┤
│  Skills Section                          │
│  [Skill] [Skill] [Skill] [Skill]        │
├──────────────────────────────────────────┤
│  Experience Section                      │
│  Timeline of work experience             │
├──────────────────────────────────────────┤
│  Education Section                       │
│  University degrees and certifications   │
├──────────────────────────────────────────┤
│  Portfolio Section                       │
│  Grid of project thumbnails              │
└──────────────────────────────────────────┘
```

---

### 5. **User Levels Page** (`/user-levels`)

#### Layout Structure
```
┌──────────────────────────────────────────┐
│  [Navbar]                                │
├──────────────────────────────────────────┤
│  Header: "User Tier Levels"              │
├──────────────────────────────────────────┤
│  Current Tier Display                    │
│  [Bronze Badge] You are Bronze Level     │
│  Progress Bar to Silver                  │
├──────────────────────────────────────────┤
│  Tier Comparison Table                   │
│  ┌─────────┬─────────┬─────────┬──────┐ │
│  │ Feature │ Bronze  │ Silver  │ Gold │ │
│  ├─────────┼─────────┼─────────┼──────┤ │
│  │ Fee %   │ 15%     │ 10%     │ 5%   │ │
│  │ Bids    │ 10/mo   │ 25/mo   │ ∞    │ │
│  │ Support │ Email   │ Priority│ 24/7 │ │
│  └─────────┴─────────┴─────────┴──────┘ │
│                                          │
│  [Upgrade Now]                           │
└──────────────────────────────────────────┘
```

---

### 6. **Verify Identity Page** (`/verify-identity`)

#### Layout Structure
```
┌──────────────────────────────────────────┐
│  [Navbar]                                │
├──────────────────────────────────────────┤
│  Header: "Identity Verification"         │
│  Subtitle: Build trust with badges       │
├──────────────────────────────────────────┤
│  Why Verify Section                      │
│  [Icon] Build Trust                      │
│  [Icon] Unlock Features                  │
│  [Icon] Higher Visibility                │
├──────────────────────────────────────────┤
│  Verification Options (3 Cards)          │
│  ┌──────────────┐ ┌──────────────┐      │
│  │  Onfido      │ │  Veriff      │      │
│  │  [Logo]      │ │  [Logo]      │      │
│  │  [Select]    │ │  [Select]    │      │
│  └──────────────┘ └──────────────┘      │
├──────────────────────────────────────────┤
│  Terms and Conditions                    │
│  [Scrollable Text Area]                  │
│                                          │
│  ☐ I accept the terms and conditions    │
│                                          │
│  [Start Verification]                    │
└──────────────────────────────────────────┘
```

---

### 7. **Dashboard Page** (`/dashboard`)

#### Layout Structure
```
┌──────────────────────────────────────────┐
│  [Navbar]                                │
├──────────────────────────────────────────┤
│  Welcome Header                          │
│  "Welcome back, [Name]"                  │
├──────────────────────────────────────────┤
│  Quick Stats (4 Cards)                   │
│  [Active] [Pending] [Completed] [Earned] │
├──────────────────────────────────────────┤
│  Active Projects Section                 │
│  Table/Cards showing current work        │
│  ┌────────────────────────────────────┐  │
│  │ Project | Client | Status | Action │  │
│  └────────────────────────────────────┘  │
├──────────────────────────────────────────┤
│  Recent Activity Feed                    │
│  Timeline of recent actions              │
├──────────────────────────────────────────┤
│  Upcoming Milestones                     │
│  Calendar view or list                   │
└──────────────────────────────────────────┘
```

---

### 8. **Messaging Page** (`/messages`)

#### Layout Structure
```
┌──────────────────────────────────────────┐
│  [Navbar]                                │
├──────────────────────────────────────────┤
│  ┌──────────┬───────────────────────────┐│
│  │Convers.  │ Chat Area                 ││
│  │List      │ ┌─────────────────────┐   ││
│  │          │ │ [Avatar] Name       │   ││
│  │┌────────┐│ │ Status: Online      │   ││
│  ││Person 1││ └─────────────────────┘   ││
│  │└────────┘│                           ││
│  │┌────────┐│ Message Bubbles:          ││
│  ││Person 2││ ┌──────────────┐          ││
│  │└────────┘│ │ Them: Hi     │          ││
│  │┌────────┐│ └──────────────┘          ││
│  ││Person 3││      ┌──────────────┐     ││
│  │└────────┘│      │ You: Hello   │     ││
│  │          │      └──────────────┘     ││
│  │          │                           ││
│  │          │ [Type message...] [Send] ││
│  └──────────┴───────────────────────────┘│
└──────────────────────────────────────────┘
```

---

### 9. **Admin Panel** (`/admin`)

#### Layout Structure
```
┌──────────────────────────────────────────┐
│  [Navbar]                                │
├──────────────────────────────────────────┤
│  Admin Dashboard Header                  │
├──────────────────────────────────────────┤
│  Overview Stats (5 Cards)                │
│  [Users] [Projects] [Revenue] [...]      │
├──────────────────────────────────────────┤
│  Tab Navigation                          │
│  [Users] [Projects] [Payments] [Reports] │
├──────────────────────────────────────────┤
│  Data Table                              │
│  ┌────────────────────────────────────┐  │
│  │ ID | Name | Email | Status | [...]│  │
│  │ -- | ---- | ----- | ------ | [...]│  │
│  │ Search/Filter options              │  │
│  └────────────────────────────────────┘  │
├──────────────────────────────────────────┤
│  Chart Section                           │
│  [Revenue Chart] [User Growth Chart]     │
└──────────────────────────────────────────┘
```

---

### 10. **Payment Page** (`/payments`)

#### Layout Structure
```
┌──────────────────────────────────────────┐
│  [Navbar]                                │
├──────────────────────────────────────────┤
│  Payment Header                          │
├──────────────────────────────────────────┤
│  Payment Summary Card                    │
│  ┌────────────────────────────────────┐  │
│  │ Project: [Name]                    │  │
│  │ Amount: $X,XXX                     │  │
│  │ Service Fee: $XXX                  │  │
│  │ Total: $X,XXX                      │  │
│  └────────────────────────────────────┘  │
├──────────────────────────────────────────┤
│  Stripe Integration                      │
│  ┌────────────────────────────────────┐  │
│  │ Card Number: [____________]        │  │
│  │ Expiry: [___] CVV: [___]          │  │
│  │ Name: [__________________]         │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [Pay Securely]                          │
├──────────────────────────────────────────┤
│  Payment History Table                   │
│  Recent transactions list                │
└──────────────────────────────────────────┘
```

---

## Navigation Structure

### Navbar Components
```
┌────────────────────────────────────────────────────┐
│ [Logo]  [Browse Services] [Browse Projects]        │
│         [Dashboard]                                │
│                                                    │
│         [Messages 3] [Files] [🔔 5] [👤] [Sign In]│
└────────────────────────────────────────────────────┘
```

**Notification Dropdown:**
- Shows 5 recent notifications
- Each with title, timestamp
- "View All" button at bottom
- Auto-closes on outside click

**Profile Dropdown:**
- My Profile
- User Levels
- Verify Identity
- ─────────
- Post Project
- My Bids
- Payments
- Contracts
- Analytics
- ─────────
- Admin Panel
- ─────────
- Logout

---

## Component Patterns

### Cards
- White background
- Green-100 border
- Rounded corners
- Hover: shadow-lg transition

### Buttons
- **Primary**: bg-green-600, hover:bg-green-700
- **Secondary**: outline with border
- **Disabled**: bg-slate-500, no hover

### Badges
- **Status**: Green background
- **Category**: Green-50 background, green-700 text
- **Skills**: Outline with green-200 border

### Icons
- Lucide React icons
- Consistent sizing (h-4 w-4 to h-8 w-8)
- Green-600 for primary icons

### Forms
- Labels above inputs
- Border on inputs/textareas
- Validation with error messages
- Checkboxes for agreements

### Modals/Dialogs
- Centered overlay
- Max-width constraint
- Header, content, footer structure
- Close on outside click or [X]

---

## Responsive Behavior

### Breakpoints
- **Mobile**: Default (< 768px)
- **Tablet**: md: (≥ 768px)
- **Desktop**: lg: (≥ 1024px)

### Mobile Adjustments
- Navbar becomes hamburger menu
- Grid layouts stack vertically
- Hidden desktop elements appear in mobile menu
- Touch-friendly button sizes
- Simplified stats displays

---

## Accessibility Features

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements
- Color contrast compliance
- Screen reader friendly

---

## Trust & Security Elements

- ✓ Verification badges on profiles
- 🔒 Secure payment indicators
- ⭐ Star rating systems
- 📊 Transparent statistics
- 🛡️ NDA and terms agreements
- 👥 Client/provider verification status

---

## File Structure

```
/
├── App.tsx (Main router)
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── CustomDropdown.tsx
│   └── ui/ (ShadCN components)
├── pages/
│   ├── Home.tsx
│   ├── BrowseProjects.tsx
│   ├── ServiceBrowsing.tsx
│   ├── Profile.tsx
│   ├── ExpertProfile.tsx
│   ├── UserLevels.tsx
│   ├── VerifyIdentity.tsx
│   ├── Dashboard.tsx
│   ├── ProjectPosting.tsx
│   ├── BidManagement.tsx
│   ├── Messaging.tsx
│   ├── Payment.tsx
│   ├── Contract.tsx
│   ├── Reviews.tsx
│   ├── FileSharing.tsx
│   ├── AdminPanel.tsx
│   ├── Analytics.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Checkout.tsx
└── styles/
    └── globals.css
```

---

## Notes for Developers

1. **Green Theme**: All primary actions use green-600
2. **Consistent Spacing**: Use Tailwind spacing (p-4, gap-6, etc.)
3. **Icons**: Always from lucide-react
4. **State Management**: Use React useState for local state
5. **Validation**: Show toast notifications for user feedback
6. **Loading States**: Consider adding for async operations
7. **Error Handling**: User-friendly error messages

---

**Last Updated**: November 14, 2025
**Version**: 1.0
**Platform**: SETReG Engineering Talent Marketplace
