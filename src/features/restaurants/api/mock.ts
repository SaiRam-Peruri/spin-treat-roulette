import { Restaurant } from '../../../store/restaurantStore';

const MOCK_RESTAURANTS: Record<string, Restaurant[]> = {
  Italian: [
    {
      id: 'italian-1',
      name: "Marco's Authentic Italian",
      cuisine: 'Italian',
      rating: 4.8,
      priceLevel: 3,
      distance: '0.8 mi',
      address: '123 Little Italy St, Downtown',
      phone: '(555) 123-4567',
      website: 'https://marcos-italian.com',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Family-owned restaurant serving traditional Italian dishes with fresh pasta made daily.'
    },
    {
      id: 'italian-2',
      name: 'Bella Vista Ristorante',
      cuisine: 'Italian',
      rating: 4.6,
      priceLevel: 4,
      distance: '1.2 mi',
      address: '456 Tuscan Ave, Uptown',
      phone: '(555) 234-5678',
      website: 'https://bellavista.com',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Upscale Italian dining with panoramic city views and an extensive wine selection.'
    },
    {
      id: 'italian-3',
      name: 'Luigi\'s Pizza & Pasta',
      cuisine: 'Italian',
      rating: 4.4,
      priceLevel: 2,
      distance: '2.1 mi',
      address: '789 Roma Boulevard, East Side',
      phone: '(555) 345-6789',
      imageUrl: '/api/placeholder/400/300',
      isOpen: false,
      description: 'Casual Italian spot famous for wood-fired pizza and homemade pasta.'
    }
  ],
  Mexican: [
    {
      id: 'mexican-1',
      name: 'Casa de Tacos',
      cuisine: 'Mexican',
      rating: 4.7,
      priceLevel: 2,
      distance: '0.5 mi',
      address: '321 Cinco de Mayo St, Centro',
      phone: '(555) 456-7890',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Authentic Mexican cuisine with handmade tortillas and fresh salsas.'
    },
    {
      id: 'mexican-2',
      name: 'El Mariachi Loco',
      cuisine: 'Mexican',
      rating: 4.5,
      priceLevel: 3,
      distance: '1.8 mi',
      address: '654 Azteca Road, Westside',
      phone: '(555) 567-8901',
      website: 'https://elmariachiloco.com',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Festive atmosphere with live mariachi music and premium tequila selection.'
    }
  ],
  Chinese: [
    {
      id: 'chinese-1',
      name: 'Golden Dragon',
      cuisine: 'Chinese',
      rating: 4.6,
      priceLevel: 2,
      distance: '1.0 mi',
      address: '888 Dynasty Drive, Chinatown',
      phone: '(555) 678-9012',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Traditional Cantonese cuisine with dim sum served daily until 3 PM.'
    },
    {
      id: 'chinese-2',
      name: 'Szechuan Palace',
      cuisine: 'Chinese',
      rating: 4.4,
      priceLevel: 3,
      distance: '2.3 mi',
      address: '456 Spice Street, North Quarter',
      phone: '(555) 789-0123',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Authentic Szechuan flavors with bold spices and traditional hot pot.'
    }
  ],
  Indian: [
    {
      id: 'indian-1',
      name: 'Taj Mahal Palace',
      cuisine: 'Indian',
      rating: 4.8,
      priceLevel: 3,
      distance: '1.5 mi',
      address: '777 Curry Lane, Spice District',
      phone: '(555) 890-1234',
      website: 'https://tajmahalpalace.com',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Royal Indian dining experience with traditional tandoor dishes and rich curries.'
    }
  ],
  Thai: [
    {
      id: 'thai-1',
      name: 'Bangkok Garden',
      cuisine: 'Thai',
      rating: 4.7,
      priceLevel: 2,
      distance: '0.9 mi',
      address: '234 Lotus Street, Asian Quarter',
      phone: '(555) 901-2345',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Fresh Thai cuisine with customizable spice levels and vegetarian options.'
    }
  ],
  Japanese: [
    {
      id: 'japanese-1',
      name: 'Sakura Sushi Bar',
      cuisine: 'Japanese',
      rating: 4.9,
      priceLevel: 4,
      distance: '1.7 mi',
      address: '567 Zen Avenue, Modern District',
      phone: '(555) 012-3456',
      website: 'https://sakurasushi.com',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Premium sushi and sashimi with daily fresh fish flown in from Japan.'
    }
  ],
  Mediterranean: [
    {
      id: 'med-1',
      name: 'Olive Branch Taverna',
      cuisine: 'Mediterranean',
      rating: 4.6,
      priceLevel: 3,
      distance: '1.3 mi',
      address: '890 Harbor View, Coastal Area',
      phone: '(555) 123-4567',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Fresh Mediterranean flavors with grilled seafood and traditional mezze.'
    }
  ],
  Burgers: [
    {
      id: 'burger-1',
      name: 'The Burger Joint',
      cuisine: 'Burgers',
      rating: 4.5,
      priceLevel: 2,
      distance: '0.6 mi',
      address: '345 Grill Street, Downtown',
      phone: '(555) 234-5678',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Gourmet burgers with grass-fed beef and artisanal toppings.'
    }
  ],
  Pizza: [
    {
      id: 'pizza-1',
      name: 'Artisan Pizza Co.',
      cuisine: 'Pizza',
      rating: 4.7,
      priceLevel: 2,
      distance: '1.1 mi',
      address: '678 Dough Street, Midtown',
      phone: '(555) 345-6789',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Wood-fired Neapolitan pizza with locally sourced ingredients.'
    }
  ],
  BBQ: [
    {
      id: 'bbq-1',
      name: 'Smoky Joe\'s BBQ',
      cuisine: 'BBQ',
      rating: 4.8,
      priceLevel: 2,
      distance: '2.0 mi',
      address: '901 Smoke House Lane, South Side',
      phone: '(555) 456-7890',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Low and slow smoked meats with homemade sauces and classic sides.'
    }
  ],
  Vegan: [
    {
      id: 'vegan-1',
      name: 'Green Earth Cafe',
      cuisine: 'Vegan',
      rating: 4.6,
      priceLevel: 2,
      distance: '1.4 mi',
      address: '234 Plant Street, Eco District',
      phone: '(555) 567-8901',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Plant-based cuisine with creative dishes and organic ingredients.'
    }
  ],
  Seafood: [
    {
      id: 'seafood-1',
      name: 'Ocean\'s Bounty',
      cuisine: 'Seafood',
      rating: 4.7,
      priceLevel: 4,
      distance: '2.5 mi',
      address: '567 Pier Avenue, Waterfront',
      phone: '(555) 678-9012',
      website: 'https://oceansbounty.com',
      imageUrl: '/api/placeholder/400/300',
      isOpen: true,
      description: 'Fresh daily catch with spectacular ocean views and raw bar.'
    }
  ]
};

export function getMockRestaurants(cuisine: string): Restaurant[] {
  const restaurants = MOCK_RESTAURANTS[cuisine] || [];
  
  // Add some randomization to make it feel more realistic
  return restaurants.map(restaurant => ({
    ...restaurant,
    rating: Math.max(3.5, restaurant.rating + (Math.random() - 0.5) * 0.4),
    distance: randomizeDistance(restaurant.distance)
  }));
}

function randomizeDistance(distance: string): string {
  const match = distance.match(/(\d+\.?\d*)/);
  if (!match) return distance;
  
  const baseDistance = parseFloat(match[1]);
  const variation = (Math.random() - 0.5) * 0.5; // ±0.25 mi variation
  const newDistance = Math.max(0.1, baseDistance + variation);
  
  return `${newDistance.toFixed(1)} mi`;
}