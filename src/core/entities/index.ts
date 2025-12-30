// Core entities - Domain models

export type ExperienceCategory =
  | 'travel-around'
  | 'stays'
  | 'transportation'
  | 'tours-activities'
  | 'eat-drink'
  | 'flights';

export interface Experience {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  location: string;
  category: ExperienceCategory;
  // Contact info
  contactPhone?: string | null;
  contactWhatsapp?: string | null;
  contactEmail?: string | null;
  websiteUrl?: string | null;
  bookingUrl?: string | null;
  // Integration
  googlePlaceId?: string | null;
  // Flags
  isFeatured: boolean;
  isActive: boolean;
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: ExperienceCategory;
  name: string;
  description?: string | null;
  icon?: string | null;
}

export interface NavigationItem {
  id: ExperienceCategory;
  label: string;
  path: string;
  icon?: string;
}

// Form types for creating/updating
export type ExperienceCreateInput = Omit<Experience, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount' | 'isFeatured' | 'isActive'> & {
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  isActive?: boolean;
};

export type ExperienceUpdateInput = Partial<Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>>;

// User Profile
export interface UserProfile {
  id: string;
  fullName: string | null;
  avatarUrl: string | null;
  email: string | null;
  createdAt: string;
  updatedAt: string;
}

// Wishlist Item (simple reference)
export interface WishlistItem {
  id: string;
  experienceId: string;
  notes: string | null;
  createdAt: string;
}

// Wishlist Item with full experience details
export interface WishlistItemWithExperience {
  wishlistItemId: string;
  experienceId: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  location: string;
  notes: string | null;
  addedAt: string;
}

// Wishlist grouped by category (for profile page)
export interface WishlistFolder {
  categorySlug: ExperienceCategory;
  categoryName: string;
  items: WishlistItemWithExperience[];
}
