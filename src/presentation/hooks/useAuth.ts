import { useEffect } from 'react';
import { useAuthStore, useWishlistStore } from '../../store';

/**
 * Hook to initialize auth and sync wishlist
 * Call this once at the app root level (e.g., in MainLayout)
 */
export function useAuthInit() {
  const { initialize, isInitialized, user } = useAuthStore();
  const { fetchWishlist, clearWishlist } = useWishlistStore();

  // Initialize auth on mount
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  // Sync wishlist when user changes
  useEffect(() => {
    if (user) {
      fetchWishlist(user.id);
    } else {
      clearWishlist();
    }
  }, [user, fetchWishlist, clearWishlist]);
}

/**
 * Hook to access auth state and actions
 * Use this in components that need auth functionality
 */
export function useAuth() {
  const {
    user,
    profile,
    session,
    isLoading,
    isInitialized,
    error,
    signInWithGoogle,
    signOut,
    clearError,
  } = useAuthStore();

  return {
    // State
    user,
    profile,
    session,
    isLoading,
    isInitialized,
    isAuthenticated: !!user,
    error,
    // Actions
    signInWithGoogle,
    signOut,
    clearError,
  };
}

/**
 * Hook to access wishlist state and actions
 * Use this in components that need wishlist functionality
 */
export function useWishlist() {
  const user = useAuthStore((state) => state.user);
  const {
    folders,
    wishlistIds,
    isLoading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearError,
  } = useWishlistStore();

  const toggleWishlist = async (experienceId: string) => {
    if (!user) {
      // Could trigger login modal here
      console.log('User must be logged in to add to wishlist');
      return;
    }

    if (isInWishlist(experienceId)) {
      await removeFromWishlist(user.id, experienceId);
    } else {
      await addToWishlist(user.id, experienceId);
    }
  };

  return {
    // State
    folders,
    wishlistIds,
    isLoading,
    error,
    totalItems: wishlistIds.size,
    // Actions
    toggleWishlist,
    isInWishlist,
    clearError,
  };
}
