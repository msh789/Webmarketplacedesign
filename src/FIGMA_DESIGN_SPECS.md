# SETReG Marketplace - Figma Design Specifications

## 📐 Complete UI/UX Design System for Figma

This document provides all specifications needed to recreate the SETReG Marketplace design in Figma.

---

## 🎨 DESIGN SYSTEM

### Color Palette

**Primary Colors**
```
Green-50:  #F0FDF4 (Backgrounds)
Green-100: #DCFCE7 (Hover states, borders)
Green-600: #16A34A (Primary buttons, icons) ⭐ MAIN BRAND
Green-700: #15803D (Hover states)
```

**Neutral Colors**
```
White:     #FFFFFF (Card backgrounds)
Slate-50:  #F8FAFC (Page backgrounds)
Slate-100: #F1F5F9 (Borders, dividers)
Slate-200: #E2E8F0 (Borders)
Slate-500: #64748B (Disabled states)
Slate-600: #475569 (Secondary text)
Slate-700: #334155 (Body text)
Slate-900: #0F172A (Headings)
```

**Accent Colors**
```
Yellow-500: #EAB308 (Star ratings)
Red-600:    #DC2626 (Errors, alerts)
Blue-600:   #2563EB (Links, info)
```

---

### Typography

**Font Family:** System UI fonts
```
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
```

**Text Styles:**
```
H1 (Hero):      36px / 44px line-height / Bold / Slate-900
H2 (Section):   30px / 36px line-height / Bold / Slate-900
H3 (Card):      24px / 32px line-height / Semibold / Slate-900
H4 (Subsection):20px / 28px line-height / Semibold / Slate-900
Body Large:     18px / 28px line-height / Regular / Slate-600
Body:           16px / 24px line-height / Regular / Slate-700
Body Small:     14px / 20px line-height / Regular / Slate-600
Caption:        12px / 16px line-height / Regular / Slate-500
```

---

### Spacing System

**Base Unit:** 4px

```
Space-1:  4px
Space-2:  8px
Space-3:  12px
Space-4:  16px
Space-6:  24px
Space-8:  32px
Space-12: 48px
Space-16: 64px
Space-24: 96px
```

---

### Border Radius

```
Rounded-sm:  2px  (Small elements)
Rounded:     4px  (Buttons, inputs)
Rounded-md:  6px  (Cards)
Rounded-lg:  8px  (Large cards)
Rounded-xl:  12px (Modals)
Rounded-full: 9999px (Pills, avatars)
```

---

### Shadows

```
Shadow-sm:  0 1px 2px 0 rgba(0,0,0,0.05)
Shadow:     0 1px 3px 0 rgba(0,0,0,0.1)
Shadow-md:  0 4px 6px -1px rgba(0,0,0,0.1)
Shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.1)
Shadow-xl:  0 20px 25px -5px rgba(0,0,0,0.1)
```

---

## 📱 SCREEN SIZES

```
Mobile:   375px - 767px
Tablet:   768px - 1023px
Desktop:  1024px - 1440px+
Max Width: 1280px (container)
```

---

## 🧩 COMPONENT SPECIFICATIONS

### 1. Buttons

**Primary Button (Green)**
```
Width: Auto (padding based)
Height: 40px
Padding: 10px 16px
Background: Green-600 (#16A34A)
Text: White, 14px, Medium
Border Radius: 6px
Hover: Green-700 (#15803D)
```

**Secondary Button (Outline)**
```
Width: Auto
Height: 40px
Padding: 10px 16px
Background: Transparent
Border: 1px solid Slate-200
Text: Slate-700, 14px, Medium
Border Radius: 6px
Hover: Slate-100 background
```

**Icon Button**
```
Width: 40px
Height: 40px
Icon Size: 20px
Background: Transparent
Border Radius: 6px
Hover: Slate-100 background
```

---

### 2. Input Fields

**Text Input**
```
Width: 100% (or fixed)
Height: 40px
Padding: 10px 12px
Background: White
Border: 1px solid Slate-200
Border Radius: 6px
Text: Slate-900, 14px
Placeholder: Slate-400, 14px
Focus: Border Green-600, Shadow
```

**Textarea**
```
Width: 100%
Min Height: 120px
Padding: 12px
Background: White
Border: 1px solid Slate-200
Border Radius: 6px
Text: Slate-900, 14px
Resize: Vertical
```

**Select Dropdown**
```
Width: 100%
Height: 40px
Padding: 10px 12px
Background: White
Border: 1px solid Slate-200
Border Radius: 6px
Icon: Chevron down, 16px
```

---

### 3. Cards

**Standard Card**
```
Width: 100% (or fixed)
Padding: 24px
Background: White
Border: 1px solid Green-100
Border Radius: 8px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Hover: Shadow-lg
```

**Project Card (Browse Projects)**
```
Width: 100%
Padding: 24px
Background: White
Border: 1px solid Green-100
Border Radius: 8px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Hover: Shadow-lg (0 10px 15px rgba(0,0,0,0.1))

Inner Structure:
- Header: Title (24px) + Badge (right aligned)
- Meta Info Row: Icon + Text (14px, Slate-600)
- Description: 16px, Slate-700
- Skills Row: Badge pills
- Footer: Avatar + Info + Buttons (right aligned)
```

---

### 4. Badges

**Status Badge**
```
Height: 24px
Padding: 4px 12px
Background: Green-600
Text: White, 12px, Medium
Border Radius: 12px (full pill)
```

**Category Badge**
```
Height: 24px
Padding: 4px 12px
Background: Green-50
Text: Green-700, 12px, Medium
Border: 1px solid Green-200
Border Radius: 12px
```

**Skill Badge (Outline)**
```
Height: 28px
Padding: 6px 12px
Background: Transparent
Text: Green-700, 13px, Regular
Border: 1px solid Green-200
Border Radius: 14px
```

**Notification Badge (Counter)**
```
Width: 20px
Height: 20px
Background: Green-600
Text: White, 11px, Bold
Border Radius: 10px (circle)
Position: Absolute top-right (-4px, -4px)
```

---

### 5. Navigation Bar

**Desktop Navbar**
```
Width: 100%
Height: 64px
Background: White
Border Bottom: 1px solid Slate-200
Shadow: 0 1px 3px rgba(0,0,0,0.05)
Position: Sticky top

Container:
- Max Width: 1280px
- Padding: 0 24px
- Display: Flex, Space Between

Logo:
- Height: 48px
- Left aligned

Nav Links:
- Spacing: 4px between items
- Button style (ghost)
- Active: Green-50 background, Green-700 text

Right Actions:
- Icon buttons
- Spacing: 12px
- Sign In button (primary green)
```

---

### 6. Dropdown Menu

**Custom Dropdown**
```
Min Width: 200px
Background: White
Border: 1px solid Slate-200
Border Radius: 8px
Shadow: 0 10px 15px rgba(0,0,0,0.1)
Position: Absolute (8px below trigger)

Dropdown Item:
- Padding: 8px 16px
- Text: Slate-700, 14px
- Hover: Slate-100 background
- Cursor: Pointer

Separator:
- Height: 1px
- Background: Slate-200
- Margin: 4px 0
```

**Notification Dropdown**
```
Width: 320px
Max Height: 400px
Overflow: Auto

Header:
- Padding: 12px 16px
- Border Bottom: 1px solid Slate-200
- Title: 16px Semibold

Notification Item:
- Padding: 12px 16px
- Title: 14px Slate-900
- Timestamp: 12px Slate-500
- Hover: Slate-50 background

Footer:
- Padding: 8px
- Border Top: 1px solid Slate-200
- "View All" button
```

---

### 7. Avatar

**User Avatar**
```
Size Options:
- Small: 32px × 32px
- Medium: 48px × 48px
- Large: 64px × 64px

Border Radius: Full circle
Background: Slate-200 (fallback)
Image: Fit cover
Border: 2px solid White (optional)

With Verification Badge:
- Badge: 16px × 16px
- Icon: Checkmark, White
- Background: Green-600
- Position: Bottom-right, overlapping
- Border: 2px solid White
```

---

### 8. Modal/Dialog

**Application Modal (Browse Projects)**
```
Max Width: 672px (2xl)
Background: White
Border Radius: 12px
Shadow: 0 25px 50px rgba(0,0,0,0.2)
Overlay: rgba(0,0,0,0.5)

Structure:
Header:
- Padding: 24px 24px 16px
- Title: 20px Semibold
- Description: 14px Slate-600
- Close button: Top-right, 32px × 32px

Content:
- Padding: 0 24px 24px
- Spacing: 16px between fields

Footer:
- Padding: 16px 24px
- Border Top: 1px solid Slate-100
- Buttons: Right aligned
```

---

## 📄 PAGE LAYOUTS

### HOME PAGE

**Dimensions:** Desktop 1440px, Mobile 375px

```
┌────────────────────────────────────────────┐
│ NAVBAR (64px height)                       │
├────────────────────────────────────────────┤
│ HERO SECTION (600px height)                │
│ ┌──────────────────────────────────────┐   │
│ │ Background: Gradient Green-50→Slate-50│  │
│ │ Container: 1280px max, centered       │  │
│ │                                       │  │
│ │ Left Column (60%):                    │  │
│ │   H1: 48px Bold                       │  │
│ │   Subtitle: 20px Slate-600            │  │
│ │   Buttons: 32px spacing               │  │
│ │                                       │  │
│ │ Right Column (40%):                   │  │
│ │   Feature badges grid                 │  │
│ └──────────────────────────────────────┘  │
├────────────────────────────────────────────┤
│ HOW IT WORKS (400px height)                │
│ ┌──────────────────────────────────────┐   │
│ │ Padding: 96px 0                       │  │
│ │ Title: 36px centered                  │  │
│ │ 3 Column Grid (gap: 32px)             │  │
│ │                                       │  │
│ │ Card:                                 │  │
│ │   - Number badge: 64px circle         │  │
│ │   - Title: 20px                       │  │
│ │   - Description: 16px                 │  │
│ └──────────────────────────────────────┘  │
├────────────────────────────────────────────┤
│ CATEGORIES SECTION (500px height)          │
│ 4 Column Grid (gap: 24px)                  │
│ Each card: Icon + Title + Description      │
├────────────────────────────────────────────┤
│ FEATURED EXPERTS (600px height)            │
│ 3 Column Grid (gap: 24px)                  │
│ Cards with avatar, name, rating, skills    │
├────────────────────────────────────────────┤
│ STATS SECTION (300px height)               │
│ 4 Column Grid                              │
│ Background: Green-50                       │
├────────────────────────────────────────────┤
│ CTA SECTION (400px height)                 │
│ Centered content                           │
│ Background: Gradient                       │
├────────────────────────────────────────────┤
│ FOOTER (300px height)                      │
└────────────────────────────────────────────┘
```

---

### BROWSE PROJECTS PAGE

**Dimensions:** Desktop 1440px, Mobile 375px

```
┌────────────────────────────────────────────┐
│ NAVBAR (64px)                              │
├────────────────────────────────────────────┤
│ PAGE HEADER (160px)                        │
│ Container: 1280px                          │
│ Padding: 32px 24px                         │
│ Background: Gradient Green-50→Slate-50     │
│                                            │
│ Title: 36px Bold                           │
│ Subtitle: 20px Slate-600                   │
├────────────────────────────────────────────┤
│ FILTERS CARD (100px)                       │
│ Card padding: 24px                         │
│ Grid: 2-2-1-1 (search takes 2 cols)        │
│ Gap: 16px                                  │
├────────────────────────────────────────────┤
│ STATS ROW (120px)                          │
│ 4 Column Grid                              │
│ Gap: 16px                                  │
│ Each stat card:                            │
│   - Icon: 32px                             │
│   - Value: 30px Bold                       │
│   - Label: 14px                            │
├────────────────────────────────────────────┤
│ PROJECT CARDS (Auto height)                │
│ Stack vertically                           │
│ Gap: 24px                                  │
│                                            │
│ PROJECT CARD SPEC:                         │
│ ┌────────────────────────────────────┐    │
│ │ Padding: 24px                      │    │
│ │                                    │    │
│ │ Header Section (60px):             │    │
│ │   Left: Title (24px) + Meta row    │    │
│ │   Right: Budget (24px Green)       │    │
│ │                                    │    │
│ │ Description (80px):                │    │
│ │   Text: 16px, 4 lines max          │    │
│ │                                    │    │
│ │ Skills Row (40px):                 │    │
│ │   Badge pills, wrap, gap: 8px      │    │
│ │                                    │    │
│ │ Footer Section (72px):             │    │
│ │   Left: Avatar (48px) + Info       │    │
│ │   Right: 2 Buttons                 │    │
│ │     - Submit Bid (outline)         │    │
│ │     - Apply Now (green primary)    │    │
│ └────────────────────────────────────┘    │
├────────────────────────────────────────────┤
│ LOAD MORE BUTTON (80px)                    │
│ Centered                                   │
├────────────────────────────────────────────┤
│ FOOTER                                     │
└────────────────────────────────────────────┘

APPLICATION MODAL (Overlay):
┌────────────────────────────────────────────┐
│ MODAL (672px width)                        │
│ ┌────────────────────────────────────┐    │
│ │ Header (80px)                      │    │
│ │   Title: "Apply for Project"      │    │
│ │   Close button [X]                 │    │
│ ├────────────────────────────────────┤    │
│ │ Content (Auto, max 600px height)   │    │
│ │                                    │    │
│ │ Cover Letter:                      │    │
│ │   Label + Textarea (120px)         │    │
│ │                                    │    │
│ │ Proposed Budget:                   │    │
│ │   Label + Input (64px)             │    │
│ │                                    │    │
│ │ Estimated Duration:                │    │
│ │   Label + Input (64px)             │    │
│ │                                    │    │
│ │ Availability:                      │    │
│ │   Label + Input (64px)             │    │
│ │                                    │    │
│ │ Checkboxes:                        │    │
│ │   ☐ Terms & Conditions             │    │
│ │   ☐ NDA Agreement                  │    │
│ │                                    │    │
│ ├────────────────────────────────────┤    │
│ │ Footer (72px)                      │    │
│ │   [Submit Application] button      │    │
│ └────────────────────────────────────┘    │
└────────────────────────────────────────────┘
```

---

### USER LEVELS PAGE

**Dimensions:** Desktop 1440px, Mobile 375px

```
┌────────────────────────────────────────────┐
│ NAVBAR (64px)                              │
├────────────────────────────────────────────┤
│ HEADER (200px)                             │
│ Title + Current Tier Display               │
│ Progress Bar to next level                 │
├────────────────────────────────────────────┤
│ TIER COMPARISON TABLE                      │
│ ┌────────────────────────────────────┐    │
│ │ Table Header (56px):               │    │
│ │   Feature | Bronze | Silver | Gold│    │
│ │            | Plat                   │    │
│ ├────────────────────────────────────┤    │
│ │ Rows (48px each):                  │    │
│ │   Fee %                            │    │
│ │   Monthly Bids                     │    │
│ │   Featured Profile                 │    │
│ │   Priority Support                 │    │
│ │   Verification Badge               │    │
│ │   Analytics                        │    │
│ │   Custom Portfolio                 │    │
│ │   API Access                       │    │
│ └────────────────────────────────────┘    │
├────────────────────────────────────────────┤
│ UPGRADE SECTION (120px)                    │
│ Centered button                            │
└────────────────────────────────────────────┘
```

---

### DASHBOARD PAGE

**Dimensions:** Desktop 1440px, Mobile 375px

```
┌────────────────────────────────────────────┐
│ NAVBAR (64px)                              │
├────────────────────────────────────────────┤
│ WELCOME HEADER (120px)                     │
│ "Welcome back, [Name]"                     │
├────────────────────────────────────────────┤
│ STATS ROW (140px)                          │
│ 4 Cards: Active | Pending | Done | Earned │
├────────────────────────────────────────────┤
│ ACTIVE PROJECTS TABLE (Auto)               │
│ Table with actions                         │
├────────────────────────────────────────────┤
│ 2 COLUMN LAYOUT                            │
│ ┌─────────────┬──────────────┐            │
│ │ Activity    │ Milestones   │            │
│ │ Feed        │ Calendar     │            │
│ │ (400px)     │ (400px)      │            │
│ └─────────────┴──────────────┘            │
└────────────────────────────────────────────┘
```

---

## 🎯 ICON SPECIFICATIONS

**Icon Library:** Lucide React

**Icon Sizes:**
```
Small:  16px (badges, inline)
Medium: 20px (buttons, nav)
Large:  24px (page headers)
XL:     32px (stats, features)
```

**Commonly Used Icons:**
```
- CheckCircle (verification, success)
- Bell (notifications)
- User (profile)
- MessageSquare (messages)
- FolderOpen (files)
- Star (ratings)
- MapPin (location)
- DollarSign (money)
- Clock (time)
- Briefcase (projects)
- TrendingUp (growth)
- Calendar (dates)
- Users (teams)
- FileText (documents)
```

---

## 📊 RESPONSIVE BREAKPOINTS

### Mobile (375px - 767px)
```
- Single column layouts
- Stacked navigation (hamburger menu)
- Full-width cards
- Reduced padding (16px)
- Smaller text sizes
- Touch-friendly buttons (min 44px)
```

### Tablet (768px - 1023px)
```
- 2 column grids
- Horizontal navigation with dropdowns
- Medium padding (24px)
- Standard text sizes
```

### Desktop (1024px+)
```
- 3-4 column grids
- Full navigation bar
- Large padding (32px+)
- Hover states visible
- Max container: 1280px
```

---

## 🔄 INTERACTION STATES

### Button States
```
Default:  Green-600
Hover:    Green-700, slight scale (1.02)
Active:   Green-800, scale (0.98)
Disabled: Slate-400, opacity 50%, no cursor
Focus:    Green-600, ring offset 2px
```

### Input States
```
Default:  Border Slate-200
Hover:    Border Slate-300
Focus:    Border Green-600, shadow glow
Error:    Border Red-500, red text
Disabled: Background Slate-50, opacity 60%
```

### Card States
```
Default:  Shadow-sm
Hover:    Shadow-lg, slight translateY(-2px)
Active:   Shadow-md, translateY(0)
```

---

## 📦 COMPONENT LIBRARY STRUCTURE

### Atoms (Basic Elements)
```
- Button (primary, secondary, ghost, icon)
- Input (text, email, password, number)
- Textarea
- Checkbox
- Radio button
- Select dropdown
- Badge (status, category, skill, counter)
- Avatar
- Icon
- Label
- Separator
```

### Molecules (Combined Elements)
```
- Input with label
- Search bar with icon
- Card header
- Card footer
- Stat card
- Notification item
- Dropdown menu item
- Nav link with badge
- Avatar with verification
- Rating display (stars + number)
```

### Organisms (Complex Components)
```
- Navbar with dropdowns
- Footer with columns
- Project card
- Service card
- Profile header
- Sidebar navigation
- Data table
- Modal/dialog
- Form sections
- Activity feed
```

### Templates (Page Layouts)
```
- Homepage layout
- Browse layout (projects/services)
- Dashboard layout
- Profile layout
- Admin layout
- Authentication layout
```

---

## 🎨 CREATING IN FIGMA

### Step-by-Step Guide

1. **Set Up Artboards**
   - Desktop: 1440px × 1024px
   - Mobile: 375px × 667px

2. **Create Color Styles**
   - Add all colors from palette
   - Name: Green/600, Slate/900, etc.

3. **Create Text Styles**
   - H1, H2, H3, H4, Body, Caption
   - Apply font sizes and weights

4. **Build Components**
   - Start with atoms (buttons, inputs)
   - Create variants for states
   - Use auto-layout for flexibility

5. **Create Pages**
   - Use 12-column grid (64px gutters)
   - Apply spacing system consistently
   - Use constraints for responsive

6. **Add Interactions**
   - Hover states
   - Click states
   - Transitions (300ms ease)

---

## 📥 EXPORT SETTINGS

**Icons**
```
Format: SVG
Size: 24px × 24px
Stroke: 2px
```

**Images**
```
Format: PNG (2x for retina)
Quality: 80%
```

**Logos**
```
Format: SVG or PNG with transparency
Multiple sizes: 32px, 48px, 64px, 128px
```

---

## ✅ DESIGN CHECKLIST

- [ ] All color styles defined
- [ ] All text styles created
- [ ] Button component with variants
- [ ] Input components
- [ ] Card components
- [ ] Navigation bar
- [ ] Footer
- [ ] Modal/dialog
- [ ] Form layouts
- [ ] Responsive breakpoints
- [ ] Hover states
- [ ] Focus states
- [ ] Error states
- [ ] Loading states
- [ ] Empty states
- [ ] Success states

---

**Ready to design in Figma!** 🎨

Use these specifications to create pixel-perfect designs that match the implemented SETReG Marketplace.
