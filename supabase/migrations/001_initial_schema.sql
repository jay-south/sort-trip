-- Sort Trip Cuzco - Initial Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- =============================================================================
-- ENUM TYPE
-- =============================================================================
CREATE TYPE experience_category AS ENUM (
  'travel-around',
  'stays',
  'transportation',
  'tours-activities',
  'eat-drink',
  'flights'
);

-- =============================================================================
-- CATEGORIES TABLE
-- =============================================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug experience_category UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (slug, name, description, icon) VALUES
  ('travel-around', 'Travel Around', 'Explore the wonders of Cuzco', 'map'),
  ('stays', 'Stays', 'Find your perfect accommodation', 'home'),
  ('transportation', 'Transportation', 'Get around with ease', 'car'),
  ('tours-activities', 'Tours & Activities', 'Unforgettable experiences await', 'ticket'),
  ('eat-drink', 'Eat & Drink', 'Taste the flavors of Peru', 'utensils'),
  ('flights', 'Book Flights', 'Find the best flight deals', 'plane');

-- =============================================================================
-- EXPERIENCES TABLE
-- =============================================================================
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  image_url TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  location VARCHAR(255) NOT NULL,
  category_slug experience_category NOT NULL REFERENCES categories(slug) ON DELETE RESTRICT,
  
  -- Contact info (for curated data)
  contact_phone VARCHAR(50),
  contact_whatsapp VARCHAR(50),
  contact_email VARCHAR(255),
  website_url TEXT,
  booking_url TEXT,
  
  -- Google Places integration (for future enrichment)
  google_place_id VARCHAR(255),
  
  -- Admin flags
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX idx_experiences_category ON experiences(category_slug);
CREATE INDEX idx_experiences_active ON experiences(is_active);
CREATE INDEX idx_experiences_featured ON experiences(is_featured);
CREATE INDEX idx_experiences_rating ON experiences(rating DESC);

-- Full text search index for the searchbar
CREATE INDEX idx_experiences_search ON experiences 
  USING GIN (to_tsvector('spanish', title || ' ' || description || ' ' || location));

-- =============================================================================
-- UPDATED_AT TRIGGER
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Public can read active experiences and all categories
CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public can read active experiences" ON experiences
  FOR SELECT USING (is_active = true);

-- =============================================================================
-- SEARCH FUNCTION (for the searchbar)
-- =============================================================================
CREATE OR REPLACE FUNCTION search_experiences(search_query TEXT)
RETURNS SETOF experiences AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM experiences
  WHERE is_active = true
    AND (
      to_tsvector('spanish', title || ' ' || description || ' ' || location) 
      @@ plainto_tsquery('spanish', search_query)
      OR title ILIKE '%' || search_query || '%'
      OR location ILIKE '%' || search_query || '%'
    )
  ORDER BY 
    ts_rank(
      to_tsvector('spanish', title || ' ' || description || ' ' || location),
      plainto_tsquery('spanish', search_query)
    ) DESC,
    rating DESC;
END;
$$ LANGUAGE plpgsql;
