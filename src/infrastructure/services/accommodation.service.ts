/**
 * Accommodation Service
 * 
 * This service handles fetching accommodation data from various sources:
 * - Booking.com (via affiliate API or links)
 * - Google Places API (as alternative)
 * - Future: Airbnb API integration
 */

export interface Accommodation {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  location: string;
  imageUrl: string;
  bookingUrl?: string;
  latitude?: number;
  longitude?: number;
  amenities?: string[];
  type?: 'hotel' | 'hostel' | 'apartment' | 'guesthouse';
}

/**
 * Fetch accommodations from Booking.com via affiliate links
 * Note: This requires Booking.com affiliate account and API access
 */
export async function fetchBookingComAccommodations(
  location: string = 'Cusco',
  checkIn?: string,
  checkOut?: string
): Promise<Accommodation[]> {
  // TODO: Implement Booking.com API integration
  // Requires: Booking.com Affiliate API credentials
  // API endpoint: https://distribution-xml.booking.com/json/bookings.getHotels
  
  const BOOKING_API_KEY = import.meta.env.VITE_BOOKING_API_KEY;
  const BOOKING_AFFILIATE_ID = import.meta.env.VITE_BOOKING_AFFILIATE_ID;

  if (!BOOKING_API_KEY || !BOOKING_AFFILIATE_ID) {
    console.warn('Booking.com API credentials not configured');
    return [];
  }

  try {
    // Example API call structure (needs actual Booking.com API implementation)
    const response = await fetch(
      `https://distribution-xml.booking.com/json/bookings.getHotels?` +
      `city=${encodeURIComponent(location)}` +
      `&checkin=${checkIn || ''}` +
      `&checkout=${checkOut || ''}` +
      `&rows=20` +
      `&affiliate_id=${BOOKING_AFFILIATE_ID}` +
      `&api_key=${BOOKING_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Booking.com API request failed');
    }

    const data = await response.json();
    
    // Transform Booking.com data to our Accommodation format
    return data.result?.map((hotel: any) => ({
      id: hotel.hotel_id,
      name: hotel.hotel_name,
      description: hotel.description || '',
      price: hotel.minrate || 0,
      currency: hotel.currencycode || 'USD',
      rating: hotel.review_score || 0,
      reviewCount: hotel.review_nr || 0,
      location: hotel.city || location,
      imageUrl: hotel.main_photo_url || '',
      bookingUrl: hotel.url || '',
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      amenities: hotel.hotel_facilities || [],
      type: 'hotel',
    })) || [];
  } catch (error) {
    console.error('Error fetching Booking.com accommodations:', error);
    return [];
  }
}

/**
 * Fetch accommodations using Google Places API
 * Alternative solution that's more accessible
 */
export async function fetchGooglePlacesAccommodations(
  location: string = 'Cusco, Peru',
  radius: number = 50000 // 50km radius
): Promise<Accommodation[]> {
  const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

  if (!GOOGLE_PLACES_API_KEY) {
    console.warn('Google Places API key not configured');
    return [];
  }

  try {
    // First, get place ID for the location
    const geocodeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?` +
      `address=${encodeURIComponent(location)}` +
      `&key=${GOOGLE_PLACES_API_KEY}`
    );

    const geocodeData = await geocodeResponse.json();
    const locationData = geocodeData.results[0];
    
    if (!locationData) {
      return [];
    }

    const { lat, lng } = locationData.geometry.location;

    // Search for hotels/lodging near the location
    const placesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
      `location=${lat},${lng}` +
      `&radius=${radius}` +
      `&type=lodging` +
      `&key=${GOOGLE_PLACES_API_KEY}`
    );

    const placesData = await placesResponse.json();

    if (placesData.status !== 'OK') {
      throw new Error(`Google Places API error: ${placesData.status}`);
    }

    // Transform Google Places data to our Accommodation format
    return placesData.results.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      description: '',
      price: 0, // Google Places doesn't provide pricing
      currency: 'USD',
      rating: place.rating || 0,
      reviewCount: place.user_ratings_total || 0,
      location: place.vicinity || location,
      imageUrl: place.photos?.[0] 
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
        : '',
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      amenities: [],
      type: 'hotel',
    }));
  } catch (error) {
    console.error('Error fetching Google Places accommodations:', error);
    return [];
  }
}

/**
 * Generate Booking.com affiliate links for accommodations
 * Fallback solution when API is not available
 */
export function generateBookingComLink(
  location: string = 'Cusco',
  checkIn?: string,
  checkOut?: string
): string {
  const AFFILIATE_ID = import.meta.env.VITE_BOOKING_AFFILIATE_ID || '';
  const baseUrl = 'https://www.booking.com/searchresults.html';
  
  const params = new URLSearchParams({
    ss: location,
    ...(checkIn && { checkin_month: new Date(checkIn).getMonth() + 1 + '' }),
    ...(checkIn && { checkin_monthday: new Date(checkIn).getDate() + '' }),
    ...(checkIn && { checkin_year: new Date(checkIn).getFullYear() + '' }),
    ...(checkOut && { checkout_month: new Date(checkOut).getMonth() + 1 + '' }),
    ...(checkOut && { checkout_monthday: new Date(checkOut).getDate() + '' }),
    ...(checkOut && { checkout_year: new Date(checkOut).getFullYear() + '' }),
    ...(AFFILIATE_ID && { aid: AFFILIATE_ID }),
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Main function to fetch accommodations from available sources
 */
export async function fetchAccommodations(
  source: 'booking' | 'google' | 'all' = 'all',
  location: string = 'Cusco'
): Promise<Accommodation[]> {
  const results: Accommodation[] = [];

  if (source === 'booking' || source === 'all') {
    const bookingResults = await fetchBookingComAccommodations(location);
    results.push(...bookingResults);
  }

  if (source === 'google' || source === 'all') {
    const googleResults = await fetchGooglePlacesAccommodations(location);
    results.push(...googleResults);
  }

  // Remove duplicates based on name
  const uniqueResults = results.filter(
    (acc, index, self) => index === self.findIndex((a) => a.name === acc.name)
  );

  return uniqueResults;
}
