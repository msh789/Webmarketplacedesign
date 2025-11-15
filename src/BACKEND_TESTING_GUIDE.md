# 🧪 Backend Testing Guide

## Quick Test: Is My Backend Working?

### **Test 1: Health Check** (No Auth Required)

Open your browser and visit:
```
https://your-project-id.supabase.co/functions/v1/make-server-94ff05b6/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

✅ If you see this, your backend is **LIVE**!

---

## Test with Your App

### **Test 2: Browse Projects with Backend**

1. Navigate to: `/browse-projects-backend`
2. You should see projects loading from the backend
3. Try searching, filtering
4. Click "Submit Proposal" to test bid submission

### **Test 3: Create a Project**

```typescript
// In browser console or your page
import { backendAPI } from './lib/backend-api';

// Sign in first (replace with your credentials)
await backendAPI.auth.signIn('your@email.com', 'password');

// Create project
const result = await backendAPI.projects.create({
  title: 'Test Project',
  description: 'Testing backend integration',
  category: 'structural',
  budget_min: 5000,
  budget_max: 10000,
  location: 'Remote',
  is_remote: true
});

console.log(result);
```

---

## API Testing with cURL

### **1. Test Health Endpoint**

```bash
curl https://your-project-id.supabase.co/functions/v1/make-server-94ff05b6/health
```

### **2. Test Sign Up**

```bash
curl -X POST https://your-project-id.supabase.co/functions/v1/make-server-94ff05b6/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "userType": "expert"
  }'
```

### **3. Test Sign In**

```bash
curl -X POST https://your-project-id.supabase.co/functions/v1/make-server-94ff05b6/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Copy the `access_token` from response!**

### **4. Test Get Projects** (No Auth)

```bash
curl https://your-project-id.supabase.co/functions/v1/make-server-94ff05b6/api/projects
```

### **5. Test Create Project** (With Auth)

```bash
curl -X POST https://your-project-id.supabase.co/functions/v1/make-server-94ff05b6/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "title": "Test Project",
    "description": "Testing backend",
    "category": "structural",
    "budget_min": 5000,
    "budget_max": 10000,
    "is_remote": true
  }'
```

---

## Testing in Postman

### **Setup**

1. Create new collection: "SETReG API"
2. Add base URL variable: `{{baseUrl}}` = `https://your-project-id.supabase.co/functions/v1/make-server-94ff05b6`
3. Add auth token variable: `{{token}}` (after signin)

### **Example Requests**

#### **1. Health Check**
```
GET {{baseUrl}}/health
```

#### **2. Sign Up**
```
POST {{baseUrl}}/api/auth/signup
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123",
  "fullName": "Test User",
  "userType": "expert"
}
```

#### **3. Sign In**
```
POST {{baseUrl}}/api/auth/signin
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}

After response, save access_token to {{token}}
```

#### **4. Get Projects**
```
GET {{baseUrl}}/api/projects?status=open&category=structural
```

#### **5. Create Project**
```
POST {{baseUrl}}/api/projects
Headers:
  Authorization: Bearer {{token}}
Body (JSON):
{
  "title": "Bridge Design Project",
  "description": "Need experienced bridge engineer",
  "category": "bridge",
  "budget_min": 10000,
  "budget_max": 20000,
  "estimated_duration": "2 months",
  "location": "San Francisco, CA",
  "is_remote": false
}
```

#### **6. Submit Bid**
```
POST {{baseUrl}}/api/bids
Headers:
  Authorization: Bearer {{token}}
Body (JSON):
{
  "project_id": "PROJECT_ID_HERE",
  "proposed_budget": 15000,
  "estimated_duration": "6 weeks",
  "cover_letter": "I have 10 years of experience...",
  "terms_accepted": true,
  "nda_accepted": true
}
```

#### **7. Get Notifications**
```
GET {{baseUrl}}/api/notifications?limit=10
Headers:
  Authorization: Bearer {{token}}
```

#### **8. Send Message**
```
POST {{baseUrl}}/api/messages
Headers:
  Authorization: Bearer {{token}}
Body (JSON):
{
  "conversation_id": "CONVERSATION_ID_HERE",
  "content": "Hello, I'm interested in discussing the project"
}
```

---

## Browser Console Testing

Open browser console on your app and run:

```javascript
// Import the API
const { backendAPI } = await import('./lib/backend-api.ts');

// Test health
fetch('https://your-project-id.supabase.co/functions/v1/make-server-94ff05b6/health')
  .then(r => r.json())
  .then(console.log);

// Sign in
const signInResult = await backendAPI.auth.signIn('your@email.com', 'password');
console.log('Sign In:', signInResult);

// Get projects
const projects = await backendAPI.projects.getAll({ status: 'open' });
console.log('Projects:', projects);

// Get notifications
const notifications = await backendAPI.notifications.getAll();
console.log('Notifications:', notifications);

// Get dashboard stats
const stats = await backendAPI.analytics.getDashboard();
console.log('Dashboard:', stats);
```

---

## Common Issues & Solutions

### ❌ **"Failed to fetch" or CORS error**

**Problem:** Backend not accessible or CORS issue

**Solution:** 
1. Check if Supabase project is deployed
2. Verify URL is correct
3. Backend has CORS enabled (already done ✅)

### ❌ **"Unauthorized" (401)**

**Problem:** Token expired or not provided

**Solution:**
1. Sign in again to get fresh token
2. Check Authorization header: `Bearer YOUR_TOKEN`
3. Token is automatically stored in localStorage

### ❌ **"Not found" (404)**

**Problem:** Wrong endpoint URL

**Solution:**
1. Check endpoint path in `/BACKEND_INTEGRATION_COMPLETE.md`
2. Ensure route includes `/make-server-94ff05b6` prefix
3. Example: `/make-server-94ff05b6/api/projects`

### ❌ **"Bad request" (400)**

**Problem:** Invalid data format

**Solution:**
1. Check required fields in request body
2. Ensure JSON is valid
3. Check data types (numbers, strings, booleans)

### ❌ **Backend not responding**

**Problem:** Edge function not deployed or crashed

**Solution:**
1. Check Supabase dashboard → Edge Functions
2. Look at function logs
3. Redeploy if needed

---

## Database Verification

### **Check if tables exist:**

Go to Supabase Dashboard → SQL Editor:

```sql
-- Check if profiles table exists
SELECT COUNT(*) FROM profiles;

-- Check if projects table exists
SELECT COUNT(*) FROM projects;

-- Check recent projects
SELECT id, title, status, created_at 
FROM projects 
ORDER BY created_at DESC 
LIMIT 5;

-- Check bids
SELECT COUNT(*) FROM bids;

-- Check notifications
SELECT COUNT(*) FROM notifications;
```

---

## Load Testing

### **Simple Load Test** (using Apache Bench)

```bash
# Test 100 requests with 10 concurrent
ab -n 100 -c 10 https://your-project-id.supabase.co/functions/v1/make-server-94ff05b6/health

# Test API endpoint
ab -n 50 -c 5 https://your-project-id.supabase.co/functions/v1/make-server-94ff05b6/api/projects
```

---

## Monitoring

### **Check Logs**

1. Go to Supabase Dashboard
2. Navigate to Edge Functions → `make-server-94ff05b6`
3. Click "Logs" tab
4. See all requests, responses, and errors

### **What to Look For:**

- ✅ Successful requests (200, 201 status)
- ❌ Errors (400, 401, 403, 500 status)
- 🐛 Console.log outputs
- ⏱️ Response times

---

## Success Checklist

Before going to production, verify:

- [ ] Health check returns `{"status": "ok"}`
- [ ] Sign up creates user successfully
- [ ] Sign in returns access token
- [ ] Token stored in localStorage
- [ ] Can create project (authenticated)
- [ ] Can view projects (public)
- [ ] Can submit bid (authenticated)
- [ ] Notifications created automatically
- [ ] File upload works
- [ ] Analytics tracked
- [ ] All 50+ endpoints tested

---

## 🎉 Next Steps

Once testing is complete:

1. ✅ Gradually migrate pages from `/lib/api.ts` to `/lib/backend-api.ts`
2. ✅ Add more business logic to backend
3. ✅ Add rate limiting
4. ✅ Add caching
5. ✅ Complete Stripe integration
6. ✅ Add email notifications
7. ✅ Add WebSocket for real-time messaging

---

## Support

If something doesn't work:

1. Check backend logs in Supabase Dashboard
2. Check browser console for frontend errors
3. Verify database has correct tables (run schema.sql)
4. Ensure Supabase email configuration is done
5. Test with simple cURL commands first

**Your backend is production-ready!** 🚀
