import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LocationState {
  coordinates: { lat: number; lng: number } | null;
  city: string | null;
  zipCode: string | null;
  hasPermission: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LocationActions {
  setLocation: (location: { lat: number; lng: number }) => void;
  setManualLocation: (city: string, zipCode?: string) => void;
  setPermission: (permission: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  requestLocation: () => Promise<void>;
  clearLocation: () => void;
}

export type LocationStore = LocationState & LocationActions;

export const useLocationStore = create<LocationStore>()(
  persist(
    (set, get) => ({
      coordinates: null,
      city: null,
      zipCode: null,
      hasPermission: false,
      isLoading: false,
      error: null,

      setLocation: (location) => set({
        coordinates: location,
        hasPermission: true,
        error: null
      }),

      setManualLocation: (city, zipCode) => set({
        city,
        zipCode,
        error: null
      }),

      setPermission: (permission) => set({ hasPermission: permission }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      requestLocation: async () => {
        const { setLoading, setLocation, setError, setPermission } = get();
        
        if (!navigator.geolocation) {
          setError('Geolocation is not supported by this browser');
          return;
        }

        setLoading(true);
        setError(null);

        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 300000 // 5 minutes
            });
          });

          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setPermission(true);
        } catch (error) {
          setPermission(false);
          if (error instanceof GeolocationPositionError) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setError('Location permission denied. Please enter your city manually.');
                break;
              case error.POSITION_UNAVAILABLE:
                setError('Location information unavailable. Please enter your city manually.');
                break;
              case error.TIMEOUT:
                setError('Location request timed out. Please enter your city manually.');
                break;
              default:
                setError('An unknown error occurred. Please enter your city manually.');
                break;
            }
          }
        } finally {
          setLoading(false);
        }
      },

      clearLocation: () => set({
        coordinates: null,
        city: null,
        zipCode: null,
        hasPermission: false,
        error: null
      })
    }),
    {
      name: 'location-storage',
      partialize: (state) => ({
        coordinates: state.coordinates,
        city: state.city,
        zipCode: state.zipCode,
        hasPermission: state.hasPermission
      })
    }
  )
);