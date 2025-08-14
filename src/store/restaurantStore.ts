import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceLevel: number;
  distance: string;
  address: string;
  phone?: string;
  website?: string;
  imageUrl?: string;
  isOpen?: boolean;
  description?: string;
}

export interface RestaurantState {
  restaurants: Restaurant[];
  isLoading: boolean;
  error: string | null;
  selectedCuisine: string | null;
}

export interface RestaurantActions {
  setRestaurants: (restaurants: Restaurant[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedCuisine: (cuisine: string | null) => void;
  fetchRestaurants: (cuisine: string, location: { lat: number; lng: number } | { city: string }) => Promise<void>;
  clearRestaurants: () => void;
}

export type RestaurantStore = RestaurantState & RestaurantActions;

export const useRestaurantStore = create<RestaurantStore>()(
  persist(
    (set, get) => ({
      restaurants: [],
      isLoading: false,
      error: null,
      selectedCuisine: null,

      setRestaurants: (restaurants) => set({ restaurants }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      setSelectedCuisine: (cuisine) => set({ selectedCuisine: cuisine }),

      fetchRestaurants: async (cuisine, location) => {
        const { setLoading, setError, setRestaurants } = get();
        
        setLoading(true);
        setError(null);

        try {
          // Import the API function dynamically to avoid circular dependencies
          const { fetchRestaurantsAPI } = await import('../features/restaurants/api/restaurantAPI');
          const restaurants = await fetchRestaurantsAPI(cuisine, location);
          setRestaurants(restaurants);
        } catch (error) {
          console.error('Error fetching restaurants:', error);
          setError(error instanceof Error ? error.message : 'Failed to fetch restaurants');
          setRestaurants([]);
        } finally {
          setLoading(false);
        }
      },

      clearRestaurants: () => set({
        restaurants: [],
        selectedCuisine: null,
        error: null
      })
    }),
    {
      name: 'restaurant-storage', // unique name for localStorage
      partialize: (state) => ({
        restaurants: state.restaurants,
        selectedCuisine: state.selectedCuisine,
      }),
    }
  )
);