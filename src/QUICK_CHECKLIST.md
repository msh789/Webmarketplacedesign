# ✅ Email Auth Configuration - Quick Checklist

Print this out or keep it on your second monitor!

---

## 🔧 Configuration (2 minutes)

### **Supabase Dashboard:**

**Step 1: Enable Email Confirmation**
- [ ] Go to Settings → Authentication
- [ ] Scroll to "Email Auth" section
- [ ] ✅ Check "Enable email confirmations"
- [ ] Click "Save"

**Step 2: Configure URLs**
- [ ] Go to Settings → API
- [ ] Set Site URL: `http://localhost:5173`
- [ ] Add Redirect URL: `http://localhost:5173/verify-email`
- [ ] Add Redirect URL: `http://localhost:5173/login`
- [ ] Add Redirect URL: `http://localhost:5173/*`
- [ ] Click "Save"

**Step 3: Check Email Template (Optional)**
- [ ] Go to Authentication → Email Templates
- [ ] Select "Confirm signup"
- [ ] Verify {{ .ConfirmationURL }} is present
- [ ] Customize if desired (optional)
- [ ] Click "Save"

---

## 🧪 Testing (5 minutes)

### **Run App:**
- [ ] Terminal: `npm run dev`
- [ ] Open: http://localhost:5173

### **Register:**
- [ ] Go to /register
- [ ] Fill form with REAL email
- [ ] Click "Create Account"
- [ ] See "Verify Your Email" screen ✅

### **Verify Email:**
- [ ] Check email inbox
- [ ] Find email from Supabase
- [ ] Click verification link
- [ ] See "Email Verified!" page ✅

### **Sign In:**
- [ ] Click "Continue to Sign In"
- [ ] Enter email & password
- [ ] Click "Sign In"
- [ ] Redirected to /dashboard ✅

### **Check Navbar:**
- [ ] "Sign In" button is GONE ✅
- [ ] User dropdown visible ✅
- [ ] Messages icon visible ✅
- [ ] Notifications icon visible ✅

### **Logout:**
- [ ] Click user icon dropdown
- [ ] Click "Logout"
- [ ] Redirected to homepage ✅
- [ ] "Sign In" button is BACK ✅

### **Verify in Supabase:**
- [ ] Authentication → Users
- [ ] Find your test user
- [ ] "Email Confirmed" = ✅
- [ ] Table Editor → profiles
- [ ] Your profile exists ✅

---

## ✅ Success Criteria

All checkboxes above should be checked! ✅

If any failed, see CONFIGURE_NOW.md troubleshooting section.

---

## 🚀 Next Steps

Choose one:
- [ ] Continue building features
- [ ] Customize email template
- [ ] Set up custom SMTP
- [ ] Deploy to production

---

## 📚 Documentation

- **Detailed guide:** CONFIGURE_NOW.md
- **Quick reference:** EMAIL_AUTH_SUMMARY.md
- **Setup help:** EMAIL_AUTHENTICATION_SETUP.md
- **Backend info:** BACKEND_README.md

---

**Time to complete:** ~7 minutes total
**Status:** Ready to go! 🚀
