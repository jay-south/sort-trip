// Database types - Generated from Supabase schema
// These types ensure type-safety when working with the database

// Wishlist item with experience details (returned by get_user_wishlist_grouped)
export interface WishlistItemDetail {
  wishlist_item_id: string;
  experience_id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image_url: string;
  rating: number;
  review_count: number;
  location: string;
  notes: string | null;
  added_at: string;
}

export type ExperienceCategoryType =
  | 'travel-around'
  | 'stays'
  | 'transportation'
  | 'tours-activities'
  | 'eat-drink'
  | 'flights';

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: ExperienceCategoryType;
          name: string;
          description: string | null;
          icon: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: ExperienceCategoryType;
          name: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: ExperienceCategoryType;
          name?: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      experiences: {
        Row: {
          id: string;
          title: string;
          description: string;
          price: number;
          currency: string;
          image_url: string;
          rating: number;
          review_count: number;
          location: string;
          category_slug: ExperienceCategoryType;
          contact_phone: string | null;
          contact_whatsapp: string | null;
          contact_email: string | null;
          website_url: string | null;
          booking_url: string | null;
          google_place_id: string | null;
          is_featured: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          price: number;
          currency?: string;
          image_url: string;
          rating?: number;
          review_count?: number;
          location: string;
          category_slug: ExperienceCategoryType;
          contact_phone?: string | null;
          contact_whatsapp?: string | null;
          contact_email?: string | null;
          website_url?: string | null;
          booking_url?: string | null;
          google_place_id?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          price?: number;
          currency?: string;
          image_url?: string;
          rating?: number;
          review_count?: number;
          location?: string;
          category_slug?: ExperienceCategoryType;
          contact_phone?: string | null;
          contact_whatsapp?: string | null;
          contact_email?: string | null;
          website_url?: string | null;
          booking_url?: string | null;
          google_place_id?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      wishlist_items: {
        Row: {
          id: string;
          user_id: string;
          experience_id: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          experience_id: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          experience_id?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_user_wishlist_grouped: {
        Args: { p_user_id: string };
        Returns: {
          category_slug: ExperienceCategoryType;
          category_name: string;
          items: WishlistItemDetail[];
        }[];
      };
      is_in_wishlist: {
        Args: { p_user_id: string; p_experience_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      experience_category: ExperienceCategoryType;
    };
  };
}

// Helper types for easier usage
export type Category = Database['public']['Tables']['categories']['Row'];
export type Experience = Database['public']['Tables']['experiences']['Row'];
export type ExperienceInsert = Database['public']['Tables']['experiences']['Insert'];
export type ExperienceUpdate = Database['public']['Tables']['experiences']['Update'];

// Profile types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// Wishlist types
export type WishlistItem = Database['public']['Tables']['wishlist_items']['Row'];
export type WishlistItemInsert = Database['public']['Tables']['wishlist_items']['Insert'];

// Grouped wishlist (for profile page)
export interface WishlistGroup {
  category_slug: ExperienceCategoryType;
  category_name: string;
  items: WishlistItemDetail[];
}
