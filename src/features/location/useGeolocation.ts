import { useState, useEffect, useCallback } from 'react';

export interface GeolocationState {
  coordinates: { lat: number; lng: number } | null;
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean;
}

export interface GeolocationResult extends GeolocationState {
  getCurrentLocation: () => Promise<{ lat: number; lng: number }>;
  clearError: () => void;
}

export function useGeolocation(): GeolocationResult {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    isLoading: false,
    error: null,
    hasPermission: false
  });

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const getCurrentLocation = useCallback((): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = 'Geolocation is not supported by this browser';
        setState(prev => ({ ...prev, error, hasPermission: false }));
        reject(new Error(error));
        return;
      }

      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const timeoutId = setTimeout(() => {
        const error = 'Location request timed out. Please try again.';
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error,
          hasPermission: false 
        }));
        reject(new Error(error));
      }, 10000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          const coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          setState(prev => ({
            ...prev,
            coordinates,
            isLoading: false,
            error: null,
            hasPermission: true
          }));
          
          resolve(coordinates);
        },
        (error) => {
          clearTimeout(timeoutId);
          let errorMessage: string;
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please enable location access or enter your city manually.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable. Please check your connection or enter your city manually.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out. Please try again or enter your city manually.';
              break;
            default:
              errorMessage = 'An unknown error occurred while getting your location. Please enter your city manually.';
              break;
          }
          
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: errorMessage,
            hasPermission: false
          }));
          
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }, []);

  // Check initial permission state
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setState(prev => ({
          ...prev,
          hasPermission: result.state === 'granted'
        }));
      });
    }
  }, []);

  return {
    ...state,
    getCurrentLocation,
    clearError
  };
}