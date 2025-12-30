import { create } from 'zustand';
import type { WishlistFolder, WishlistItemWithExperience } from '../core/entities';
import { supabase } from '../infrastructure/supabase';
import type { WishlistGroup, WishlistItemDetail } from '../infrastructure/supabase/database.types';

// NOTE: After running the SQL migration (002_auth_and_wishlist.sql), regenerate types with:
// npx supabase gen types typescript --project-id <your-project-id> > src/infrastructure/supabase/database.types.ts

interface WishlistState {
  // State
  folders: WishlistFolder[];
  wishlistIds: Set<string>; // Set of experience IDs for quick lookup
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchWishlist: (userId: string) => Promise<void>;
  addToWishlist: (userId: string, experienceId: string, notes?: string) => Promise<void>;
  removeFromWishlist: (userId: string, experienceId: string) => Promise<void>;
  isInWishlist: (experienceId: string) => boolean;
  clearWishlist: () => void;
  clearError: () => void;
}

// Helper to transform DB response to domain model
const transformWishlistItem = (item: WishlistItemDetail): WishlistItemWithExperience => ({
  wishlistItemId: item.wishlist_item_id,
  experienceId: item.experience_id,
  title: item.title,
  description: item.description,
  price: item.price,
  currency: item.currency,
  imageUrl: item.image_url,
  rating: item.rating,
  reviewCount: item.review_count,
  location: item.location,
  notes: item.notes,
  addedAt: item.added_at,
});

// Get untyped client for new tables (until types are regenerated)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const untypedSupabase = supabase as any;

export const useWishlistStore = create<WishlistState>((set, get) => ({
  // Initial state
  folders: [],
  wishlistIds: new Set(),
  isLoading: false,
  error: null,

  // Fetch user's wishlist grouped by category
  fetchWishlist: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });

      const { data, error } = await untypedSupabase
        .rpc('get_user_wishlist_grouped', { p_user_id: userId });

      if (error) throw error;

      if (data && Array.isArray(data)) {
        // Transform to domain model
        const folders: WishlistFolder[] = (data as WishlistGroup[]).map((group) => ({
          categorySlug: group.category_slug,
          categoryName: group.category_name,
          items: (group.items as WishlistItemDetail[]).map(transformWishlistItem),
        }));

        // Build set of experience IDs for quick lookup
        const wishlistIds = new Set<string>();
        folders.forEach((folder) => {
          folder.items.forEach((item) => {
            wishlistIds.add(item.experienceId);
          });
        });

        set({ folders, wishlistIds, isLoading: false });
      } else {
        set({ folders: [], wishlistIds: new Set(), isLoading: false });
      }
    } catch (error) {
      console.error('Fetch wishlist error:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch wishlist',
        isLoading: false,
      });
    }
  },

  // Add experience to wishlist
  addToWishlist: async (userId: string, experienceId: string, notes?: string) => {
    try {
      set({ error: null });

      const { error } = await untypedSupabase
        .from('wishlist_items')
        .insert({
          user_id: userId,
          experience_id: experienceId,
          notes: notes || null,
        });

      if (error) {
        // Handle duplicate entry gracefully
        if (error.code === '23505') {
          console.log('Item already in wishlist');
          return;
        }
        throw error;
      }

      // Optimistically update the wishlistIds set
      const newWishlistIds = new Set(get().wishlistIds);
      newWishlistIds.add(experienceId);
      set({ wishlistIds: newWishlistIds });

      // Refetch to get full updated list with categories
      await get().fetchWishlist(userId);
    } catch (error) {
      console.error('Add to wishlist error:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to add to wishlist',
      });
    }
  },

  // Remove experience from wishlist
  removeFromWishlist: async (userId: string, experienceId: string) => {
    try {
      set({ error: null });

      const { error } = await untypedSupabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', userId)
        .eq('experience_id', experienceId);

      if (error) throw error;

      // Optimistically update the wishlistIds set
      const newWishlistIds = new Set(get().wishlistIds);
      newWishlistIds.delete(experienceId);
      set({ wishlistIds: newWishlistIds });

      // Refetch to get full updated list
      await get().fetchWishlist(userId);
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to remove from wishlist',
      });
    }
  },

  // Quick check if experience is in wishlist
  isInWishlist: (experienceId: string) => {
    return get().wishlistIds.has(experienceId);
  },

  // Clear wishlist (on logout)
  clearWishlist: () => {
    set({ folders: [], wishlistIds: new Set(), error: null });
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
