import { Restaurant } from '../../../store/restaurantStore';
import { getMockRestaurants } from './mock';

interface LocationCoords {
  lat: number;
  lng: number;
}

interface LocationCity {
  city: string;
}

type Location = LocationCoords | LocationCity;

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const YELP_API_KEY = import.meta.env.VITE_YELP_API_KEY;

export async function fetchRestaurantsAPI(cuisine: string, location: Location): Promise<Restaurant[]> {
  // Try Google Places API first
  if (GOOGLE_PLACES_API_KEY) {
    try {
      return await fetchFromGooglePlaces(cuisine, location);
    } catch (error) {
      console.warn('Google Places API failed, trying Yelp:', error);
    }
  }

  // Try Yelp API as fallback
  if (YELP_API_KEY) {
    try {
      return await fetchFromYelp(cuisine, location);
    } catch (error) {
      console.warn('Yelp API failed, using mock data:', error);
    }
  }

  // Fallback to mock data
  console.log('Using mock restaurant data');
  return getMockRestaurants(cuisine);
}

async function fetchFromGooglePlaces(cuisine: string, location: Location): Promise<Restaurant[]> {
  const query = `${cuisine} restaurants`;
  let locationStr = '';

  if ('lat' in location) {
    locationStr = `${location.lat},${location.lng}`;
  } else {
    locationStr = location.city;
  }

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${locationStr}&radius=5000&key=${GOOGLE_PLACES_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Places API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.status !== 'OK') {
    throw new Error(`Google Places API status: ${data.status}`);
  }

  return data.results.slice(0, 10).map((place: any, index: number): Restaurant => ({
    id: place.place_id || `google-${index}`,
    name: place.name,
    cuisine: cuisine,
    rating: place.rating || 4.0,
    priceLevel: place.price_level || 2,
    distance: calculateDistance(place.geometry?.location, location),
    address: place.formatted_address || place.vicinity || 'Address not available',
    imageUrl: place.photos?.[0] ? 
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}` 
      : undefined,
    isOpen: place.opening_hours?.open_now,
    description: `Delicious ${cuisine} cuisine at this highly-rated local favorite.`
  }));
}

async function fetchFromYelp(cuisine: string, location: Location): Promise<Restaurant[]> {
  const baseUrl = 'https://api.yelp.com/v3/businesses/search';
  const headers = {
    'Authorization': `Bearer ${YELP_API_KEY}`,
    'Content-Type': 'application/json',
  };

  let params = new URLSearchParams({
    term: `${cuisine} restaurants`,
    limit: '10',
    radius: '8000', // 5 miles in meters
    sort_by: 'best_match'
  });

  if ('lat' in location) {
    params.append('latitude', location.lat.toString());
    params.append('longitude', location.lng.toString());
  } else {
    params.append('location', location.city);
  }

  const response = await fetch(`${baseUrl}?${params}`, { headers });
  
  if (!response.ok) {
    throw new Error(`Yelp API error: ${response.status}`);
  }

  const data = await response.json();

  return data.businesses.map((business: any): Restaurant => ({
    id: business.id,
    name: business.name,
    cuisine: cuisine,
    rating: business.rating,
    priceLevel: business.price?.length || 2,
    distance: `${(business.distance / 1609.34).toFixed(1)} mi`, // Convert meters to miles
    address: `${business.location.address1}, ${business.location.city}`,
    phone: business.phone,
    website: business.url,
    imageUrl: business.image_url,
    isOpen: !business.is_closed,
    description: business.categories?.map((cat: any) => cat.title).join(', ') || `Great ${cuisine} restaurant`
  }));
}

function calculateDistance(placeLocation: any, userLocation: Location): string {
  if (!placeLocation || !('lat' in userLocation)) {
    return 'Distance unknown';
  }

  const lat1 = userLocation.lat;
  const lng1 = userLocation.lng;
  const lat2 = placeLocation.lat;
  const lng2 = placeLocation.lng;

  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return `${distance.toFixed(1)} mi`;
}