import { supabase, Profile, Project, Bid, Message, Conversation, Notification } from './supabase';

// =====================================================
// AUTHENTICATION
// =====================================================

export const auth = {
  // Sign up
  signUp: async (email: string, password: string, fullName: string, userType: 'expert' | 'client') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType,
        },
      },
    });
    return { data, error };
  },

  // Sign in
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Sign in with OAuth
  signInWithOAuth: async (provider: 'google' | 'github' | 'linkedin') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    return { data, error };
  },
};

// =====================================================
// PROFILES
// =====================================================

export const profiles = {
  // Get profile by ID
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  // Get current user profile
  getCurrent: async () => {
    const { user } = await auth.getCurrentUser();
    if (!user) return { data: null, error: new Error('Not authenticated') };
    
    return profiles.getById(user.id);
  },

  // Update profile
  update: async (id: string, updates: Partial<Profile>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Get profiles with filters
  search: async (filters: {
    userType?: string;
    skills?: string[];
    minRating?: number;
    location?: string;
  }) => {
    let query = supabase.from('profiles').select('*');

    if (filters.userType) {
      query = query.eq('user_type', filters.userType);
    }
    if (filters.minRating) {
      query = query.gte('rating', filters.minRating);
    }
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    const { data, error } = await query;
    return { data, error };
  },
};

// =====================================================
// PROJECTS
// =====================================================

export const projects = {
  // Get all projects
  getAll: async (filters?: {
    status?: string;
    category?: string;
    search?: string;
  }) => {
    let query = supabase
      .from('projects')
      .select(`
        *,
        client:profiles!client_id(*)
      `)
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.category && filters.category !== 'all') {
      query = query.eq('category', filters.category);
    }
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Get project by ID
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        client:profiles!client_id(*)
      `)
      .eq('id', id)
      .single();
    return { data, error };
  },

  // Create project
  create: async (project: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'views_count'>) => {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    return { data, error };
  },

  // Update project
  update: async (id: string, updates: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Delete project
  delete: async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Get projects by client
  getByClient: async (clientId: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    return { data, error };
  },
};

// =====================================================
// BIDS
// =====================================================

export const bids = {
  // Create bid
  create: async (bid: Omit<Bid, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    const { data, error } = await supabase
      .from('bids')
      .insert({ ...bid, status: 'pending' })
      .select()
      .single();
    return { data, error };
  },

  // Get bids for a project
  getByProject: async (projectId: string) => {
    const { data, error } = await supabase
      .from('bids')
      .select(`
        *,
        expert:profiles!expert_id(*)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Get bids by expert
  getByExpert: async (expertId: string) => {
    const { data, error } = await supabase
      .from('bids')
      .select(`
        *,
        project:projects(*)
      `)
      .eq('expert_id', expertId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Update bid status
  updateStatus: async (id: string, status: 'accepted' | 'rejected' | 'withdrawn') => {
    const { data, error } = await supabase
      .from('bids')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Check if user has already bid
  checkExisting: async (projectId: string, expertId: string) => {
    const { data, error } = await supabase
      .from('bids')
      .select('id')
      .eq('project_id', projectId)
      .eq('expert_id', expertId)
      .single();
    return { data, error };
  },
};

// =====================================================
// MESSAGES
// =====================================================

export const messages = {
  // Get or create conversation
  getOrCreateConversation: async (projectId: string, participant1Id: string, participant2Id: string) => {
    // Try to find existing conversation
    const { data: existing } = await supabase
      .from('conversations')
      .select('*')
      .eq('project_id', projectId)
      .or(`and(participant_1_id.eq.${participant1Id},participant_2_id.eq.${participant2Id}),and(participant_1_id.eq.${participant2Id},participant_2_id.eq.${participant1Id})`)
      .single();

    if (existing) {
      return { data: existing, error: null };
    }

    // Create new conversation
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        project_id: projectId,
        participant_1_id: participant1Id,
        participant_2_id: participant2Id,
      })
      .select()
      .single();

    return { data, error };
  },

  // Get user conversations
  getUserConversations: async (userId: string) => {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        participant_1:profiles!participant_1_id(*),
        participant_2:profiles!participant_2_id(*),
        messages(*)
      `)
      .or(`participant_1_id.eq.${userId},participant_2_id.eq.${userId}`)
      .order('last_message_at', { ascending: false });

    return { data, error };
  },

  // Get messages in conversation
  getMessages: async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!sender_id(*)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    return { data, error };
  },

  // Send message
  send: async (conversationId: string, senderId: string, content: string) => {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
      })
      .select()
      .single();

    // Update conversation last_message_at
    if (!error) {
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);
    }

    return { data, error };
  },

  // Mark messages as read
  markAsRead: async (conversationId: string, userId: string) => {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .is('is_read', false);

    return { error };
  },

  // Subscribe to new messages
  subscribeToMessages: (conversationId: string, callback: (message: Message) => void) => {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();
  },
};

// =====================================================
// NOTIFICATIONS
// =====================================================

export const notifications = {
  // Get user notifications
  getByUser: async (userId: string, limit = 10) => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    return { data, error };
  },

  // Create notification
  create: async (notification: Omit<Notification, 'id' | 'created_at' | 'is_read' | 'read_at'>) => {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();

    return { data, error };
  },

  // Mark as read
  markAsRead: async (id: string) => {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Mark all as read
  markAllAsRead: async (userId: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('user_id', userId)
      .is('is_read', false);

    return { error };
  },

  // Get unread count
  getUnreadCount: async (userId: string) => {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    return { count, error };
  },

  // Subscribe to notifications
  subscribe: (userId: string, callback: (notification: Notification) => void) => {
    return supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as Notification);
        }
      )
      .subscribe();
  },
};

// =====================================================
// REVIEWS
// =====================================================

export const reviews = {
  // Create review
  create: async (review: {
    contract_id: string;
    reviewer_id: string;
    reviewee_id: string;
    rating: number;
    title?: string;
    comment?: string;
    communication_rating?: number;
    quality_rating?: number;
    professionalism_rating?: number;
  }) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();

    return { data, error };
  },

  // Get reviews for a user
  getByUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        reviewer:profiles!reviewer_id(*)
      `)
      .eq('reviewee_id', userId)
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    return { data, error };
  },
};

// =====================================================
// SKILLS
// =====================================================

export const skills = {
  // Get all skills
  getAll: async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('name');

    return { data, error };
  },

  // Add skill to user
  addToUser: async (userId: string, skillId: string, proficiencyLevel?: string, yearsExperience?: number) => {
    const { data, error } = await supabase
      .from('user_skills')
      .insert({
        user_id: userId,
        skill_id: skillId,
        proficiency_level: proficiencyLevel,
        years_experience: yearsExperience,
      })
      .select()
      .single();

    return { data, error };
  },

  // Get user skills
  getUserSkills: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_skills')
      .select(`
        *,
        skill:skills(*)
      `)
      .eq('user_id', userId);

    return { data, error };
  },
};

// =====================================================
// FILES
// =====================================================

export const files = {
  // Upload file
  upload: async (file: File, projectId: string, userId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${projectId}/${fileName}`;

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('project-files')
      .upload(filePath, file);

    if (uploadError) {
      return { data: null, error: uploadError };
    }

    // Save file metadata
    const { data, error } = await supabase
      .from('files')
      .insert({
        uploader_id: userId,
        project_id: projectId,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        storage_path: filePath,
      })
      .select()
      .single();

    return { data, error };
  },

  // Get project files
  getByProject: async (projectId: string) => {
    const { data, error } = await supabase
      .from('files')
      .select(`
        *,
        uploader:profiles!uploader_id(*)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Get file download URL
  getDownloadUrl: async (path: string) => {
    const { data } = supabase.storage
      .from('project-files')
      .getPublicUrl(path);

    return data.publicUrl;
  },
};

// =====================================================
// ANALYTICS
// =====================================================

export const analytics = {
  // Track event
  trackEvent: async (userId: string | null, eventType: string, eventData?: any) => {
    const { data, error } = await supabase
      .from('analytics_events')
      .insert({
        user_id: userId,
        event_type: eventType,
        event_data: eventData,
      })
      .select()
      .single();

    return { data, error };
  },

  // Get user stats
  getUserStats: async (userId: string) => {
    // This would aggregate various metrics
    const { data: profile } = await profiles.getById(userId);
    const { data: userProjects } = await projects.getByClient(userId);
    const { data: userBids } = await bids.getByExpert(userId);

    return {
      profile,
      totalProjects: userProjects?.length || 0,
      totalBids: userBids?.length || 0,
    };
  },
};
