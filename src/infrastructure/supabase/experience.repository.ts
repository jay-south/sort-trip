import { supabase } from './supabase.client';
import type { Experience, ExperienceCategory, ExperienceCreateInput, ExperienceUpdateInput } from '../../core/entities';
import type { Experience as DbExperience } from './database.types';

// NOTE: After running SQL migrations, regenerate types with:
// npx supabase gen types typescript --project-id <your-project-id> > src/infrastructure/supabase/database.types.ts
// For now, we use type assertions for RPC calls and new tables

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const untypedSupabase = supabase as any;

// Mapper: DB row → Domain entity
const mapDbToDomain = (row: DbExperience): Experience => ({
  id: row.id,
  title: row.title,
  description: row.description,
  price: row.price,
  currency: row.currency,
  imageUrl: row.image_url,
  rating: row.rating,
  reviewCount: row.review_count,
  location: row.location,
  category: row.category_slug,
  contactPhone: row.contact_phone,
  contactWhatsapp: row.contact_whatsapp,
  contactEmail: row.contact_email,
  websiteUrl: row.website_url,
  bookingUrl: row.booking_url,
  googlePlaceId: row.google_place_id,
  isFeatured: row.is_featured,
  isActive: row.is_active,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Mapper: Domain entity → DB insert
const mapDomainToDb = (experience: ExperienceCreateInput) => ({
  title: experience.title,
  description: experience.description,
  price: experience.price,
  currency: experience.currency,
  image_url: experience.imageUrl,
  rating: experience.rating ?? 0,
  review_count: experience.reviewCount ?? 0,
  location: experience.location,
  category_slug: experience.category,
  contact_phone: experience.contactPhone ?? null,
  contact_whatsapp: experience.contactWhatsapp ?? null,
  contact_email: experience.contactEmail ?? null,
  website_url: experience.websiteUrl ?? null,
  booking_url: experience.bookingUrl ?? null,
  google_place_id: experience.googlePlaceId ?? null,
  is_featured: experience.isFeatured ?? false,
  is_active: experience.isActive ?? true,
});

// Mapper: Domain update → DB update
const mapUpdateToDb = (update: ExperienceUpdateInput) => {
  const dbUpdate: Record<string, unknown> = {};
  
  if (update.title !== undefined) dbUpdate.title = update.title;
  if (update.description !== undefined) dbUpdate.description = update.description;
  if (update.price !== undefined) dbUpdate.price = update.price;
  if (update.currency !== undefined) dbUpdate.currency = update.currency;
  if (update.imageUrl !== undefined) dbUpdate.image_url = update.imageUrl;
  if (update.rating !== undefined) dbUpdate.rating = update.rating;
  if (update.reviewCount !== undefined) dbUpdate.review_count = update.reviewCount;
  if (update.location !== undefined) dbUpdate.location = update.location;
  if (update.category !== undefined) dbUpdate.category_slug = update.category;
  if (update.contactPhone !== undefined) dbUpdate.contact_phone = update.contactPhone;
  if (update.contactWhatsapp !== undefined) dbUpdate.contact_whatsapp = update.contactWhatsapp;
  if (update.contactEmail !== undefined) dbUpdate.contact_email = update.contactEmail;
  if (update.websiteUrl !== undefined) dbUpdate.website_url = update.websiteUrl;
  if (update.bookingUrl !== undefined) dbUpdate.booking_url = update.bookingUrl;
  if (update.googlePlaceId !== undefined) dbUpdate.google_place_id = update.googlePlaceId;
  if (update.isFeatured !== undefined) dbUpdate.is_featured = update.isFeatured;
  if (update.isActive !== undefined) dbUpdate.is_active = update.isActive;
  
  return dbUpdate;
};

export const experienceRepository = {
  /**
   * Get all active experiences
   */
  async getAll(): Promise<Experience[]> {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (error) throw new Error(`Failed to fetch experiences: ${error.message}`);
    return (data ?? []).map(mapDbToDomain);
  },

  /**
   * Get experiences by category
   */
  async getByCategory(category: ExperienceCategory): Promise<Experience[]> {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('category_slug', category)
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (error) throw new Error(`Failed to fetch experiences by category: ${error.message}`);
    return (data ?? []).map(mapDbToDomain);
  },

  /**
   * Get experience by ID
   */
  async getById(id: string): Promise<Experience | null> {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(`Failed to fetch experience: ${error.message}`);
    }
    return data ? mapDbToDomain(data) : null;
  },

  /**
   * Search experiences by query
   */
  async search(query: string): Promise<Experience[]> {
    const { data, error } = await untypedSupabase
      .rpc('search_experiences', { search_query: query });

    if (error) throw new Error(`Search failed: ${error.message}`);
    return ((data as DbExperience[]) ?? []).map(mapDbToDomain);
  },

  /**
   * Get featured experiences
   */
  async getFeatured(): Promise<Experience[]> {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('rating', { ascending: false })
      .limit(6);

    if (error) throw new Error(`Failed to fetch featured experiences: ${error.message}`);
    return (data ?? []).map(mapDbToDomain);
  },

  // =========================================================================
  // ADMIN OPERATIONS (require authenticated user with proper permissions)
  // =========================================================================

  /**
   * Get ALL experiences (including inactive) - Admin only
   */
  async getAllAdmin(): Promise<Experience[]> {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch all experiences: ${error.message}`);
    return (data ?? []).map(mapDbToDomain);
  },

  /**
   * Create a new experience - Admin only
   */
  async create(experience: ExperienceCreateInput): Promise<Experience> {
    const { data, error } = await untypedSupabase
      .from('experiences')
      .insert(mapDomainToDb(experience))
      .select()
      .single();

    if (error) throw new Error(`Failed to create experience: ${error.message}`);
    return mapDbToDomain(data as DbExperience);
  },

  /**
   * Update an experience - Admin only
   */
  async update(id: string, update: ExperienceUpdateInput): Promise<Experience> {
    const { data, error } = await untypedSupabase
      .from('experiences')
      .update(mapUpdateToDb(update))
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update experience: ${error.message}`);
    return mapDbToDomain(data as DbExperience);
  },

  /**
   * Delete an experience - Admin only
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete experience: ${error.message}`);
  },

  /**
   * Toggle featured status - Admin only
   */
  async toggleFeatured(id: string, isFeatured: boolean): Promise<Experience> {
    return this.update(id, { isFeatured });
  },

  /**
   * Toggle active status - Admin only
   */
  async toggleActive(id: string, isActive: boolean): Promise<Experience> {
    return this.update(id, { isActive });
  },
};
