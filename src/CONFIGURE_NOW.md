# 🚀 Configure Email Authentication - Step by Step

## Let's Get This Done! (2 Minutes)

Follow these exact steps to configure your email authentication.

---

## ✅ Step 1: Access Supabase Dashboard (30 seconds)

1. **Open your browser**
2. **Go to:** https://app.supabase.com
3. **Sign in** to your Supabase account
4. **Select your project** (the one you created for SETReG)

---

## ✅ Step 2: Enable Email Confirmation (1 minute)

### **2.1 Navigate to Settings**
1. On the left sidebar, click the **⚙️ Settings** icon (bottom of sidebar)
2. Click **"Authentication"** in the settings menu

### **2.2 Enable Email Confirmation**
1. Scroll down to **"Email Auth"** section
2. Find the checkbox that says **"Enable email confirmations"**
3. ✅ **CHECK this box**
4. Click **"Save"** button at the bottom

**✅ What this does:** Users must verify their email before they can sign in.

---

## ✅ Step 3: Configure Site URL (30 seconds)

### **3.1 Go to API Settings**
1. Click **⚙️ Settings** (left sidebar)
2. Click **"API"** in the settings menu

### **3.2 Set Site URL**
1. Scroll to **"URL Configuration"** section
2. Find **"Site URL"** field
3. Enter: `http://localhost:5173`
4. Click **"Save"**

### **3.3 Add Redirect URLs**
1. Find **"Redirect URLs"** field (right below Site URL)
2. Click **"Add URL"**
3. Add these URLs (one at a time):
   - `http://localhost:5173/verify-email`
   - `http://localhost:5173/login`
   - `http://localhost:5173/*` (wildcard for all routes)
4. Click **"Save"**

**✅ What this does:** Tells Supabase where to redirect users after email verification.

---

## ✅ Step 4: Verify Email Template (Optional - 1 minute)

### **4.1 Check Email Template**
1. Click **"Authentication"** in left sidebar (main menu, not settings)
2. Click **"Email Templates"** tab
3. Select **"Confirm signup"** from dropdown

### **4.2 Review Template**
You should see something like:

```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
```

**This is already configured!** The `{{ .ConfirmationURL }}` will automatically include your redirect URL.

### **4.3 Customize (Optional)**
You can customize the HTML/CSS:
- Change colors to green (#16a34a)
- Add your logo
- Modify text

**For now, the default works perfectly!** Come back later to customize.

---

## ✅ Step 5: Test Configuration (5 minutes)

### **5.1 Start Your App**
```bash
# In your terminal
npm run dev
```

### **5.2 Register a Test Account**
1. Open: http://localhost:5173/register
2. Fill out the form:
   - **Full Name:** Test User
   - **Email:** YOUR_REAL_EMAIL@gmail.com ← **Use your real email!**
   - **Password:** Test123!
   - **Confirm Password:** Test123!
   - **Account Type:** Expert or Client
   - ✅ Check "I agree to terms"
3. Click **"Create Account"**

### **5.3 Check Your Email**
1. You should see: **"Verify Your Email"** screen in the app ✅
2. Check your email inbox (the one you used)
3. Look for email from: **no-reply@supabase.io** or your project name
4. Subject: **"Confirm your signup"** or similar

**📧 Email should arrive within 30 seconds!**

**If email doesn't arrive:**
- Check spam/junk folder
- Wait 1-2 minutes (Supabase can be slow on free tier)
- Try the "Resend Email" button in the app

### **5.4 Verify Your Email**
1. Open the verification email
2. Click the **"Confirm your mail"** button/link
3. You should be redirected to: http://localhost:5173/verify-email
4. You should see: **"Email Verified!"** page with green checkmark ✅

### **5.5 Test Sign In**
1. Click **"Continue to Sign In"** button
2. Or manually go to: http://localhost:5173/login
3. Enter your email and password
4. Click **"Sign In"**
5. You should be redirected to: http://localhost:5173/dashboard
6. **Look at the navbar** → "Sign In" button should be GONE! ✅

### **5.6 Test Navbar**
1. Look at top-right corner
2. You should see:
   - ✅ Messages icon (with badge)
   - ✅ Files icon
   - ✅ Notifications icon (with badge)
   - ✅ User profile icon
   - ❌ NO "Sign In" button!

### **5.7 Test Logout**
1. Click the **User icon** in navbar
2. Dropdown menu appears
3. Click **"Logout"** at bottom
4. You're redirected to homepage
5. **Look at navbar** → "Sign In" button is BACK! ✅

---

## ✅ Step 6: Verify in Supabase Dashboard

### **6.1 Check User Created**
1. Go back to Supabase Dashboard
2. Click **"Authentication"** in left sidebar
3. Click **"Users"** tab
4. You should see your test user listed
5. Check the **"Email Confirmed"** column → should show ✅ (checkmark)

### **6.2 Check Profile Created**
1. Click **"Table Editor"** in left sidebar
2. Select **"profiles"** table
3. You should see a row with:
   - Your email
   - Your full name
   - user_type: 'expert' or 'client'
   - user_level: 'bronze'
   - is_verified: false (will be true after identity verification)

**✅ Perfect! Everything is working!**

---

## 🎉 Configuration Complete!

You've successfully configured:
- ✅ Email confirmation enabled
- ✅ Site URL set
- ✅ Redirect URLs configured
- ✅ Email template ready
- ✅ Tested registration
- ✅ Tested email verification
- ✅ Tested sign in
- ✅ Tested navbar behavior
- ✅ Tested logout

---

## 🚀 What's Next?

### **Option 1: Continue Development**
Your app is ready to use! Keep building features:
- Browse projects
- Submit bids
- Messaging
- File uploads
- Etc.

### **Option 2: Customize Email Template**
Make the verification email match your brand:

1. Go to: **Authentication** → **Email Templates**
2. Select: **"Confirm signup"**
3. Edit HTML:

```html
<div style="font-family: system-ui; max-width: 600px; margin: 0 auto;">
  <div style="background: #f0fdf4; padding: 40px; border-radius: 12px;">
    <div style="background: white; padding: 40px; border-radius: 8px; border: 2px solid #16a34a;">
      
      <!-- Logo (optional) -->
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #16a34a; font-size: 28px; margin: 0;">SETReG</h1>
      </div>
      
      <!-- Title -->
      <h2 style="color: #0f172a; font-size: 24px; margin-bottom: 16px;">
        Verify Your Email
      </h2>
      
      <!-- Message -->
      <p style="color: #475569; line-height: 1.6; margin-bottom: 24px;">
        Thanks for signing up for SETReG Marketplace! Click the button below to verify your email address and start connecting with engineering talent.
      </p>
      
      <!-- Button -->
      <div style="text-align: center; margin: 32px 0;">
        <a href="{{ .ConfirmationURL }}" 
           style="display: inline-block; background: #16a34a; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
          Verify Email Address
        </a>
      </div>
      
      <!-- Footer -->
      <p style="color: #64748b; font-size: 14px; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
        This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
      </p>
      
      <p style="color: #94a3b8; font-size: 12px; margin-top: 16px;">
        © 2024 SETReG Marketplace. Building sustainable engineering excellence.
      </p>
      
    </div>
  </div>
</div>
```

4. Click **"Save"**
5. Test by registering a new user!

### **Option 3: Set Up Custom SMTP (For Production)**

**When you're ready to deploy:**

The free Supabase email has limits:
- 3 emails per hour (development)
- 4 emails per hour (free tier)

For production, use a proper email service:

#### **Recommended: SendGrid (Free tier: 100 emails/day)**

1. Go to: https://sendgrid.com
2. Sign up for free account
3. Verify your sender email
4. Create API key
5. In Supabase:
   - Settings → Authentication → SMTP Settings
   - Enable custom SMTP
   - SMTP Host: `smtp.sendgrid.net`
   - Port: `587`
   - Username: `apikey`
   - Password: YOUR_SENDGRID_API_KEY
   - Sender email: your-verified-email@domain.com
   - Sender name: `SETReG Marketplace`
6. Save
7. Test!

#### **Other Options:**
- **Mailgun** (Free: 100 emails/day)
- **AWS SES** (Very cheap: $0.10 per 1000 emails)
- **Postmark** (Free: 100 emails/month)
- **Resend** (Free: 100 emails/day)

---

## 📊 Production Deployment

### **Before Deploying to Production:**

#### **1. Update Environment Variables**
Create `.env.production`:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

#### **2. Update Supabase Site URL**
1. Settings → API → URL Configuration
2. Change Site URL to: `https://your-domain.com`
3. Update Redirect URLs:
   - `https://your-domain.com/verify-email`
   - `https://your-domain.com/login`
   - `https://your-domain.com/*`

#### **3. Set Up Custom SMTP**
- Follow SendGrid setup above
- Test email delivery

#### **4. Build & Deploy**
```bash
# Build
npm run build

# Deploy to Vercel
npm i -g vercel
vercel

# Or deploy to Netlify
npm i -g netlify-cli
netlify deploy
```

#### **5. Add Environment Variables to Deployment**
In Vercel/Netlify dashboard:
- Add `VITE_SUPABASE_URL`
- Add `VITE_SUPABASE_ANON_KEY`
- Redeploy

---

## 🐛 Troubleshooting

### **"Email not arriving"**
1. Check spam folder
2. Wait 1-2 minutes (Supabase free tier can be slow)
3. Check Supabase logs:
   - Logs → Auth Logs
   - Filter by your email
4. Verify email quota not exceeded:
   - Settings → Usage
5. Try clicking "Resend Email" in app

### **"Invalid redirect URL"**
1. Check Site URL matches your domain
2. Check Redirect URLs include /verify-email
3. Make sure no typos (trailing slashes matter!)
4. Restart your dev server

### **"Sign In button still showing"**
1. Make sure you're actually logged in
2. Check browser console for errors
3. Try hard refresh (Ctrl+Shift+R)
4. Check AuthContext is working:
   ```javascript
   // Add this to any component
   const { user } = useAuth();
   console.log('User:', user);
   ```

### **"Can't sign in after verification"**
1. Wait 10 seconds after clicking verify link
2. Check Supabase Users table - is email confirmed?
3. Try password reset if needed
4. Make sure you're using correct password

### **"Verification link expired"**
1. Links expire after 24 hours
2. Click "Resend Email" button
3. Check latest email (ignore old ones)

---

## ✅ Final Checklist

Configuration:
- [x] Email confirmation enabled
- [x] Site URL configured
- [x] Redirect URLs added
- [x] Email template reviewed

Testing:
- [x] Registered test user
- [x] Received verification email
- [x] Clicked verification link
- [x] Email verified successfully
- [x] Signed in successfully
- [x] "Sign In" button hidden
- [x] Logout works
- [x] "Sign In" button returns

Ready for:
- [ ] Continue development
- [ ] Customize email template (optional)
- [ ] Set up custom SMTP (for production)
- [ ] Deploy to production

---

## 🎉 You're Done!

**Your email authentication is fully configured and working!**

**What you can do now:**
- ✅ Users can register
- ✅ Emails sent automatically
- ✅ Users verify their email
- ✅ Users sign in
- ✅ Navbar updates correctly
- ✅ Everything works!

**Next steps:**
1. Keep building features
2. Test with more users
3. Customize email template
4. Deploy to production

---

## 📚 Need Help?

- **Setup issues:** Re-read this guide
- **Email problems:** Check troubleshooting section
- **Code questions:** Check EMAIL_AUTH_SUMMARY.md
- **Backend info:** Check BACKEND_README.md

---

**Congratulations! Your authentication system is live! 🚀**

Now go build something amazing! 💚
