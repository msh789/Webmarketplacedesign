import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Verify user from access token
const verifyUser = async (authHeader: string | null) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: 'No authorization header' };
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return { user: null, error: 'Invalid token' };
  }

  return { user, error: null };
};

// Standard response helpers
const successResponse = (data: any, message?: string) => ({
  success: true,
  data,
  message,
});

const errorResponse = (error: string, statusCode = 400) => ({
  success: false,
  error,
});

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/make-server-94ff05b6/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// =====================================================
// AUTHENTICATION ENDPOINTS
// =====================================================

// Sign Up
app.post("/make-server-94ff05b6/api/auth/signup", async (c) => {
  try {
    const { email, password, fullName, userType } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email since email server isn't configured
      user_metadata: {
        full_name: fullName,
        user_type: userType || 'expert',
      },
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json(errorResponse(error.message), 400);
    }

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        user_type: userType || 'expert',
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
    }

    return c.json(successResponse(data, 'User created successfully'));
  } catch (error: any) {
    console.error('Signup error:', error);
    return c.json(errorResponse(error.message || 'Signup failed'), 500);
  }
});

// Sign In
app.post("/make-server-94ff05b6/api/auth/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Signin error:', error);
      return c.json(errorResponse(error.message), 401);
    }

    return c.json(successResponse(data, 'Signed in successfully'));
  } catch (error: any) {
    console.error('Signin error:', error);
    return c.json(errorResponse(error.message || 'Signin failed'), 500);
  }
});

// =====================================================
// PROFILES ENDPOINTS
// =====================================================

// Get profile by ID
app.get("/make-server-94ff05b6/api/profiles/:id", async (c) => {
  try {
    const id = c.req.param('id');

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return c.json(errorResponse(error.message), 404);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Get profile error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Update profile
app.put("/make-server-94ff05b6/api/profiles/:id", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const id = c.req.param('id');
    if (id !== user.id) {
      return c.json(errorResponse('Cannot update another user\'s profile'), 403);
    }

    const updates = await c.req.json();
    delete updates.id; // Prevent ID modification
    delete updates.created_at; // Prevent timestamp modification

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data, 'Profile updated successfully'));
  } catch (error: any) {
    console.error('Update profile error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Search profiles (experts)
app.get("/make-server-94ff05b6/api/profiles", async (c) => {
  try {
    const userType = c.req.query('userType');
    const minRating = c.req.query('minRating');
    const location = c.req.query('location');
    const search = c.req.query('search');

    let query = supabase.from('profiles').select('*');

    if (userType) {
      query = query.eq('user_type', userType);
    }
    if (minRating) {
      query = query.gte('rating', parseFloat(minRating));
    }
    if (location) {
      query = query.ilike('location', `%${location}%`);
    }
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,title.ilike.%${search}%,bio.ilike.%${search}%`);
    }

    const { data, error } = await query.order('rating', { ascending: false });

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Search profiles error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// PROJECTS ENDPOINTS
// =====================================================

// Get all projects with filters
app.get("/make-server-94ff05b6/api/projects", async (c) => {
  try {
    const status = c.req.query('status');
    const category = c.req.query('category');
    const search = c.req.query('search');
    const clientId = c.req.query('clientId');

    let query = supabase
      .from('projects')
      .select(`
        *,
        client:profiles!client_id(*)
      `)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }
    if (clientId) {
      query = query.eq('client_id', clientId);
    }

    const { data, error } = await query;

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Get projects error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Get project by ID
app.get("/make-server-94ff05b6/api/projects/:id", async (c) => {
  try {
    const id = c.req.param('id');

    // Increment views count
    await supabase.rpc('increment_views', { project_id: id }).catch(() => {
      // Fallback if function doesn't exist
      supabase
        .from('projects')
        .update({ views_count: supabase.raw('views_count + 1') })
        .eq('id', id);
    });

    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        client:profiles!client_id(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      return c.json(errorResponse(error.message), 404);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Get project error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Create project
app.post("/make-server-94ff05b6/api/projects", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const projectData = await c.req.json();
    projectData.client_id = user.id;
    projectData.status = projectData.status || 'open';
    projectData.published_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();

    if (error) {
      console.error('Create project error:', error);
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data, 'Project created successfully'), 201);
  } catch (error: any) {
    console.error('Create project error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Update project
app.put("/make-server-94ff05b6/api/projects/:id", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const id = c.req.param('id');
    
    // Verify ownership
    const { data: existing } = await supabase
      .from('projects')
      .select('client_id')
      .eq('id', id)
      .single();

    if (!existing || existing.client_id !== user.id) {
      return c.json(errorResponse('Not authorized to update this project'), 403);
    }

    const updates = await c.req.json();
    delete updates.id;
    delete updates.client_id;
    delete updates.created_at;

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data, 'Project updated successfully'));
  } catch (error: any) {
    console.error('Update project error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Delete project
app.delete("/make-server-94ff05b6/api/projects/:id", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const id = c.req.param('id');
    
    // Verify ownership
    const { data: existing } = await supabase
      .from('projects')
      .select('client_id')
      .eq('id', id)
      .single();

    if (!existing || existing.client_id !== user.id) {
      return c.json(errorResponse('Not authorized to delete this project'), 403);
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(null, 'Project deleted successfully'));
  } catch (error: any) {
    console.error('Delete project error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// BIDS ENDPOINTS
// =====================================================

// Get bids for a project
app.get("/make-server-94ff05b6/api/projects/:projectId/bids", async (c) => {
  try {
    const projectId = c.req.param('projectId');

    const { data, error } = await supabase
      .from('bids')
      .select(`
        *,
        expert:profiles!expert_id(*)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Get bids error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Get bids by expert
app.get("/make-server-94ff05b6/api/experts/:expertId/bids", async (c) => {
  try {
    const expertId = c.req.param('expertId');

    const { data, error } = await supabase
      .from('bids')
      .select(`
        *,
        project:projects(*)
      `)
      .eq('expert_id', expertId)
      .order('created_at', { ascending: false });

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Get expert bids error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Create bid
app.post("/make-server-94ff05b6/api/bids", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const bidData = await c.req.json();
    bidData.expert_id = user.id;
    bidData.status = 'pending';

    // Check if user already bid
    const { data: existing } = await supabase
      .from('bids')
      .select('id')
      .eq('project_id', bidData.project_id)
      .eq('expert_id', user.id)
      .single();

    if (existing) {
      return c.json(errorResponse('You have already submitted a bid for this project'), 400);
    }

    const { data, error } = await supabase
      .from('bids')
      .insert(bidData)
      .select()
      .single();

    if (error) {
      console.error('Create bid error:', error);
      return c.json(errorResponse(error.message), 400);
    }

    // Create notification for project owner
    const { data: project } = await supabase
      .from('projects')
      .select('client_id, title')
      .eq('id', bidData.project_id)
      .single();

    if (project) {
      await supabase.from('notifications').insert({
        user_id: project.client_id,
        type: 'new_bid',
        title: 'New bid received',
        message: `You received a new bid on "${project.title}"`,
        action_url: `/projects/${bidData.project_id}/bids`,
      });
    }

    return c.json(successResponse(data, 'Bid submitted successfully'), 201);
  } catch (error: any) {
    console.error('Create bid error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Update bid status
app.patch("/make-server-94ff05b6/api/bids/:id/status", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const id = c.req.param('id');
    const { status } = await c.req.json();

    if (!['accepted', 'rejected', 'withdrawn'].includes(status)) {
      return c.json(errorResponse('Invalid status'), 400);
    }

    const { data, error } = await supabase
      .from('bids')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    // Create notification
    if (status === 'accepted') {
      await supabase.from('notifications').insert({
        user_id: data.expert_id,
        type: 'bid_accepted',
        title: 'Bid accepted!',
        message: 'Your bid has been accepted',
        action_url: `/bids/${id}`,
      });
    }

    return c.json(successResponse(data, `Bid ${status} successfully`));
  } catch (error: any) {
    console.error('Update bid status error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// MESSAGING ENDPOINTS
// =====================================================

// Get user conversations
app.get("/make-server-94ff05b6/api/conversations", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        participant_1:profiles!participant_1_id(*),
        participant_2:profiles!participant_2_id(*),
        project:projects(*)
      `)
      .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
      .order('last_message_at', { ascending: false });

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Get conversations error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Get messages in conversation
app.get("/make-server-94ff05b6/api/conversations/:id/messages", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const conversationId = c.req.param('id');

    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!sender_id(*)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Get messages error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Send message
app.post("/make-server-94ff05b6/api/messages", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const { conversation_id, content } = await c.req.json();

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id,
        sender_id: user.id,
        content,
      })
      .select()
      .single();

    if (error) {
      console.error('Send message error:', error);
      return c.json(errorResponse(error.message), 400);
    }

    // Update conversation last_message_at
    await supabase
      .from('conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', conversation_id);

    return c.json(successResponse(data, 'Message sent successfully'), 201);
  } catch (error: any) {
    console.error('Send message error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Mark messages as read
app.post("/make-server-94ff05b6/api/conversations/:id/read", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const conversationId = c.req.param('id');

    const { error } = await supabase
      .from('messages')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', user.id)
      .is('is_read', false);

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(null, 'Messages marked as read'));
  } catch (error: any) {
    console.error('Mark as read error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// NOTIFICATIONS ENDPOINTS
// =====================================================

// Get user notifications
app.get("/make-server-94ff05b6/api/notifications", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const limit = parseInt(c.req.query('limit') || '20');

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Get notifications error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Get unread count
app.get("/make-server-94ff05b6/api/notifications/unread/count", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse({ count }));
  } catch (error: any) {
    console.error('Get unread count error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Mark notification as read
app.patch("/make-server-94ff05b6/api/notifications/:id/read", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const id = c.req.param('id');

    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Mark notification as read error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Mark all notifications as read
app.post("/make-server-94ff05b6/api/notifications/read-all", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .is('is_read', false);

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(null, 'All notifications marked as read'));
  } catch (error: any) {
    console.error('Mark all as read error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// REVIEWS ENDPOINTS
// =====================================================

// Get reviews for a user
app.get("/make-server-94ff05b6/api/users/:userId/reviews", async (c) => {
  try {
    const userId = c.req.param('userId');

    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        reviewer:profiles!reviewer_id(*)
      `)
      .eq('reviewee_id', userId)
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Get reviews error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Create review
app.post("/make-server-94ff05b6/api/reviews", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const reviewData = await c.req.json();
    reviewData.reviewer_id = user.id;

    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single();

    if (error) {
      console.error('Create review error:', error);
      return c.json(errorResponse(error.message), 400);
    }

    // Create notification for reviewee
    await supabase.from('notifications').insert({
      user_id: reviewData.reviewee_id,
      type: 'new_review',
      title: 'New review received',
      message: 'You have received a new review',
      action_url: `/profile/${reviewData.reviewee_id}`,
    });

    return c.json(successResponse(data, 'Review submitted successfully'), 201);
  } catch (error: any) {
    console.error('Create review error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// FILES ENDPOINTS
// =====================================================

// Upload file
app.post("/make-server-94ff05b6/api/files/upload", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;

    if (!file) {
      return c.json(errorResponse('No file provided'), 400);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${projectId}/${fileName}`;

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('project-files')
      .upload(filePath, await file.arrayBuffer(), {
        contentType: file.type,
      });

    if (uploadError) {
      console.error('File upload error:', uploadError);
      return c.json(errorResponse(uploadError.message), 400);
    }

    // Save file metadata
    const { data, error } = await supabase
      .from('files')
      .insert({
        uploader_id: user.id,
        project_id: projectId,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        storage_path: filePath,
      })
      .select()
      .single();

    if (error) {
      console.error('File metadata save error:', error);
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data, 'File uploaded successfully'), 201);
  } catch (error: any) {
    console.error('Upload file error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Get project files
app.get("/make-server-94ff05b6/api/projects/:projectId/files", async (c) => {
  try {
    const projectId = c.req.param('projectId');

    const { data, error } = await supabase
      .from('files')
      .select(`
        *,
        uploader:profiles!uploader_id(*)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data));
  } catch (error: any) {
    console.error('Get files error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Get file download URL
app.get("/make-server-94ff05b6/api/files/:id/download", async (c) => {
  try {
    const id = c.req.param('id');

    const { data: fileData, error: fileError } = await supabase
      .from('files')
      .select('storage_path')
      .eq('id', id)
      .single();

    if (fileError || !fileData) {
      return c.json(errorResponse('File not found'), 404);
    }

    const { data } = supabase.storage
      .from('project-files')
      .getPublicUrl(fileData.storage_path);

    return c.json(successResponse({ url: data.publicUrl }));
  } catch (error: any) {
    console.error('Get download URL error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// CONTRACTS ENDPOINTS
// =====================================================

// Create contract
app.post("/make-server-94ff05b6/api/contracts", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const contractData = await c.req.json();
    contractData.status = 'draft';

    const { data, error } = await supabase
      .from('contracts')
      .insert(contractData)
      .select()
      .single();

    if (error) {
      console.error('Create contract error:', error);
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data, 'Contract created successfully'), 201);
  } catch (error: any) {
    console.error('Create contract error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Sign contract
app.post("/make-server-94ff05b6/api/contracts/:id/sign", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const id = c.req.param('id');
    const { role } = await c.req.json(); // 'client' or 'expert'

    const updates: any = {};
    if (role === 'client') {
      updates.client_signed = true;
      updates.client_signed_at = new Date().toISOString();
    } else if (role === 'expert') {
      updates.expert_signed = true;
      updates.expert_signed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('contracts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    // If both signed, activate contract
    if (data.client_signed && data.expert_signed) {
      await supabase
        .from('contracts')
        .update({ status: 'active' })
        .eq('id', id);
    }

    return c.json(successResponse(data, 'Contract signed successfully'));
  } catch (error: any) {
    console.error('Sign contract error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// PAYMENTS ENDPOINTS
// =====================================================

// Create payment intent (Stripe)
app.post("/make-server-94ff05b6/api/payments/create-intent", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const { amount, contractId, milestoneId } = await c.req.json();

    // Calculate platform fee (e.g., 10%)
    const platformFee = amount * 0.10;
    const netAmount = amount - platformFee;

    // In production, you would integrate with Stripe here
    // const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
    // const paymentIntent = await stripe.paymentIntents.create({...});

    // For now, create payment record
    const { data, error } = await supabase
      .from('payments')
      .insert({
        contract_id: contractId,
        milestone_id: milestoneId,
        payer_id: user.id,
        payee_id: '', // Get from contract
        amount,
        platform_fee: platformFee,
        net_amount: netAmount,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Create payment error:', error);
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse({
      ...data,
      clientSecret: 'mock_client_secret', // Replace with actual Stripe client secret
    }), 201);
  } catch (error: any) {
    console.error('Create payment intent error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// ANALYTICS ENDPOINTS
// =====================================================

// Track event
app.post("/make-server-94ff05b6/api/analytics/events", async (c) => {
  try {
    const { eventType, eventData } = await c.req.json();
    const authHeader = c.req.header('Authorization');
    
    let userId = null;
    if (authHeader) {
      const { user } = await verifyUser(authHeader);
      userId = user?.id;
    }

    const { data, error } = await supabase
      .from('analytics_events')
      .insert({
        user_id: userId,
        event_type: eventType,
        event_data: eventData,
      })
      .select()
      .single();

    if (error) {
      console.error('Track event error:', error);
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data), 201);
  } catch (error: any) {
    console.error('Track event error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Get dashboard stats
app.get("/make-server-94ff05b6/api/analytics/dashboard", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    // Get profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // Get projects count
    const { count: projectsCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', user.id);

    // Get bids count
    const { count: bidsCount } = await supabase
      .from('bids')
      .select('*', { count: 'exact', head: true })
      .eq('expert_id', user.id);

    // Get contracts count
    const { count: contractsCount } = await supabase
      .from('contracts')
      .select('*', { count: 'exact', head: true })
      .or(`client_id.eq.${user.id},expert_id.eq.${user.id}`);

    return c.json(successResponse({
      profile,
      stats: {
        totalProjects: projectsCount || 0,
        totalBids: bidsCount || 0,
        totalContracts: contractsCount || 0,
        rating: profile?.rating || 0,
        reviewCount: profile?.review_count || 0,
        totalEarnings: profile?.total_earnings || 0,
      },
    }));
  } catch (error: any) {
    console.error('Get dashboard stats error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// ADMIN ENDPOINTS
// =====================================================

// Get admin dashboard (requires admin role)
app.get("/make-server-94ff05b6/api/admin/dashboard", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    // In production, check if user is admin
    // For now, return stats for any authenticated user

    const { count: usersCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    const { count: projectsCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true });

    const { count: activeProjectsCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'in_progress');

    const { count: bidsCount } = await supabase
      .from('bids')
      .select('*', { count: 'exact', head: true });

    // Get recent projects
    const { data: recentProjects } = await supabase
      .from('projects')
      .select(`
        *,
        client:profiles!client_id(full_name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    return c.json(successResponse({
      stats: {
        totalUsers: usersCount || 0,
        totalProjects: projectsCount || 0,
        activeProjects: activeProjectsCount || 0,
        totalBids: bidsCount || 0,
      },
      recentProjects,
    }));
  } catch (error: any) {
    console.error('Get admin dashboard error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// VERIFICATION ENDPOINTS
// =====================================================

// Submit identity verification
app.post("/make-server-94ff05b6/api/verification/submit", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const verificationData = await c.req.json();

    // In production, integrate with verification service (e.g., Stripe Identity, Persona)
    // For now, mark as verified
    const { data, error } = await supabase
      .from('profiles')
      .update({
        is_verified: true,
        verification_provider: verificationData.provider || 'manual',
        verification_date: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data, 'Verification submitted successfully'));
  } catch (error: any) {
    console.error('Submit verification error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// USER LEVELS ENDPOINTS
// =====================================================

// Get user level info
app.get("/make-server-94ff05b6/api/user-levels", async (c) => {
  try {
    const levels = {
      bronze: {
        name: 'Bronze',
        minPoints: 0,
        maxPoints: 999,
        benefits: [
          'Basic profile',
          'Submit up to 10 bids/month',
          '5% platform fee',
          'Email support',
        ],
      },
      silver: {
        name: 'Silver',
        minPoints: 1000,
        maxPoints: 4999,
        benefits: [
          'All Bronze benefits',
          'Submit up to 30 bids/month',
          '4% platform fee',
          'Priority support',
          'Featured profile badge',
        ],
      },
      gold: {
        name: 'Gold',
        minPoints: 5000,
        maxPoints: 14999,
        benefits: [
          'All Silver benefits',
          'Unlimited bids',
          '3% platform fee',
          'Direct messaging',
          'Top search results',
        ],
      },
      platinum: {
        name: 'Platinum',
        minPoints: 15000,
        maxPoints: 999999,
        benefits: [
          'All Gold benefits',
          '2% platform fee',
          'Dedicated account manager',
          'Premium badge',
          'Early access to projects',
        ],
      },
    };

    return c.json(successResponse(levels));
  } catch (error: any) {
    console.error('Get user levels error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// Update user points
app.post("/make-server-94ff05b6/api/users/:userId/points", async (c) => {
  try {
    const { user, error: authError } = await verifyUser(c.req.header('Authorization'));
    if (authError || !user) {
      return c.json(errorResponse('Unauthorized'), 401);
    }

    const userId = c.req.param('userId');
    const { points, action } = await c.req.json();

    // Get current points
    const { data: profile } = await supabase
      .from('profiles')
      .select('points')
      .eq('id', userId)
      .single();

    const currentPoints = profile?.points || 0;
    const newPoints = action === 'add' ? currentPoints + points : currentPoints - points;

    // Determine new level
    let newLevel = 'bronze';
    if (newPoints >= 15000) newLevel = 'platinum';
    else if (newPoints >= 5000) newLevel = 'gold';
    else if (newPoints >= 1000) newLevel = 'silver';

    // Update profile
    const { data, error } = await supabase
      .from('profiles')
      .update({
        points: newPoints,
        user_level: newLevel,
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return c.json(errorResponse(error.message), 400);
    }

    return c.json(successResponse(data, 'Points updated successfully'));
  } catch (error: any) {
    console.error('Update points error:', error);
    return c.json(errorResponse(error.message), 500);
  }
});

// =====================================================
// START SERVER
// =====================================================

Deno.serve(app.fetch);
