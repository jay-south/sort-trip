-- Sort Trip Cuzco - Auth Profiles & Wishlist Schema
-- Run this in Supabase SQL Editor AFTER enabling Google Auth in Dashboard
-- Dashboard → Authentication → Providers → Google → Enable

-- =============================================================================
-- PROFILES TABLE
-- Stores additional user data beyond what auth.users provides
-- =============================================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- WISHLIST ITEMS TABLE
-- Stores user's saved experiences (favorites)
-- The "folder" is virtual - we group by category_slug when displaying
-- =============================================================================
CREATE TABLE wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  notes TEXT, -- Optional: user can add personal notes
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent duplicate entries (user can't save same experience twice)
  UNIQUE(user_id, experience_id)
);

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX idx_wishlist_user ON wishlist_items(user_id);
CREATE INDEX idx_wishlist_experience ON wishlist_items(experience_id);
CREATE INDEX idx_profiles_email ON profiles(email);

-- =============================================================================
-- UPDATED_AT TRIGGER FOR PROFILES
-- =============================================================================
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- AUTO-CREATE PROFILE ON USER SIGNUP
-- This trigger automatically creates a profile when a new user signs up
-- =============================================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Wishlist: Users can only manage their own wishlist items
CREATE POLICY "Users can view own wishlist" ON wishlist_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own wishlist" ON wishlist_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own wishlist" ON wishlist_items
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can update own wishlist items" ON wishlist_items
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================================================
-- HELPER FUNCTION: Get wishlist with experience details grouped by category
-- =============================================================================
CREATE OR REPLACE FUNCTION get_user_wishlist_grouped(p_user_id UUID)
RETURNS TABLE (
  category_slug experience_category,
  category_name VARCHAR(100),
  items JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.category_slug,
    c.name as category_name,
    JSONB_AGG(
      JSONB_BUILD_OBJECT(
        'wishlist_item_id', w.id,
        'experience_id', e.id,
        'title', e.title,
        'description', e.description,
        'price', e.price,
        'currency', e.currency,
        'image_url', e.image_url,
        'rating', e.rating,
        'review_count', e.review_count,
        'location', e.location,
        'notes', w.notes,
        'added_at', w.created_at
      ) ORDER BY w.created_at DESC
    ) as items
  FROM wishlist_items w
  JOIN experiences e ON w.experience_id = e.id
  JOIN categories c ON e.category_slug = c.slug
  WHERE w.user_id = p_user_id
    AND e.is_active = true
  GROUP BY e.category_slug, c.name
  ORDER BY c.name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- HELPER FUNCTION: Check if experience is in user's wishlist
-- =============================================================================
CREATE OR REPLACE FUNCTION is_in_wishlist(p_user_id UUID, p_experience_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM wishlist_items 
    WHERE user_id = p_user_id AND experience_id = p_experience_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
