import { useState, useEffect } from 'react';
import { Hero, SectionHeader, Card } from '../components/ui';
import { getExperiencesByCategory } from '../../infrastructure/data/mock-experiences';
import styles from './CategoryPage.module.css';

interface Place {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  vicinity: string;
  photos?: Array<{ photo_reference: string }>;
  geometry: {
    location: { lat: number; lng: number };
  };
}

export const StaysPage = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const mockStays = getExperiencesByCategory('stays');

  useEffect(() => {
    const loadPlaces = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
      
      if (!apiKey) {
        // Si no hay API key, usar datos mock
        setPlaces(mockStays.map(exp => ({
          id: exp.id,
          title: exp.title,
          description: exp.description,
          price: exp.price,
          currency: exp.currency,
          rating: exp.rating,
          reviewCount: exp.reviewCount,
          location: exp.location,
          imageUrl: exp.imageUrl,
        })));
        setLoading(false);
        return;
      }

      try {
        // Obtener coordenadas de Cusco
        const geocodeResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=Cusco,Peru&key=${apiKey}`
        );
        const geocodeData = await geocodeResponse.json();
        
        if (geocodeData.results && geocodeData.results[0]) {
          const { lat, lng } = geocodeData.results[0].geometry.location;
          
          // Buscar alojamientos cerca de Cusco
          const placesResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
            `location=${lat},${lng}&radius=5000&type=lodging&key=${apiKey}`
          );
          const placesData = await placesResponse.json();
          
          if (placesData.results && placesData.results.length > 0) {
            // Transformar a formato de Experience
            const transformedPlaces = placesData.results.slice(0, 12).map((place: Place) => ({
              id: place.place_id,
              title: place.name,
              description: `${place.vicinity}`,
              price: 0, // Google Places no tiene precio
              currency: 'USD',
              rating: place.rating || 0,
              reviewCount: place.user_ratings_total || 0,
              location: place.vicinity,
              imageUrl: place.photos?.[0] 
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
                : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
              category: 'stays' as const,
              isFeatured: false,
              isActive: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }));
            
            setPlaces(transformedPlaces);
          } else {
            setPlaces(mockStays.map(exp => ({
              id: exp.id,
              title: exp.title,
              description: exp.description,
              price: exp.price,
              currency: exp.currency,
              rating: exp.rating,
              reviewCount: exp.reviewCount,
              location: exp.location,
              imageUrl: exp.imageUrl,
              category: 'stays' as const,
              isFeatured: exp.isFeatured,
              isActive: exp.isActive,
              createdAt: exp.createdAt,
              updatedAt: exp.updatedAt,
            })));
          }
        }
      } catch (error) {
        console.error('Error loading places:', error);
        // Fallback a datos mock
        setPlaces(mockStays.map(exp => ({
          id: exp.id,
          title: exp.title,
          description: exp.description,
          price: exp.price,
          currency: exp.currency,
          rating: exp.rating,
          reviewCount: exp.reviewCount,
          location: exp.location,
          imageUrl: exp.imageUrl,
          category: 'stays' as const,
          isFeatured: exp.isFeatured,
          isActive: exp.isActive,
          createdAt: exp.createdAt,
          updatedAt: exp.updatedAt,
        })));
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, []);

  const bookingLink = 'https://www.booking.com/searchresults.html?ss=Cusco%2C+Peru';

  return (
    <div className={styles.page}>
      <Hero
        title="Stays"
        subtitle="Find your perfect home away from home in the heart of Peru"
        backgroundImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
      />

      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <SectionHeader
            title={`${places.length} accommodations available`}
            description="Browse our selection of hotels, hostels, and guesthouses in Cusco. Click any listing to view details and book on Booking.com."
          />

          {loading ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>Loading accommodations...</p>
            </div>
          ) : places.length > 0 ? (
            <>
              <div className={styles.grid}>
                {places.map((place) => (
                  <Card 
                    key={place.id} 
                    experience={{
                      id: place.id,
                      title: place.title,
                      description: place.description,
                      price: place.price,
                      currency: place.currency,
                      imageUrl: place.imageUrl,
                      rating: place.rating,
                      reviewCount: place.reviewCount,
                      location: place.location,
                      category: 'stays',
                      isFeatured: place.isFeatured || false,
                      isActive: place.isActive !== false,
                      createdAt: place.createdAt || new Date().toISOString(),
                      updatedAt: place.updatedAt || new Date().toISOString(),
                    }} 
                  />
                ))}
              </div>

              <div style={{ 
                marginTop: '48px', 
                textAlign: 'center', 
                padding: '32px', 
                background: '#f9fafb', 
                borderRadius: '12px' 
              }}>
                <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '15px' }}>
                  Want to see more options or check availability?
                </p>
                <a
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: '#006ce4',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 500,
                    fontSize: '14px',
                  }}
                >
                  Search All Hotels on Booking.com →
                </a>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>No accommodations available at the moment.</p>
              <p className={styles.emptyStateSubtext}>Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
