import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';
import type { UserProfile } from '../core/entities';
import { supabase } from '../infrastructure/supabase';
import type { Profile } from '../infrastructure/supabase/database.types';

interface AuthState {
  // State
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  profile: null,
  session: null,
  isLoading: false,
  isInitialized: false,
  error: null,

  // Initialize auth state and listen for changes
  initialize: async () => {
    try {
      set({ isLoading: true });

      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;

      if (session?.user) {
        set({ 
          user: session.user, 
          session,
          isLoading: false,
          isInitialized: true 
        });
        // Fetch profile after setting user
        await get().fetchProfile();
      } else {
        set({ 
          user: null, 
          session: null, 
          profile: null,
          isLoading: false,
          isInitialized: true 
        });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (session?.user) {
          set({ user: session.user, session });
          await get().fetchProfile();
        } else {
          set({ user: null, session: null, profile: null });
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to initialize auth',
        isLoading: false,
        isInitialized: true 
      });
    }
  },

  // Sign in with Google OAuth
  signInWithGoogle: async () => {
    try {
      set({ isLoading: true, error: null });

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
      
      // Note: The page will redirect to Google, so we don't need to set isLoading to false here
    } catch (error) {
      console.error('Google sign in error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to sign in with Google',
        isLoading: false 
      });
    }
  },

  // Sign out
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });

      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      set({ 
        user: null, 
        session: null, 
        profile: null,
        isLoading: false 
      });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to sign out',
        isLoading: false 
      });
    }
  },

  // Fetch user profile from database
  fetchProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        // Cast to Profile type since supabase client may not have updated types yet
        const profileData = data as Profile;
        const profile: UserProfile = {
          id: profileData.id,
          fullName: profileData.full_name,
          avatarUrl: profileData.avatar_url,
          email: profileData.email,
          createdAt: profileData.created_at,
          updatedAt: profileData.updated_at,
        };
        set({ profile });
      }
    } catch (error) {
      console.error('Fetch profile error:', error);
      // Don't set error state here - profile might not exist yet
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
