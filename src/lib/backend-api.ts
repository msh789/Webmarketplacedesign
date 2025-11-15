// Backend API Client - Connects to Supabase Edge Functions
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-94ff05b6`;

// Helper function to get auth token
const getAuthToken = () => {
  // Get token from localStorage (set during login)
  return localStorage.getItem('supabase_access_token') || publicAnonKey;
};

// Helper function for API calls
const apiCall = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken();
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
};

// =====================================================
// AUTHENTICATION
// =====================================================

export const backendAuth = {
  signUp: async (email: string, password: string, fullName: string, userType: 'expert' | 'client') => {
    return apiCall('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName, userType }),
    });
  },

  signIn: async (email: string, password: string) => {
    const result = await apiCall('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store access token
    if (result.data?.session?.access_token) {
      localStorage.setItem('supabase_access_token', result.data.session.access_token);
    }

    return result;
  },

  signOut: async () => {
    localStorage.removeItem('supabase_access_token');
  },
};

// =====================================================
// PROFILES
// =====================================================

export const backendProfiles = {
  getById: async (id: string) => {
    return apiCall(`/api/profiles/${id}`);
  },

  update: async (id: string, updates: any) => {
    return apiCall(`/api/profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  search: async (filters: {
    userType?: string;
    minRating?: number;
    location?: string;
    search?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters.userType) params.append('userType', filters.userType);
    if (filters.minRating) params.append('minRating', filters.minRating.toString());
    if (filters.location) params.append('location', filters.location);
    if (filters.search) params.append('search', filters.search);

    return apiCall(`/api/profiles?${params.toString()}`);
  },
};

// =====================================================
// PROJECTS
// =====================================================

export const backendProjects = {
  getAll: async (filters?: {
    status?: string;
    category?: string;
    search?: string;
    clientId?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.clientId) params.append('clientId', filters.clientId);

    return apiCall(`/api/projects?${params.toString()}`);
  },

  getById: async (id: string) => {
    return apiCall(`/api/projects/${id}`);
  },

  create: async (project: any) => {
    return apiCall('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  },

  update: async (id: string, updates: any) => {
    return apiCall(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  delete: async (id: string) => {
    return apiCall(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

// =====================================================
// BIDS
// =====================================================

export const backendBids = {
  create: async (bid: any) => {
    return apiCall('/api/bids', {
      method: 'POST',
      body: JSON.stringify(bid),
    });
  },

  getByProject: async (projectId: string) => {
    return apiCall(`/api/projects/${projectId}/bids`);
  },

  getByExpert: async (expertId: string) => {
    return apiCall(`/api/experts/${expertId}/bids`);
  },

  updateStatus: async (id: string, status: 'accepted' | 'rejected' | 'withdrawn') => {
    return apiCall(`/api/bids/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

// =====================================================
// MESSAGING
// =====================================================

export const backendMessaging = {
  getConversations: async () => {
    return apiCall('/api/conversations');
  },

  getMessages: async (conversationId: string) => {
    return apiCall(`/api/conversations/${conversationId}/messages`);
  },

  sendMessage: async (conversationId: string, content: string) => {
    return apiCall('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ conversation_id: conversationId, content }),
    });
  },

  markAsRead: async (conversationId: string) => {
    return apiCall(`/api/conversations/${conversationId}/read`, {
      method: 'POST',
    });
  },
};

// =====================================================
// NOTIFICATIONS
// =====================================================

export const backendNotifications = {
  getAll: async (limit = 20) => {
    return apiCall(`/api/notifications?limit=${limit}`);
  },

  getUnreadCount: async () => {
    return apiCall('/api/notifications/unread/count');
  },

  markAsRead: async (id: string) => {
    return apiCall(`/api/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  markAllAsRead: async () => {
    return apiCall('/api/notifications/read-all', {
      method: 'POST',
    });
  },
};

// =====================================================
// REVIEWS
// =====================================================

export const backendReviews = {
  getByUser: async (userId: string) => {
    return apiCall(`/api/users/${userId}/reviews`);
  },

  create: async (review: any) => {
    return apiCall('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(review),
    });
  },
};

// =====================================================
// FILES
// =====================================================

export const backendFiles = {
  upload: async (file: File, projectId: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    const token = getAuthToken();

    const response = await fetch(`${API_URL}/api/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'File upload failed');
    }

    return data;
  },

  getByProject: async (projectId: string) => {
    return apiCall(`/api/projects/${projectId}/files`);
  },

  getDownloadUrl: async (fileId: string) => {
    return apiCall(`/api/files/${fileId}/download`);
  },
};

// =====================================================
// CONTRACTS
// =====================================================

export const backendContracts = {
  create: async (contract: any) => {
    return apiCall('/api/contracts', {
      method: 'POST',
      body: JSON.stringify(contract),
    });
  },

  sign: async (id: string, role: 'client' | 'expert') => {
    return apiCall(`/api/contracts/${id}/sign`, {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
  },
};

// =====================================================
// PAYMENTS
// =====================================================

export const backendPayments = {
  createIntent: async (amount: number, contractId: string, milestoneId?: string) => {
    return apiCall('/api/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ amount, contractId, milestoneId }),
    });
  },
};

// =====================================================
// ANALYTICS
// =====================================================

export const backendAnalytics = {
  trackEvent: async (eventType: string, eventData?: any) => {
    return apiCall('/api/analytics/events', {
      method: 'POST',
      body: JSON.stringify({ eventType, eventData }),
    });
  },

  getDashboard: async () => {
    return apiCall('/api/analytics/dashboard');
  },
};

// =====================================================
// ADMIN
// =====================================================

export const backendAdmin = {
  getDashboard: async () => {
    return apiCall('/api/admin/dashboard');
  },
};

// =====================================================
// VERIFICATION
// =====================================================

export const backendVerification = {
  submit: async (data: any) => {
    return apiCall('/api/verification/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// =====================================================
// USER LEVELS
// =====================================================

export const backendUserLevels = {
  getLevels: async () => {
    return apiCall('/api/user-levels');
  },

  updatePoints: async (userId: string, points: number, action: 'add' | 'subtract') => {
    return apiCall(`/api/users/${userId}/points`, {
      method: 'POST',
      body: JSON.stringify({ points, action }),
    });
  },
};

// Export all
export const backendAPI = {
  auth: backendAuth,
  profiles: backendProfiles,
  projects: backendProjects,
  bids: backendBids,
  messaging: backendMessaging,
  notifications: backendNotifications,
  reviews: backendReviews,
  files: backendFiles,
  contracts: backendContracts,
  payments: backendPayments,
  analytics: backendAnalytics,
  admin: backendAdmin,
  verification: backendVerification,
  userLevels: backendUserLevels,
};
